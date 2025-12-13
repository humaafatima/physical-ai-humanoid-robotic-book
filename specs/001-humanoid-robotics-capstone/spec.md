# Feature Specification: Physical AI & Humanoid Robotics Capstone Course and Book

**Feature Branch**: `001-humanoid-robotics-capstone`
**Created**: 2025-12-07
**Status**: Draft
**Input**: User description: "Capstone Course Specification: Physical AI & Humanoid Robotics – Building Conversational Humanoid Robots with ROS 2, NVIDIA Isaac, and Vision-Language-Action Models"

---

## Overview

**Project Title**: Physical AI & Humanoid Robotics: From Simulated Digital Twins to Conversational Embodied Agents

**Project Type**: Dual-deliverable educational resource consisting of:
1. 13-week intensive capstone course curriculum
2. Open-source living book (18,000–25,000 words, 12–14 chapters)

**Target Audience**:
- Advanced CS / AI / Robotics students and researchers
- Engineers entering embodied AI and humanoid robotics fields
- Technical leads designing next-generation physical AI systems

**Core Focus**: Bridge digital intelligence with physical embodiment by teaching students to design, simulate, and deploy conversational humanoid robots capable of natural language understanding, high-level task planning, bipedal navigation, object manipulation, and human-like interaction in both simulated and real-world environments.

**Publication Platform**: Docusaurus-based static site deployed to GitHub Pages with PDF export capability

---

## User Scenarios & Testing

### User Story 1 - Capstone Student Completes End-to-End Simulated Humanoid Project (Priority: P1)

**As a** capstone student enrolled in the 13-week course,
**I want to** build and deploy a simulated conversational humanoid robot from scratch,
**So that** I can demonstrate mastery of embodied AI principles and have a portfolio-ready project.

**Why this priority**: This is the core learning outcome and primary value proposition of the course. Without this, the course fails its fundamental purpose.

**Independent Test**: Can be fully tested by: Student completes all 14 chapters, executes all code examples in Isaac Sim, and successfully demonstrates a simulated humanoid responding to voice commands like "Pick up the red cup and bring it to the table" with full execution from speech recognition through physical manipulation in simulation. Delivers immediate educational value as a complete learning journey.

**Acceptance Scenarios**:

1. **Given** student has no prior ROS 2 experience but strong Python and AI/ML background, **When** they progress through Chapters 1-13 over 13 weeks, **Then** they successfully complete the capstone project with a working simulated humanoid that accepts and executes open-ended English voice commands end-to-end
2. **Given** student is working through Chapter 3 (ROS 2 basics), **When** they copy and execute code examples from the book, **Then** all code runs without modification in ROS 2 Humble/Iron environment and produces expected outputs shown in the book
3. **Given** student completes Chapter 10 (Voice to Action), **When** they test their Whisper → LLM → ROS 2 integration, **Then** the system correctly interprets natural language commands and generates appropriate ROS 2 action sequences
4. **Given** student has completed all chapters, **When** they demonstrate their capstone project, **Then** the simulated humanoid successfully completes at least 5 different multi-step tasks involving navigation, object manipulation, and human interaction
5. **Given** student encounters errors or unclear instructions, **When** they consult the book's troubleshooting sections and code repositories, **Then** they can resolve issues independently within 30 minutes for 90% of common problems

---

### User Story 2 - Advanced Team Deploys to Physical Hardware (Priority: P2)

**As an** advanced capstone team with hardware access,
**I want to** transfer my simulated humanoid control stack to physical robot hardware,
**So that** I can validate sim-to-real transfer techniques and gain hands-on robotics experience.

**Why this priority**: This represents the aspirational goal for advanced teams and validates the practical applicability of the course material. Critical for demonstrating real-world relevance but not required for all students.

**Independent Test**: Can be independently tested by: Team acquires hardware from Chapter 14 (Economy Kit ~$700 or institutional equipment), follows sim-to-real transfer checklist from Chapter 12, and successfully deploys their simulation stack to physical hardware (Jetson + RealSense + Unitree G1/Go2 or equivalent), demonstrating at least one successful real-world task execution.

