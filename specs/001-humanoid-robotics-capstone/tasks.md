# Tasks: Physical AI & Humanoid Robotics Capstone Course and Book

**Input**: Design documents from `/specs/001-humanoid-robotics-capstone/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Project Type**: Educational content creation (book + course + code examples)
**Timeline**: 12 weeks (10 weeks authoring + 2 weeks quality gates)
**Target**: 18,000-25,000 words across 14 chapters with executable ROS 2 code examples

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files/chapters, no dependencies)
- **[Story]**: Which user story this task serves (US1-US5)
- Include exact file paths in descriptions

## User Story Mapping

- **US1** (P1): Capstone student completes simulated humanoid → Needs all 14 chapters + code examples
- **US2** (P2): Hardware deployment → Needs Ch 1-13 + Ch 14 (hardware guide)
- **US3** (P1): Independent learner self-study → Needs all 14 chapters + clear docs
- **US4** (P2): Instructor adoption → Needs all 14 chapters + course materials
- **US5** (P3): Researcher reference → Needs technical chapters (3-12) + citations

**Note**: Most tasks serve multiple user stories simultaneously. Story labels indicate primary beneficiary.

---

## Phase 1: Setup (Week 1) - Infrastructure Foundation

**Purpose**: Establish repository, tools, and content framework before authoring
**Serves**: All user stories

- [ ] T001 Create GitHub repository: physical-ai-humanoid-robotics-book with README.md, LICENSE (MIT), .gitignore
- [ ] T002 Initialize Docusaurus project in book/ directory using `npx create-docusaurus@latest book classic`
- [ ] T003 [P] Configure docusaurus.config.js with site metadata, GitHub Pages URL, dark/light theme toggle
- [ ] T004 [P] Create repository structure: code-examples/, hardware/, course-materials/, references/, docker/, scripts/
- [ ] T005 [P] Install and configure Zotero 6.x with Better BibTeX plugin for APA 7th edition citations
- [ ] T006 [P] Set up Grammarly Premium and Copyleaks accounts for plagiarism detection
- [ ] T007 [P] Create Docker base image: docker/ros2-humble/Dockerfile with ROS 2 Humble + Python 3.10
- [ ] T008 [P] Create Docker image: docker/isaac-sim/Dockerfile with Isaac Sim 2024.1+ and ROS 2 bridge
- [ ] T009 [P] Push Docker base images to Docker Hub as public images
- [ ] T010 Configure GitHub Actions workflow: .github/workflows/deploy-book.yml for automated deployment
- [ ] T011 [P] Configure GitHub Actions workflow: .github/workflows/test-code.yml for code validation
- [ ] T012 [P] Configure GitHub Actions workflow: .github/workflows/check-links.yml for link validation
- [ ] T013 [P] Create utility scripts: scripts/check-wordcount.sh, scripts/validate-citations.py, scripts/plagiarism-check.sh
- [ ] T014 [US1,US3] Create 14 chapter outline files (book/docs/01-intro.md through 14-hardware.md) with YAML frontmatter and section structure
- [ ] T015 Configure Docusaurus sidebar navigation in book/sidebars.js with all 14 chapters
- [ ] T016 Test local Docusaurus build: `npm start` and verify all chapters render at localhost:3000

**Checkpoint**: Infrastructure ready - authoring can begin

---

## Phase 2: Foundational (Week 2) - Source Identification and Ch 1-2

**Purpose**: Gather all academic sources and draft conceptual foundation chapters
**Serves**: All user stories (citations and foundational understanding)

### Source Identification (Required for all chapters)

- [ ] T017 [P] Search IEEE Xplore for "ROS 2 robotics" (2020-2025) → identify 3-5 papers for references/bibliography.bib
- [ ] T018 [P] Search ACM Digital Library for "embodied AI" and "vision-language-action" (2020-2025) → identify 3-5 papers
- [ ] T019 [P] Search arXiv for "sim-to-real transfer" and "humanoid robotics" (2022-2025) → identify 2-3 preprints
- [ ] T020 [P] Search Google Scholar for "NVIDIA Isaac Sim", "Nav2 ROS 2", "MoveIt 2" → identify 3-5 sources
- [ ] T021 [P] Identify official documentation sources: ROS 2, Isaac Sim, Nav2, MoveIt 2, Whisper → add to references/
- [ ] T022 Verify all sources accessible, import to Zotero with chapter tags, export to references/bibliography.bib
- [ ] T023 Create references/citation-log.md tracking: source → chapters → specific claims
- [ ] T024 Validate source quality: ≥20 total sources, ≥60% peer-reviewed (12+), ≥3 from 2023-2025

**Checkpoint**: ≥20 sources identified and catalogued in Zotero

### Chapter 1: Introduction to Physical AI and Embodied Intelligence

- [ ] T025 [P] [US1,US3,US5] Draft Ch 1, Section 1: "What is Physical AI?" (300 words) in book/docs/01-intro.md
- [ ] T026 [P] [US1,US3,US5] Draft Ch 1, Section 2: "The Embodiment Hypothesis" (300 words) with ≥1 citation
- [ ] T027 [P] [US1,US3,US5] Draft Ch 1, Section 3: "From Simulation to Reality" (300 words) with ≥1 citation
- [ ] T028 [P] [US1,US3,US5] Draft Ch 1, Section 4: "Course Overview and Learning Path" (300 words)
- [ ] T029 [US1,US3] Add reflection exercises to Ch 1 (5 questions on embodied vs. disembodied intelligence)
- [ ] T030 Run plagiarism check on Ch 1 using Grammarly Premium (target: <5% at draft stage)
- [ ] T031 Run readability check on Ch 1 using Hemingway Editor (target: FK Grade 10-12)
- [ ] T032 Validate Ch 1 citations: all [@keys] have entries in references/bibliography.bib
- [ ] T033 Commit Ch 1 draft: `git commit -m "Draft: Chapter 1 complete (1,200-1,500 words)"`

**Checkpoint**: Chapter 1 complete and validated

### Chapter 2: The Humanoid Robotics Landscape (2025)

- [ ] T034 [P] [US1,US3,US5] Draft Ch 2, Section 1: "Why Humanoid Form Factor?" (400 words) in book/docs/02-landscape.md
- [ ] T035 [P] [US1,US3,US5] Draft Ch 2, Section 2: "State of the Art: Research Platforms" (400 words) with ≥3 citations
- [ ] T036 [P] [US1,US3,US5] Draft Ch 2, Section 3: "Key Technical Challenges" (400 words) with ≥2 citations
- [ ] T037 [P] [US1,US3,US5] Draft Ch 2, Section 4: "This Course's Approach" (200 words)
- [ ] T038 [US1,US3] Create comparison exercise: Compare 3 humanoid platforms on key dimensions (table format)
- [ ] T039 Run plagiarism check on Ch 2 (target: <5%)
- [ ] T040 Run readability check on Ch 2 (target: FK Grade 10-12)
- [ ] T041 Validate Ch 2 citations and commit: `git commit -m "Draft: Chapter 2 complete (1,400-1,600 words)"`

**Checkpoint**: Chapters 1-2 complete, ≥20 sources identified

---

## Phase 3: Chapter 3 - ROS 2 (Week 3-4)

**Purpose**: Introduce ROS 2 fundamentals with executable examples
**Serves**: US1 (students), US3 (learners), US5 (researchers)

### Chapter 3 Content

- [ ] T042 [P] [US1,US3] Draft Ch 3, Section 1: "ROS 2 Architecture and DDS" (400 words) in book/docs/03-ros2.md with ≥1 citation
- [ ] T043 [P] [US1,US3] Draft Ch 3, Section 2: "Topics and Messages" (400 words) with diagram
- [ ] T044 [P] [US1,US3] Draft Ch 3, Section 3: "Services and Actions" (400 words)
- [ ] T045 [P] [US1,US3] Draft Ch 3, Section 4: "Parameters and Launch Files" (400 words)
- [ ] T046 [P] [US1,US3] Create diagram: book/static/diagrams/ros2-topic-architecture.svg
- [ ] T047 [US1,US3] Add 10 exercises to Ch 3 (5 coding, 5 conceptual)

### Chapter 3 Code Examples

- [ ] T048 [P] [US1] Create code-examples/chapter-03-ros2/hello_ros2/ with Dockerfile, docker-compose.yml, README.md
- [ ] T049 [P] [US1] Implement hello_ros2/src/hello_node.py (basic ROS 2 node with rclpy)
- [ ] T050 [P] [US1] Create code-examples/chapter-03-ros2/pub_sub/ with publisher and subscriber example
- [ ] T051 [P] [US1] Implement pub_sub/src/publisher.py and pub_sub/src/subscriber.py (topic communication)
- [ ] T052 [P] [US1] Create code-examples/chapter-03-ros2/service_example/ with service client and server
- [ ] T053 [P] [US1] Create code-examples/chapter-03-ros2/action_example/ with action client and server
- [ ] T054 [P] [US1] Create code-examples/chapter-03-ros2/parameters/ with parameter usage example
- [ ] T055 Test all Ch 3 code examples: `docker-compose up` succeeds, outputs match README expectations
- [ ] T056 Run plagiarism and readability checks on Ch 3
- [ ] T057 Commit Ch 3: `git commit -m "Complete: Chapter 3 with 5 code examples (1,500-1,700 words)"`

**Checkpoint**: Students can set up ROS 2 environment and run basic examples

---

## Phase 4: Chapter 4 - URDF & Robot Modeling (Week 4-5)

**Purpose**: Teach robot description format for humanoids
**Serves**: US1, US3, US5

- [ ] T058 [P] [US1,US3] Draft Ch 4, Section 1: "URDF Basics" (400 words) in book/docs/04-urdf.md with ≥1 citation
- [ ] T059 [P] [US1,US3] Draft Ch 4, Section 2: "Links, Joints, and Coordinate Frames" (400 words)
- [ ] T060 [P] [US1,US3] Draft Ch 4, Section 3: "Humanoid URDF Modeling" (400 words) with diagram
- [ ] T061 [P] [US1,US3] Draft Ch 4, Section 4: "URDF Visualization in RViz" (300 words)
- [ ] T062 [P] [US1] Create code-examples/chapter-04-urdf/simple_robot/ with basic URDF example
- [ ] T063 [P] [US1] Create code-examples/chapter-04-urdf/humanoid_urdf/ with humanoid URDF model
- [ ] T064 [P] [US1] Create code-examples/chapter-04-urdf/rviz_visualization/ with RViz launch configuration
- [ ] T065 [US1,US3] Add 8 exercises to Ch 4 (URDF modification, joint configuration)
- [ ] T066 Test all Ch 4 code examples in RViz
- [ ] T067 Run quality checks and commit Ch 4: `git commit -m "Complete: Chapter 4 (1,400-1,600 words)"`

**Checkpoint**: Students can create and visualize humanoid URDF models

---

## Phase 5: Chapter 5 - Digital Twins (Week 5)

**Purpose**: Compare simulation platforms and introduce Isaac Sim
**Serves**: US1, US3, US5

- [ ] T068 [P] [US1,US3,US5] Draft Ch 5, Section 1: "Physics Simulation Fundamentals" (400 words) in book/docs/05-digital-twins.md
- [ ] T069 [P] [US1,US3,US5] Draft Ch 5, Section 2: "Gazebo Classic vs. Gazebo Harmonic" (400 words) with comparison table
- [ ] T070 [P] [US1,US3,US5] Draft Ch 5, Section 3: "Unity for Robotics" (300 words)
- [ ] T071 [P] [US1,US3,US5] Draft Ch 5, Section 4: "NVIDIA Isaac Sim" (500 words) with ≥2 citations
- [ ] T072 [P] [US1] Create code-examples/chapter-05-digital-twins/gazebo_spawn/ with Gazebo example
- [ ] T073 [P] [US1] Create code-examples/chapter-05-digital-twins/isaac_sim_spawn/ with Isaac Sim example
- [ ] T074 [P] [US1] Create code-examples/chapter-05-digital-twins/comparison/ with side-by-side comparison
- [ ] T075 [P] Create comparison table diagram: book/static/diagrams/simulation-platform-comparison.svg
- [ ] T076 [US1,US3] Add 7 exercises to Ch 5 (platform selection, simulation configuration)
- [ ] T077 Test all Ch 5 code examples (Gazebo and Isaac Sim)
- [ ] T078 Run quality checks and commit Ch 5: `git commit -m "Complete: Chapter 5 (1,600-1,800 words)"`

**Checkpoint**: Students can spawn robots in multiple simulation platforms

---

## Phase 6: Chapter 6 - Sensors (Week 5-6)

**Purpose**: Sensor simulation and real-world integration
**Serves**: US1, US2, US3

- [ ] T079 [P] [US1,US3] Draft Ch 6, Section 1: "Sensor Models and Noise" (400 words) in book/docs/06-sensors.md with ≥1 citation
- [ ] T080 [P] [US1,US3] Draft Ch 6, Section 2: "LiDAR Simulation" (300 words)
- [ ] T081 [P] [US1,US3] Draft Ch 6, Section 3: "Depth Cameras and IMU" (400 words)
- [ ] T082 [P] [US1,US2,US3] Draft Ch 6, Section 4: "RealSense Integration" (300 words) with hardware specs
- [ ] T083 [P] [US1] Create code-examples/chapter-06-sensors/lidar_sim/ with simulated LiDAR
- [ ] T084 [P] [US1] Create code-examples/chapter-06-sensors/depth_camera_sim/ with simulated depth camera
- [ ] T085 [P] [US1] Create code-examples/chapter-06-sensors/imu_sim/ with simulated IMU
- [ ] T086 [P] [US2] Create code-examples/chapter-06-sensors/realsense_integration/ with RealSense D435 code
- [ ] T087 [US1,US3] Add 8 exercises to Ch 6 (sensor calibration, noise modeling)
- [ ] T088 Test all Ch 6 code examples
- [ ] T089 Run quality checks and commit Ch 6: `git commit -m "Complete: Chapter 6 (1,400-1,600 words)"`

**Checkpoint**: Students can simulate sensors and integrate RealSense camera

---

## Phase 7: Chapter 7 - NVIDIA Isaac ROS (Week 6)

**Purpose**: GPU-accelerated perception and VSLAM
**Serves**: US1, US3, US5

- [ ] T090 [P] [US1,US3,US5] Draft Ch 7, Section 1: "GPU Acceleration for Robotics" (400 words) in book/docs/07-isaac-ros.md with ≥1 citation
- [ ] T091 [P] [US1,US3,US5] Draft Ch 7, Section 2: "Object Detection with Isaac ROS" (400 words) with ≥1 citation
- [ ] T092 [P] [US1,US3,US5] Draft Ch 7, Section 3: "Image Segmentation" (300 words)
- [ ] T093 [P] [US1,US3,US5] Draft Ch 7, Section 4: "Visual SLAM" (400 words) with ≥1 citation
- [ ] T094 [P] [US1] Create code-examples/chapter-07-isaac-ros/object_detection/ with CUDA Docker setup
- [ ] T095 [P] [US1] Create code-examples/chapter-07-isaac-ros/segmentation/ with segmentation example
- [ ] T096 [P] [US1] Create code-examples/chapter-07-isaac-ros/visual_odometry/ with VO example
- [ ] T097 [P] [US1] Create code-examples/chapter-07-isaac-ros/vslam/ with full VSLAM pipeline
- [ ] T098 [US1,US3] Add 10 exercises to Ch 7 (perception tuning, VSLAM configuration)
- [ ] T099 Test all Ch 7 code examples with NVIDIA GPU
- [ ] T100 Run quality checks and commit Ch 7: `git commit -m "Complete: Chapter 7 (1,500-1,700 words)"`

**Checkpoint**: Students can run GPU-accelerated perception pipelines

---

## Phase 8: Chapter 8 - Navigation (Week 7)

**Purpose**: Nav2 for autonomous navigation and bipedal locomotion
**Serves**: US1, US3, US5

- [ ] T101 [P] [US1,US3,US5] Draft Ch 8, Section 1: "Nav2 Architecture" (400 words) in book/docs/08-navigation.md with ≥2 citations
- [ ] T102 [P] [US1,US3,US5] Draft Ch 8, Section 2: "Costmaps and Path Planning" (400 words) with ≥1 citation
- [ ] T103 [P] [US1,US3,US5] Draft Ch 8, Section 3: "Behavior Trees" (400 words)
- [ ] T104 [P] [US1,US3,US5] Draft Ch 8, Section 4: "Bipedal Locomotion Considerations" (300 words) with ≥1 citation
- [ ] T105 [P] Create diagram: book/static/diagrams/nav2-architecture.svg
- [ ] T106 [P] [US1] Create code-examples/chapter-08-navigation/nav2_setup/ with Nav2 configuration
- [ ] T107 [P] [US1] Create code-examples/chapter-08-navigation/costmap_config/ with costmap parameters
- [ ] T108 [P] [US1] Create code-examples/chapter-08-navigation/path_planning/ with A* and RRT examples
- [ ] T109 [P] [US1] Create code-examples/chapter-08-navigation/behavior_trees/ with custom behaviors
- [ ] T110 [US1,US3] Add 10 exercises to Ch 8 (navigation tuning, behavior tree design)
- [ ] T111 Test all Ch 8 code examples in Isaac Sim
- [ ] T112 Run quality checks and commit Ch 8: `git commit -m "Complete: Chapter 8 (1,500-1,700 words)"`

**Checkpoint**: Students can implement autonomous navigation for humanoid robots

---

## Phase 9: Chapter 9 - Vision-Language-Action Models (Week 7)

**Purpose**: Introduce VLA models for embodied AI
**Serves**: US1, US3, US5

- [ ] T113 [P] [US1,US3,US5] Draft Ch 9, Section 1: "Transformers for Robotics" (400 words) in book/docs/09-vla-models.md with ≥1 citation
- [ ] T114 [P] [US1,US3,US5] Draft Ch 9, Section 2: "Vision-Language Grounding" (400 words) with ≥2 citations
- [ ] T115 [P] [US1,US3,US5] Draft Ch 9, Section 3: "Action Prediction" (300 words) with ≥1 citation
- [ ] T116 [P] [US1,US3,US5] Draft Ch 9, Section 4: "State-of-the-Art VLA Models" (400 words) covering RT-1, RT-2, PaLM-E with ≥2 citations
- [ ] T117 [P] [US1] Create code-examples/chapter-09-vla/vla_overview/ with VLA architecture diagram
- [ ] T118 [P] [US1] Create code-examples/chapter-09-vla/pretrained_demo/ with pre-trained model inference
- [ ] T119 [US1,US3] Add 5 exercises to Ch 9 (VLA analysis, model comparison)
- [ ] T120 Run quality checks and commit Ch 9: `git commit -m "Complete: Chapter 9 (1,400-1,600 words)"`

**Checkpoint**: Students understand VLA models and their applications

---

## Phase 10: Chapter 10 - Voice to Action (Week 8)

**Purpose**: Integrate Whisper + LLM + ROS 2 for voice control
**Serves**: US1, US3, US5

- [ ] T121 [P] [US1,US3,US5] Draft Ch 10, Section 1: "Speech Recognition with Whisper" (400 words) in book/docs/10-voice-to-action.md with ≥1 citation
- [ ] T122 [P] [US1,US3,US5] Draft Ch 10, Section 2: "LLM for Task Planning" (400 words) with ≥1 citation
- [ ] T123 [P] [US1,US3,US5] Draft Ch 10, Section 3: "Prompt Engineering for Robotics" (400 words)
- [ ] T124 [P] [US1,US3,US5] Draft Ch 10, Section 4: "ROS 2 Action Integration" (400 words)
- [ ] T125 [P] Create diagram: book/static/diagrams/voice-to-action-pipeline.svg
- [ ] T126 [P] [US1] Create code-examples/chapter-10-voice/whisper_integration/ with Whisper STT setup
- [ ] T127 [P] [US1] Create code-examples/chapter-10-voice/llm_client/ with abstracted LLM interface (OpenAI, Anthropic, Llama3)
- [ ] T128 [P] [US1] Create code-examples/chapter-10-voice/prompt_engineering/ with prompt examples
- [ ] T129 [P] [US1] Create code-examples/chapter-10-voice/ros2_action_client/ with action client
- [ ] T130 [US1] Create code-examples/chapter-10-voice/full_pipeline/ with end-to-end voice → action pipeline
- [ ] T131 [US1,US3] Add 10 exercises to Ch 10 (prompt tuning, error handling)
- [ ] T132 Test all Ch 10 code examples with GPT-4 API
- [ ] T133 Run quality checks and commit Ch 10: `git commit -m "Complete: Chapter 10 (1,600-1,800 words)"`

**Checkpoint**: Students can control robots with natural language voice commands

---

## Phase 11: Chapter 11 - Manipulation (Week 8)

**Purpose**: Motion planning and grasping with MoveIt 2
**Serves**: US1, US3, US5

- [ ] T134 [P] [US1,US3,US5] Draft Ch 11, Section 1: "Inverse Kinematics" (400 words) in book/docs/11-manipulation.md with ≥1 citation
- [ ] T135 [P] [US1,US3,US5] Draft Ch 11, Section 2: "Motion Planning with MoveIt 2" (400 words) with ≥1 citation
- [ ] T136 [P] [US1,US3,US5] Draft Ch 11, Section 3: "Grasp Planning" (400 words) with ≥1 citation
- [ ] T137 [P] [US1,US3,US5] Draft Ch 11, Section 4: "Trajectory Execution" (300 words)
- [ ] T138 [P] [US1] Create code-examples/chapter-11-manipulation/moveit_setup/ with MoveIt 2 configuration
- [ ] T139 [P] [US1] Create code-examples/chapter-11-manipulation/motion_planning/ with planning example
- [ ] T140 [P] [US1] Create code-examples/chapter-11-manipulation/grasp_planning/ with grasp pose estimation
- [ ] T141 [P] [US1] Create code-examples/chapter-11-manipulation/trajectory_execution/ with execution example
- [ ] T142 [US1,US3] Add 8 exercises to Ch 11 (IK tuning, grasp optimization)
- [ ] T143 Test all Ch 11 code examples in Isaac Sim
- [ ] T144 Run quality checks and commit Ch 11: `git commit -m "Complete: Chapter 11 (1,400-1,600 words)"`

**Checkpoint**: Students can plan and execute manipulation tasks

---

## Phase 12: Chapter 12 - Sim-to-Real Transfer (Week 9)

**Purpose**: Bridge simulation and physical hardware
**Serves**: US1, US2, US3

- [ ] T145 [P] [US1,US2,US3] Draft Ch 12, Section 1: "The Reality Gap" (400 words) in book/docs/12-sim-to-real.md with ≥2 citations
- [ ] T146 [P] [US1,US2,US3] Draft Ch 12, Section 2: "Domain Randomization" (400 words) with ≥1 citation
- [ ] T147 [P] [US1,US2,US3] Draft Ch 12, Section 3: "System Identification and Calibration" (400 words) with ≥1 citation
- [ ] T148 [P] [US1,US2,US3] Draft Ch 12, Section 4: "Robust Control Strategies" (300 words)
- [ ] T149 [P] [US2] Create code-examples/chapter-12-sim-to-real/domain_randomization/ with randomization examples
- [ ] T150 [P] [US2] Create code-examples/chapter-12-sim-to-real/system_id/ with calibration procedures
- [ ] T151 [P] [US2] Create code-examples/chapter-12-sim-to-real/transfer_checklist/ with deployment checklist
- [ ] T152 [US1,US2,US3] Add 7 exercises to Ch 12 (calibration, transfer troubleshooting)
- [ ] T153 Run quality checks and commit Ch 12: `git commit -m "Complete: Chapter 12 (1,500-1,700 words)"`

**Checkpoint**: Students understand sim-to-real transfer techniques

---

## Phase 13: Chapter 13 - Capstone Project (Week 9)

**Purpose**: Integrate all concepts into autonomous conversational humanoid
**Serves**: US1, US3

- [ ] T154 [P] [US1,US3] Draft Ch 13, Section 1: "Project Overview" (300 words) in book/docs/13-capstone.md
- [ ] T155 [P] [US1,US3] Draft Ch 13, Section 2: "System Architecture" (400 words) with architecture diagram
- [ ] T156 [P] [US1,US3] Draft Ch 13, Section 3: "Integration Checklist" (300 words)
- [ ] T157 [P] [US1,US3] Draft Ch 13, Section 4: "Step-by-Step Implementation" (800 words)
- [ ] T158 [P] [US1,US3] Draft Ch 13, Section 5: "Testing and Debugging" (400 words)
- [ ] T159 [P] [US1,US3] Draft Ch 13, Section 6: "Evaluation Rubric" (300 words)
- [ ] T160 [P] Create diagram: book/static/diagrams/capstone-architecture.svg
- [ ] T161 [US1] Create code-examples/chapter-13-capstone/reference_impl/ with complete reference implementation
- [ ] T162 [US1] Create code-examples/chapter-13-capstone/starter_code/ with starter template for students
- [ ] T163 [US1] Document expected behavior in code-examples/chapter-13-capstone/README.md
- [ ] T164 [US1,US3] Add 10 exercises to Ch 13 (system integration, debugging scenarios)
- [ ] T165 Test capstone reference implementation end-to-end: voice command → navigation → manipulation
- [ ] T166 Run quality checks and commit Ch 13: `git commit -m "Complete: Chapter 13 (2,000-2,500 words)"`

**Checkpoint**: Students have complete reference for building conversational humanoid

---

## Phase 14: Chapter 14 - Hardware Guide (Week 10)

**Purpose**: Provide hardware specifications and build guides
**Serves**: US2, US4

- [ ] T167 [P] [US2,US4] Draft Ch 14, Section 1: "Simulation-Only Setup" (300 words) in book/docs/14-hardware.md
- [ ] T168 [P] [US2,US4] Draft Ch 14, Section 2: "Economy Kit (~$700)" (400 words) with detailed BOM
- [ ] T169 [P] [US2,US4] Draft Ch 14, Section 3: "Mid-Range Kit (~$2k-3k)" (400 words) with detailed BOM
- [ ] T170 [P] [US2,US4] Draft Ch 14, Section 4: "Full Lab Configuration (~$10k+)" (400 words) with institutional setup
- [ ] T171 [P] [US2] Create hardware/economy-kit.md with part numbers, vendors, costs
- [ ] T172 [P] [US2] Create hardware/midrange-kit.md with part numbers, vendors, costs
- [ ] T173 [P] [US2] Create hardware/full-lab.md with part numbers, vendors, costs
- [ ] T174 [P] [US2] Create hardware/assembly/economy-kit-assembly.md with step-by-step instructions and photos
- [ ] T175 [P] [US2] Create hardware/calibration/realsense-calibration.md with calibration procedures
- [ ] T176 [US2,US4] Add 5 exercises to Ch 14 (hardware selection, cost-benefit analysis)
- [ ] T177 Verify hardware availability: check all components are currently purchasable
- [ ] T178 Run quality checks and commit Ch 14: `git commit -m "Complete: Chapter 14 (1,400-1,600 words)"`

**Checkpoint**: Hardware deployment guide complete

---

## Phase 15: Book Integration and References (Week 10)

**Purpose**: Finalize complete book with all citations
**Serves**: All user stories

- [ ] T179 [US1,US3,US4,US5] Write book introduction/landing page in book/docs/index.md (300 words)
- [ ] T180 [US1,US3,US4,US5] Write book abstract (150-250 words) in book/docs/abstract.md
- [ ] T181 [P] [US1,US3] Create glossary of terms in book/docs/glossary.md (100+ terms)
- [ ] T182 [P] Update book/sidebars.js with correct chapter ordering and nested sections
- [ ] T183 Add cross-references between chapters using Docusaurus hyperlinks
- [ ] T184 Export final bibliography.bib from Zotero with all citations
- [ ] T185 Validate citations: run scripts/validate-citations.py to check all [@keys] have bibliography entries
- [ ] T186 Validate reverse: ensure all bibliography entries are cited at least once
- [ ] T187 Verify citation count: ≥20 total sources, ≥60% peer-reviewed (12+), ≥3 from 2023-2025
- [ ] T188 Check APA 7th format compliance for all citations
- [ ] T189 Archive all cited URLs using Wayback Machine, update bibliography with archived links
- [ ] T190 Run word count check: scripts/check-wordcount.sh (target: 18,000-25,000 words total)
- [ ] T191 Adjust word count if needed: expand under-target chapters or trim over-target chapters
- [ ] T192 Build complete Docusaurus site: `npm run build` and verify no errors
- [ ] T193 Test local site: `npm start` and navigate through all 14 chapters, verify all links work

**Checkpoint**: Complete book draft ready for quality gates

---

## Phase 16: Course Materials (Week 10)

**Purpose**: Create instructor resources for university adoption
**Serves**: US4 (instructors)

- [ ] T194 [P] [US4] Create course-materials/syllabus.md with 13-week schedule mapped to chapters
- [ ] T195 [P] [US4] Create course-materials/week-01/ through week-13/ directories
- [ ] T196 [P] [US4] Create lecture slide templates for each week in course-materials/week-XX/lecture-slides.md
- [ ] T197 [P] [US4] Create grading rubric: course-materials/assessments/midterm-checkpoint.md
- [ ] T198 [P] [US4] Create grading rubric: course-materials/assessments/final-capstone-rubric.md with weighted criteria
- [ ] T199 [P] [US4] Create course-materials/instructor-guide.md with teaching notes and common student issues
- [ ] T200 [P] [US4] Create course-materials/lab-setup-guide.md for institutional compute clusters
- [ ] T201 [US4] Test course materials completeness: verify all weeks have exercises and rubrics

**Checkpoint**: Instructors have complete course materials for adoption

---

## Phase 17: Quality Assurance (Week 11)

**Purpose**: Pass all quality gates before publication
**Serves**: All user stories

### Plagiarism and Readability

- [ ] T202 [P] Run Grammarly Premium plagiarism check on all 14 chapters (run in parallel)
- [ ] T203 [P] Run Copyleaks plagiarism check on all 14 chapters (run in parallel)
- [ ] T204 Compare plagiarism reports: ensure both Grammarly and Copyleaks report <1% similarity
- [ ] T205 Address flagged passages: rewrite or add citations for any >1% similarity
- [ ] T206 Re-run plagiarism checks until <1% target achieved
- [ ] T207 [P] Run Hemingway Editor on all chapters for readability (run in parallel)
- [ ] T208 Verify Flesch-Kincaid Grade 10-12 for all chapters, revise any outliers
- [ ] T209 Break up complex sentences (>30 words) flagged by readability checks

### Code Validation

- [ ] T210 [P] Test Chapter 3 code examples: docker-compose up, verify outputs (can run in parallel)
- [ ] T211 [P] Test Chapter 4 code examples: URDF visualization in RViz
- [ ] T212 [P] Test Chapter 5 code examples: Gazebo and Isaac Sim spawning
- [ ] T213 [P] Test Chapter 6 code examples: Sensor simulation
- [ ] T214 [P] Test Chapter 7 code examples: Isaac ROS perception (requires GPU)
- [ ] T215 [P] Test Chapter 8 code examples: Nav2 navigation in Isaac Sim
- [ ] T216 [P] Test Chapter 10 code examples: Voice → LLM → ROS 2 pipeline
- [ ] T217 [P] Test Chapter 11 code examples: MoveIt 2 manipulation
- [ ] T218 Test Chapter 13 capstone: End-to-end voice-controlled pick-and-place (sequential)
- [ ] T219 Document any code failures in GitHub Issues, fix critical blockers
- [ ] T220 Verify 100% of code examples execute successfully with documented setup

### Final Validation

- [ ] T221 Run scripts/validate-citations.py: verify no orphaned citations or references
- [ ] T222 Citation audit: manually verify 10 random citations match source page numbers
- [ ] T223 Run scripts/check-wordcount.sh: verify total 18,000-25,000 words
- [ ] T224 Link check: run .github/workflows/check-links.yml to validate all external URLs
- [ ] T225 Fix broken links: update or archive dead URLs
- [ ] T226 Mobile rendering test: view site on phone/tablet, verify no horizontal scrolling
- [ ] T227 Desktop rendering test: view site on Chrome, Firefox, Safari, verify all browsers
- [ ] T228 Dark mode test: toggle dark/light mode, verify all chapters readable
- [ ] T229 Build test: `npm run build` succeeds without warnings
- [ ] T230 Search test: verify Algolia search returns relevant results for technical terms

**Checkpoint**: All quality gates passed, ready for peer review

---

## Phase 18: Peer Review and Revision (Week 12)

**Purpose**: External validation and feedback incorporation
**Serves**: All user stories

- [ ] T231 [US1,US3,US4] Send draft to peer reviewer 1 (CS graduate student) for Chapters 1-7
- [ ] T232 [US1,US3,US4] Send draft to peer reviewer 2 (robotics researcher) for Chapters 8-14
- [ ] T233 [US1,US3,US5] Send draft to peer reviewer 3 (faculty) for complete review
- [ ] T234 Provide review checklist to reviewers: technical accuracy, clarity, code quality, completeness
- [ ] T235 Collect feedback from all reviewers (target: within 5 days)
- [ ] T236 Prioritize feedback: categorize as critical (must fix) vs. nice-to-have (optional)
- [ ] T237 Address all critical feedback: technical errors, unclear explanations, broken code
- [ ] T238 Incorporate optional feedback where feasible
- [ ] T239 Re-run plagiarism check on revised chapters (if substantial changes)
- [ ] T240 Commit all revisions: `git commit -m "Peer review: Incorporate feedback from 3 reviewers"`

**Checkpoint**: Peer-reviewed and revised

---

## Phase 19: PDF Export and Deployment (Week 12)

**Purpose**: Generate final deliverables and deploy to production
**Serves**: All user stories

### PDF Generation

- [ ] T241 Install docusaurus-prince-pdf plugin: `npm install docusaurus-prince-pdf`
- [ ] T242 Configure PDF output: title page, table of contents, page numbers, headers
- [ ] T243 Generate PDF: `npm run pdf` → outputs physical-ai-humanoid-robotics.pdf
- [ ] T244 Verify PDF quality: code syntax highlighting preserved, diagrams clear, hyperlinks functional
- [ ] T245 Test PDF on multiple readers: Adobe Acrobat, browser PDF viewer, mobile PDF reader
- [ ] T246 Add PDF metadata: title, authors, keywords, creation date
- [ ] T247 Optimize PDF file size (target: <10 MB for easy distribution)

### GitHub Pages Deployment

- [ ] T248 Configure GitHub Pages: enable Pages, set source to gh-pages branch
- [ ] T249 Test GitHub Actions workflow: push to main, verify auto-deploy triggers
- [ ] T250 Deploy to GitHub Pages: merge all changes to main branch
- [ ] T251 Verify live site: navigate to [username].github.io/physical-ai-humanoid-robotics-book
- [ ] T252 Test live site: all chapters load, search works, mobile rendering correct
- [ ] T253 Performance test: verify page load <3 seconds, Core Web Vitals pass
- [ ] T254 Create GitHub Release: tag v1.0.0, upload PDF to release assets
- [ ] T255 Update README.md with link to live site and PDF download

### Documentation and Cleanup

- [ ] T256 [P] Finalize CONTRIBUTING.md with community contribution guidelines
- [ ] T257 [P] Create CHANGELOG.md documenting v1.0.0 release
- [ ] T258 [P] Update README.md with project overview, links, and getting started
- [ ] T259 [P] Add acknowledgments section to book crediting contributors and reviewers
- [ ] T260 Create project documentation: specs/001-humanoid-robotics-capstone/FINAL-REPORT.md summarizing delivery

**Checkpoint**: Book live on GitHub Pages with PDF available

---

## Phase 20: Community Launch (Week 13)

**Purpose**: Announce book and engage community
**Serves**: All user stories

- [ ] T261 [P] [US3] Post announcement to r/robotics, r/ROS2, r/MachineLearning on Reddit
- [ ] T262 [P] [US3,US4,US5] Share on Twitter/X and LinkedIn with project highlights
- [ ] T263 [P] [US4] Email robotics education mailing lists with sample chapters
- [ ] T264 [P] [US3] Submit to Hacker News and Lobsters
- [ ] T265 [US4] Reach out to 10-15 robotics professors with instructor resources
- [ ] T266 [US4] Offer virtual Q&A session for interested instructors
- [ ] T267 [US3] Enable GitHub Discussions for Q&A and community engagement
- [ ] T268 [US3] Create issue templates: bug reports, content improvements, platform adaptations
- [ ] T269 [US3,US4] Monitor GitHub Issues and Discussions, respond within 24-48 hours
- [ ] T270 [US3] Track metrics: GitHub stars, forks, website analytics, instructor adoptions

**Checkpoint**: Book launched and community engaged

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion
- **Phases 3-14 (Chapters)**: Depend on Phase 2 completion
  - Chapters 3-14 can be drafted in parallel if multiple authors available
  - Or sequentially following Week 3-10 timeline
- **Phase 15 (Integration)**: Depends on all chapters (Phases 3-14) complete
- **Phase 16 (Course Materials)**: Depends on all chapters complete (can run parallel to Phase 15)
- **Phase 17 (QA)**: Depends on Phases 15-16 complete
- **Phase 18 (Review)**: Depends on Phase 17 QA passing
- **Phase 19 (Deployment)**: Depends on Phase 18 revisions complete
- **Phase 20 (Launch)**: Depends on Phase 19 deployment complete

### Chapter Dependencies

Most chapters are independent once foundational phase completes:
- Ch 1-2: Conceptual foundation (no code dependencies)
- Ch 3: ROS 2 basics (prerequisite for all subsequent chapters)
- Ch 4: URDF (depends on Ch 3)
- Ch 5-7: Simulation and perception (depend on Ch 3-4)
- Ch 8-11: Advanced topics (depend on Ch 3-7)
- Ch 12: Sim-to-real (depends on Ch 5-11)
- Ch 13: Capstone (depends on ALL previous chapters)
- Ch 14: Hardware (independent, can be written anytime)

### Parallel Opportunities

**Setup Phase**: T003, T004, T005, T006, T007, T008, T009, T010, T011, T012, T013 can all run in parallel

**Foundational Phase**: T017, T018, T019, T020, T021 (source searches) can run in parallel

**Chapter Authoring**: Multiple authors can write different chapters simultaneously:
- Author A: Chapters 1-2 (Week 2-3)
- Author B: Chapters 3-4 (Week 3-4)
- Author C: Chapters 5-6 (Week 5-6)
- etc.

**Within Each Chapter**: Section drafting, code example creation, and diagram creation can run in parallel

**QA Phase**: All plagiarism checks (T202-T203), all code tests (T210-T217), all rendering tests can run in parallel

---

## Parallel Example: Chapter 3 Development

```bash
# Launch all section drafting tasks together:
Task: "Draft Ch 3, Section 1: 'ROS 2 Architecture and DDS'" (T042)
Task: "Draft Ch 3, Section 2: 'Topics and Messages'" (T043)
Task: "Draft Ch 3, Section 3: 'Services and Actions'" (T044)
Task: "Draft Ch 3, Section 4: 'Parameters and Launch Files'" (T045)
Task: "Create diagram: ros2-topic-architecture.svg" (T046)

