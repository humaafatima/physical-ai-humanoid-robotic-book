---
id: 08-navigation
title: Chapter 8 - Autonomous Navigation with Nav2
sidebar_label: 8. Navigation
word_count_target: 1800
word_count_actual: 1910
status: drafted
learning_objectives:
  - Configure Nav2 for bipedal humanoid navigation
  - Implement localization and mapping (SLAM)
  - Design navigation behavior trees
  - Handle dynamic obstacles and recovery behaviors
---

# Chapter 8: Autonomous Navigation with Nav2

:::info Chapter Overview
Complete guide to autonomous navigation for humanoid robots using ROS 2 Nav2 stack.

**Word Target**: 1,700-1,900 words
**Code Examples**: 5 (SLAM, localization, path planning, behavior trees, dynamic obstacles)
:::

## Learning Objectives

By the end of this chapter, you will be able to:

- Configure Nav2 for humanoid bipedal locomotion
- Perform SLAM (Simultaneous Localization and Mapping)
- Implement global and local path planning
- Design custom navigation behavior trees
- Handle dynamic obstacles and recovery scenarios

## 8.1 Nav2 Architecture

Autonomous navigation represents one of the most complex capabilities a humanoid robot must possess—combining perception, localization, planning, and control into a real-time system that safely moves through dynamic environments. ROS 2 Navigation (Nav2) provides a production-ready navigation stack that replaces ROS 1's navigation system with significant architectural improvements: lifecycle node management, behavior trees for flexible decision-making, and improved plugin interfaces for algorithm customization.

**Nav2 component architecture** decomposes navigation into modular servers that communicate via ROS 2 actions and services. The **BT Navigator** serves as the orchestrator, executing behavior trees that define navigation logic—when to plan, when to replan, when to recover from failures. The **Planner Server** computes global paths from start to goal, typically using graph-search algorithms on occupancy grid maps. The **Controller Server** executes local trajectory following, continuously adjusting velocity commands to track the global path while avoiding dynamic obstacles. The **Recoveries Server** implements fallback behaviors when navigation gets stuck—backing up, spinning in place, clearing sensor data. The **Waypoint Follower** handles multi-point navigation missions, sequencing through goal poses. Each server runs as a lifecycle node, allowing coordinated startup, shutdown, and reconfiguration—a major reliability improvement over Nav1's unstructured node management.

**Costmap configuration** provides the spatial representation Nav2 uses for planning and control. Each navigation server maintains costmaps—2D grid maps where each cell encodes traversability cost (0 = free space, 255 = lethal obstacle). The **global costmap** covers a large area (tens of meters) for long-horizon planning, typically built from a pre-mapped environment. The **local costmap** covers a smaller region (few meters) centered on the robot, updated frequently from real-time sensor data to detect dynamic obstacles. Costmaps layer multiple data sources: the **static layer** from pre-built maps, the **obstacle layer** from depth cameras or lidar, the **inflation layer** that expands obstacles to account for robot footprint, and the **voxel layer** that uses 3D occupancy for multi-floor reasoning. Tuning costmap parameters—update frequency, size, resolution, inflation radius—directly impacts navigation performance and safety.

**Humanoid-specific navigation challenges** require careful configuration beyond differential-drive robots. Bipedal locomotion introduces instability: aggressive turns or sudden stops can cause the robot to fall, so velocity limits must be conservative (0.3-0.8 m/s typical walking speeds, limited angular velocities). The **footprint** parameter defines the robot's 2D shape for collision checking—humanoids have irregular footprints (shoulders wider than hips, arms extending laterally) requiring polygon definitions rather than simple circles. **Narrow corridors and doorways** challenge humanoids more than wheeled robots: a 0.9m wide doorway leaves minimal clearance, demanding precise localization and control. **Dynamic balance constraints** mean acceleration limits must prevent destabilizing inertial forces—Nav2's controller plugins need tuning to respect these physical limits, often requiring custom controllers that interface with the humanoid's balance controller (Chapter 11). Unlike wheeled robots that can stop instantly, humanoids need controlled deceleration to maintain stability, requiring lookahead planning and smooth velocity profiles.

## 8.2 SLAM and Localization

Autonomous navigation depends fundamentally on knowing where the robot is—both building spatial maps of the environment and localizing within those maps. SLAM (Simultaneous Localization and Mapping) solves the chicken-and-egg problem: you need a map to localize, but you need to know your position to build a map. Modern SLAM algorithms solve both simultaneously, enabling robots to navigate unknown environments without pre-existing maps.

