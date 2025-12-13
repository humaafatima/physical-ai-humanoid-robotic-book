# Content Data Model: Physical AI & Humanoid Robotics Book

**Feature**: 001-humanoid-robotics-capstone
**Date**: 2025-12-07
**Phase**: Phase 1 - Content Structure Definition

This document defines the structure and relationships of all content entities in the Physical AI & Humanoid Robotics book project.

---

## Entity Definitions

### 1. Chapter

Represents one of the 14 main chapters of the book.

**Attributes**:
- `chapter_number` (integer, 1-14): Sequential chapter number
- `title` (string): Full chapter title
- `slug` (string): URL-friendly identifier (e.g., "03-ros2")
- `word_count_target` (integer): Target word count (1,200-2,500)
- `word_count_actual` (integer): Actual word count (updated during drafting)
- `learning_objectives` (array of strings): 3-5 objectives per chapter
- `sections` (array of Section): 3-5 main sections per chapter
- `code_examples` (array of CodeExample): 0-5 code examples per chapter
- `exercises` (array of Exercise): 5-10 exercises per chapter
- `citations` (array of citation keys): BibTeX keys referenced in chapter
- `status` (enum): `outlined` | `drafting` | `review` | `complete`
- `last_modified` (date): Last edit date

**Relationships**:
- Has many `Section`
- Has many `CodeExample`
- Has many `Exercise`
- References many `Citation`

**Example**:
```yaml
chapter_number: 3
title: "ROS 2 – The Robotic Nervous System"
slug: "03-ros2"
word_count_target: 1600
word_count_actual: 1547
learning_objectives:
  - "Understand ROS 2 architecture and DDS middleware"
  - "Create publishers and subscribers using rclpy"
  - "Implement ROS 2 services and actions"
  - "Launch multi-node systems with launch files"
status: complete
last_modified: 2025-02-15
```

---

### 2. Section

Represents a major section within a chapter (H2 heading level).

**Attributes**:
- `section_number` (string): e.g., "3.1", "3.2"
- `title` (string): Section heading
- `word_count_target` (integer): Allocation within chapter budget
- `content` (markdown): Section body text
- `diagrams` (array of strings): Paths to diagram files (SVG/PNG)

**Relationships**:
- Belongs to one `Chapter`

**Example**:
```yaml
section_number: "3.2"
title: "Topics and Messages"
word_count_target: 400
content: |
  ROS 2 topics enable asynchronous communication between nodes...
diagrams:
  - "static/diagrams/ros2-topic-architecture.svg"
```

---

### 3. CodeExample

Represents an executable code sample with full Docker environment.

**Attributes**:
- `example_id` (string): Unique identifier (e.g., "ch03-hello-ros2")
- `title` (string): Short descriptive title
- `chapter` (integer): Parent chapter number
- `directory` (string): Path in repo (e.g., "code-examples/chapter-03-ros2/hello_ros2/")
- `language` (string): Primary language ("python", "yaml", "bash")
- `files` (array of File): Source files, Dockerfile, docker-compose, README
- `learning_goal` (string): What this example teaches
- `estimated_time` (integer): Minutes to complete (5-60)
- `prerequisites` (array of strings): Required prior examples or knowledge
- `expected_output` (string): What student should see when running
- `common_issues` (array of TroubleshootingItem): Known problems and solutions

**Relationships**:
- Belongs to one `Chapter`
- References `Citation` for technical concepts

**Example**:
```yaml
example_id: "ch03-pub-sub"
title: "Publisher and Subscriber"
chapter: 3
directory: "code-examples/chapter-03-ros2/pub_sub/"
language: "python"
learning_goal: "Demonstrate asynchronous communication via ROS 2 topics"
estimated_time: 15
prerequisites:
  - "ch03-hello-ros2"
  - "Basic Python knowledge"
expected_output: |
  Terminal 1: [INFO] Publishing: "Hello ROS 2: 0"
  Terminal 2: [INFO] I heard: "Hello ROS 2: 0"
common_issues:
  - problem: "ImportError: No module named 'rclpy'"
    solution: "Ensure you're running inside Docker container: docker-compose up"
```

