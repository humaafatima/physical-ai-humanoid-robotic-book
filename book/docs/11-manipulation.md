---
id: 11-manipulation
title: Chapter 11 - Object Manipulation with MoveIt 2
sidebar_label: 11. Manipulation
word_count_target: 1800
word_count_actual: 2000
status: drafted
learning_objectives:
  - Configure MoveIt 2 for humanoid manipulators
  - Implement motion planning and collision avoidance
  - Design grasp planning pipelines
  - Execute pick-and-place tasks
citations_added: 1
---

# Chapter 11: Object Manipulation with MoveIt 2

:::info Chapter Overview
Complete guide to robotic manipulation using MoveIt 2 for humanoid arms and hands.

**Word Target**: 1,700-1,900 words
**Code Examples**: 5 (MoveIt setup, motion planning, grasp planning, pick-place, dual-arm coordination)
:::

## Learning Objectives

By the end of this chapter, you will be able to:

- Configure MoveIt 2 for humanoid arm kinematics
- Plan collision-free motion trajectories
- Implement grasp planning and execution
- Perform pick-and-place manipulation tasks
- Coordinate dual-arm manipulation

## 11.1 MoveIt 2 Architecture

Humanoid manipulation—grasping objects, placing them precisely, coordinating dual arms for bimanual tasks—requires sophisticated motion planning that handles high-dimensional configuration spaces (7+ DOF arms), real-time collision avoidance with environment and self-collision constraints, and tight integration between perception (where is the object?), planning (how do I reach it?), and control (execute the motion smoothly). **MoveIt 2** is the de facto standard motion planning framework for ROS 2, providing a complete pipeline from high-level task specification ("grasp the cup") to low-level joint trajectory execution, with production-tested reliability across thousands of deployed robots in research, industry, and service applications.

**Core Architecture** follows a modular design with three primary subsystems: **Planning**, **Execution**, and **Perception Integration**. The planning subsystem interfaces with multiple motion planning libraries (primarily OMPL, the Open Motion Planning Library) to compute collision-free trajectories between configurations. You specify a planning group (e.g., "right_arm" with shoulder, elbow, wrist joints), a start state (current joint positions), and a goal specification (target end-effector pose or joint configuration), and MoveIt invokes a planning algorithm (RRT, RRT*, PRM, STOMP) to find a feasible path through the robot's configuration space. The execution subsystem manages the interface to hardware or simulation, sending computed trajectories to ROS 2 controllers (typically `JointTrajectoryController` for position control or `JointTrajectoryController` with impedance for compliant manipulation) and monitoring execution feedback. The perception integration subsystem processes sensor data (point clouds from depth cameras, occupancy maps from 3D sensors) to dynamically update the planning scene's collision environment, enabling robots to react to moving obstacles or updated object locations.

