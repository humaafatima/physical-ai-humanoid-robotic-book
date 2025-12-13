---
id: 12-sim-to-real
title: Chapter 12 - Sim-to-Real Transfer
sidebar_label: 12. Sim-to-Real
word_count_target: 1900
word_count_actual: 0
status: outlined
learning_objectives:
  - Understand sim-to-real gap challenges
  - Apply domain randomization techniques
  - Calibrate simulation parameters
  - Deploy policies from simulation to hardware
---

# Chapter 12: Sim-to-Real Transfer

:::info Chapter Overview
Bridging the simulation-to-reality gap for successful deployment of simulated policies on physical humanoid robots.

**Word Target**: 1,800-2,000 words
**Code Examples**: 4 (domain randomization, system identification, deployment pipeline, validation)
:::

## Learning Objectives

By the end of this chapter, you will be able to:

- Identify sources of the sim-to-real gap
- Apply domain randomization to improve transfer
- Calibrate simulation parameters from real-world data
- Deploy and validate policies on physical hardware
- Implement safety monitoring for real-world deployment

## 12.1 Understanding the Sim-to-Real Gap

:::note Section Target
~500 words | Key concepts:
- Reality gap sources (physics, sensors, actuators, environment)
- Systematic analysis of failure modes
- When simulation is sufficient vs. hardware needed
- Case studies of successful and failed transfers
:::

*Content to be developed in Phase 12 (Week 9-10)*

**Citations needed**: ≥3 papers on sim-to-real transfer
**Diagram needed**: `book/static/diagrams/sim-to-real-gap.svg`

## 12.2 Domain Randomization and Robust Policies

:::note Section Target
~500 words | Key concepts:
- Visual domain randomization (textures, lighting, camera)
- Dynamics randomization (mass, friction, damping)
- Sensor noise injection
- Automatic domain randomization (ADR)
- Training robust policies for transfer
:::

*Content to be developed in Phase 12 (Week 9-10)*

**Code Example**: `code-examples/chapter-12-sim-to-real/domain-randomization/`

## 12.3 System Identification and Calibration

:::note Section Target
~500 words | Key concepts:
- Identifying physical parameters from data
- Sensor calibration (cameras, IMU, encoders)
- Actuator characterization (delays, limits, backlash)
- Iterative refinement of simulation
- Ground truth validation methods
:::

*Content to be developed in Phase 12 (Week 9-10)*

**Code Example**: `code-examples/chapter-12-sim-to-real/calibration/`

## 12.4 Deployment Pipeline and Safety

:::note Section Target
~400 words | Key concepts:
- Deployment checklist and staged rollout
- Safety monitoring and kill switches
- Teleoperation fallback modes
- Logging and debugging real-world failures
- Continuous improvement loop (sim ↔ real)
:::

*Content to be developed in Phase 12 (Week 9-10)*

**Code Example**: `code-examples/chapter-12-sim-to-real/deployment/`
**Diagram needed**: `book/static/diagrams/deployment-pipeline.svg`

## Exercises

1. **Gap Analysis**: Document 5 differences between your simulation and a target hardware platform
2. **Domain Randomization**: Implement visual and dynamics randomization in Isaac Sim
3. **Calibration**: Calibrate camera intrinsics and IMU biases from hardware data
4. **Staged Deployment**: Plan a 3-stage deployment (table test, controlled space, open environment)
5. **Failure Analysis**: Analyze a simulated policy failure on hardware and propose fixes

## Key Takeaways

- The sim-to-real gap is inevitable but can be systematically addressed
- Domain randomization improves policy robustness at training time
- Accurate system identification improves simulation fidelity
- Safe deployment requires monitoring, fallbacks, and iterative refinement

## Further Reading

- Sim-to-real transfer survey papers
- Domain randomization techniques (visual, dynamics, ADR)
- System identification for robotics
- Safe reinforcement learning and deployment

---

**Status**: Outline complete, content authoring pending Phase 12