**Acceptance Scenarios**:

1. **Given** team has access to Jetson Orin Nano + Intel RealSense D435 + Unitree Go2 or equivalent hardware, **When** they follow Chapter 14 hardware setup guide and Chapter 12 sim-to-real transfer techniques, **Then** they successfully deploy their control stack to physical hardware within 2 weeks
2. **Given** team's simulation successfully completes "pick and place" tasks, **When** they deploy to physical hardware following calibration procedures, **Then** the physical robot successfully completes at least one simplified version of the simulated task (e.g., detecting and approaching a known object)
3. **Given** team encounters hardware-specific issues (sensor calibration, actuator limits), **When** they consult Chapter 12's sim-to-real troubleshooting guide, **Then** they can identify and resolve at least 80% of common hardware deployment issues
4. **Given** team wants to present their work, **When** they prepare a demonstration video following the book's documentation guidelines, **Then** they have a professional portfolio piece showing simulated and physical robot operation side-by-side

---

### User Story 3 - Independent Learner Studies Book for Self-Directed Learning (Priority: P1)

**As an** independent learner or professional engineer,
**I want to** work through the open-source book at my own pace without formal course enrollment,
**So that** I can gain practical embodied AI skills for career advancement or personal projects.

**Why this priority**: Open-source accessibility is a stated goal and significantly expands the impact beyond enrolled students. Essential for the book's value as a standalone resource.

**Independent Test**: Can be fully tested by: Independent learner accesses GitHub Pages site, follows setup instructions for local development environment (Docker + ROS 2 + Isaac Sim), completes at least Chapters 1-9 (foundational through VLA models), and successfully runs all code examples with <10% requiring troubleshooting beyond documented solutions.

**Acceptance Scenarios**:

1. **Given** learner has Windows/Linux/Mac system with Docker installed, **When** they follow Chapter 1 setup instructions, **Then** they have a working ROS 2 + Isaac Sim development environment within 2 hours
2. **Given** learner is reading on mobile device during commute, **When** they access the Docusaurus site, **Then** all text, diagrams, and code snippets render perfectly and are fully readable on mobile screen
3. **Given** learner wants to reference specific topics, **When** they use the book's search functionality and navigation, **Then** they can locate relevant information within 30 seconds for 95% of queries
4. **Given** learner encounters a code example that doesn't work, **When** they check the GitHub repository issues and discussions, **Then** they find either an existing solution or can post a question that receives response within 48 hours
5. **Given** learner completes Chapters 1-9, **When** they self-assess using provided checkpoints and exercises, **Then** they can correctly answer 85% of comprehension questions and successfully complete 90% of hands-on exercises

---

### User Story 4 - Instructor Adopts Book for University Course (Priority: P2)

**As a** university instructor teaching robotics or AI courses,
**I want to** adopt this open-source book as the primary or supplementary textbook,
**So that** my students learn cutting-edge embodied AI without expensive proprietary materials.

**Why this priority**: Instructor adoption multiplies impact and validates pedagogical quality. Important for long-term sustainability but secondary to direct student value.

**Independent Test**: Can be independently tested by: Instructor reviews entire book content, evaluates alignment with their course objectives, accesses supplementary teaching materials (if provided), and determines whether the book meets >80% of their course requirements with minimal additional resources needed.

**Acceptance Scenarios**:

1. **Given** instructor is planning a 12-14 week robotics course, **When** they review the book's chapter structure and learning outcomes, **Then** they find clear weekly progression that aligns with standard semester schedule
2. **Given** instructor needs to assess student learning, **When** they review each chapter's exercises and projects, **Then** they find sufficient graded assessment opportunities (quizzes, coding assignments, capstone project rubrics)
3. **Given** instructor's students have varying hardware access, **When** they review Chapter 14, **Then** they find clear options for simulation-only (free), economy hardware kit (~$700), and full lab configurations
4. **Given** instructor wants to verify academic rigor, **When** they review the book's citations and technical depth, **Then** they find ≥20 sources with ≥60% peer-reviewed papers from 2018-2025 and content appropriate for senior undergraduate / graduate level
5. **Given** instructor needs to stay current, **When** they check the book's GitHub repository, **Then** they find active maintenance with updates for new ROS 2 releases and Isaac Sim versions