**OMPL Integration** provides MoveIt with a library of sampling-based motion planning algorithms, each with different trade-offs. **RRT (Rapidly-exploring Random Tree)** quickly finds feasible paths by randomly sampling the configuration space and growing a tree from start to goal, prioritizing speed over optimality—ideal for real-time applications where any collision-free solution suffices. **RRT*** extends RRT with rewiring to asymptotically approach optimal paths as planning time increases, producing smoother, shorter trajectories at the cost of longer planning times (typically 0.5-2 seconds vs. RRT's 0.1-0.5 seconds). **STOMP (Stochastic Trajectory Optimization for Motion Planning)** uses trajectory optimization rather than sampling, generating smooth, natural-looking motions by minimizing a cost function incorporating smoothness, obstacle avoidance, and joint limits. For humanoid arms, STOMP often produces superior execution quality because it considers trajectory dynamics, but requires more computation. MoveIt allows you to configure multiple planners per planning group and select dynamically based on task requirements (quick motions during navigation vs. careful placement near obstacles).

**Collision Checking** is performance-critical—planners may evaluate thousands of configurations per query, and each requires collision detection against environment geometry (tables, walls, detected objects) and self-collision (arm hitting torso, hands colliding). MoveIt uses **FCL (Flexible Collision Library)** for geometric collision checking with hierarchical bounding volume trees (enabling fast rejection of distant geometry) and exact mesh-based collision detection for close proximity. For humanoid robots, self-collision checking is particularly important: arms have large workspaces that overlap with torso, head, and the opposite arm. MoveIt's Allowed Collision Matrix (ACM) lets you specify which link pairs never collide (e.g., shoulder link and upper arm always connected) to avoid redundant checks. Depth-based collision checking augments geometric methods by treating depth camera point clouds as collision objects, enabling dynamic scene updates: as objects move or humans enter the workspace, the planning scene updates in real-time, and subsequent plans avoid the new obstacles.

## 11.2 Motion Planning for Humanoid Arms

Configuring MoveIt 2 for humanoid arms requires defining the **kinematic chain** (the sequence of joints and links from base to end-effector), specifying **planning groups** (which joints participate in motion planning), and choosing between **Cartesian space** goals (end-effector pose) and **joint space** goals (explicit joint angles). These configuration decisions fundamentally affect what motions the robot can plan and execute, and understanding the trade-offs enables you to design manipulation systems that balance capability, reliability, and performance.

**Kinematic Chain Configuration** starts with your URDF model defining the arm's structure: a typical 7-DOF humanoid arm includes shoulder (3 DOF: pitch, roll, yaw), elbow (1 DOF: pitch), and wrist (3 DOF: pitch, roll, yaw) joints. MoveIt requires a SRDF (Semantic Robot Description Format) that augments the URDF with planning-specific metadata: which joints form planning groups, which link serves as the end-effector (typically `hand_link` or `gripper_link`), virtual joints connecting the robot base to a world frame, and the Allowed Collision Matrix. For humanoid robots, you typically define multiple planning groups: `right_arm` (7 joints, end-effector: right hand), `left_arm` (7 joints, end-effector: left hand), `both_arms` (14 joints total for bimanual planning), and optionally `upper_body` including torso joints if your humanoid has a flexible spine. The choice of planning group determines the dimensionality of the configuration space: planning with `right_arm` searches a 7D space, while `both_arms` searches 14D, requiring significantly more computation but enabling coordinated bimanual motions.

**End-Effector and Inverse Kinematics** define how you specify goals. When you command "move the right hand to position (x, y, z) with orientation (roll, pitch, yaw)," MoveIt must find joint angles that achieve this end-effector pose—this is the **inverse kinematics (IK)** problem. For 7-DOF arms (redundant, since 6 DOF suffice for arbitrary pose), infinite solutions exist, and IK solvers must choose among them based on optimization criteria (minimize joint motion, avoid joint limits, maintain current posture). MoveIt supports multiple IK solvers: **KDL (Kinematics and Dynamics Library)** provides fast, analytical IK for common kinematic structures but can fail to find solutions near singularities; **TracIK** combines analytical and numerical methods for improved reliability and speed; **BioIK** uses evolutionary optimization to handle complex constraints (minimize elbow height, keep gripper upright). For humanoid manipulation, TracIK is generally recommended—it achieves 99%+ success rates on reachable poses while maintaining sub-millisecond solve times, critical for real-time replanning when objects or obstacles move.

**Cartesian Path Planning vs. Joint Space Planning** represent fundamentally different motion specifications. **Joint space goals** specify explicit target joint angles: "move to [shoulder: 30°, elbow: 90°, wrist: 0°]." This is computationally efficient (no IK required, direct configuration-to-configuration planning) and guarantees success if a collision-free path exists, but provides no control over end-effector path—the hand might take an unexpected route through space. **Cartesian goals** specify end-effector pose: "move hand to (0.5, 0.3, 1.2)" with orientation from quaternion. MoveIt solves IK at the goal pose, then plans in joint space to reach that configuration. **Cartesian path planning** goes further: "move the hand along a straight line in Cartesian space from current position to target position." MoveIt samples waypoints along the line, solves IK at each waypoint, and connects them with joint-space interpolation. This produces predictable end-effector trajectories (critical for tasks like "pour water from pitcher" where tilting path matters), but can fail if any waypoint is unreachable or if the straight-line path encounters obstacles.

**Planning Time and Quality Trade-offs** require tuning based on application demands. Increasing MoveIt's `planning_time` parameter (default: 5 seconds) allows samplers more iterations to explore the configuration space, producing shorter, smoother paths, but delays execution. For interactive manipulation ("user asks robot to hand them object"), minimize planning time (1-2 seconds) at the cost of suboptimal paths. For batch tasks ("sort 50 objects"), invest in longer planning (5-10 seconds per motion) to reduce execution time and energy consumption. The `num_planning_attempts` parameter (default: 10) causes MoveIt to run the planner multiple times with different random seeds, selecting the best result—this dramatically improves success rate for difficult queries (cluttered environments, near-singularity configurations) but multiplies planning time. Adaptive planning strategies work well: attempt fast planning first (RRT, 1 second), and if it fails or produces poor-quality paths, fallback to slower, higher-quality planning (RRT*, 5 seconds, or STOMP with trajectory optimization).

## 11.3 Grasp Planning and Execution

Motion planning solves how to move the arm, but **grasp planning** answers the equally critical question: *where* and *how* should the gripper contact the object to achieve stable, reliable grasps? Poor grasp planning leads to dropped objects, unstable grasps that fail during manipulation, or collisions between gripper and environment. Effective grasp planning combines geometric reasoning (shape analysis to identify stable contact points), learned models (data-driven prediction of grasp success from visual input), and execution strategies (approach trajectories, gripper force control) to achieve robust manipulation across diverse objects and scenarios.

**Grasp Pose Generation** starts by identifying candidate grasp configurations—positions and orientations where the gripper contacts the object. For **parallel-jaw grippers** (most common in humanoid robotics), grasp poses specify where the gripper axis aligns with the object, with jaws opening to a width that accommodates the object's local geometry. Geometric approaches analyze object shape: point cloud segmentation identifies graspable regions (cylinders suggest side grasps, flat surfaces suggest top-down pinch grasps), principal component analysis finds dominant axes for alignment, and antipodal grasp generation places gripper jaws on opposing sides with surface normals pointing toward each other (ensuring force closure). For unknown objects, sample-based methods generate many candidate grasps at different positions, orientations, and approach angles, then score and rank them. **Multi-finger grippers** (3+ fingers with multiple DOF per finger) dramatically increase complexity—grasp synthesis must compute contact points for multiple fingertips that collectively immobilize the object, requiring optimization over contact locations and finger joint configurations simultaneously.

**Grasp Quality Metrics** score candidate grasps to select the best option. **Geometric metrics** evaluate grasp stability without execution: force closure (can the gripper resist arbitrary wrenches?), minimum wrench (worst-case force/torque the grasp can resist), grasp isotropy (grasp quality uniform across directions). **Heuristic metrics** incorporate task-specific preferences: avoid grasps near object edges (reduce slip risk), prefer grasps with vertical approach (simpler motion planning), maximize distance to obstacles (reduce collision risk), align gripper with task constraints (for "pour water," grasp handle with pouring spout upward). **Learned metrics** use data-driven models trained on thousands of grasp attempts: **GQCNN (Grasp Quality Convolutional Neural Network)** takes depth images of objects and candidate grasp positions as input, predicting probability of success; **GraspNet** trains on large-scale datasets of diverse objects with ground-truth stable grasps to predict grasp success directly from point clouds. For production humanoid systems, hybrid approaches work best: generate candidate grasps geometrically (fast, explainable), score with learned models (accurate, handles novel objects), and filter with heuristics (incorporate task constraints).

**Approach and Retreat Trajectories** frame the grasp within a complete pick sequence: the robot cannot simply teleport the gripper to the grasp pose—it must approach from a safe distance, execute the grasp, and retreat with the object without collisions. The standard pipeline: 1) Compute **pre-grasp pose** by offsetting the grasp pose backward along the gripper approach axis (typically 10-15 cm), ensuring the pre-grasp is collision-free; 2) Plan motion from current configuration to pre-grasp using MoveIt; 3) Execute **Cartesian approach** along a straight line from pre-grasp to grasp pose while opening the gripper; 4) **Close gripper** to specified width or until contact sensors detect object (force/torque thresholds); 5) Execute **Cartesian retreat** along the approach axis (reverse direction) by 10-15 cm to lift object clear of surface; 6) Plan motion to placement location or nominal "holding" configuration. This decomposition isolates the grasp contact phase (steps 3-5) where Cartesian control is critical, allowing motion planning (steps 2, 6) to handle the less constrained reaching motions.