**SLAM algorithms in ROS 2** come primarily in two production-ready implementations: **Google Cartographer** and **SLAM Toolbox**. Cartographer excels at handling loop closures and large-scale mapping through pose graph optimization—as the robot revisits previously mapped areas, Cartographer detects the loop closure and adjusts the entire map to minimize accumulated drift. This makes it ideal for large buildings or outdoor environments where drift accumulates over long traversals. Cartographer supports both 2D and 3D SLAM, using lidar or depth cameras as input. The algorithm maintains submap structures that get continually optimized as new sensor data arrives, producing globally consistent maps even after kilometers of travel. SLAM Toolbox, specifically designed for Nav2 integration, provides similar capabilities with an emphasis on usability and ROS 2 native design. It offers asynchronous (online) and synchronous mapping modes, serialization for saving/loading maps mid-session, and localization mode that lets you switch from mapping to localization once a map is complete. For humanoid robots navigating homes or offices, SLAM Toolbox's tight Nav2 integration and user-friendly tools make it the practical choice.

**Map representations** determine how spatial information gets encoded for navigation. **Occupancy grid maps** represent the environment as a 2D grid where each cell holds a probability: 0 = definitely free, 100 = definitely occupied, -1 = unknown. These grids get generated from range sensor data (lidar, depth cameras) by projecting measurements into the map frame and updating cell probabilities using inverse sensor models. Occupancy grids work well for static structured environments—walls, furniture, corridors—and integrate naturally with Nav2's costmap system. Resolution matters: 5cm grids capture fine detail but consume memory and computation; 10-20cm grids balance detail with efficiency for typical indoor navigation. **Semantic maps** extend occupancy grids with semantic labels: this region is "kitchen," that obstacle is "chair," this area is "hallway." Semantic information enables higher-level reasoning—"navigate to the kitchen" rather than "navigate to coordinates (5.3, -2.1)"—and supports task planning. Semantic SLAM combines traditional SLAM with object detection and scene segmentation (Chapter 7), associating detected objects and regions with map locations. For humanoids performing tasks like "bring me a cup from the kitchen," semantic maps bridge navigation and manipulation planning.

**AMCL (Adaptive Monte Carlo Localization)** handles localization once a map exists—determining the robot's pose within a known map using real-time sensor data. AMCL represents the robot's belief about its position as a particle cloud: each particle is a hypothesis (x, y, θ), and particle weights reflect how well sensor observations match the map at that pose. As the robot moves, particles get resampled—likely poses receive more particles, unlikely ones get pruned—converging toward the true position. AMCL requires initial pose estimates (typically provided via RViz "2D Pose Estimate" tool or programmatically) and performs best with distinctive map features. In feature-poor environments (long corridors with uniform walls), AMCL may struggle with ambiguity—multiple poses fit the observations equally well. For humanoids, AMCL's main challenge is handling sensor height: most SLAM/localization assumes sensors near ground level, but humanoid head-mounted cameras sit 1.5-1.8m high, changing what they observe. Configuring AMCL with appropriate sensor models (beam vs. likelihood field) and tuning particle count (more particles = better accuracy but higher computation) ensures reliable localization.

**Map saving and loading with map_server** enables persistent maps that robots can reuse across sessions. After creating a map via SLAM, the `map_saver` node serializes the occupancy grid to a YAML metadata file (resolution, origin, thresholds) and a PGM image file (grayscale pixels encoding occupancy). Launch files for Nav2 specify these map files, and `map_server` loads them at startup, publishing the static map for AMCL and the global costmap. This workflow—map once, localize many times—suits deployed robots operating in fixed environments. For environments that change (furniture rearranged, doors opened/closed), Nav2 supports map updates: the local costmap's obstacle layer detects discrepancies between the static map and current sensor data, adding temporary obstacles to avoid collisions while the global map remains unchanged.

## 8.3 Path Planning and Control

Path planning transforms the high-level goal ("navigate to the kitchen") into executable motion—computing collision-free paths through the environment and generating velocity commands that track those paths while respecting robot dynamics. Nav2 separates this into global planning (long-horizon paths) and local control (short-horizon reactive execution), each using pluggable algorithms optimized for different aspects of the navigation problem.