# Once sections complete, launch all code examples together:
Task: "Create hello_ros2/ example" (T048-T049)
Task: "Create pub_sub/ example" (T050-T051)
Task: "Create service_example/" (T052)
Task: "Create action_example/" (T053)
Task: "Create parameters/ example" (T054)
```

---

## Parallel Example: Quality Assurance (Phase 17)

```bash
# Launch all plagiarism checks together:
Task: "Grammarly check on Ch 1-14" (T202)
Task: "Copyleaks check on Ch 1-14" (T203)
Task: "Hemingway Editor on Ch 1-14" (T207)

# Launch all code tests together (if sufficient hardware):
Task: "Test Ch 3 examples" (T210)
Task: "Test Ch 4 examples" (T211)
Task: "Test Ch 5 examples" (T212)
Task: "Test Ch 6 examples" (T213)
Task: "Test Ch 7 examples" (T214)
Task: "Test Ch 8 examples" (T215)
Task: "Test Ch 10 examples" (T216)
Task: "Test Ch 11 examples" (T217)
```

---

## Implementation Strategy

### MVP First (Minimum Viable Book)

**Objective**: Deliver usable book for User Story 1 (capstone students) as quickly as possible

1. **Week 1**: Complete Phase 1 (Setup)
2. **Week 2**: Complete Phase 2 (Foundational - sources + Ch 1-2)
3. **Week 3-9**: Complete Phases 3-13 (Ch 3-13 only, skip Ch 14 hardware initially)
4. **Week 10**: Complete Phase 15 (Integration)
5. **Week 11-12**: Complete Phases 17-19 (QA, Review, Deploy)

**MVP Deliverable**: Chapters 1-13 with code examples, deployed to GitHub Pages

**Then iterate**: Add Ch 14 (hardware), course materials, community launch

### Incremental Delivery

Each week delivers a complete chapter:
- **Week 2**: Ch 1-2 (conceptual foundation) → Readers understand "why humanoid robotics"
- **Week 3**: Ch 3 (ROS 2) → Students can run basic ROS 2 nodes
- **Week 4**: Ch 4 (URDF) → Students can model robots
- **Week 5**: Ch 5-6 (Simulation + Sensors) → Students can simulate robots with sensors
- **Week 6**: Ch 7 (Isaac ROS) → Students can run perception pipelines
- **Week 7**: Ch 8-9 (Navigation + VLA) → Students understand navigation and VLA concepts
- **Week 8**: Ch 10-11 (Voice + Manipulation) → Students can control robots with voice
- **Week 9**: Ch 12-13 (Sim-to-Real + Capstone) → Students can build complete system
- **Week 10**: Integration + Ch 14 → Complete book with hardware guide

Each increment adds value without breaking previous content.

### Parallel Team Strategy

**If multiple authors available**:

1. **Week 1**: All authors complete Setup together
2. **Week 2**: All authors complete Foundational (source identification) together
3. **Week 3+**: Authors split chapters:
   - Author A: Ch 1-2 (conceptual)
   - Author B: Ch 3-4 (ROS 2, URDF)
   - Author C: Ch 5-6 (Simulation, Sensors)
   - Author D: Ch 7-8 (Isaac ROS, Navigation)
   - Author E: Ch 9-10 (VLA, Voice)
   - Author F: Ch 11-12 (Manipulation, Sim-to-Real)
   - Author G: Ch 13-14 (Capstone, Hardware)
4. **Week 10**: Integrate all chapters
5. **Week 11-12**: QA and deployment together

This parallel approach can reduce timeline from 12 weeks to ~6-8 weeks with 3-4 authors.

---

## Success Criteria Validation

### User Story 1: Capstone Student (P1)
- [✓] All 14 chapters complete with learning objectives
- [✓] All code examples runnable in Docker
- [✓] Capstone project (Ch 13) demonstrates voice → navigation → manipulation
- [✓] Book passes FK Grade 10-12 readability
- [✓] <1% plagiarism score

### User Story 2: Hardware Deployment (P2)
- [✓] Chapter 14 hardware guide with 3 cost tiers
- [✓] Assembly and calibration procedures documented
- [✓] Sim-to-real transfer techniques (Ch 12) complete

### User Story 3: Independent Learner (P1)
- [✓] All chapters accessible on GitHub Pages
- [✓] Search functionality working
- [✓] Mobile rendering perfect
- [✓] All code examples have README with troubleshooting

### User Story 4: Instructor Adoption (P2)
- [✓] Course materials: syllabus, rubrics, lecture templates
- [✓] 13-week schedule mapped to chapters
- [✓] Instructor guide with teaching notes

### User Story 5: Researcher Reference (P3)
- [✓] ≥20 sources, ≥60% peer-reviewed
- [✓] All claims cited in APA 7th format
- [✓] Technical depth in Ch 3-12
- [✓] PDF export for offline reading

---

## Task Summary

- **Total Tasks**: 270
- **Setup Phase**: 16 tasks
- **Foundational Phase**: 24 tasks
- **Chapter Phases (3-14)**: 156 tasks (12 chapters × 13 tasks average)
- **Integration Phase**: 15 tasks
- **Course Materials**: 8 tasks
- **QA Phase**: 29 tasks
- **Review Phase**: 10 tasks
- **Deployment Phase**: 20 tasks
- **Launch Phase**: 10 tasks

**Parallel Opportunities**: ~80 tasks marked [P] can run in parallel

**Timeline**: 12 weeks (10 weeks authoring + 2 weeks QA/deployment)

**MVP Scope**: Phases 1-2, 3-13, 15, 17-19 (skip Phase 14 hardware and Phase 16 course materials initially)

---

## Notes

- **[P] tasks**: Different files, no dependencies - safe to run in parallel
- **[Story] labels**: US1-US5 map to user stories from spec.md
- All file paths are relative to repository root
- Commit after each chapter completion
- Stop at any checkpoint to validate independently
- Chapters 1-13 serve US1 (students) primarily
- Chapter 14 serves US2 (hardware deployment)
- Course materials serve US4 (instructors)
- All content serves US3 (independent learners) and US5 (researchers)

---

**Tasks Status**: ✅ **COMPLETE** - 270 actionable tasks generated and organized by chapter/week structure, mapped to 5 user stories.