---

### User Story 5 - Researcher References Book for Embodied AI Project (Priority: P3)

**As a** researcher working on embodied AI or humanoid robotics,
**I want to** use this book as a technical reference and starting point for my research,
**So that** I can quickly prototype ideas and cite established best practices.

**Why this priority**: Research adoption validates technical credibility and generates citations/recognition. Valuable for prestige and community building but not essential for core educational mission.

**Independent Test**: Can be independently tested by: Researcher identifies a specific technical challenge (e.g., "How do I integrate an LLM with ROS 2 action planning?"), consults the relevant chapter (Chapter 10), and successfully implements the described approach in their own research codebase within 1 day.

**Acceptance Scenarios**:

1. **Given** researcher needs to quickly set up a VLA model pipeline, **When** they follow Chapter 9-10 implementation guides, **Then** they have a working Whisper → LLM → ROS 2 pipeline within 4 hours using provided Docker containers and example code
2. **Given** researcher wants to cite best practices, **When** they read technical sections, **Then** they find APA 7th edition citations for all claims, traceable to peer-reviewed sources or official documentation
3. **Given** researcher is comparing simulation platforms, **When** they read Chapter 5 (Digital Twins), **Then** they find objective comparison of Gazebo, Unity, and Isaac Sim with clear criteria for platform selection
4. **Given** researcher encounters a novel challenge not directly covered, **When** they review the book's foundational chapters and architecture patterns, **Then** they can extrapolate principles to solve new problems with ≥70% success rate

---

### Edge Cases

- **What happens when** student uses non-specified ROS 2 distribution (e.g., Rolling instead of Humble/Iron)?
  - Book provides compatibility matrix and migration notes for adjacent distributions; warns about unsupported distributions with link to compatibility issues tracker

- **What happens when** hardware components specified in Chapter 14 are discontinued or unavailable?
  - Book maintains "equivalent alternatives" section with functional requirements (compute specs, sensor specifications) rather than specific product dependencies; community contributions update alternatives list

- **What happens when** Isaac Sim version updates break code examples?
  - Book repository maintains version-specific branches (e.g., `isaac-sim-2024`, `isaac-sim-2025`); main branch targets LTS releases with documented migration paths

- **What happens when** student has bandwidth constraints and cannot download large simulation environments?
  - Book provides "lightweight mode" instructions using reduced-fidelity models and offers optional cloud development environment setup guide

- **What happens when** learner has Mac with ARM architecture (M1/M2)?
  - Book includes platform-specific Docker setup for ARM architecture; notes performance caveats and provides alternative simulation settings for resource-constrained environments

- **What happens when** team wants to use different humanoid platform than examples (not Unitree)?
  - Chapter 4 (URDF Modeling) provides generic principles for adapting any humanoid URDF; Book includes guide for porting examples to custom platforms with community-contributed platform configs

- **How does system handle** students who complete course faster than 13 weeks?
  - Book is self-paced; students can accelerate; includes "advanced challenges" and "research directions" sections in later chapters for fast learners

- **How does system handle** plagiarism in student submissions?
  - Course materials include code attribution requirements and academic integrity guidelines; all example code is clearly marked and licensed (MIT/Apache 2.0)

---

## Requirements

### Functional Requirements - Book Content

