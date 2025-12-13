---
id: 04-urdf
title: Chapter 4 - URDF & Robot Modeling for Humanoids
sidebar_label: 4. URDF & Robot Modeling
word_count_target: 1500
word_count_actual: 1590
status: drafted
learning_objectives:
  - Understand URDF syntax for robot description
  - Model humanoid robots with links and joints
  - Use xacro for parameterized models
  - Visualize robots in RViz
---

# Chapter 4: URDF & Robot Modeling for Humanoids

:::info Chapter Overview
Learn to create robot descriptions using URDF (Unified Robot Description Format) for humanoid robots.

**Word Target**: 1,400-1,600 words
**Code Examples**: 3 (simple robot, humanoid URDF, RViz visualization)
:::

## Learning Objectives

- Define robot structure using URDF XML syntax
- Create humanoid models with proper kinematic chains
- Use xacro macros for reusable components
- Visualize and debug models in RViz

## 4.1 URDF Basics

URDF (Unified Robot Description Format) provides the standard way to describe robot geometry, kinematics, dynamics, and sensors in the ROS ecosystem. A URDF file is an XML document that encodes a robot's physical structure as a kinematic tree—a hierarchical arrangement of links (rigid bodies) connected by joints (articulations). Whether you're working with a simulated humanoid in Isaac Sim or a physical platform, URDF serves as the common language for robot representation, enabling visualization tools, motion planners, physics simulators, and control frameworks to understand your robot's structure.

The fundamental building blocks of URDF are straightforward. A `<robot>` root element contains the entire description. `<link>` elements represent rigid bodies—torso, upper arm, forearm, thigh, shin, feet—each with three optional properties. The `<visual>` property specifies appearance (mesh files, colors, shapes) for rendering. The `<collision>` property defines simplified geometry for collision detection—often using primitive shapes like cylinders and boxes rather than high-poly meshes for computational efficiency. The `<inertial>` property specifies mass, center of mass, and inertia tensor required for physics simulation. For humanoid robots, accurate inertial properties are critical—incorrect mass distribution will cause balance controllers to fail spectacularly in simulation even if the kinematic structure is perfect.

`<joint>` elements connect links, defining their relationship and motion constraints. Each joint has a type that determines allowed motion: `revolute` joints rotate around an axis with defined limits (knee joints: 0° to 130°), `continuous` joints rotate without limits (wheels), `prismatic` joints slide linearly (telescoping antennas), and `fixed` joints rigidly attach components (sensor mounts). Joints also specify the kinematic relationship through `<origin>` tags that define the position and orientation offset from parent to child link. These coordinate frame transforms are where URDF modeling becomes intricate—each joint's origin is expressed relative to its parent link's frame, creating a cascade of transforms through the kinematic tree.

Understanding coordinate frames is essential for correct URDF authoring. ROS follows the REP-103 standard: X forward, Y left, Z up (the "right-hand rule"). When defining a joint between a torso and upper arm, you specify where the shoulder joint is located relative to the torso's coordinate frame, then where the upper arm link begins relative to that joint. Visualization tools like RViz display these coordinate frames as RGB axes (X=red, Y=green, Z=blue), making it possible to debug misaligned transforms visually. For humanoid robots with dozens of joints, careful frame management—and thorough testing in visualization—prevents the nightmare of "why is my robot's left arm attached backwards?" debugging sessions that plague beginners.

## 4.2 Links, Joints, and Coordinate Frames

A robot's kinematic structure forms a tree, not a graph—each link (except the root) has exactly one parent and may have multiple children. For humanoid robots, the torso typically serves as root, with legs, arms, and head branching from it. This tree structure reflects physical reality: your right forearm's position depends on your upper arm's position, which depends on your shoulder, which depends on your torso. URDF enforces this hierarchy explicitly: each joint declaration names its parent and child links, and tools like `urdf_to_graphviz` can visualize the resulting kinematic tree to verify structure.

