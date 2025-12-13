# Implementation Plan: Physical AI & Humanoid Robotics Capstone Course and Book

**Branch**: `001-humanoid-robotics-capstone` | **Date**: 2025-12-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-humanoid-robotics-capstone/spec.md`

---

## Summary

Create a comprehensive 13-week capstone course and open-source living book (18,000-25,000 words, 14 chapters) titled "Physical AI & Humanoid Robotics: From Simulated Digital Twins to Conversational Embodied Agents." The project bridges digital intelligence with physical embodiment, teaching students to design, simulate, and deploy conversational humanoid robots using ROS 2, NVIDIA Isaac Sim, and Vision-Language-Action (VLA) models.

**Primary Deliverables**:
1. **Docusaurus-based book**: 14 chapters with 18,000-25,000 words, deployed to GitHub Pages with PDF export
2. **Executable code examples**: ROS 2 Humble/Iron + Isaac Sim 2024.x+ compatible, all Dockerized
3. **Course curriculum**: 13-week schedule with exercises, assessments, and grading rubrics
4. **Hardware guide**: Bill-of-materials with economy (~$700), mid-range (~$2k-3k), and full lab (~$10k+) options

**Technical Approach**:
- **Content platform**: Docusaurus 3.x for static site generation (Markdown → HTML)
- **Citation management**: Zotero with BibTeX export for APA 7th edition references
- **Code delivery**: Docker containers with pre-configured ROS 2 + Isaac Sim environments
- **Quality assurance**: Grammarly Premium + Copyleaks for plagiarism detection (<1% target)
- **CI/CD**: GitHub Actions for automated deployment, link checking, and code validation
- **Version control**: Git with feature branches for major chapters/sections

**Timeline**: 10 weeks for complete draft + 2 weeks for quality gates = 12 weeks total (1 week buffer for 13-week course launch)

---

## Technical Context

### Content Creation Stack

**Primary Language/Platform**: Markdown (CommonMark spec) → Docusaurus 3.x → Static HTML/CSS/JS
**Documentation Tool**: Docusaurus 3.5+ (React-based static site generator)
**Citation Management**: Zotero 6.x with Better BibTeX plugin for APA 7th edition
**Plagiarism Detection**: Grammarly Premium + Copyleaks (dual validation for <1% similarity target)
**Version Control**: Git 2.x with GitHub for source control and GitHub Pages for hosting
**Build Tool**: npm/yarn for Docusaurus build pipeline

### Code Examples Stack

**Primary Language**: Python 3.10+ (rclpy for ROS 2 nodes)
**Robotics Framework**: ROS 2 Humble Hawksbill (LTS, supported through May 2027) and Iron Irwini (2024-2025)
**Simulation Platform**: NVIDIA Isaac Sim 2024.1+ (GPU-accelerated robotics simulation)
**Containerization**: Docker 24.x + docker-compose for reproducible environments
**Perception**: NVIDIA Isaac ROS 2.x (GPU-accelerated computer vision and VSLAM)
**Navigation**: Nav2 (ROS 2 navigation framework) with costmap 2D and behavior trees
**Manipulation**: MoveIt 2 (motion planning framework for arm control)
**Voice Interface**: OpenAI Whisper (speech-to-text) + LLM APIs (GPT-4, Claude, or open-source Llama 3/Mistral)
**Testing**: pytest for Python unit tests, ROS 2 launch tests for integration

### Infrastructure

**Hosting**: GitHub Pages (free static site hosting)
**Code Repository**: GitHub with GitHub Actions CI/CD
**Container Registry**: Docker Hub for public Docker images
**Video Hosting**: YouTube for demonstration videos (embedded in book)
**Diagram Tools**: draw.io or Mermaid for architecture diagrams (SVG export)

### Target Platforms

**Development Environment**:
- Primary: Ubuntu 22.04 LTS (ROS 2 Humble native)
- Secondary: Ubuntu 24.04 (ROS 2 Jazzy), Windows 11 + WSL2, macOS + Docker

**Reader Environment**:
- Web: Modern browsers (Chrome, Firefox, Safari, Edge) on desktop and mobile
- Mobile: iOS 15+ and Android 10+ with responsive design
- PDF: Cross-platform PDF readers with hyperlink support

### Performance Goals

**Book Website**:
- Page load: <3 seconds on standard broadband (passing Core Web Vitals)
- Search latency: <500ms for keyword queries
- Mobile rendering: 100% content readable without horizontal scrolling
- Build time: <5 minutes for full site rebuild

**Code Examples**:
- Setup time: <2 hours for complete dev environment (Docker pull + build)
- Simulation: Real-time performance (30+ FPS) on NVIDIA GPU with 8GB+ VRAM
- Code execution: 100% of examples run without modification following setup docs

### Constraints

**Content Quality**:
- Word count: 18,000-25,000 words (≈1,285-1,785 words/chapter average)
- Citations: ≥20 sources total, ≥60% peer-reviewed from 2018-2025
- Plagiarism: <1% similarity on Grammarly/Copyleaks (excluding citations)
- Readability: Flesch-Kincaid Grade Level 10-12

**Code Quality**:
- ROS 2-native: Python rclpy only (no ROS 1 compatibility layers)
- Containerized: All examples runnable via Docker with provided Dockerfiles
- Tested: Unit tests for core functions, integration tests for ROS 2 nodes
- Documented: Each example includes README, expected output, troubleshooting

**Timeline**:
- Week 10: Complete draft of all 14 chapters
- Week 12: Pass all quality gates (plagiarism, citation audit, technical review)
- Week 13: Live on GitHub Pages with full functionality

### Scale/Scope

**Content**:
- 14 chapters × ≈1,400 words = 19,600 words target
- ≈50-70 code examples (3-5 per chapter)
- ≈30-40 diagrams/visualizations
- ≈15-20 video demonstrations
- ≈100-150 exercises and self-assessment questions

**Code Repository**:
- Estimated ≈5,000-8,000 lines of Python code (ROS 2 nodes, utilities)
- ≈20-30 Dockerfiles and docker-compose configurations
- ≈15-20 URDF robot description files
- ≈10-15 Isaac Sim scene files

**Community**:
- Target: ≥3 instructor adoptions in first year
- Target: ≥100 independent learners completing ≥8 chapters in first 6 months
- Target: ≥10 community contributions (corrections, improvements) in first 3 months

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Constitution Reference**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md)

This project is creating an **academic research paper** (5,000-7,000 words) titled "AI-Native Software Development: Principles and Practices" as part of a larger book on Physical and Humanoid Robotics. However, the **current feature** is creating the **capstone course and book** itself, not the research paper.

### Applicability Analysis

The constitution in `.specify/memory/constitution.md` governs the **research paper** (one chapter of this book), NOT the full book/course creation process. The constitution's standards apply to:
- ✅ **Chapter content** that makes technical/academic claims (must be cited, peer-reviewed sources)
- ✅ **Technical accuracy** of robotics/AI concepts presented
- ✅ **Citation standards** (APA 7th edition, ≥20 sources, ≥60% peer-reviewed)
- ✅ **Plagiarism prevention** (zero tolerance, <1% similarity)
- ✅ **Reproducibility** (all code examples must be executable)

### Constitution Principles Applied to This Project

**I. Core Principles (from Constitution)**

1. **Accuracy via Primary Source Verification**
   - ✅ All technical claims about ROS 2, Isaac Sim, VLA models must be cited to official documentation or peer-reviewed papers
   - ✅ Code examples must be tested and verified functional
   - ✅ Hardware specifications must be current (2024-2025) and vendor-verified

2. **Clarity for Computer Science Academic Audience**
   - ✅ Target audience: Advanced CS/AI/Robotics students (aligns with constitution's graduate-level CS audience)
   - ✅ Readability: Flesch-Kincaid Grade 10-12 (matches constitution requirement)
   - ✅ Technical terminology defined on first use

3. **Full Reproducibility of Every Claim**
   - ✅ All code examples Dockerized and tested
   - ✅ Hardware BOMs with specific part numbers and vendors
   - ✅ Setup instructions detailed enough for independent reproduction
   - ✅ All URLs archived (Wayback Machine)

4. **Maximum Rigor (Peer-Reviewed Sources Preferred)**
   - ✅ ≥20 sources with ≥60% peer-reviewed from 2018-2025 (matches constitution ≥50% requirement)
   - ✅ Source hierarchy respected (peer-reviewed journals > conferences > technical books > official docs)

**II. Mandatory Standards (from Constitution)**

**A. Citation and Attribution**
- ✅ APA 7th edition (matches constitution)
- ✅ Zotero for reference management
- ✅ DOIs required where available
- ✅ Zero orphaned citations/references

**B. Source Quality Threshold**
- ✅ ≥20 sources total (matches constitution ≥15 minimum)
- ✅ ≥60% peer-reviewed (exceeds constitution ≥50% requirement)
- ✅ ≥3 recent (2020-2025)
- ✅ Source diversity (venues, geography, perspectives)

**C. Plagiarism and Originality**
- ✅ <1% Turnitin/Grammarly similarity (exceeds constitution <5% requirement)
- ✅ Dual validation: Grammarly Premium + Copyleaks
- ✅ Multiple checks: after each chapter, after full draft, before final submission

**D. Readability and Accessibility**
- ✅ Flesch-Kincaid Grade 10-12 (matches constitution)
- ✅ Mobile and desktop rendering (constitution focuses on PDF, we exceed with web + PDF)
- ✅ Tools: Hemingway Editor, Grammarly for readability metrics

**III. Quality Gates Alignment**

Constitution defines 4 gates for research paper; we adapt for book project:

- **Gate 1 (Outline Approval)** → **Week 1 Milestone**: All 14 chapter outlines approved with word allocation
- **Gate 2 (Section Reviews)** → **Week 2-8 Milestones**: Each chapter reviewed after drafting (readability, citations, plagiarism check)
- **Gate 3 (Complete Draft)** → **Week 10 Milestone**: Full book integration, complete references, <1% plagiarism, 18k-25k words
- **Gate 4 (Final Submission)** → **Week 12 Milestone**: All quality gates passed, live on GitHub Pages

### Constitution Compliance Summary

| Principle/Standard | Constitution Requirement | This Project | Status |
|-------------------|-------------------------|-------------|---------|
| Primary sources | All claims cited | ✅ All technical claims cited | PASS |
| Clarity | FK Grade 10-12 | ✅ FK Grade 10-12 | PASS |
| Reproducibility | All claims verifiable | ✅ Code tested, hardware specified | PASS |
| Peer-reviewed % | ≥50% | ✅ ≥60% | PASS |
| Total sources | ≥15 | ✅ ≥20 | PASS |
| Citation style | APA 7th | ✅ APA 7th | PASS |
| Plagiarism | <5% similarity | ✅ <1% target | PASS |
| Word count | 5,000-7,000 (for paper) | ✅ 18,000-25,000 (book scale) | N/A (different scope) |
| Quality gates | 4 gates | ✅ 4 adapted gates | PASS |

**Verdict**: ✅ **PASS** - Project meets or exceeds all applicable constitution standards. The book project applies constitution principles at larger scale (14 chapters vs. single paper).

**Deviations Justified**:
- **Word count**: Constitution specifies 5,000-7,000 words for single research paper; this project is 18,000-25,000 words for full book (14 chapters). Justified by larger scope.
- **Timeline**: Constitution suggests 6-week timeline for paper; this project allocates 10 weeks for book draft. Justified by 3-4x content volume.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-humanoid-robotics-capstone/
├── spec.md                    # Feature specification (completed)
├── plan.md                    # This file - implementation plan
├── research.md                # Phase 0: Technology decisions and best practices
├── data-model.md              # Phase 1: Content structure (chapters, exercises, citations)
├── quickstart.md              # Phase 1: Getting started guide for authors/contributors
├── contracts/                 # Phase 1: API contracts (if applicable - may be N/A)
├── checklists/
│   └── requirements.md        # Spec validation checklist (completed)
└── tasks.md                   # Phase 2: Generated by /sp.tasks (NOT by /sp.plan)
```

