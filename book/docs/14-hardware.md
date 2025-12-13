---
id: 14-hardware
title: Chapter 14 - Hardware Guide – Building Your Physical Humanoid
sidebar_label: 14. Hardware
word_count_target: 2000
word_count_actual: 0
status: outlined
learning_objectives:
  - Select appropriate hardware for humanoid robotics projects
  - Assemble budget-friendly robotic platforms
  - Integrate embedded computing (Jetson)
  - Deploy learned policies on physical robots
---

# Chapter 14: Hardware Guide – Building Your Physical Humanoid

:::info Chapter Overview
Practical guide to selecting, assembling, and deploying physical humanoid robot hardware.

**Word Target**: 1,900-2,100 words
**Code Examples**: 3 (Jetson setup, hardware drivers, deployment scripts)
:::

## Learning Objectives

By the end of this chapter, you will be able to:

- Select hardware components based on budget and requirements
- Assemble a basic humanoid or mobile manipulator platform
- Configure NVIDIA Jetson for edge robotics
- Deploy ROS 2 stacks to physical hardware
- Troubleshoot common hardware integration issues

## 14.1 Hardware Platform Options

:::note Section Target
~600 words | Key concepts:
- Research platforms (PR2, Fetch, TIAGo, Atlas, Digit)
- Commercial humanoids (Unitree H1/G1, Agility Digit, Tesla Optimus)
- Budget options (Unitree Go2 + arm, custom builds)
- Economy kit (~$700): Jetson Orin Nano + RealSense + mobile base
- Simulation-only path vs. hardware investment
:::

*Content to be developed in Phase 14 (Week 10)*

**Comparison table**: Platform, DOF, Cost, Availability, Use Case
**Citations needed**: ≥2 sources on humanoid hardware

## 14.2 Economy Kit Assembly Guide

:::note Section Target
~600 words | Key concepts:
- Bill of materials (Jetson Orin Nano, Intel RealSense D435, TurtleBot/mobile base)
- Assembly instructions with diagrams
- Wiring and power management
- Mechanical integration tips
- Total cost breakdown (~$700-$1000)
:::

*Content to be developed in Phase 14 (Week 10)*

**Diagram needed**: `book/static/diagrams/economy-kit-assembly.svg`

## 14.3 Jetson Orin Configuration for Robotics

:::note Section Target
~500 words | Key concepts:
- Jetpack installation and initial setup
- ROS 2 installation on Jetson (ARM64)
- Isaac ROS package compilation
- Docker for reproducible deployments
- Power modes and thermal management
:::

*Content to be developed in Phase 14 (Week 10)*

**Code Example**: `code-examples/chapter-14-hardware/jetson-setup/`

## 14.4 Hardware Integration and Troubleshooting

:::note Section Target
~300 words | Key concepts:
- Camera and sensor driver configuration
- Motor controller interfacing (CAN, UART, Ethernet)
- Common hardware issues (power, USB bandwidth, latency)
- Debugging tools (rviz, rqt, plotjuggler)
- When to contact vendor support
:::

*Content to be developed in Phase 14 (Week 10)*

**Code Example**: `code-examples/chapter-14-hardware/hardware-drivers/`

## Exercises

1. **Hardware Research**: Research 3 hardware platforms and compare cost, capabilities, and availability
2. **Budget Planning**: Design a complete hardware setup within a $1500 budget
3. **Jetson Setup**: Install ROS 2 and Isaac ROS on Jetson Orin (if available)
4. **Driver Test**: Connect RealSense camera to Jetson and stream RGB-D data to ROS 2
5. **Full Integration**: Deploy your capstone simulation stack to hardware (if available)

## Vendor Resources

- **NVIDIA**: Jetson platforms, Isaac ROS, Isaac Sim
- **Intel**: RealSense depth cameras, librealsense drivers
- **Unitree Robotics**: Go2, H1, G1 humanoid platforms
- **Robotis**: Dynamixel servos for custom builds
- **Open Source**: TurtleBot 4, ROSbot 2.0, Clearpath platforms

## Key Takeaways

- Hardware investment is optional; simulation provides most learning value
- Budget platforms (~$700-$1000) enable real-world validation
- Jetson Orin provides edge computing for GPU-accelerated perception
- Hardware integration requires patience and systematic debugging

## Further Reading

- NVIDIA Jetson documentation and community forums
- ROS 2 on embedded systems best practices
- Humanoid hardware design principles
- Open-source robotics platforms and communities

---

**Status**: Outline complete, content authoring pending Phase 14