The parent-child relationship goes beyond topology—it determines how motion propagates through the robot. When a shoulder joint rotates, everything connected to it (upper arm, forearm, hand, and any objects being held) moves accordingly. This is why joint ordering matters: the base of the kinematic chain affects everything downstream, but leaf nodes affect only themselves. For humanoid manipulation tasks, this means hand position depends on the cumulative effect of shoulder, elbow, and wrist joints—a principle exploited by inverse kinematics solvers that work backwards from desired hand pose to required joint angles.

**Joint limits and dynamics** convert URDFs from purely geometric descriptions to physically realistic models. Joint limits specify the range of motion through `<limit>` tags: `lower` and `upper` bounds in radians for revolute joints, meters for prismatic joints. Setting a knee joint's lower limit to 0 and upper limit to 2.3 radians (≈130°) prevents the physics simulator from allowing impossible configurations where the leg bends backward. The `effort` and `velocity` limit parameters constrain maximum torque and angular velocity, modeling actuator capabilities. A humanoid's hip joint might have higher effort limits than finger joints, reflecting motor sizing differences. These dynamics parameters become crucial when training reinforcement learning policies—unrealistic limits let the policy learn behaviors that won't transfer to physical hardware.

**Collision geometry versus visual geometry** represents an important optimization in robotics simulation. Visual meshes can be highly detailed—thousands or millions of polygons for photorealistic rendering—but collision detection between such complex meshes is computationally prohibitive, especially for real-time physics simulation. The solution: use detailed meshes for `<visual>` elements that only affect rendering, and simplified primitive shapes (boxes, cylinders, spheres) or low-poly convex hulls for `<collision>` elements used by the physics engine. A humanoid's shin might visualize as a detailed mesh showing boots and actuators, but use a simple cylinder for collision detection. This dual representation lets your simulated robot look good while still running physics at real-time rates—essential for iterating on control algorithms in Isaac Sim.

## 4.3 Humanoid URDF Modeling

Humanoid robots present unique URDF modeling challenges compared to simpler platforms like mobile robots or manipulator arms. The typical humanoid structure includes a torso (root link), two arms (7+ DOF each), two legs (6+ DOF each), and a head (1-3 DOF)—totaling 20-40+ articulated joints. Each limb must be modeled as a kinematic chain with realistic joint limits, mass properties that enable dynamic balance, and collision geometry that prevents self-intersection during motion. The URDF becomes both a technical specification and a design document capturing critical engineering decisions about the robot's physical capabilities.

**Degrees of freedom allocation** directly determines the robot's dexterity and task capabilities. A minimal humanoid leg requires 6 DOF: 3 at the hip (flexion/extension, abduction/adduction, rotation), 1 at the knee (flexion), and 2 at the ankle (dorsiflexion/plantarflexion, inversion/eversion). This enables walking and balance control. Arms need at least 7 DOF for general manipulation: 3 at the shoulder, 1 at the elbow, and 3 at the wrist, providing redundancy that allows the arm to reach targets from multiple configurations—useful when obstacles block one approach. The head typically has 2 DOF (pan and tilt), allowing the robot to direct its cameras without moving the entire body. More sophisticated humanoids add DOF for torso twist/bend, hand fingers (3-4 DOF per finger), and ankle compliance mechanisms. Each additional DOF increases manipulation capability but also increases control complexity, computational load, and the difficulty of sim-to-real transfer.

**Mass distribution and center of gravity** are critical for stable bipedal locomotion. Unlike statically stable quadrupeds, humanoids operate in continuous dynamic balance where the projected center of mass must remain above the support polygon (the convex hull of ground contact points). If your URDF specifies too much mass in the torso and too little in the legs, the center of gravity will be too high, making balance control difficult or impossible. Real humanoid platforms carefully distribute mass: heavy components like batteries and computers sit low in the torso, actuators are positioned close to joints to minimize link inertia, and legs are designed to be as light as possible while maintaining strength. Your URDF should reflect these design principles with accurate inertial properties for each link. Tools like `check_urdf` can verify that your model's total mass matches specifications and that inertia tensors are physically valid (positive definite matrices).