---

### 4. Exercise

Represents a practice problem for students with starter code and solution.

**Attributes**:
- `exercise_id` (string): Unique identifier (e.g., "ch03-ex01")
- `chapter` (integer): Parent chapter
- `title` (string): Exercise title
- `type` (enum): `coding` | `conceptual` | `debugging` | `design`
- `difficulty` (enum): `easy` | `medium` | `hard`
- `problem_statement` (markdown): What student needs to do
- `starter_code` (string): Path to starter files (if coding exercise)
- `solution` (string): Path to solution (hidden from students initially)
- `hints` (array of strings): Progressive hints (reveal one at a time)
- `estimated_time` (integer): Minutes to complete (10-90)
- `assessment_criteria` (array of strings): How to evaluate correctness

**Relationships**:
- Belongs to one `Chapter`

**Example**:
```yaml
exercise_id: "ch03-ex02"
chapter: 3
title: "Create a Velocity Publisher"
type: coding
difficulty: medium
problem_statement: |
  Create a ROS 2 node that publishes `/cmd_vel` messages (geometry_msgs/Twist)
  to control a simulated robot. The robot should move forward at 0.5 m/s for
  5 seconds, then stop.
starter_code: "code-examples/chapter-03-ros2/exercises/ex02_starter/"
solution: "code-examples/chapter-03-ros2/exercises/ex02_solution/"
hints:
  - "Use rclpy.create_timer() to publish at regular intervals"
  - "Remember to call self.destroy_node() after 5 seconds"
estimated_time: 30
assessment_criteria:
  - "Node publishes to /cmd_vel topic"
  - "Linear velocity is 0.5 m/s"
  - "Robot stops after 5 seconds"
```

---

### 5. Citation

Represents a bibliographic reference in APA 7th edition format.

**Attributes**:
- `bibtex_key` (string): Unique BibTeX identifier (e.g., "quigley2009ros")
- `type` (enum): `journal` | `conference` | `book` | `documentation` | `preprint` | `website`
- `title` (string): Full title
- `authors` (array of strings): Author names
- `year` (integer): Publication year
- `venue` (string): Journal name, conference name, or publisher
- `doi` (string, optional): Digital Object Identifier
- `url` (string): Web link (archived if possible)
- `peer_reviewed` (boolean): True if peer-reviewed journal/conference
- `tags` (array of strings): Chapter associations (e.g., ["chapter-03", "chapter-07"])
- `notes` (string, optional): Internal notes on why source is cited

**Relationships**:
- Referenced by many `Chapter`

**Example**:
```yaml
bibtex_key: "macenski2020marathon2"
type: conference
title: "Marathon 2: A Navigation System"
authors:
  - "Steve Macenski"
  - "Francisco Martín"
  - "Ruffin White"
  - "Jonatan Ginés Clavero"
year: 2020
venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)"
doi: "10.1109/IROS45743.2020.9341207"
url: "https://ieeexplore.ieee.org/document/9341207"
peer_reviewed: true
tags: ["chapter-08-navigation"]
notes: "Foundational Nav2 paper, cite for navigation stack architecture"
```

---

### 6. HardwareConfiguration

Represents a bill-of-materials and setup guide for physical robot hardware.

**Attributes**:
- `config_id` (string): Unique identifier (e.g., "economy-kit", "midrange-kit", "full-lab")
- `name` (string): Human-readable name
- `target_budget` (integer): USD cost target
- `components` (array of Component): Individual hardware items
- `total_cost_estimated` (integer): Sum of component costs
- `assembly_guide` (string): Path to assembly instructions (markdown or PDF)
- `calibration_guide` (string): Path to calibration procedures
- `use_cases` (array of strings): What this config supports

**Relationships**:
- Has many `Component`