**Global planners** compute paths from the robot's current position to the goal across the entire map, treating navigation as a graph search problem on the costmap grid. **NavFn** implements Dijkstra's algorithm with cost propagation—starting from the goal, it expands outward computing the minimum cost to reach each cell, then traces the gradient from start to goal to extract the path. NavFn guarantees finding the shortest path if one exists and handles arbitrary costmap configurations, but produces geometric paths without considering robot dynamics (sharp corners, unrealistic turns). **Smac Planner** (State Lattice with Analytic Expansions) improves on this by searching over feasible robot states—(x, y, θ) poses—rather than just positions, producing kinematically feasible paths that respect turning radius constraints. Smac Planner supports multiple motion models: Ackermann (car-like steering), differential drive, and omnidirectional. For humanoids, the differential drive model approximates bipedal locomotion—the robot can turn in place and move forward/backward—though custom motion primitives could enforce walking-specific constraints. Smac Planner uses hybrid A* search with analytic expansion for efficiency, computing paths in tens of milliseconds even in large maps.

**Local controllers** execute the global plan while handling dynamic obstacles and tracking errors. Unlike global planners that assume a static costmap, controllers run at high frequency (10-30 Hz) and react to real-time sensor data. **DWB (Dynamic Window Approach)** generates candidate velocity trajectories by sampling (v_x, v_y, ω) tuples within dynamic constraints—the "dynamic window" of achievable velocities given current velocity and acceleration limits. Each candidate trajectory gets forward-simulated over 1-3 seconds, scored based on multiple criteria (goal alignment, path following, obstacle clearance, smoothness), and the highest-scoring trajectory's initial velocity gets commanded to the robot. DWB's sampling-based approach makes it flexible and easy to tune, but it can struggle in tight spaces where few samples are collision-free. **TEB (Timed Elastic Band)** formulates control as an optimization problem: it represents the trajectory as a sequence of timed poses connected by "elastic bands" and optimizes this trajectory to minimize travel time, deviation from the global plan, and proximity to obstacles, while satisfying velocity and acceleration constraints. TEB produces smoother, more efficient paths than DWB and handles narrow passages better, but requires more computation and careful parameter tuning. **MPPI (Model Predictive Path Integral)** applies model-predictive control with sampling—it forward-simulates thousands of noisy trajectories using a dynamics model, evaluates their cost, and computes the optimal control as a probability-weighted average. MPPI excels at aggressive dynamic maneuvers and can incorporate complex cost functions, making it attractive for high-performance navigation.

**Footprint configuration** defines the robot's 2D shape for collision checking, critical for humanoids with non-circular profiles. Nav2 supports multiple footprint specifications: circular (single radius parameter), square/rectangular (width and height), or polygon (arbitrary vertex list). Humanoids require polygon footprints capturing body shape—shoulders, hips, and extended arms if relevant to the task. The footprint gets projected along planned trajectories to verify collision-free motion. Conservative footprints improve safety but restrict navigation—a footprint including fully extended arms prevents passing through doorways even though arms can be tucked. Some implementations use task-dependent footprints: compact for navigation through tight spaces, extended when carrying objects. The footprint parameter appears in both global planner (for path computation) and local controller (for trajectory evaluation) configurations, and must match the robot's true dimensions plus safety margins.

**Velocity and acceleration limits** for bipedal stability prevent the navigation system from commanding motions that destabilize the robot. Maximum velocities (v_x, v_y, ω) must stay well below the robot's dynamic limits—typically 0.3-0.8 m/s linear, 0.5-1.0 rad/s angular for walking humanoids. Acceleration limits prevent abrupt changes: humanoid balance controllers need time to compensate for inertial forces, so commanded velocity changes should ramp over 0.5-1.0 seconds. Nav2 controllers accept these limits as parameters: `max_vel_x`, `max_vel_theta`, `acc_lim_x`, `acc_lim_theta`. Tuning involves testing: command progressively higher velocities and accelerations until instability appears, then back off to safe values. For advanced integration, the controller can query the humanoid's balance state via topics or services—if the robot detects instability, it requests the controller to reduce speed or pause navigation until balance is restored.

## 8.4 Behavior Trees and Recovery

Navigation failures are inevitable—sensors get occluded, dynamic obstacles block paths, localization drifts, or the robot gets physically stuck. Robust navigation systems must detect failures and attempt recovery rather than freezing or requiring human intervention. Nav2 uses behavior trees to implement flexible, hierarchical navigation logic that handles these scenarios gracefully.