### Source Code (repository root)

**Structure Decision**: This is a **documentation/educational content project** with associated code examples, NOT a traditional software application. We use a **monorepo structure** with separate top-level directories for book content and code examples.

```text
/
├── book/                      # Docusaurus source (book content)
│   ├── docusaurus.config.js   # Docusaurus configuration
│   ├── sidebars.js            # Navigation structure
│   ├── docs/                  # Markdown chapters
│   │   ├── 01-intro.md
│   │   ├── 02-landscape.md
│   │   ├── 03-ros2.md
│   │   ├── ... (14 chapters total)
│   │   └── 14-hardware.md
│   ├── static/                # Images, diagrams, assets
│   │   ├── img/
│   │   ├── diagrams/
│   │   └── videos/ (links to YouTube)
│   ├── src/                   # Custom React components (if needed)
│   │   ├── components/
│   │   └── pages/
│   └── blog/                  # Optional: Release notes, updates
│
├── code-examples/             # Executable ROS 2 + Isaac Sim code
│   ├── chapter-03-ros2/
│   │   ├── hello_ros2/        # ROS 2 package
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── README.md
│   ├── chapter-04-urdf/
│   ├── chapter-05-digital-twins/
│   ├── ... (one directory per chapter with code)
│   └── chapter-13-capstone/
│       ├── full_stack/        # Complete integrated system
│       ├── reference_impl/    # Reference implementation
│       └── starter_code/      # Starting point for students
│
├── hardware/                  # Hardware specifications and guides
│   ├── economy-kit.md         # ~$700 kit BOM
│   ├── midrange-kit.md        # ~$2k-3k kit BOM
│   ├── full-lab.md            # ~$10k+ lab BOM
│   ├── assembly/              # Assembly instructions
│   └── calibration/           # Calibration procedures
│
├── course-materials/          # Course curriculum (separate from book)
│   ├── syllabus.md
│   ├── week-01/ ... week-13/  # Weekly materials
│   │   ├── lecture-slides.md  # Slide templates
│   │   ├── exercises.md
│   │   ├── solutions/
│   │   └── grading-rubric.md
│   └── assessments/
│       ├── midterm-checkpoint.md
│       └── final-capstone-rubric.md
│
├── references/                # Citation management
│   ├── bibliography.bib       # Central BibTeX file (Zotero export)
│   ├── sources/               # PDF copies of cited papers (private, not committed)
│   └── citation-log.md        # Citation audit trail
│
├── .github/                   # CI/CD and automation
│   └── workflows/
│       ├── deploy-book.yml    # Deploy to GitHub Pages
│       ├── test-code.yml      # Test all code examples
│       ├── check-links.yml    # Validate external links
│       └── plagiarism.yml     # Automated plagiarism checks
│
├── docker/                    # Shared Docker configurations
│   ├── ros2-humble/
│   │   └── Dockerfile         # Base ROS 2 Humble image
│   ├── isaac-sim/
│   │   └── Dockerfile         # Isaac Sim + ROS 2 image
│   └── full-dev/
│       └── Dockerfile         # Complete dev environment
│
├── scripts/                   # Utility scripts
│   ├── generate-pdf.sh        # Export Docusaurus to PDF
│   ├── check-wordcount.sh     # Verify word count per chapter
│   ├── validate-citations.py  # Check citation completeness
│   └── plagiarism-check.sh    # Run Grammarly + Copyleaks
│
├── .gitignore
├── README.md                  # Project overview
├── LICENSE                    # MIT or Apache 2.0
├── CONTRIBUTING.md            # Community contribution guide
└── package.json               # npm dependencies for Docusaurus
```

