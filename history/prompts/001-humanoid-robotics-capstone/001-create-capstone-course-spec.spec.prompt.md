---
id: 001
title: Create Capstone Course Specification
stage: spec
date: 2025-12-07
surface: agent
model: claude-sonnet-4-5
feature: 001-humanoid-robotics-capstone
branch: 001-humanoid-robotics-capstone
user: J
command: /sp.specify
labels: ["spec", "capstone-course", "physical-ai", "humanoid-robotics", "educational-content", "ros2", "isaac-sim"]
links:
  spec: specs/001-humanoid-robotics-capstone/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-humanoid-robotics-capstone/spec.md
 - specs/001-humanoid-robotics-capstone/checklists/requirements.md
tests:
 - Specification quality validation (16/16 checks passed)
---

## Prompt

/sp.specify Capstone Course Specification: Physical AI & Humanoid Robotics – Building Conversational Humanoid Robots with ROS 2, NVIDIA Isaac, and Vision-Language-Action Models

Project Title
Physical AI & Humanoid Robotics: From Simulated Digital Twins to Conversational Embodied Agents

Project Type
13-week intensive capstone course + open-source living book (Docusaurus + GitHub Pages deployment)

Target Audience
- Advanced CS / AI / Robotics students and researchers
- Engineers entering embodied AI and humanoid robotics
- Technical leads designing next-generation physical AI systems

Core Focus
Bridging digital intelligence with physical bodies: design, simulate, and deploy conversational humanoid robots capable of natural language understanding, high-level task planning, bipedal navigation, object manipulation, and human-like interaction in real and simulated environments.

Learning Outcomes (must be demonstrable)
1. Master ROS 2 (Humble/Iron) for real-time robot control
2. Build and simulate accurate digital twins using Gazebo, Unity, and NVIDIA Isaac Sim
3. Implement state-of-the-art perception and navigation with NVIDIA Isaac ROS and Nav2
4. Integrate Vision-Language-Action (VLA) models: voice → LLM → ROS 2 action sequence
5. Deploy full-stack autonomous humanoid behavior from simulation to real hardware
6. Understand sim-to-real transfer and embodied intelligence principles

Success Criteria (measurable)
- Students deliver a working simulated humanoid that accepts open-ended English voice commands (e.g., "Please pick up the red cup and bring it to the table") and executes them end-to-end
- At least one team successfully deploys the same stack to physical hardware (Jetson + RealSense + Unitree G1/Go2 or equivalent)
- Complete open-source book (12–14 chapters) published on GitHub Pages with executable code snippets, diagrams, and video demos
- All technical claims backed by ≥ 20 sources (≥ 60% peer-reviewed)
- Readers can reproduce the full capstone project following the book

Book & Deliverables Specification
- Total word count: 18,000 – 25,000 words (full book)
- Format: Markdown source → Docusaurus site → GitHub Pages + exported PDF
- Citation style: APA 7th edition
- Minimum 20 sources (≥ 60% peer-reviewed journal/conference papers from 2018–2025)
- Every code example must run in ROS 2 Humble/Iron + Isaac Sim 2024.x or later
- Include hardware build-of-materials and cost breakdowns (Economy Kit ≈ $700, Full Lab options)

Detailed Table of Contents (chapters to be generated)
1. Introduction to Physical AI and Embodied Intelligence
2. The Humanoid Robotics Landscape (2025)
3. ROS 2 – The Robotic Nervous System
4. URDF & Robot Modeling for Humanoids
5. Digital Twins – Gazebo, Unity, and NVIDIA Isaac Sim
6. Sensor Simulation and Real-World Integration (LiDAR, Depth, IMU)
7. NVIDIA Isaac ROS – Accelerated Perception and VSLAM
8. Navigation and Bipedal Locomotion with Nav2
9. Vision-Language-Action Models (VLA) for Robotics
10. From Voice to Action – Whisper + LLM + ROS 2 Planning
11. Manipulation and Dexterous Grasping
12. Sim-to-Real Transfer Techniques
13. Capstone Project – Autonomous Conversational Humanoid
14. Hardware Guide & Lab Architectures (Economy → Premium options)

Explicitly Out of Scope (will not be covered)
- Full-scale ethics or safety certification discussions
- Comparison tables of commercial humanoid vendors
- Low-level motor control or custom actuator design
- Training foundation models from scratch

Constraints
- All source publications ≤ 8 years old unless foundational (e.g., classic ROS papers)
- Zero plagiarism – must pass Grammarly Premium + Copyleaks
- Code must be ROS 2-native (Python rclpy) and containerized (Docker)
- Book must render perfectly on mobile and desktop
- Deadline for complete draft: 10 weeks from start

Generate the full spec.md with clear sections: Overview, Audience, Outcomes, Success Criteria, Deliverables, Chapter Outline, Constraints, and Out-of-Scope.

## Response snapshot

Created comprehensive feature specification for Physical AI & Humanoid Robotics capstone course and open-source book project.

**Branch Created**: `001-humanoid-robotics-capstone`
**Feature Short Name**: humanoid-robotics-capstone

**Specification Structure**:

1. **Overview**
   - Project title and dual deliverable (13-week course + 18,000-25,000 word book)
   - Target audience (advanced CS/AI/Robotics students, engineers, technical leads)
   - Core focus on bridging digital intelligence with physical embodiment
   - Publication platform (Docusaurus + GitHub Pages)

2. **User Scenarios & Testing** (5 prioritized user stories, 23 acceptance scenarios):
   - P1: Capstone Student completes end-to-end simulated humanoid project
   - P2: Advanced Team deploys to physical hardware
   - P1: Independent Learner self-directed study
   - P2: Instructor adopts book for university course
   - P3: Researcher uses book as technical reference
   - 8 edge cases documented with resolution strategies