- **FR-001**: Book MUST contain 12–14 chapters covering the full pipeline from ROS 2 basics through deployed conversational humanoid systems
- **FR-002**: Book MUST include comprehensive chapter coverage:
  - Chapter 1: Introduction to Physical AI and Embodied Intelligence
  - Chapter 2: The Humanoid Robotics Landscape (2025)
  - Chapter 3: ROS 2 – The Robotic Nervous System
  - Chapter 4: URDF & Robot Modeling for Humanoids
  - Chapter 5: Digital Twins – Gazebo, Unity, and NVIDIA Isaac Sim
  - Chapter 6: Sensor Simulation and Real-World Integration (LiDAR, Depth, IMU)
  - Chapter 7: NVIDIA Isaac ROS – Accelerated Perception and VSLAM
  - Chapter 8: Navigation and Bipedal Locomotion with Nav2
  - Chapter 9: Vision-Language-Action Models (VLA) for Robotics
  - Chapter 10: From Voice to Action – Whisper + LLM + ROS 2 Planning
  - Chapter 11: Manipulation and Dexterous Grasping
  - Chapter 12: Sim-to-Real Transfer Techniques
  - Chapter 13: Capstone Project – Autonomous Conversational Humanoid
  - Chapter 14: Hardware Guide & Lab Architectures (Economy → Premium options)
- **FR-003**: Every code example MUST be executable in ROS 2 Humble or Iron with Isaac Sim 2024.x or later
- **FR-004**: Every code example MUST be containerized using Docker with provided Dockerfile and docker-compose configurations
- **FR-005**: Every code example MUST include clear setup instructions, expected outputs, and troubleshooting guidance
- **FR-006**: Book MUST include hardware bill-of-materials with cost breakdowns:
  - Economy Kit (≈$700): Minimum viable hardware for sim-to-real experiments
  - Mid-range Kit (≈$2,000-$3,000): Recommended for team projects
  - Full Lab Configuration (≈$10,000+): Institutional/research lab setup
- **FR-007**: All technical claims MUST be supported by citations to peer-reviewed sources or official documentation
- **FR-008**: Book MUST include diagrams, architecture visualizations, and video demonstrations for all major concepts
- **FR-009**: Each chapter MUST include:
  - Learning objectives
  - Prerequisites (linking to earlier chapters)
  - Hands-on exercises with solutions
  - Self-assessment questions
  - Further reading / research directions
- **FR-010**: Book MUST provide comprehensive glossary of terms (ROS 2, Isaac, VLA, robotics concepts)

### Functional Requirements - Technical Quality

- **FR-011**: Book MUST cite minimum 20 sources with ≥60% peer-reviewed journal/conference papers
- **FR-012**: All cited sources MUST be from 2018-2025 unless foundational works with explicit justification
- **FR-013**: All citations MUST follow APA 7th edition format
- **FR-014**: Book MUST pass plagiarism detection (Grammarly Premium + Copyleaks) with zero tolerance for uncited content
- **FR-015**: All code MUST be ROS 2-native using Python rclpy (not ROS 1 compatibility layer)
- **FR-016**: All code repositories MUST include automated tests (unit tests for core functions, integration tests for ROS 2 nodes)
- **FR-017**: Book source MUST be written in Markdown compatible with Docusaurus 3.x
- **FR-018**: Book MUST render correctly on mobile devices (responsive design with readable code blocks)
- **FR-019**: Book MUST render correctly on desktop browsers (Chrome, Firefox, Safari, Edge)
- **FR-020**: Book MUST support dark mode and light mode themes

### Functional Requirements - Course Structure

- **FR-021**: Course curriculum MUST align with 13-week semester schedule (one chapter per week + capstone)
- **FR-022**: Course MUST define clear weekly learning outcomes measurable through exercises and assessments
- **FR-023**: Course MUST provide grading rubrics for:
  - Weekly coding assignments
  - Mid-term project checkpoint
  - Final capstone project presentation and demonstration
  - Technical report/documentation
- **FR-024**: Course MUST include prerequisite checklist:
  - Python programming (intermediate level)
  - Linear algebra and basic calculus
  - Machine learning fundamentals (neural networks, transformers)
  - Basic Linux command-line skills
- **FR-025**: Course MUST provide instructor resources:
  - Lecture slide templates
  - Lab setup guides for institutional compute clusters
  - Sample syllabus and course policies
  - Assessment rubrics and answer keys