**Rationale**:
- **Monorepo**: Keeps book content and code examples synchronized; easier version management
- **Separate top-level dirs**: Clear separation between book (docs), code (examples), course materials, and infrastructure
- **Chapter-based organization**: Code examples mirror book chapter structure for easy navigation
- **Docker per chapter**: Each chapter's examples are self-contained with own Dockerfile
- **Centralized references**: Single BibTeX file prevents duplicate citations and simplifies management

---

## Architecture

### Content Development Architecture

**Authoring Workflow**:

```
1. Chapter Outline → 2. Research & Citations → 3. Draft Writing → 4. Code Examples → 5. Review & Edit
     ↓                       ↓                         ↓                    ↓                  ↓
   Word allocation      Zotero library         Markdown in          Docker +           Grammarly +
   per section          Source PDF             book/docs/           ROS 2 testing      readability
                        collection                                                      check
```

**Citation Workflow**:

```
1. Identify Source → 2. Add to Zotero → 3. Export BibTeX → 4. Cite in Markdown → 5. Validate
     ↓                      ↓                   ↓                    ↓                  ↓
   Google Scholar    Tag with chapter    Auto-sync to         [@key] syntax      No orphaned
   IEEE/ACM          category            bibliography.bib                        refs/cites
```

**Code Development Workflow**:

```
1. Define Learning → 2. Write Code → 3. Test Locally → 4. Dockerize → 5. Document → 6. Integrate
   Objective             Example          ROS 2 + Sim       Verify        README +      Embed in
                                                            portable      troubleshoot   chapter
```

**Quality Assurance Workflow**:

```
Each Chapter:
  Draft → Plagiarism Check (must be <5% at draft stage) → Readability (FK 10-12) → Peer Review → Revise

Full Book:
  Integration → Final Plagiarism (<1%) → Citation Audit (100%) → Code Validation (100%) → Deploy
```

### Technical Architecture

**Book Publication Pipeline**:

```
Markdown (.md)
    ↓
Docusaurus Build (npm run build)
    ↓
Static HTML/CSS/JS (build/)
    ↓
GitHub Actions Deploy
    ↓
GitHub Pages (physicalai-robotics.github.io)
    ↓
PDF Export (docusaurus-pdf or manual print)
```

**Code Example Execution Pipeline**:

```
User clones repo
    ↓
cd code-examples/chapter-XX/
    ↓
docker-compose up (pulls base images, builds)
    ↓
ROS 2 + Isaac Sim environment ready
    ↓
Run example: ros2 run <package> <node>
    ↓
Expected output documented in README
```

**CI/CD Pipeline** (GitHub Actions):

```
On Push to Main:
  1. Build Docusaurus site
  2. Run link checker (all external URLs accessible)
  3. Test code examples (basic compilation/import checks)
  4. Deploy to GitHub Pages (if all pass)

On Pull Request:
  1. Build preview
  2. Check new/modified files for plagiarism
  3. Validate citations (no orphaned refs)
  4. Comment PR with preview link
```

---

## Implementation Approach

### Phase 0: Foundation Setup (Week 1)

**Goal**: Establish infrastructure, tooling, and content framework before authoring.

**Tasks**:

1. **Repository Initialization**
   - Create GitHub repository: `physical-ai-humanoid-robotics-book`
   - Initialize with README, LICENSE (MIT), .gitignore
   - Set up branch protection for main (require PR reviews)

2. **Docusaurus Setup**
   - Install Node.js 18+ and npm
   - Initialize Docusaurus project: `npx create-docusaurus@latest book classic`
   - Configure `docusaurus.config.js`:
     - Site title: "Physical AI & Humanoid Robotics"
     - URL: GitHub Pages URL
     - Theme: Dark/light toggle
     - Search: Algolia DocSearch (apply for free tier)
   - Create initial sidebar structure with 14 chapter placeholders

3. **Citation Management**
   - Install Zotero 6.x + Better BibTeX plugin
   - Create project library: "PhysicalAI_HumanoidRobotics"
   - Set up auto-export to `references/bibliography.bib`
   - Configure APA 7th edition style

4. **Docker Base Images**
   - Create `docker/ros2-humble/Dockerfile`:
     - Base: osrf/ros:humble-desktop-full
     - Install: Python 3.10, numpy, pytorch, transformers
     - USER setup for non-root development
   - Create `docker/isaac-sim/Dockerfile`:
     - Base: nvcr.io/nvidia/isaac-sim:2024.1.0
     - Install ROS 2 Humble bridge
     - Configure X11 forwarding for GUI
   - Push to Docker Hub as public images

5. **Quality Assurance Tools**
   - Set up Grammarly Premium account (or trial)
   - Set up Copyleaks account (or trial)
   - Install Hemingway Editor (desktop or web)
   - Create `scripts/plagiarism-check.sh` wrapper

6. **Chapter Outline Creation**
   - For each of 14 chapters:
     - Create `book/docs/XX-title.md` with outline structure:
       - Learning objectives (3-5 per chapter)
       - Section headings (3-5 sections)
       - Word allocation per section
       - Key concepts to cover
       - Code examples planned (2-5 per chapter)
       - Exercises planned (5-10 per chapter)
       - Citations needed (identify 1-3 key sources per chapter)
   - **Outcome**: 14 detailed outlines totaling 18,000-25,000 word budget

**Milestone**: Week 1 Complete - Infrastructure ready, outlines approved

---

### Phase 1: Source Identification and Base Content (Weeks 2-3)

**Goal**: Identify ≥20 high-quality sources and draft foundational chapters (1-2).

**Tasks**:

1. **Source Identification** (Week 2)
   - **Target**: Identify 25-30 candidate sources (filter to ≥20)
   - **Databases**:
     - IEEE Xplore: Search "ROS 2 robotics" (2020-2025)
     - ACM Digital Library: Search "embodied AI", "vision-language-action" (2020-2025)
     - arXiv: Search "humanoid robotics", "sim-to-real" (2022-2025)
     - Google Scholar: Search "NVIDIA Isaac Sim", "Nav2 navigation" (2020-2025)
   - **Required**:
     - ≥15 peer-reviewed journal/conference papers
     - ≥3 from 2023-2025 (recent)
     - ≥2 foundational (may be pre-2018 if seminal)
   - **Process**:
     - For each source: Add to Zotero with tags (chapter relevance, type)
     - Download PDF to `references/sources/` (local only, not committed)
     - Create `references/citation-log.md` tracking: source → chapters → claims

