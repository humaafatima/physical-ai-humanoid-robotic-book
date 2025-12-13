---
id: 11-manipulation
title: Chapter 11 - Object Manipulation with MoveIt 2
sidebar_label: 11. Manipulation
word_count_target: 1800
word_count_actual: 0
status: outlined
learning_objectives:
  - Configure MoveIt 2 for humanoid manipulators
  - Implement motion planning and collision avoidance
  - Design grasp planning pipelines
  - Execute pick-and-place tasks
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

:::note Section Target
~400 words | Key concepts:
- MoveIt 2 components (planning, execution, perception)
- OMPL motion planning library
- Collision checking with geometric and depth-based methods
- Integration with controllers (JointTrajectoryController)
:::

*Content to be developed in Phase 11 (Week 9)*

**Citations needed**: ≥1 MoveIt paper or documentation
**Diagram needed**: `book/static/diagrams/moveit2-architecture.svg`

## 11.2 Motion Planning for Humanoid Arms

:::note Section Target
~500 words | Key concepts:
- Kinematic chain configuration
- Planning groups and end-effector links
- Motion planning algorithms (RRT, RRT*, STOMP)
- Cartesian path planning vs. joint-space planning
- Planning time and quality trade-offs
:::

*Content to be developed in Phase 11 (Week 9)*

**Code Example**: `code-examples/chapter-11-manipulation/motion-planning/`

## 11.3 Grasp Planning and Execution

:::note Section Target
~500 words | Key concepts:
- Grasp pose generation and scoring
- Approach and retreat trajectories
- Gripper control (parallel jaw, multi-finger)
- Grasp stability metrics
- Integration with perception (GQCNN, GraspNet)
:::

*Content to be developed in Phase 11 (Week 9)*

**Code Example**: `code-examples/chapter-11-manipulation/grasp-planning/`

## 11.4 Pick-and-Place and Dual-Arm Coordination

:::note Section Target
~400 words | Key concepts:
- Pick-and-place pipeline (detect, plan, grasp, move, release)
- Dual-arm planning (independent vs. coordinated)
- Object handoffs between arms
- Collision avoidance between robot limbs
- Task sequencing and recovery
:::

*Content to be developed in Phase 11 (Week 9)*

**Code Example**: `code-examples/chapter-11-manipulation/pick-and-place/`
**Diagram needed**: `book/static/diagrams/pick-and-place-pipeline.svg`

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

- MoveIt 2 documentation and tutorials
- Grasp planning algorithms (GraspIt!, GQCNN, DexNet)
- Motion planning algorithms comparison
- Bimanual manipulation research

---

**Status**: Outline complete, content authoring pending Phase 11