**Example**:
```yaml
config_id: "economy-kit"
name: "Economy Hardware Kit"
target_budget: 700
total_cost_estimated: 697
components:
  - name: "NVIDIA Jetson Orin Nano Developer Kit"
    quantity: 1
    cost_per_unit: 499
    vendor: "NVIDIA"
    vendor_url: "https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/"
  - name: "Intel RealSense D435 Depth Camera"
    quantity: 1
    cost_per_unit: 179
    vendor: "Intel"
  - name: "Servo Kit (6x MG996R)"
    quantity: 1
    cost_per_unit: 19
    vendor: "Amazon"
assembly_guide: "hardware/economy-kit-assembly.md"
calibration_guide: "hardware/economy-kit-calibration.md"
use_cases:
  - "Simulation-to-hardware validation"
  - "Basic perception and manipulation"
  - "Individual student capstone projects"
```

---

### 7. Component (Hardware)

Represents a single hardware item in a configuration.

**Attributes**:
- `name` (string): Component name
- `quantity` (integer): Number needed
- `cost_per_unit` (integer/float): USD cost per item
- `vendor` (string): Recommended vendor
- `vendor_url` (string, optional): Purchase link
- `part_number` (string, optional): Manufacturer part number
- `alternatives` (array of Alternative): Equivalent substitutes

**Relationships**:
- Belongs to one `HardwareConfiguration`

---

### 8. LearningOutcome (Course-Level)

Represents a measurable competency students acquire from the course.

**Attributes**:
- `outcome_id` (string): e.g., "LO-01"
- `description` (string): What student can do
- `assessment_method` (string): How it's measured
- `mapped_chapters` (array of integers): Which chapters address this outcome
- `bloom_level` (enum): `remember` | `understand` | `apply` | `analyze` | `evaluate` | `create`

**Example**:
```yaml
outcome_id: "LO-03"
description: "Integrate Vision-Language-Action models with ROS 2 for natural language robot control"
assessment_method: "Capstone project: voice-controlled pick-and-place task"
mapped_chapters: [9, 10, 13]
bloom_level: create
```

---

## Relationships Diagram

```
Chapter (1-14)
  ├── Section (3-5 per chapter)
  ├── CodeExample (0-5 per chapter)
  │     └── TroubleshootingItem (0-N)
  ├── Exercise (5-10 per chapter)
  └── Citation (many-to-many)

HardwareConfiguration (3 variants)
  └── Component (5-20 per config)
        └── Alternative (0-N substitutes)

LearningOutcome (course-level)
  └── mapped to Chapter (many-to-many)
```

---

## Data Storage and Management

### File Structure

```
book/
├── docs/
│   ├── 01-intro.md              # Chapter markdown files
│   ├── 02-landscape.md
│   ├── ...
│   └── 14-hardware.md
├── static/
│   ├── diagrams/                # SVG/PNG diagrams per chapter
│   └── img/                     # General images
└── sidebars.js                  # Navigation structure

code-examples/
├── chapter-03-ros2/             # Code organized by chapter
│   ├── hello_ros2/
│   ├── pub_sub/
│   └── exercises/
│       ├── ex01_starter/
│       └── ex01_solution/
├── ...
└── chapter-13-capstone/

hardware/
├── economy-kit.md               # Hardware config documents
├── midrange-kit.md
├── full-lab.md
├── assembly/
│   └── economy-kit-assembly.pdf
└── calibration/
    └── realsense-calibration.md

references/
├── bibliography.bib             # Central BibTeX file (Zotero export)
└── citation-log.md              # Tracking: source → chapters → claims
```

### Data Formats

**Chapters & Sections**: Markdown (`.md`) with YAML frontmatter
**Code Examples**: Python (`.py`), YAML (`.yaml`), Dockerfiles
**Citations**: BibTeX (`.bib`) managed by Zotero
**Hardware Configs**: Markdown (`.md`) with embedded YAML tables
**Exercises**: Markdown problem statements + code directories

---

## Content Validation Rules

### Chapter Validation