2. **Chapter 1: Introduction to Physical AI and Embodied Intelligence** (Week 2-3)
   - **Word target**: 1,200-1,500 words
   - **Sections**:
     1. What is Physical AI? (300 words)
     2. The Embodiment Hypothesis (300 words)
     3. From Simulation to Reality (300 words)
     4. Course Overview and Learning Path (300 words)
   - **Code**: None (conceptual chapter)
   - **Citations**: ≥3 sources (embodiment theory, physical AI definitions)
   - **Exercises**: Reflection questions on embodied vs. disembodied intelligence
   - **Process**:
     - Draft → Plagiarism check → Readability check → Peer review → Finalize
     - Target: <5% similarity at draft stage

3. **Chapter 2: The Humanoid Robotics Landscape (2025)** (Week 3)
   - **Word target**: 1,400-1,600 words
   - **Sections**:
     1. Why Humanoid Form Factor? (400 words)
     2. State of the Art: Research Platforms (400 words)
     3. Key Technical Challenges (400 words)
     4. This Course's Approach (200 words)
   - **Code**: None (survey chapter)
   - **Citations**: ≥5 sources (recent humanoid robotics papers, industry reports)
   - **Exercises**: Compare 3 humanoid platforms on key dimensions
   - **Process**: Same as Chapter 1

**Milestone**: Week 3 Complete - ≥20 sources identified, Chapters 1-2 drafted

---

### Phase 2: Core Technical Chapters (Weeks 4-6)

**Goal**: Draft Chapters 3-7 (ROS 2 fundamentals through perception).

**Chapters**:

- **Chapter 3: ROS 2 – The Robotic Nervous System** (Week 4)
  - Word target: 1,500-1,700
  - Code examples: 5 (hello world, publisher/subscriber, services, actions, parameters)
  - Docker: `chapter-03-ros2/` with basic ROS 2 Humble environment
  - Key concepts: Nodes, topics, services, actions, parameters, launch files
  - Citations: ≥2 (ROS 2 documentation, ROS 2 design papers)

- **Chapter 4: URDF & Robot Modeling for Humanoids** (Week 4-5)
  - Word target: 1,400-1,600
  - Code examples: 3 (simple URDF, humanoid URDF, URDF visualization in RViz)
  - Key concepts: Links, joints, coordinate frames, URDF/xacro syntax
  - Citations: ≥2 (URDF specification, humanoid modeling papers)

- **Chapter 5: Digital Twins – Gazebo, Unity, and NVIDIA Isaac Sim** (Week 5)
  - Word target: 1,600-1,800
  - Code examples: 3 (spawn robot in Gazebo Classic, spawn in Isaac Sim, comparison)
  - Key concepts: Physics simulation, rendering, sensor simulation, sim-to-real gap
  - Citations: ≥3 (Isaac Sim papers, Gazebo docs, simulation comparison studies)

- **Chapter 6: Sensor Simulation and Real-World Integration** (Week 5-6)
  - Word target: 1,400-1,600
  - Code examples: 4 (LiDAR in sim, depth camera in sim, IMU in sim, RealSense integration)
  - Key concepts: Sensor models, noise models, camera calibration, sensor fusion
  - Citations: ≥2 (sensor simulation papers, RealSense documentation)

- **Chapter 7: NVIDIA Isaac ROS – Accelerated Perception and VSLAM** (Week 6)
  - Word target: 1,500-1,700
  - Code examples: 4 (object detection, image segmentation, visual odometry, VSLAM)
  - Docker: Isaac ROS containers with CUDA support
  - Key concepts: GPU acceleration, DNN inference, visual-inertial odometry, loop closure
  - Citations: ≥3 (Isaac ROS documentation, VSLAM papers, DNN perception papers)

**Process per chapter**:
1. Write content (Markdown in `book/docs/`)
2. Develop code examples (in `code-examples/chapter-XX/`)
3. Test code examples locally (ROS 2 + Isaac Sim)
4. Create Dockerfile and README for chapter
5. Run plagiarism check (<5% target at draft stage)
6. Run readability check (FK 10-12)
7. Self-review and revise
8. Commit to Git (chapter draft complete)

**Milestone**: Week 6 Complete - Chapters 3-7 drafted and tested

---

### Phase 3: Advanced Integration Chapters (Weeks 7-8)

**Goal**: Draft Chapters 8-11 (navigation, VLA models, manipulation).

**Chapters**:

- **Chapter 8: Navigation and Bipedal Locomotion with Nav2** (Week 7)
  - Word target: 1,500-1,700
  - Code examples: 4 (Nav2 setup, costmap config, path planning, behavior trees)
  - Key concepts: Occupancy grids, path planning (A*, RRT), costmaps, recovery behaviors
  - Citations: ≥3 (Nav2 documentation, path planning papers, bipedal control papers)

- **Chapter 9: Vision-Language-Action Models (VLA) for Robotics** (Week 7)
  - Word target: 1,400-1,600
  - Code examples: 2 (VLA overview, pre-trained model demo)
  - Key concepts: Transformers, embodied AI, vision-language grounding, action prediction
  - Citations: ≥4 (VLA papers: RT-1, RT-2, PaLM-E, etc.)

- **Chapter 10: From Voice to Action – Whisper + LLM + ROS 2 Planning** (Week 8)
  - Word target: 1,600-1,800
  - Code examples: 5 (Whisper integration, LLM API calls, prompt engineering, ROS 2 action client, full pipeline)
  - Docker: Include Whisper model and LLM API setup
  - Key concepts: Speech recognition, LLM reasoning, task decomposition, ROS 2 action servers
  - Citations: ≥3 (Whisper paper, LLM papers, embodied reasoning papers)

- **Chapter 11: Manipulation and Dexterous Grasping** (Week 8)
  - Word target: 1,400-1,600
  - Code examples: 4 (MoveIt 2 setup, motion planning, grasp planning, execution)
  - Key concepts: Inverse kinematics, collision checking, grasp pose estimation, trajectory execution
  - Citations: ≥3 (MoveIt 2 documentation, grasp planning papers, manipulation benchmarks)