### Functional Requirements - Publication and Distribution

- **FR-026**: Book MUST be deployed to GitHub Pages at a memorable URL (e.g., physicalai-robotics.github.io)
- **FR-027**: Book MUST support PDF export for offline reading with preserved formatting, diagrams, and code syntax highlighting
- **FR-028**: Book MUST include prominent link to source GitHub repository for code examples and issue tracking
- **FR-029**: Book MUST include search functionality for quick topic lookup
- **FR-030**: Book MUST include table of contents navigation with progress tracking
- **FR-031**: Code examples MUST be hosted in organized GitHub repository with directory structure mirroring book chapters
- **FR-032**: GitHub repository MUST include GitHub Actions CI/CD for:
  - Automated deployment to GitHub Pages on main branch merge
  - Code linting and formatting checks
  - ROS 2 package compilation tests (where applicable)
  - Link checking for external references
- **FR-033**: Book MUST include "Edit this page" links to encourage community contributions and corrections
- **FR-034**: Book MUST include version/date stamp on each page indicating last update

### Functional Requirements - Capstone Project

- **FR-035**: Capstone project (Chapter 13) MUST integrate concepts from all previous chapters into single unified demonstration
- **FR-036**: Capstone project MUST require students to implement end-to-end pipeline: voice input → natural language understanding → task planning → navigation → manipulation → human feedback
- **FR-037**: Capstone project MUST include minimum viable demonstration scenario: "Pick up [colored object] and bring it to [location]" with 3+ object types and 3+ locations
- **FR-038**: Capstone project MUST provide evaluation rubric with weighted criteria:
  - Simulation environment setup and digital twin accuracy (15%)
  - Voice interface and LLM integration (20%)
  - Navigation and path planning (20%)
  - Object detection and manipulation (25%)
  - System integration and reliability (10%)
  - Documentation and code quality (10%)
- **FR-039**: Capstone project MUST include optional advanced challenges:
  - Multi-robot coordination
  - Dynamic environment with moving obstacles
  - Natural language dialogue (clarifying questions)
  - Learning from demonstration
- **FR-040**: Capstone project MUST provide reference implementation with documented code as baseline for comparison

### Key Entities

- **Chapter**: Core content unit; contains learning objectives, conceptual explanations, code examples, exercises, and assessments; typically 1,200-1,800 words
- **Code Example**: Executable code snippet or project; includes source files, Dockerfile, README with setup instructions, expected outputs, and common troubleshooting; stored in GitHub repository with chapter-based organization
- **Exercise**: Hands-on activity within chapter; includes problem statement, starter code, hints, and solution; designed to reinforce chapter concepts; estimated completion time 30-90 minutes
- **Hardware Configuration**: Specification for physical robot setup; includes bill-of-materials with part numbers and vendors, assembly instructions, calibration procedures, and compatibility notes
- **Learning Outcome**: Measurable skill or knowledge; associated with specific chapters; assessed through exercises and capstone project; maps to course-level competencies
- **Citation**: Reference to external source; includes full bibliographic information in APA 7th format; categorized by type (journal, conference, documentation, book); maintained in central bibliography file
- **Diagram/Visualization**: Technical illustration; includes architecture diagrams, data flow diagrams, robot configuration visualizations; provided in SVG format for scalability; source files included for editing
- **Video Demonstration**: Recorded screencast or robot demonstration; hosted on YouTube or similar; embedded in book; includes timestamps and supplementary notes
- **Docker Container**: Reproducible development environment; includes ROS 2, Isaac Sim dependencies, Python packages; versioned and published to Docker Hub; includes both development and lightweight runtime variants

---

## Success Criteria

### Measurable Outcomes - Student Learning