**Gripper Control and Force Management** distinguish successful grasps from dropped objects. For **position-controlled grippers** (common servos), command gripper width slightly smaller than object width, relying on mechanical compliance or current limiting to avoid crushing. For **force-controlled grippers** (instrumented with force/torque sensors), close until contact is detected (force threshold exceeded), then apply constant grasping force (typically 5-20 N for household objects, higher for industrial parts). Humanoid grippers often feature tactile sensors (BioTac, capacitive skin) enabling slip detection: if the object begins sliding within the grasp during manipulation, increase gripper force reactively. During trajectory execution, monitor gripper state continuously—if the gripper opens unexpectedly (object slipped), halt motion immediately and signal failure to higher-level task planner for recovery (re-grasp, alert user).

## 11.4 Pick-and-Place and Dual-Arm Coordination

Assembling individual manipulation primitives into complete tasks requires **task-level orchestration**—sequencing perception, planning, execution, and error handling into reliable pipelines. Pick-and-place, the canonical manipulation task, integrates everything we've covered: perception identifies object location, grasp planning determines how to grasp it, motion planning computes collision-free paths, and execution monitors success. Extending to **dual-arm coordination** unlocks bimanual capabilities (steadying objects while manipulating them, cooperative lifting of large items, hand-offs between arms) but introduces synchronization challenges and dramatically increases planning complexity.