- ✅ Word count within target ±10% (e.g., 1,600 target → 1,440-1,760 acceptable)
- ✅ 3-5 learning objectives defined
- ✅ 3-5 sections with logical flow
- ✅ All cited sources have BibTeX entries in `bibliography.bib`
- ✅ Flesch-Kincaid Grade 10-12
- ✅ <5% plagiarism similarity (Grammarly + Copyleaks)

### Code Example Validation

- ✅ README includes: Purpose, Setup, Run, Expected Output, Troubleshooting
- ✅ Dockerfile builds successfully (`docker build .`)
- ✅ docker-compose up completes without errors
- ✅ Code executes and produces documented output
- ✅ All dependencies pinned with versions

### Citation Validation

- ✅ Every in-text citation has BibTeX entry
- ✅ Every BibTeX entry is cited at least once
- ✅ APA 7th format compliance
- ✅ DOI present if available
- ✅ URLs archived (Wayback Machine)

### Hardware Config Validation

- ✅ Total cost within target ±10%
- ✅ All components have vendor and approximate cost
- ✅ Assembly guide complete with photos/diagrams
- ✅ Calibration procedures tested

---

## Content Metrics

### Tracking

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Total Word Count** | 18,000-25,000 | TBD | 🟡 In Progress |
| **Chapters Complete** | 14 | 0 | 🟡 Planning |
| **Code Examples** | 50-70 | 0 | 🟡 Planning |
| **Exercises** | 100-150 | 0 | 🟡 Planning |
| **Citations (Total)** | ≥20 | 0 | 🟡 Week 2 |
| **Citations (Peer-Reviewed)** | ≥60% (12+) | 0 | 🟡 Week 2 |
| **Diagrams** | 30-40 | 0 | 🟡 Ongoing |
| **Video Demos** | 15-20 | 0 | 🟡 Week 9-12 |

### Chapter Status Dashboard (Week 1 Baseline)

| Ch | Title | Words | Code | Exercises | Status |
|----|-------|-------|------|-----------|--------|
| 1 | Intro to Physical AI | 0/1400 | 0/0 | 0/5 | Outlined |
| 2 | Humanoid Landscape | 0/1500 | 0/0 | 0/5 | Outlined |
| 3 | ROS 2 | 0/1600 | 0/5 | 0/10 | Outlined |
| 4 | URDF Modeling | 0/1500 | 0/3 | 0/8 | Outlined |
| 5 | Digital Twins | 0/1700 | 0/3 | 0/7 | Outlined |
| 6 | Sensors | 0/1500 | 0/4 | 0/8 | Outlined |
| 7 | Isaac ROS | 0/1600 | 0/4 | 0/10 | Outlined |
| 8 | Navigation | 0/1600 | 0/4 | 0/10 | Outlined |
| 9 | VLA Models | 0/1500 | 0/2 | 0/5 | Outlined |
| 10 | Voice to Action | 0/1700 | 0/5 | 0/10 | Outlined |
| 11 | Manipulation | 0/1500 | 0/4 | 0/8 | Outlined |
| 12 | Sim-to-Real | 0/1600 | 0/3 | 0/7 | Outlined |
| 13 | Capstone Project | 0/2200 | 0/1 | 0/10 | Outlined |
| 14 | Hardware Guide | 0/1500 | 0/0 | 0/5 | Outlined |
| **Total** | **0/21,500** | **0/38** | **0/108** | **Outlined** |

---

## Next Steps

1. **Week 1**: Create 14 chapter outline files (`book/docs/01-intro.md`, etc.) with:
   - Frontmatter (title, word count target, learning objectives)
   - Section structure (H2 headings with word allocations)
   - Placeholder for code examples and exercises

2. **Week 2**: Populate `references/bibliography.bib` with ≥20 sources from Zotero

3. **Week 2-10**: Fill chapter content, develop code examples, write exercises

4. **Week 11-12**: Validate all data against rules above, generate metrics dashboard

---

**Data Model Status**: ✅ **COMPLETE** - Content structure defined, ready for authoring.