- **SC-001**: 90% of enrolled students successfully complete simulated humanoid capstone project demonstrating voice-controlled navigation and manipulation within 13-week course period
- **SC-002**: Students can set up complete ROS 2 + Isaac Sim development environment following book instructions in under 2 hours with 90% success rate on first attempt
- **SC-003**: 100% of code examples in Chapters 1-13 execute successfully without modification when following documented setup procedures
- **SC-004**: Students score average 85%+ on chapter self-assessment questions demonstrating comprehension of core concepts
- **SC-005**: At least one team per course offering successfully deploys simulation stack to physical hardware and demonstrates real-world task completion
- **SC-006**: Students report 90%+ satisfaction with book clarity, completeness, and practical value based on end-of-course survey

### Measurable Outcomes - Book Quality

- **SC-007**: Book contains 18,000–25,000 words across 12–14 chapters meeting target length for comprehensive coverage
- **SC-008**: Book cites ≥20 sources with ≥60% peer-reviewed papers from 2018-2025 demonstrating current and authoritative scholarship
- **SC-009**: Book passes plagiarism detection with <1% similarity score (excluding citations and properly quoted material)
- **SC-010**: Book GitHub repository receives contributions (corrections, improvements, platform adaptations) from community within first 3 months of publication
- **SC-011**: Book PDF export maintains professional formatting with readable code blocks, preserved diagrams, and functional internal hyperlinks
- **SC-012**: Book search functionality returns relevant results within top 3 hits for 95% of technical term queries
- **SC-013**: Book website loads in under 3 seconds on standard broadband connection and passes Core Web Vitals metrics

### Measurable Outcomes - Accessibility and Reusability

- **SC-014**: 100% of book content renders correctly on mobile devices (phone and tablet) with readable text and code without horizontal scrolling
- **SC-015**: Independent learners (not enrolled in course) successfully complete ≥8 chapters without external support based on GitHub analytics and community feedback
- **SC-016**: At least 3 university instructors adopt book as primary or supplementary course material within first academic year based on adoption tracking
- **SC-017**: Book repository maintains <24 hour response time for critical bugs (blocking errors in code examples) and <7 day response for enhancements/questions
- **SC-018**: Book remains technically accurate for ≥18 months without major updates required due to platform deprecations (ROS 2 LTS support, Isaac Sim LTS)

### Measurable Outcomes - Technical Depth

- **SC-019**: Readers can explain differences between Gazebo, Unity, and Isaac Sim for humanoid simulation and make informed platform selection decisions based on Chapter 5
- **SC-020**: Readers can integrate custom LLM (GPT-4, Claude, open-source alternatives) with ROS 2 action planning pipeline following Chapter 10 patterns within 1 day
- **SC-021**: Readers can diagnose and resolve 80% of common sim-to-real transfer issues using Chapter 12 troubleshooting guide without external help
- **SC-022**: Advanced readers can extend baseline capstone project with custom sensors, actuators, or AI models using architectural patterns from Chapters 4-11

### Measurable Outcomes - Project Timeline

- **SC-023**: Complete draft of all 12-14 chapters delivered within 10 weeks from project start meeting interim review deadlines
- **SC-024**: Book passes final quality gates (plagiarism check, citation audit, technical review, accessibility testing) within 2 weeks of draft completion
- **SC-025**: Book is live on GitHub Pages with full functionality (search, navigation, PDF export, mobile support) within 13 weeks total project timeline

---

## Assumptions