3. **Requirements** (40 functional requirements across 4 categories):
   - FR-001 to FR-010: Book Content (14 chapters, code examples, hardware BOMs, citations)
   - FR-011 to FR-020: Technical Quality (≥20 sources ≥60% peer-reviewed, APA 7th, plagiarism checks, ROS 2-native code, responsive design)
   - FR-021 to FR-025: Course Structure (13-week curriculum, grading rubrics, prerequisites, instructor resources)
   - FR-026 to FR-034: Publication & Distribution (GitHub Pages, PDF export, search, CI/CD, community contributions)
   - FR-035 to FR-040: Capstone Project (end-to-end integration, evaluation rubric, reference implementation)

4. **Key Entities** (9 entities):
   - Chapter, Code Example, Exercise, Hardware Configuration, Learning Outcome, Citation, Diagram/Visualization, Video Demonstration, Docker Container

5. **Success Criteria** (25 measurable outcomes across 5 categories):
   - SC-001 to SC-006: Student Learning (90% completion rate, 2-hour setup, 100% executable code, 85% assessment scores)
   - SC-007 to SC-013: Book Quality (18k-25k words, ≥20 sources, <1% plagiarism, community contributions, professional PDF)
   - SC-014 to SC-018: Accessibility & Reusability (100% mobile rendering, ≥8 chapters completed independently, ≥3 instructor adoptions)
   - SC-019 to SC-022: Technical Depth (platform comparison, LLM integration, sim-to-real troubleshooting, extensibility)
   - SC-023 to SC-025: Project Timeline (10-week draft, 2-week quality gates, 13-week publication)

6. **Assumptions** (10 documented):
   - Technical environment (16GB RAM, NVIDIA GPU 8GB VRAM minimum)
   - Prerequisites (intermediate Python, Linux CLI, ML fundamentals)
   - Platform stability (ROS 2 Humble LTS through 2027)
   - Access (Isaac Sim educational license, LLM APIs, hardware availability)
   - Community engagement and institutional support

7. **Dependencies**:
   - External: ROS 2 Humble/Iron, Isaac Sim 2024.x+, Docker, Python 3.10+, Docusaurus 3.x, Whisper, LLMs, Nav2, MoveIt 2
   - Internal: Chapter prerequisites mapped (Chapter 3 → all subsequent; Chapter 5 → 6-13; etc.)
   - Stakeholder: Instructors, hardware vendors, NVIDIA, open source community

8. **Out of Scope** (14 explicitly excluded topics):
   - Ethics/safety certification, commercial vendor comparisons, motor control, foundation model training, mechanical design, manufacturing, business/legal topics, medical/military applications, custom OS development, long-term autonomy

9. **Constraints**:
   - Sources ≤8 years old (2018-2025)
   - Zero plagiarism (<1% similarity)
   - ROS 2-native code, Docker containers
   - Mobile/desktop rendering quality
   - 10-week draft deadline, 18k-25k words

**Validation Results**:
- ✅ 16/16 quality checks passed
- ✅ No [NEEDS CLARIFICATION] markers
- ✅ All requirements testable and unambiguous
- ✅ Success criteria measurable and technology-agnostic
- ✅ Complete coverage of user scenarios, edge cases, dependencies
- ✅ Clear scope boundaries

**Files Created**:
1. `specs/001-humanoid-robotics-capstone/spec.md` (414 lines)
2. `specs/001-humanoid-robotics-capstone/checklists/requirements.md` (validation checklist)

**Readiness**: ✅ APPROVED - Ready for `/sp.clarify` or `/sp.plan`

## Outcome

- ✅ Impact: Complete feature specification for ambitious dual-deliverable educational project (capstone course + open-source book covering Physical AI and Humanoid Robotics)
- 🧪 Tests: Specification quality validation checklist - 16/16 checks passed (100%)
- 📁 Files:
  - specs/001-humanoid-robotics-capstone/spec.md (414 lines, comprehensive)
  - specs/001-humanoid-robotics-capstone/checklists/requirements.md (validation results)
- 🔁 Next prompts:
  - `/sp.plan` - Create implementation plan for authoring all 14 chapters
  - `/sp.tasks` - Break down book creation into actionable tasks with 10-week timeline
  - Set up GitHub repository structure and CI/CD pipeline
  - Create Zotero library and begin source identification (≥20 sources, ≥60% peer-reviewed)
  - Draft Chapter 1 outline (Introduction to Physical AI and Embodied Intelligence)
- 🧠 Reflection: Specification successfully balances ambitious scope (14-chapter book, simulation-to-hardware pipeline, cutting-edge technologies) with clear constraints and measurable outcomes. Five user stories comprehensively cover all stakeholder types. 40 functional requirements provide implementation guidance without prescribing technical solutions. 25 success criteria ensure quality and completeness are objectively measurable.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL):
  - Content Quality: PASS (4/4 - no implementation details, user-focused, stakeholder-accessible, mandatory sections complete)
  - Requirement Completeness: PASS (8/8 - no clarifications needed, testable, measurable, technology-agnostic success criteria, scenarios defined, edge cases identified, scope bounded, dependencies/assumptions documented)
  - Feature Readiness: PASS (4/4 - requirements have acceptance criteria, scenarios cover primary flows, measurable outcomes defined, no implementation leakage)
- Prompt variant (if applicable): Standard /sp.specify workflow
- Next experiment (smallest change to try): After planning phase, evaluate if chapter-by-chapter breakdown provides sufficient detail for parallel authoring or if per-section outlines are needed