**Milestone**: Week 8 Complete - Chapters 8-11 drafted and tested

---

### Phase 4: Sim-to-Real and Capstone (Week 9)

**Goal**: Draft Chapters 12-13 (sim-to-real transfer, capstone project).

**Chapters**:

- **Chapter 12: Sim-to-Real Transfer Techniques** (Week 9)
  - Word target: 1,500-1,700
  - Code examples: 3 (domain randomization, system identification, calibration procedures)
  - Key concepts: Reality gap, domain adaptation, sensor/actuator calibration, robust control
  - Citations: ≥4 (sim-to-real papers, domain randomization, transfer learning)

- **Chapter 13: Capstone Project – Autonomous Conversational Humanoid** (Week 9)
  - Word target: 2,000-2,500 (longest chapter - full integration)
  - Code examples: 1 large project (reference implementation) + starter code
  - **Structure**:
     - Project overview (300 words)
     - System architecture (400 words)
     - Integration checklist (300 words)
     - Step-by-step implementation guide (800 words)
     - Testing and debugging (400 words)
     - Evaluation rubric (300 words)
  - Key concepts: System integration, modular architecture, testing strategies, demonstration scenarios
  - Citations: ≥2 (integrated robotics systems, capstone project pedagogy)

**Milestone**: Week 9 Complete - Chapters 12-13 drafted

---

### Phase 5: Hardware Guide and Final Integration (Week 10)

**Goal**: Complete Chapter 14 and integrate full book.

**Tasks**:

1. **Chapter 14: Hardware Guide & Lab Architectures** (Week 10)
   - Word target: 1,400-1,600
   - **Structure**:
     - Simulation-only setup (300 words)
     - Economy kit (~$700): Jetson Orin Nano, RealSense D435, servo kit (400 words)
     - Mid-range kit (~$2k-3k): Add Unitree Go2, better cameras (400 words)
     - Full lab (~$10k+): Multiple robots, motion capture, compute cluster (400 words)
   - **Deliverables**:
     - `hardware/economy-kit.md` with detailed BOM
     - `hardware/midrange-kit.md` with detailed BOM
     - `hardware/full-lab.md` with detailed BOM
     - Assembly and calibration guides
   - Code examples: None (hardware documentation)
   - Citations: ≥2 (hardware specifications, educational robotics lab papers)

2. **Book Integration**
   - Combine all 14 chapters in Docusaurus
   - Update sidebar navigation with proper ordering
   - Add cross-references between chapters (hyperlinks)
   - Create table of contents with progress tracking
   - Add introduction landing page
   - Add glossary of terms

3. **Abstract and Conclusion**
   - Write book abstract (150-250 words)
   - Write concluding chapter (if needed) or concluding section in Ch 14

4. **Complete References**
   - Export final `bibliography.bib` from Zotero
   - Validate all in-text citations have bibliography entries
   - Validate all bibliography entries are cited in text
   - Count: Verify ≥20 sources, ≥60% peer-reviewed

**Milestone**: Week 10 Complete - Complete draft (18,000-25,000 words, all 14 chapters)

---

### Phase 6: Quality Assurance and Revision (Weeks 11-12)

**Goal**: Pass all quality gates and prepare for publication.

**Week 11 Tasks**:

1. **Full Plagiarism Check**
   - Run Grammarly Premium on all chapters
   - Run Copyleaks on all chapters
   - Target: <1% similarity (excluding citations)
   - Address any flagged passages (rewrite or add citations)
   - Re-check until target achieved

2. **Citation Audit**
   - Run `scripts/validate-citations.py`:
     - Check: Every in-text citation has bibliography entry
     - Check: Every bibliography entry is cited in text
     - Check: APA 7th edition format compliance
     - Check: DOIs present where available
   - Fix all violations
   - Verify: ≥20 sources total, ≥60% peer-reviewed, ≥3 from 2023-2025

3. **Code Validation**
   - Test every code example:
     - `docker-compose up` succeeds
     - README instructions complete and accurate
     - Expected outputs documented and verified
   - Fix any broken examples
   - Verify: 100% of examples execute successfully

4. **Readability Check**
   - Run Hemingway Editor on each chapter
   - Verify: Flesch-Kincaid Grade Level 10-12 for all chapters
   - Revise any chapters outside target range

5. **Word Count Verification**
   - Run `scripts/check-wordcount.sh`
   - Verify: Total 18,000-25,000 words (excluding code blocks)
   - Adjust if outside range (trim or expand)

**Week 12 Tasks**:

1. **Peer Review**
   - Send draft to 2-3 peer reviewers (CS grad students or faculty)
   - Collect feedback on:
     - Technical accuracy
     - Clarity and pedagogy
     - Code example quality
     - Completeness
   - Address all critical feedback
   - Incorporate suggested improvements

2. **Final Polish**
   - Grammar and style pass (Grammarly)
   - Consistency check (terminology, formatting)
   - Fix all typos and broken links
   - Update all diagrams to final versions
   - Record and embed all video demonstrations

3. **PDF Export**
   - Generate PDF from Docusaurus build
   - Verify: Formatting preserved, code syntax highlighting works
   - Verify: Hyperlinks functional (internal and external)
   - Verify: Page numbers, headers, table of contents

4. **GitHub Pages Deployment**
   - Configure GitHub Actions for auto-deploy
   - Deploy to GitHub Pages
   - Verify: Site accessible, search works, mobile rendering correct
   - Performance test: Page load <3 seconds, Core Web Vitals pass

**Milestone**: Week 12 Complete - Book passes all quality gates, live on GitHub Pages

---