1. **Technical Environment**: Students/readers have access to computers capable of running Docker and Isaac Sim (minimum: 16GB RAM, NVIDIA GPU with 8GB VRAM for full simulation; graceful degradation path provided for lower-spec systems)
2. **Prerequisite Knowledge**: Readers have intermediate Python programming skills, basic familiarity with Linux command line, and foundational understanding of machine learning concepts (neural networks, transformers)
3. **ROS 2 Stability**: ROS 2 Humble LTS (supported until 2027) and Iron (2024-2025) remain stable platforms for duration of book's initial 18-month lifecycle
4. **Isaac Sim Access**: NVIDIA Isaac Sim remains available for educational use (free license) and maintains reasonable backward compatibility across minor version updates
5. **LLM APIs**: Commercial LLM APIs (OpenAI GPT-4, Anthropic Claude) remain accessible with educational/developer tier pricing; book provides open-source alternatives (Llama, Mistral) as fallback
6. **Hardware Availability**: Core hardware components (Jetson boards, Intel RealSense cameras, Unitree quadrupeds) remain available through 2026 or equivalent alternatives emerge
7. **Community Engagement**: Open-source model attracts community contributions for bug fixes, platform adaptations, and content improvements within first 6 months
8. **Institutional Support**: Instructors adopting book have basic compute infrastructure (student lab machines or cloud credits) sufficient for ROS 2 + simulation workloads
9. **Licensing**: All third-party components used (ROS 2, Isaac Sim, open-source libraries) maintain compatible licenses for educational use
10. **Network Bandwidth**: Readers have sufficient internet bandwidth for initial Docker image pulls (~5-10GB) and GitHub repository cloning; offline work supported after initial setup

---

## Dependencies

### External Dependencies

- **ROS 2 (Humble or Iron)**: Core robotics framework; book content depends on ROS 2 APIs, message types, and architectural patterns
- **NVIDIA Isaac Sim 2024.x+**: Primary simulation platform for Chapters 5-13; required for running code examples and capstone project
- **Docker**: Containerization platform for reproducible environments; required for all hands-on exercises
- **Python 3.10+**: Programming language for all code examples; rclpy, numpy, pytorch, transformers libraries
- **Docusaurus 3.x**: Static site generator for book publication; Markdown source → HTML website
- **GitHub Pages**: Free hosting for book website and code repository
- **Whisper**: OpenAI speech-to-text model for voice interface (Chapter 10)
- **Large Language Models**: GPT-4, Claude, or open-source alternatives (Llama 3, Mistral) for natural language understanding and task planning
- **Nav2**: ROS 2 navigation framework for autonomous navigation (Chapter 8)
- **MoveIt 2**: Motion planning framework for manipulation (Chapter 11)

### Internal Dependencies (Chapter Prerequisites)

- **Chapter 3 (ROS 2 basics)** → required for all subsequent chapters
- **Chapter 4 (URDF modeling)** → required for Chapters 5-13 (simulation and control)
- **Chapter 5 (Digital Twins)** → required for Chapters 6-13 (all practical exercises)
- **Chapter 7 (Isaac ROS)** → required for Chapters 8, 10-13 (perception-dependent tasks)
- **Chapter 9 (VLA models)** → required for Chapter 10 (voice interface)
- **Chapter 8 (Navigation) + Chapter 11 (Manipulation)** → required for Chapter 13 (capstone integration)
- **Chapter 12 (Sim-to-Real)** → optional but recommended before physical hardware deployment

### Stakeholder Dependencies

- **Course Instructors**: Need lead time for course planning (recommend 4-6 weeks before semester start); need institutional compute resources or cloud credits for students
- **Hardware Vendors**: Availability of recommended components (Jetson, RealSense, Unitree); vendor documentation and support
- **NVIDIA**: Ongoing Isaac Sim development and educational license availability; compatibility with ROS 2 releases
- **Open Source Community**: Contributions for bug fixes, alternative platform adaptations, and content improvements

---

## Out of Scope

The following are explicitly **NOT** covered in this book/course:

### Excluded Topics