**Behavior tree fundamentals** structure decision logic as a tree of nodes evaluated each control cycle. Internal nodes control execution flow: **Sequence** nodes execute children left-to-right until one fails (logical AND), **Fallback** nodes execute children until one succeeds (logical OR), **Parallel** nodes execute multiple children simultaneously. Leaf nodes are **Action** nodes (execute tasks like "compute plan" or "follow path") or **Condition** nodes (check predicates like "is path valid?"). Each node returns SUCCESS, FAILURE, or RUNNING (still executing). This structure enables readable, modular navigation logic: "Try to follow the path; if that fails, try recovery behavior A; if that fails, try recovery behavior B; if all fail, abort." Behavior trees offer key advantages over state machines: they compose hierarchically (subtrees can be reused), add new behaviors without modifying existing logic, and explicitly represent concurrent tasks (e.g., path following while monitoring battery).

**Nav2's default behavior tree** implements a standard navigate-to-goal workflow. The root Fallback node attempts the primary navigation sequence: compute initial plan, enter control loop (follow path while replanning periodically), succeed when goal reached. If the primary sequence fails—planning fails, path following stalls, timeout exceeded—the Fallback node executes recovery behaviors in sequence. The default recoveries: **clear costmap** (remove spurious obstacles from sensor noise), **spin** (rotate 360° to relocalize and detect previously unseen obstacles), **backup** (reverse away from close obstacles), **wait** (pause briefly in case a dynamic obstacle clears). If all recoveries fail, the behavior tree returns FAILURE, triggering higher-level task logic to handle the navigation failure (request human help, try alternate goal, abort task). This structure makes navigation robust to common failures without requiring manual failure handling in application code.

**Custom behaviors for humanoid-specific actions** extend Nav2's capabilities beyond generic mobile base navigation. Humanoids might need behaviors like **approach human** (navigate close to a person while maintaining social distance and orienting to face them), **traverse doorway** (precisely navigate through narrow doors, possibly with arm tucking or sideways turning), **sit/stand** (transition between mobility and seated postures), or **check balance** (pause navigation if bipedal instability detected, resume when stable). Implementing custom behaviors involves creating behavior tree action plugins: C++ classes inheriting from `nav2_behavior_tree::BtActionNode`, implementing `on_tick()` (called each behavior tree cycle), `on_success()/on_failure()` (called when action completes), and registering the plugin with Nav2. The custom behaviors can access Nav2 APIs (costmaps, TF, planners) and robot-specific interfaces (balance controller, manipulation state), enabling tight integration between navigation and other robot systems.

**Recovery behaviors** serve as fallback strategies when primary navigation fails, attempting to resolve common failure modes before giving up. **Clear costmap recovery** resets transient obstacles that might be sensor noise or stale data—useful when the robot perceives phantom obstacles blocking its path. **Spin recovery** rotates in place, helping relocalization recover from position uncertainty and revealing obstacles behind the robot. **Backup recovery** moves backward a short distance, useful when the robot gets too close to obstacles for the controller to maneuver. **Wait recovery** pauses briefly, effective for temporary dynamic obstacles (people walking past, doors opening). Recovery behaviors have limited scope—they handle transient issues but can't resolve fundamental problems like blocked goals or broken sensors. Nav2 limits recovery attempts (maximum count, timeout) to prevent infinite recovery loops when a situation truly is unrecoverable. For humanoids, additional recoveries might include **rebalance** (explicitly stabilize bipedal stance), **narrow mode** (reduce footprint and enable cautious maneuvering), or **request human assistance** (vocalize need for help and wait for intervention).

## Exercises

1. **SLAM Mapping**: Create a map of a simulated indoor environment using SLAM Toolbox
2. **Localization**: Implement AMCL on a pre-built map and verify pose accuracy
3. **Waypoint Navigation**: Navigate between multiple waypoints autonomously
4. **Obstacle Avoidance**: Test dynamic obstacle avoidance with moving objects
5. **Custom Behavior**: Design a behavior tree that approaches a person when called

## Key Takeaways

- Nav2 provides production-ready autonomous navigation for ROS 2 robots
- SLAM enables robots to build maps and localize simultaneously
- Behavior trees offer flexible, modular navigation logic
- Humanoid navigation requires careful tuning for bipedal stability

## Further Reading

- Nav2 documentation and tutorials
- Behavior tree fundamentals (BehaviorTree.CPP)
- SLAM algorithms comparison (Cartographer vs. SLAM Toolbox)
- Motion planning for bipedal robots

---

**Status**: Draft complete (1,910 words)