## Milestones and Timeline

### 10-Week Development Timeline

| Week | Milestone | Deliverables | Word Count (Cumulative) |
|------|-----------|--------------|------------------------|
| 1 | Foundation Setup | Repo, Docusaurus, Docker images, 14 chapter outlines | 0 (outlines only) |
| 2 | Sources + Ch 1 | ≥20 sources identified, Chapter 1 drafted | ~1,400 |
| 3 | Ch 2 Complete | Chapter 2 drafted | ~2,800 |
| 4 | Ch 3-4 Complete | Chapters 3-4 drafted + code examples | ~6,000 |
| 5 | Ch 5-6 Complete | Chapters 5-6 drafted + code examples | ~9,200 |
| 6 | Ch 7 Complete | Chapter 7 drafted + code examples | ~10,800 |
| 7 | Ch 8-9 Complete | Chapters 8-9 drafted + code examples | ~14,000 |
| 8 | Ch 10-11 Complete | Chapters 10-11 drafted + code examples | ~17,400 |
| 9 | Ch 12-13 Complete | Chapters 12-13 drafted + code examples | ~21,600 |
| 10 | Ch 14 + Integration | Chapter 14, full book integrated, references complete | ~23,000 (target) |
| 11 | Quality Assurance | Plagiarism (<1%), citation audit, code validation, readability | ~23,000 (polished) |
| 12 | Final Review + Deploy | Peer review, PDF export, GitHub Pages live | ~23,000 (final) |

### Week 13: Course Launch Buffer

- Week 13 reserved for:
  - Last-minute fixes from user feedback
  - Course materials finalization (syllabus, rubrics)
  - Instructor onboarding (if applicable)
  - Marketing and community outreach

### Key Milestones

**M1 (Week 1)**: ✅ Infrastructure Ready
- Docusaurus site builds
- Docker base images available
- Zotero library configured
- All 14 chapter outlines approved

**M2 (Week 3)**: ✅ Sources and Foundation
- ≥20 high-quality sources identified and catalogued
- Chapters 1-2 complete (conceptual foundation)

**M3 (Week 6)**: ✅ Technical Foundation
- Chapters 3-7 complete (ROS 2, URDF, simulation, sensors, perception)
- Students can set up dev environment and run basic examples

**M4 (Week 8)**: ✅ Advanced Integration
- Chapters 8-11 complete (navigation, VLA, voice interface, manipulation)
- Core capstone components implemented

**M5 (Week 10)**: ✅ Complete Draft
- All 14 chapters complete
- 18,000-25,000 word target achieved
- All code examples functional

**M6 (Week 12)**: ✅ Production Ready
- <1% plagiarism score
- 100% citation audit pass
- 100% code examples validated
- Live on GitHub Pages

---

## Risks and Mitigation Strategies

### Risk 1: Insufficient Peer-Reviewed Sources

**Likelihood**: Medium
**Impact**: High (fails quality gate)

**Mitigation**:
- Front-load source identification (Week 2)
- Target 25-30 candidates to filter to ≥20
- Use academic databases (IEEE, ACM, arXiv) systematically
- Allocate time in Week 11 for additional source hunting if needed

**Contingency**:
- Expand search to adjacent fields (software engineering, HCI, AI/ML)
- Use seminal books from academic publishers as partial substitutes
- Leverage preprints (arXiv) if peer-reviewed versions unavailable (note as preprints)

---

### Risk 2: Scope Creep (Exceeds 25,000 Words)

**Likelihood**: High
**Impact**: Medium (requires significant editing)

**Mitigation**:
- Strict word allocation per chapter (enforced in outlines)
- Weekly word count tracking (`scripts/check-wordcount.sh`)
- Prioritize depth over breadth
- Identify "nice to have" content for appendices early

**Contingency**:
- Cut less critical subsections (move to appendices or bonus chapters)
- Condense examples (use one strong example instead of multiple)
- Tighten prose (eliminate redundancy, wordiness)

---

### Risk 3: Code Examples Break Due to Platform Updates

**Likelihood**: Medium
**Impact**: Medium (delays publication, damages credibility)

**Mitigation**:
- Pin exact versions: ROS 2 Humble (LTS), Isaac Sim 2024.1.x
- Use Docker to freeze dependencies
- Test all examples weekly during development
- Document version compatibility matrix

**Contingency**:
- Create version-specific branches (e.g., `isaac-sim-2024`, `isaac-sim-2025`)
- Maintain migration guides between versions
- Community contributions for newer platforms

---

### Risk 4: Plagiarism False Positives

**Likelihood**: Medium
**Impact**: Medium (delays submission, requires revision)

**Mitigation**:
- Run plagiarism checks early and often (after each chapter)
- Use varied sentence structures and vocabulary
- Favor synthesis over summary
- Quote directly when paraphrasing would obscure meaning

**Contingency**:
- Document justification for unavoidable similarity (technical terms, standard methodology descriptions)
- Rewrite flagged passages using different structure
- Break up similar passages with original analysis
- Consult advisor/reviewer if persistent false positives

---

### Risk 5: Insufficient Peer Review Bandwidth

**Likelihood**: Medium
**Impact**: Medium (quality issues missed, user experience problems)

**Mitigation**:
- Identify 2-3 peer reviewers in Week 1
- Provide clear review guidelines and timeline (Week 11-12)
- Offer co-authorship credit or acknowledgment as incentive
- Break review into chunks (Chapters 1-7, then 8-14)

**Contingency**:
- Self-review using structured checklist (spec quality checklist as template)
- Engage community reviewers (post draft chapters on relevant forums for feedback)
- Hire professional technical editor (budget permitting)

---

### Risk 6: Hardware Unavailability or Discontinuation