**Sensor placement** transforms the URDF from a purely mechanical model to a sensing-capable robot. Cameras are typically mounted in the head or chest, positioned to view manipulation targets and navigation obstacles. The URDF specifies each camera's location and orientation via fixed joints connecting sensor links to the robot structure. IMUs (Inertial Measurement Units) usually mount in the torso near the center of mass to measure body orientation and acceleration—critical for balance control. Force/torque sensors may be placed at ankles (for zero-moment point estimation) or wrists (for contact-rich manipulation). Each sensor in the URDF becomes a topic publisher in simulation, providing the data streams that perception and control nodes consume. Accurate sensor placement in URDF ensures that your simulated robot's sensory experience matches what a physical platform would perceive, improving sim-to-real transfer fidelity.

## 4.4 URDF Visualization in RViz

RViz (ROS Visualization) serves as the primary tool for visualizing and debugging robot models during URDF development. Rather than loading your URDF into a physics simulator only to discover a joint is backwards or a limb is offset by 10 centimeters, RViz provides immediate visual feedback on robot structure, coordinate frames, and kinematics. The workflow is iterative: edit URDF, launch RViz, inspect the model, identify issues, fix them, and repeat until the structure matches your design intent.

The RViz interface centers on a 3D viewport displaying your robot model with configurable displays. The **RobotModel** display renders the URDF's visual geometry with proper materials and textures. The **TF** (transform) display overlays coordinate frame axes for every link, showing their positions and orientations—invaluable for catching transform errors. When a joint's axis is pointing the wrong direction, the TF display makes it obvious: you'll see a coordinate frame rotated 90° from where it should be. The **Joint State Publisher** GUI provides sliders for each joint, letting you manually articulate the robot to verify joint limits, check for collisions between links, and confirm that motion looks natural.

For humanoid URDFs, typical RViz debugging workflow involves systematically verifying each limb. Load the URDF, enable TF display, and check that torso, hip, thigh, shin, and foot frames align as expected. Use joint sliders to bend the leg through its full range of motion. Does the knee bend the right direction? Do the ankle frames stay properly aligned with the foot? Any unexpected behavior—limbs intersecting, joints rotating around wrong axes, or visual geometry not matching collision geometry—signals URDF errors that must be fixed before proceeding to physics simulation.

RViz integration with ROS 2's parameter system enables dynamic URDF reloading: change your URDF file, restart the robot state publisher node, and see updates immediately. This tight feedback loop dramatically accelerates URDF development compared to alternatives that require restarting heavyweight simulation environments. By the time you're ready to load your humanoid into Isaac Sim for physics-based control, the kinematic structure should be thoroughly validated in RViz, preventing frustrating debugging sessions where control problems stem from model errors rather than algorithm issues.

## Code Examples

### Example 1: Simple Robot URDF
**Directory**: `code-examples/chapter-04-urdf/simple_robot/`
**Goal**: Create a basic 2-link robot with visualization

### Example 2: Humanoid URDF Model
**Directory**: `code-examples/chapter-04-urdf/humanoid_urdf/`
**Goal**: Complete humanoid robot description

### Example 3: RViz Visualization
**Directory**: `code-examples/chapter-04-urdf/rviz_visualization/`
**Goal**: Launch and interact with robot model in RViz

## Exercises

1. Create a 3-DOF robot arm URDF
2. Add collision geometry to your robot
3. Create a xacro macro for a leg with 6 DOF
4. Model a humanoid torso with shoulder and hip joints
5. Add sensors (camera, IMU) to your URDF
6. Visualize your robot in RViz with joint sliders
7. Export URDF to COLLADA for visualization
8. Debug a broken URDF using `check_urdf` tool

---

**Next Chapter**: [Chapter 5: Digital Twins →](./05-digital-twins.md)