- **Full-scale ethics or safety certification discussions**: While responsible AI principles are mentioned, the book does not provide comprehensive treatment of robotics ethics, safety standards (ISO 13482), or certification processes
- **Comparison tables of commercial humanoid vendors**: Book focuses on technical implementation rather than market analysis; no comparative reviews of Tesla Optimus, Figure 01, Boston Dynamics Atlas, etc.
- **Low-level motor control or custom actuator design**: Book assumes use of existing robot platforms with provided control interfaces; does not cover electrical engineering, motor driver design, or custom actuator development
- **Training foundation models from scratch**: Book uses pre-trained LLMs (GPT-4, Claude, Llama) and VLA models; does not cover large-scale model training, dataset collection, or compute infrastructure for training
- **Mechanical design and CAD modeling**: Book focuses on software/AI aspects; does not teach mechanical engineering, 3D printing, or physical robot fabrication
- **Advanced manufacturing topics**: No coverage of custom PCB design, sensor fabrication, or industrial manufacturing processes
- **Business and commercialization**: No coverage of startup formation, IP strategy, go-to-market planning, or business models for robotics companies
- **Regulatory compliance**: No detailed coverage of FCC/CE certification, product liability, or international regulations for commercial robot deployment
- **Human factors and UX design for robotics**: Minimal coverage of user experience design principles for human-robot interaction; focused on technical implementation
- **Multi-robot swarm coordination**: Brief mention in advanced challenges but not core curriculum; no deep coverage of distributed systems, consensus algorithms, or swarm intelligence
- **Medical/surgical robotics**: No coverage of specialized medical devices, surgical robots, or healthcare-specific applications requiring regulatory approval
- **Military/defense applications**: No coverage of weaponized systems, battlefield robotics, or defense-specific use cases
- **Custom operating system development**: Book uses existing ROS 2 framework; does not cover real-time OS development, kernel programming, or custom middleware design
- **Long-term autonomy and lifetime learning**: Minimal coverage of continual learning, memory systems, or robots operating autonomously for months/years
- **Legal frameworks for AI liability**: No comprehensive treatment of legal liability, insurance, or tort law related to autonomous systems

### Constraints

- **Source recency**: All citations ≤8 years old (2018-2025) unless foundational works (seminal ROS papers, classic control theory) with explicit justification for inclusion
- **Plagiarism**: Zero tolerance; must pass Grammarly Premium + Copyleaks with <1% similarity excluding properly cited content
- **Code standards**: All code ROS 2-native (Python rclpy), no ROS 1 compatibility layers; all code containerized with Docker; no vendor-specific lock-in (avoid proprietary APIs where possible)
- **Rendering quality**: Book must render perfectly on mobile and desktop with no horizontal scrolling, readable code blocks, and accessible navigation
- **Deadline**: Complete draft in 10 weeks from project start; final publication-ready version in 13 weeks total
- **Word count**: 18,000–25,000 words total across all chapters (excluding code examples); individual chapters 1,200-1,800 words
- **Platform support**: Primary support for Ubuntu 22.04 LTS (ROS 2 Humble target platform); secondary support for Ubuntu 24.04 (ROS 2 Jazzy) and containerized environments on Windows/Mac

---

## Notes

- **Versioning Strategy**: Book will maintain version-specific branches for major platform updates (Isaac Sim, ROS 2 distributions). Main branch targets current LTS releases.
- **Community Contributions**: Actively encourage community PRs for corrections, platform adaptations (e.g., Jetson Xavier, alternative robots), and supplementary content. Maintainer review required.
- **Video Content**: Consider supplementary YouTube channel with lecture recordings, demo walkthroughs, and live coding sessions (outside core book scope but valuable addition).
- **International Audience**: While book is English-language, consider community-driven translations for major languages (Spanish, Mandarin, French) after initial publication.
- **Accessibility**: Beyond mobile/desktop rendering, consider screen reader compatibility, alt text for all diagrams, and WCAG 2.1 AA compliance for web version.
- **Citation Management**: Use Zotero or similar for bibliography management; export to BibTeX for Docusaurus integration; maintain central `references.bib` file.
- **Code Repository Organization**: Structure as monorepo with per-chapter directories or separate repos per chapter? Decision affects cloning size and navigation. Recommend monorepo with optional sparse checkout for large assets.
- **Docker Image Strategy**: Provide both "full" image (all dependencies, ~8GB) and "lite" image (core tools only, ~2GB) for bandwidth-constrained users.
- **Advanced Topics**: Consider "bonus chapters" or appendices for topics like multi-robot coordination, cloud robotics integration, and edge deployment optimization (beyond core 14 chapters).