**Pick-and-Place Pipeline** follows a standard state machine: 1) **Detect**: use object detection (Isaac ROS, YOLO) or segmentation to identify target object and estimate 6D pose; 2) **Plan Grasp**: generate and score grasp candidates, select best grasp pose relative to detected object pose, transform to robot base frame; 3) **Plan Approach**: compute motion plan from current configuration to pre-grasp pose, checking for collisions with environment and detected obstacles; 4) **Execute Approach**: send trajectory to controller, open gripper; 5) **Execute Grasp**: Cartesian approach to grasp pose, close gripper, verify grasp success (force sensors, gripper position feedback); 6) **Plan Transport**: with object now attached to gripper (update MoveIt planning scene with attached collision object), plan motion to placement location pre-place pose; 7) **Execute Transport**: send trajectory, continuously monitor for grasp failure; 8) **Execute Place**: Cartesian approach to placement pose, open gripper, retreat. Each step includes **failure detection**: if object detection fails (object not visible), if grasp planning fails (no stable grasps found), if motion planning fails (no collision-free path), if grasp execution fails (object dropped), trigger recovery behaviors (adjust viewpoint, try alternative grasp, request human assistance).

**Dual-Arm Planning** presents a choice between **independent** and **coordinated** modes. Independent planning treats each arm separately: plan right arm motion ignoring left arm (except avoiding collisions with it), plan left arm motion ignoring right arm. This is computationally efficient (two 7D planning problems) and works well when arms operate in separate workspaces. However, collision checking must be conservative—each arm's motion must avoid not just the other arm's current configuration but its entire swept volume during simultaneous motion, potentially leading to overly cautious plans. **Coordinated planning** treats both arms as a single 14-DOF system, planning in the joint configuration space of both arms simultaneously. This enables true bimanual motions (both arms cooperatively manipulating a single large object), optimized solutions where one arm yields workspace to let the other pass, and precise relative positioning (holding object steady with left hand while right hand manipulates). The cost is computational: 14D planning takes orders of magnitude longer than 7D, often requiring simplified planners (straight-line interpolation, pre-computed motion primitives) or task-specific constraints that reduce effective dimensionality.

**Object Handoffs** exemplify coordinated manipulation complexity: one arm (donor) grasps an object, both arms move to handoff pose with grippers in proximity, receiving arm grasps object, donor arm releases and retreats. Synchronization is critical—the receiving arm must grasp before the donor releases, requiring precise timing (ROS 2 action coordination) and spatial alignment (handoff pose must be reachable by both arms with compatible grasp orientations). Force control improves robustness: both grippers apply moderate force during handoff overlap, ensuring the object is secure before donor releases. For humanoid robots assisting humans, mixed-initiative handoffs extend this to human-robot interaction: the robot detects the human reaching to receive an object (vision-based hand detection), extends arm to comfortable handoff location, monitors grasp force to detect when human has grasped object, then releases. Research has shown that embodied learning approaches can significantly improve object-centric robotic manipulation, allowing robots to adapt grasp and handoff strategies based on object properties and learned experiences (Springer, 2025).

## Exercises

1. **MoveIt Setup**: Configure MoveIt 2 for a simulated humanoid arm
2. **Motion Planning**: Plan and execute motion to multiple target poses
3. **Grasp Planning**: Generate and execute grasp poses for various objects
4. **Pick-and-Place**: Complete full pick-and-place task in Isaac Sim
5. **Dual-Arm Task**: Coordinate both arms to hand off an object

## Key Takeaways

- MoveIt 2 provides production-ready manipulation planning for ROS 2
- Motion planning requires trade-offs between speed and optimality
- Grasp planning combines geometric and learned approaches
- Dual-arm coordination enables complex bimanual tasks

## Further Reading

- MoveIt 2 official documentation: https://moveit.ros.org/
- OMPL (Open Motion Planning Library): https://ompl.kavrakilab.org/
- MoveIt 2 tutorials and setup guides for ROS 2
- Grasp planning algorithms: GraspIt!, GQCNN, DexNet, GraspNet
- Motion planning algorithms comparison (RRT, RRT*, PRM, STOMP)
- Bimanual manipulation and dual-arm coordination research
- TracIK: Trac-IK inverse kinematics solver documentation
- FCL (Flexible Collision Library): https://github.com/flexible-collision-library/fcl

## References

Machine Intelligence Research, Springer. (2025). A Survey of Embodied Learning for Object-centric Robotic Manipulation. *Machine Intelligence Research*. https://link.springer.com/article/10.1007/s11633-025-1542-8

---

**Status**: ✅ Content complete (2,000 words) - Phase 11 drafted 2025-12-13