**Likelihood**: Low-Medium
**Impact**: Medium (Chapter 14 incomplete, physical deployment impossible)

**Mitigation**:
- Specify hardware by functional requirements, not just specific models
- Include "equivalent alternatives" section in hardware guide
- Verify current availability of all recommended components (Week 10)
- Maintain vendor diversity (multiple options per component)

**Contingency**:
- Community contributions to update alternatives list
- Create compatibility guide for substituting components
- Focus on simulation-first approach (physical hardware optional)

---

### Risk 7: Docusaurus or Deployment Issues

**Likelihood**: Low
**Impact**: Medium (delays publication, affects user experience)

**Mitigation**:
- Test Docusaurus build locally weekly
- Use Docusaurus LTS version (stable)
- Configure GitHub Actions early (Week 1) and test regularly
- Monitor Docusaurus changelogs for breaking changes

**Contingency**:
- Fallback to manual build and deploy
- Use alternative static site generator (Jekyll, MkDocs) if critical issues
- Host on alternative platform (Netlify, Vercel) if GitHub Pages fails

---

### Risk 8: Timeline Slippage

**Likelihood**: Medium
**Impact**: High (miss 13-week course launch deadline)

**Mitigation**:
- Build in 1-week buffer (Week 13 reserved for fixes)
- Track progress against weekly milestones (TodoWrite)
- Identify critical path (Chapters 3-13 must be complete for capstone)
- Prioritize P1 chapters (skip P3 sections if needed)

**Contingency**:
- Release book in phases (Chapters 1-10 first, 11-14 later)
- Compress Week 11-12 quality gates if running late (focus on critical checks)
- Enlist additional authors/reviewers for parallel work

---

## Community Engagement and Maintenance Plan

### Launch Strategy (Week 13+)

1. **Announcement**:
   - Post on Reddit (r/robotics, r/ROS2, r/MachineLearning)
   - Share on Twitter/X, LinkedIn
   - Email robotics education mailing lists
   - Submit to Hacker News, Lobsters

2. **Instructor Outreach**:
   - Email 10-15 robotics professors with sample chapters
   - Offer virtual Q&A session for interested instructors
   - Provide sample syllabus and course materials

3. **Community Building**:
   - Enable GitHub Discussions for Q&A
   - Create issue templates for bug reports, improvements, platform adaptations
   - Set up Discord or Slack channel (optional)

### Maintenance Commitments

**Ongoing** (Months 1-12):

1. **Issue Response**:
   - Critical bugs (blocking errors): <24 hours
   - Enhancements/questions: <7 days
   - Community PRs: Review within 7 days

2. **Content Updates**:
   - Quarterly: Check for broken links (automated via GitHub Actions)
   - Bi-annually: Update platform versions (ROS 2, Isaac Sim) if needed
   - Annually: Major revision for new releases

3. **Community Contributions**:
   - Actively encourage corrections, improvements, translations
   - Maintain CONTRIBUTING.md with clear guidelines
   - Recognize contributors in acknowledgments section

4. **Metrics Tracking**:
   - GitHub Stars, Forks, Issues, PRs
   - Website analytics (if enabled): Visitors, popular chapters, search queries
   - Instructor adoption tracking (self-reported or surveyed)
   - Student completion rate (based on GitHub repo clones and community feedback)

### Long-Term Vision (Year 2+)

1. **Platform Expansion**:
   - Port examples to ROS 2 Jazzy (2026 LTS)
   - Add support for alternative simulation platforms (Gazebo Harmonic)
   - Integrate with cloud robotics platforms (AWS RoboMaker, Google Cloud)

2. **Content Expansion**:
   - Bonus chapters: Multi-robot coordination, cloud integration, edge deployment
   - Video lecture series (YouTube companion)
   - Interactive exercises (Jupyter notebooks with Isaac Sim)

3. **Translations**:
   - Community-driven translations: Spanish, Mandarin, French
   - Maintain central English version, link to translations

4. **Academic Recognition**:
   - Submit to robotics education conferences (e.g., IROS Workshop on Education)
   - Seek endorsements from robotics societies (IEEE RAS, etc.)
   - Track citations and adoptions for impact measurement

---

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations identified**. The project meets or exceeds all constitution standards as documented in Constitution Check section above.

---

## Next Steps

**Immediate Actions** (Post-Planning):

1. **✅ `/sp.plan` Complete** - This document
2. **➡️ Phase 0: Create `research.md`** - Document technology decisions
3. **➡️ Phase 1: Create `data-model.md`** - Define content structure
4. **➡️ Phase 1: Create `quickstart.md`** - Author onboarding guide
5. **➡️ Phase 1: Update agent context** - Run update script
6. **➡️ `/sp.tasks`** - Generate actionable task breakdown

**Before Starting Week 1 Development**:

1. Review and approve this plan with stakeholders
2. Set up GitHub repository (if not already created)
3. Install required tools (Node.js, Docker, Zotero)
4. Identify peer reviewers for Week 11-12
5. Block calendar for focused authoring time (estimated 15-20 hours/week)

**Approval Gates**:

- [ ] Plan approved by project lead
- [ ] Infrastructure setup verified (Week 1 tasks can start)
- [ ] Peer reviewers confirmed for Week 11-12
- [ ] Budget approved (if any costs: Grammarly, Copyleaks, hardware)

---

**Plan Status**: ✅ **COMPLETE - Ready for Phase 0 Research**

This comprehensive plan provides detailed architecture, week-by-week breakdown, risk mitigation, and quality assurance strategy for successfully delivering the Physical AI & Humanoid Robotics capstone course and book within the 10-week authoring timeline plus 2-week quality gates.
