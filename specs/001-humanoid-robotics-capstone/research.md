# Research & Technology Decisions: Physical AI & Humanoid Robotics

**Feature**: 001-humanoid-robotics-capstone
**Date**: 2025-12-07
**Phase**: Phase 0 - Foundation Research

This document records all technology choices, architectural decisions, and research findings that inform the implementation plan for the Physical AI & Humanoid Robotics capstone course and book project.

---

## Decision Summary

| Decision Area | Choice | Rationale |
|--------------|--------|-----------|
| **Content Platform** | Docusaurus 3.x | React-based, excellent docs features, GitHub Pages integration, mobile-first |
| **Citation Management** | Zotero + Better BibTeX | Free, open-source, APA 7th support, BibTeX export, robust |
| **Plagiarism Detection** | Grammarly Premium + Copyleaks | Dual validation for <1% target, industry-standard tools |
| **Robotics Framework** | ROS 2 Humble (LTS) + Iron | Humble LTS until 2027, Iron for latest features, both widely adopted |
| **Simulation Platform** | NVIDIA Isaac Sim 2024.1+ | GPU-accelerated, photorealistic, ROS 2 native, industry-leading |
| **Containerization** | Docker + docker-compose | Reproducibility, cross-platform, standard for robotics education |
| **Programming Language** | Python 3.10+ (rclpy) | ROS 2 native API, most accessible for students, rich ML ecosystem |
| **Perception Stack** | NVIDIA Isaac ROS 2.x | GPU-accelerated, state-of-the-art, seamless Isaac Sim integration |
| **Navigation** | Nav2 (ROS 2 Navigation) | De facto standard for ROS 2, mature, well-documented |
| **Manipulation** | MoveIt 2 | Industry standard, comprehensive motion planning, ROS 2 native |
| **Voice Interface** | Whisper (STT) + LLM APIs | State-of-the-art speech recognition, flexible LLM options (GPT-4/Claude/open-source) |
| **CI/CD** | GitHub Actions | Free for public repos, tight GitHub integration, mature |
| **Hosting** | GitHub Pages | Free, reliable, automatic HTTPS, good performance |

---

## 1. Content Platform: Docusaurus vs. Alternatives

### Research Question
What is the best static site generator for a technical book with code examples, optimized for mobile and desktop, with search functionality and PDF export?

### Options Considered

**Option A: Docusaurus 3.x (React-based)**
- **Pros**:
  - Designed specifically for technical documentation
  - Excellent search (Algolia DocSearch free for open source)
  - Mobile-first responsive design (automatic)
  - Versioning support (for future updates)
  - MDX support (embed React components in Markdown)
  - Code syntax highlighting built-in (Prism.js)
  - Dark/light mode out of the box
  - Active development by Meta
  - Large ecosystem of plugins
- **Cons**:
  - Requires Node.js/npm build step
  - Slightly heavier than pure static generators
  - Learning curve for customization (React knowledge helpful)

**Option B: MkDocs + Material Theme**
- **Pros**:
  - Python-based (simpler for Python-centric project)
  - Material theme is beautiful and feature-rich
  - Good search functionality
  - Lighter weight than Docusaurus
- **Cons**:
  - Less feature-rich for complex docs
  - Search not as advanced as Algolia
  - PDF export requires additional plugins (not as mature)
  - Smaller ecosystem than Docusaurus

**Option C: Jekyll (Ruby-based)**
- **Pros**:
  - Native GitHub Pages support
  - Simple, mature, stable
  - Many themes available
- **Cons**:
  - Not optimized for technical documentation
  - Search functionality limited (requires external service)
  - Code highlighting less sophisticated
  - Slower build times for large sites
  - Ruby dependency (less common in robotics/ML community)

**Option D: GitBook**
- **Pros**:
  - Beautiful UI out of the box
  - Great for documentation
  - Easy to use
- **Cons**:
  - Closed-source/commercial (free tier limited)
  - Less control over customization
  - Vendor lock-in
  - PDF export requires paid plan

### Decision: Docusaurus 3.x

**Rationale**:
1. **Technical Documentation Focus**: Purpose-built for docs, not blogs or general sites
2. **Search**: Algolia DocSearch integration is exceptional and free for open source
3. **Mobile-First**: Automatic responsive design meets "must render on mobile" requirement
4. **Code Highlighting**: Superior syntax highlighting for multiple languages (Python, YAML, bash, etc.)
5. **Versioning**: Future-proof for ROS 2 version updates (maintain isaac-sim-2024, isaac-sim-2025 branches)
6. **Community**: Large user base in tech education (TensorFlow, Jest, React Native docs all use Docusaurus)
7. **PDF Export**: Multiple plugins available (docusaurus-prince-pdf, docusaurus-pdf)
8. **Performance**: Core Web Vitals compliance typical with default config

**Trade-offs Accepted**:
- Requires Node.js/npm (acceptable; Node.js widely available, Docker can include)
- Heavier than pure Markdown generators (acceptable for enhanced features)

---

## 2. Citation Management: Zotero vs. Alternatives

### Research Question
What is the best tool for managing ≥20 academic sources with APA 7th edition format, BibTeX export, and integration with Markdown workflow?

### Options Considered

**Option A: Zotero + Better BibTeX Plugin**
- **Pros**:
  - Free and open-source
  - Excellent browser extension for one-click import
  - Better BibTeX plugin: Automatic BibTeX export with custom keys
  - Supports all citation styles including APA 7th
  - Cross-platform (Windows, Mac, Linux)
  - PDF management and annotation
  - Large user base in academia
  - Auto-sync across devices
- **Cons**:
  - UI slightly dated compared to newer tools
  - Sync limited to 300MB free (but sufficient for text-only library)

**Option B: Mendeley**
- **Pros**:
  - Clean UI
  - Good PDF annotation
  - Cloud sync
  - Desktop and mobile apps
- **Cons**:
  - Owned by Elsevier (corporate, not open-source)
  - BibTeX export less flexible than Zotero + Better BibTeX
  - Sync issues reported in community
  - Less customizable citation keys

**Option C: EndNote**
- **Pros**:
  - Industry standard in many academic institutions
  - Comprehensive features
  - Good Word integration
- **Cons**:
  - Expensive ($250+ for perpetual license or $100/year subscription)
  - Closed-source
  - Overkill for project needs
  - BibTeX export not primary focus

**Option D: JabRef (Pure BibTeX Editor)**
- **Pros**:
  - Free, open-source
  - Native BibTeX editing
  - Cross-platform (Java-based)
- **Cons**:
  - No browser extension (manual entry)
  - More effort to build library from scratch
  - Less polished UX than Zotero
  - Primarily for managing existing .bib files, not building library

### Decision: Zotero 6.x + Better BibTeX Plugin

**Rationale**:
1. **Cost**: Free for academic use, no license required
2. **APA 7th Support**: Native support, constantly updated
3. **BibTeX Workflow**: Better BibTeX plugin provides automatic export to `bibliography.bib` with customizable citation keys (e.g., `author2024keyword`)
4. **Browser Integration**: One-click import from IEEE Xplore, ACM DL, arXiv, Google Scholar
5. **PDF Management**: Store PDFs locally, annotate, extract highlighted text
6. **Open Source**: No vendor lock-in, community-maintained, transparent
7. **Ubiquity**: Used by millions of academics, reliable and battle-tested

**Workflow**:
1. Find paper on IEEE/ACM/arXiv
2. Click Zotero browser button → auto-import metadata
3. Download PDF → drag into Zotero entry
4. Tag with chapter (e.g., "chapter-05-simulation")
5. Better BibTeX auto-exports to `references/bibliography.bib` on save
6. Cite in Markdown: `[@author2024keyword]` → Docusaurus plugin renders citation

**Trade-offs Accepted**:
- UI not as modern as Mendeley (acceptable; functionality > aesthetics)
- 300MB sync limit (non-issue; ~200 papers = ~100MB PDFs)

---

## 3. Plagiarism Detection: Grammarly + Copyleaks vs. Turnitin

### Research Question
What tools provide reliable plagiarism detection for <1% similarity target with accessibility for independent authors (not institutional)?

### Options Considered

**Option A: Grammarly Premium + Copyleaks**
- **Pros**:
  - Grammarly Premium: $12/month, includes plagiarism checker + grammar/style
  - Copyleaks: $10/month for API access, specializes in academic plagiarism
  - Dual validation reduces false positive/negative risk
  - Accessible to independent authors (no institutional access required)
  - Grammarly also improves writing quality (readability, clarity)
- **Cons**:
  - Monthly cost (~$22/month for both)
  - Less comprehensive database than Turnitin

**Option B: Turnitin**
- **Pros**:
  - Industry gold standard for academic plagiarism detection
  - Largest comparison database
  - Detailed similarity reports
  - Widely accepted by institutions
- **Cons**:
  - Requires institutional access (not available to independent authors)
  - Expensive for individual subscriptions (not typically offered)
  - Primarily designed for instructors, not self-service authors

**Option C: iThenticate (by Turnitin)**
- **Pros**:
  - Professional version of Turnitin for publishers/authors
  - Same database as Turnitin
  - Individual access available
- **Cons**:
  - Expensive: $100+ for single submission (or subscription)
  - Overkill for iterative checking during authoring

**Option D: Quetext / Plagscan / Copyscape (Budget Options)**
- **Pros**:
  - Cheaper than premium options ($5-10/month)
  - Adequate for basic plagiarism checking
- **Cons**:
  - Smaller databases than Grammarly/Copyleaks
  - Less accurate, higher false negative risk
  - Not widely recognized in academia

### Decision: Grammarly Premium + Copyleaks (Dual Validation)

**Rationale**:
1. **Accessibility**: Both available to independent authors without institutional access
2. **Dual Validation**: Reduces risk of single-tool blind spots; if both report <1%, high confidence
3. **Additional Value**: Grammarly improves writing quality beyond plagiarism (grammar, readability, tone)
4. **Cost-Effective**: ~$22/month total is reasonable for 3-month authoring period (~$66 total)
5. **API Access**: Copyleaks offers API for automated checks in CI/CD (future enhancement)
6. **Academic Focus**: Copyleaks specifically targets academic plagiarism detection

**Workflow**:
1. After drafting each chapter: Run Grammarly plagiarism check
2. If Grammarly reports <5%: Proceed to readability review
3. After full draft: Run Copyleaks on entire book
4. Compare reports: If both <1%, pass quality gate
5. If either >1%: Review flagged passages, rewrite or add citations

**Trade-offs Accepted**:
- Not Turnitin (acceptable; dual validation with recognized tools mitigates)
- Subscription cost (acceptable; time-limited to authoring period)

---

## 4. Robotics Framework: ROS 2 Humble vs. Iron vs. Rolling

### Research Question
Which ROS 2 distribution balances long-term support, feature completeness, and community adoption for a book with 18-month+ lifespan?

### Options Considered

**Option A: ROS 2 Humble Hawksbill (LTS)**
- **Pros**:
  - **LTS release**: Supported until May 2027 (3+ years from project start)
  - **Stable**: Released May 2022, mature and bug-fixed
  - **Ubuntu 22.04 LTS**: Native support on Ubuntu 22.04 (LTS until 2027)
  - **Community Adoption**: Widest adoption in industry and education as of 2024-2025
  - **Documentation**: Most extensive documentation and tutorials
  - **Isaac Sim Support**: Full support in Isaac Sim 2024.x
- **Cons**:
  - Slightly older feature set (missing some Iron innovations)
  - Python 3.10 (not latest 3.11+, but adequate)

**Option B: ROS 2 Iron Irwini**
- **Pros**:
  - **Newer Features**: Released May 2023, includes latest enhancements
  - **Ubuntu 22.04 Compatible**: Works on same LTS as Humble
  - **Active Development**: Still receiving updates (through 2024-2025)
  - **Python 3.10**: Same as Humble
- **Cons**:
  - **Not LTS**: Support ends November 2024 (already past or imminent)
  - **Less Stable**: Fewer bug fixes compared to Humble
  - **Adoption**: Smaller user base than Humble

**Option C: ROS 2 Rolling Ridley**
- **Pros**:
  - **Latest Features**: Rolling release, always cutting-edge
  - **Experimental Testing**: Good for exploring new features
- **Cons**:
  - **No Stability Guarantee**: Breaking changes possible
  - **Not Recommended for Education**: Too unstable for reproducible coursework
  - **Documentation**: Often lags behind releases

**Option D: ROS 2 Jazzy Jalisco (Future LTS, 2024)**
- **Pros**:
  - **Next LTS**: Expected May 2024, will be supported until 2027
  - **Ubuntu 24.04**: Native support on Ubuntu 24.04 LTS
  - **Future-Proof**: Longer runway than Humble
- **Cons**:
  - **Not Yet Released** (as of project planning in late 2024/early 2025)
  - **Isaac Sim Support**: Unknown compatibility at project start
  - **Community Adoption**: Will take 6-12 months post-release to mature
  - **Risk**: Can't build on unreleased platform

### Decision: ROS 2 Humble Hawksbill (Primary) + Iron Irwini (Secondary)

**Rationale**:
1. **LTS Support**: Humble supported until May 2027, ensuring book relevance for 18+ months post-publication
2. **Stability**: Humble has 2+ years of bug fixes, most stable option
3. **Community**: Largest user base in 2024-2025, best community support and troubleshooting resources
4. **Ubuntu 22.04 LTS**: Aligns with Ubuntu LTS, simplifies Docker base images
5. **Isaac Sim**: Full validated support in Isaac Sim 2024.x
6. **Iron as Secondary**: Mention Iron compatibility, provide migration notes for students wanting latest features
7. **Documentation**: Most comprehensive ROS 2 documentation targets Humble

**Implementation**:
- **Primary Examples**: All code tested and documented for Humble
- **Iron Compatibility**: Note compatibility and any differences in README files
- **Docker Images**: Provide both `ros2-humble` and `ros2-iron` base images
- **Future-Proofing**: Book structure allows for Jazzy migration guide as future update

**Trade-offs Accepted**:
- Not using latest Iron features (acceptable; stability > cutting-edge)
- Not waiting for Jazzy (acceptable; can't delay project for future release)

---

## 5. Simulation Platform: Isaac Sim vs. Gazebo vs. Unity

### Research Question
Which simulation platform best supports humanoid robotics, ROS 2 integration, GPU-accelerated perception, and educational use?

### Options Considered

**Option A: NVIDIA Isaac Sim 2024.1+**
- **Pros**:
  - **GPU-Accelerated**: Photorealistic rendering, real-time ray tracing, GPU physics (PhysX)
  - **ROS 2 Native**: Built-in ROS 2 bridge, Isaac ROS integration
  - **Sensor Simulation**: High-fidelity cameras, LiDAR, depth sensors with realistic noise models
  - **State-of-the-Art**: Used by industry (Tesla, Amazon, etc.) and research
  - **Educational License**: Free for academic use
  - **Python API**: Extensive Python API for scripting and automation
  - **Synthetic Data Generation**: For training perception models
- **Cons**:
  - **GPU Required**: Needs NVIDIA GPU with 8GB+ VRAM (not CPU-only)
  - **Large Download**: ~10-15GB Docker image
  - **Proprietary**: Not open-source (but free for education)
  - **Learning Curve**: More complex than Gazebo

**Option B: Gazebo Classic (Gazebo 11)**
- **Pros**:
  - **Open Source**: Fully open-source, no license restrictions
  - **Mature**: Decades of development, very stable
  - **ROS Integration**: Native ROS 1 support, ROS 2 via ros_gz_bridge
  - **Lightweight**: Runs on CPU, lower hardware requirements
  - **Wide Adoption**: Used in education worldwide
- **Cons**:
  - **Graphics**: Less realistic rendering than Isaac Sim
  - **CPU-Bound**: Slower physics simulation, no GPU acceleration
  - **Aging**: Being replaced by Gazebo Harmonic (new architecture)

**Option C: Gazebo Harmonic (New Gazebo)**
- **Pros**:
  - **Modern Architecture**: Rewritten from scratch, modular design
  - **ROS 2 Native**: Better ROS 2 integration than Classic
  - **Improved Performance**: Better physics and rendering
  - **Open Source**: Apache 2.0 license
- **Cons**:
  - **Still Maturing**: Released 2023, less stable than Classic
  - **Smaller Ecosystem**: Fewer tutorials and resources than Classic or Isaac Sim
  - **Transition Period**: Community still migrating from Classic

**Option D: Unity + ROS 2 for Unity**
- **Pros**:
  - **Professional Game Engine**: Excellent graphics, physics, cross-platform
  - **ROS 2 for Unity**: Community-developed ROS 2 integration
  - **Asset Store**: Vast library of 3D models and environments
- **Cons**:
  - **Not Purpose-Built for Robotics**: Requires more setup than Isaac Sim/Gazebo
  - **ROS Integration**: Less mature than native Gazebo or Isaac Sim
  - **Licensing**: Free tier limited; Pro license expensive for advanced features
  - **Learning Curve**: Requires Unity knowledge

### Decision: NVIDIA Isaac Sim 2024.1+ (Primary) + Brief Gazebo Comparison

**Rationale**:
1. **Industry Standard**: Isaac Sim represents state-of-the-art, prepares students for industry tools
2. **GPU Acceleration**: Enables real-time simulation of complex humanoid robots with high-fidelity sensors
3. **ROS 2 Integration**: Native ROS 2 support, seamless Isaac ROS integration for perception
4. **Educational Value**: Learning Isaac Sim is valuable career skill (used at Tesla, Amazon, NVIDIA robotics teams)
5. **Synthetic Data**: Enables training perception models with domain randomization (Chapter 12)
6. **Free for Education**: No cost barrier for students (educational license)
7. **Photorealism**: Reduces sim-to-real gap with realistic rendering and sensor simulation

**Book Approach**:
- **Chapter 5**: Compare Gazebo, Unity, and Isaac Sim with objective criteria
- **Chapters 6-13**: Use Isaac Sim as primary platform for all examples
- **Appendix/Bonus**: Provide Gazebo Harmonic migration guide for students without NVIDIA GPU

**Hardware Requirements**:
- **Minimum**: NVIDIA GPU with 8GB VRAM (RTX 3070, RTX 4060 Ti, or better)
- **Recommended**: RTX 3080 or better (for real-time performance with complex scenes)
- **Alternative**: Cloud GPU instances (AWS g4dn, Google Cloud n1-standard with T4/A100)

**Trade-offs Accepted**:
- Requires NVIDIA GPU (acceptable; aligned with hardware requirements, cloud alternatives available)
- Proprietary (acceptable; educational license free, no vendor lock-in for core robotics concepts)
- Large download (acceptable; one-time setup, faster simulation compensates)

---

## 6. Voice Interface: Whisper vs. Alternatives

### Research Question
What speech-to-text (STT) model provides best accuracy for robotics voice commands with accessibility (open-source, runnable locally or via API)?

### Options Considered

**Option A: OpenAI Whisper**
- **Pros**:
  - **State-of-the-Art Accuracy**: Best-in-class STT as of 2024
  - **Multilingual**: Supports 99 languages (future-proof for translations)
  - **Open Source**: MIT license, model weights public
  - **Multiple Sizes**: Tiny (39M params) to Large (1.5B params), trade-off speed vs. accuracy
  - **Local or API**: Can run locally or use OpenAI API ($0.006/min)
  - **Robustness**: Handles accents, noise, disfluencies well
- **Cons**:
  - **Compute**: Large model requires GPU for real-time transcription
  - **Latency**: 1-2 seconds for Whisper Large (acceptable for robotics commands)

**Option B: Google Speech-to-Text API**
- **Pros**:
  - **High Accuracy**: Industry-leading for general STT
  - **Streaming**: Real-time streaming transcription
  - **Cloud-Based**: No local compute required
- **Cons**:
  - **Cost**: $0.016/min (2.6x more expensive than Whisper API)
  - **Closed-Source**: No local deployment option
  - **Privacy**: Data sent to Google (concerns for sensitive applications)

**Option C: Mozilla DeepSpeech / Coqui STT**
- **Pros**:
  - **Open Source**: Fully open, self-hostable
  - **Lightweight**: Can run on CPU
- **Cons**:
  - **Accuracy**: Lower than Whisper or Google
  - **Maintenance**: DeepSpeech discontinued, Coqui community-maintained

**Option D: wav2vec 2.0 (Facebook/Meta)**
- **Pros**:
  - **Research-Grade**: Strong performance
  - **Open Source**: Hugging Face integration
- **Cons**:
  - **Less Accessible**: Requires more ML expertise to deploy
  - **Documentation**: Less user-friendly than Whisper

### Decision: OpenAI Whisper (Local Deployment + API Option)

**Rationale**:
1. **Accuracy**: Best-in-class STT ensures reliable voice command recognition
2. **Open Source**: MIT license, transparent, auditable
3. **Flexibility**: Students can choose local (GPU) or API ($0.006/min, ~$0.36/hour)
4. **Educational Value**: Demonstrates state-of-the-art AI/ML integration
5. **Multilingual**: Future-proof for international students and translations
6. **Robustness**: Handles real-world conditions (noise, accents) better than alternatives

**Implementation**:
- **Chapter 10**: Introduce Whisper, provide both local (Whisper Large on GPU) and API (OpenAI) examples
- **Docker**: Include Whisper model weights in `chapter-10-voice/` Docker image for offline use
- **Trade-off Guidance**: Explain speed (Whisper Tiny) vs. accuracy (Whisper Large) trade-offs

**Trade-offs Accepted**:
- Requires GPU for real-time local transcription (acceptable; same as Isaac Sim requirement)
- API cost (acceptable; $0.36/hour is reasonable, local option available)

---

## 7. LLM Integration: GPT-4 vs. Claude vs. Open-Source

### Research Question
Which LLM provides best balance of reasoning capability, API accessibility, cost, and educational flexibility for voice → task planning → ROS 2 actions?

### Options Considered

**Option A: OpenAI GPT-4 Turbo**
- **Pros**:
  - **Best Reasoning**: Industry-leading for complex task decomposition
  - **API Mature**: Well-documented, stable, extensive libraries (LangChain, etc.)
  - **128k Context**: Can include large system prompts (robot state, environment, constraints)
  - **Function Calling**: Native support for structured outputs (ideal for ROS 2 action parameters)
- **Cons**:
  - **Cost**: $0.01/1k input tokens, $0.03/1k output tokens (~$0.10-0.50 per command)
  - **Closed-Source**: Black box, no local deployment
  - **Rate Limits**: Free tier limited, requires paid account for real use

**Option B: Anthropic Claude 3 (Opus/Sonnet)**
- **Pros**:
  - **Strong Reasoning**: Comparable to GPT-4, sometimes better for nuanced tasks
  - **200k Context**: Largest context window (ideal for complex prompts)
  - **Safety**: Constitutional AI, better at following instructions
  - **API**: Similar to OpenAI, well-documented
- **Cons**:
  - **Cost**: Similar to GPT-4 (~$0.015/1k input, $0.075/1k output)
  - **Closed-Source**: No local deployment
  - **Availability**: Not as widely adopted as GPT-4 (but growing)

**Option C: Open-Source LLMs (Llama 3, Mistral, etc.)**
- **Pros**:
  - **Free**: No API costs, unlimited usage
  - **Local Deployment**: Run on local GPU, no internet required
  - **Transparency**: Open weights, inspectable, customizable
  - **Privacy**: No data sent to third parties
- **Cons**:
  - **Lower Performance**: Llama 3 70B < GPT-4 for complex reasoning
  - **Compute**: Requires large GPU (24GB+ VRAM for 70B models)
  - **Setup Complexity**: More work than API (but educational value)

**Option D: Hybrid (GPT-4 + Open-Source Fallback)**
- **Pros**:
  - **Best of Both**: Use GPT-4 for demonstrations, provide Llama 3 for cost-conscious students
  - **Educational**: Teaches trade-offs between cloud and local LLMs
- **Cons**:
  - **Complexity**: Requires maintaining two code paths

### Decision: Hybrid (GPT-4 Primary, Claude Secondary, Llama 3 Local Fallback)

**Rationale**:
1. **Primary (GPT-4)**: Best reasoning for voice command → task planning demos in book
2. **Secondary (Claude)**: Show alternative for comparison, highlight safety features
3. **Fallback (Llama 3)**: For students without API budget or preferring local deployment
4. **Educational Value**: Demonstrates cloud vs. local trade-offs, API abstraction patterns

**Implementation**:
- **Chapter 10**: Introduce all three options with comparison table
- **Code Examples**: Abstract LLM interface (`class LLMClient` with `call()` method)
  - Subclasses: `OpenAIClient`, `AnthropicClient`, `LocalLlamaClient`
- **Environment Variables**: `LLM_PROVIDER=openai|anthropic|llama3` to switch
- **Docker**: Include Llama 3 8B model for offline use (larger models via separate download)

**Cost Guidance for Students**:
- **GPT-4 Turbo**: $5-10 for full capstone project (100-200 commands)
- **Claude**: Similar to GPT-4
- **Llama 3**: Free, but requires 16GB+ VRAM GPU (RTX 4080 or better, or cloud)

**Trade-offs Accepted**:
- API cost for GPT-4/Claude (acceptable; <$10 for project, educational expense)
- Complexity of multiple LLM options (acceptable; teaches abstraction and portability)

---

## 8. CI/CD: GitHub Actions vs. Alternatives

### Research Question
What CI/CD platform provides best integration with GitHub for automated deployment, testing, and link checking?

### Options Considered

**Option A: GitHub Actions**
- **Pros**:
  - **Native Integration**: Built into GitHub, zero external setup
  - **Free for Public Repos**: Unlimited minutes for public repositories
  - **Marketplace**: Large ecosystem of pre-built actions
  - **GitHub Pages Deploy**: First-class deployment to GitHub Pages
  - **Matrix Builds**: Test multiple Node/Python versions in parallel
- **Cons**:
  - **Learning Curve**: YAML configuration, GitHub Actions syntax
  - **Limited to GitHub**: Vendor lock-in (but acceptable for GitHub-hosted project)

**Option B: Travis CI**
- **Pros**:
  - **Mature**: Long-standing CI/CD platform
  - **YAML Config**: Similar to GitHub Actions
- **Cons**:
  - **Paid**: Free tier very limited (credit-based)
  - **External Service**: Requires linking GitHub account
  - **Declining Popularity**: Losing market share to GitHub Actions and GitLab CI

**Option C: GitLab CI**
- **Pros**:
  - **Powerful**: Feature-rich, enterprise-grade
  - **Free Tier**: Generous for public projects
- **Cons**:
  - **Requires GitLab**: Would need to mirror repo or migrate
  - **Overkill**: More features than needed

**Option D: CircleCI**
- **Pros**:
  - **Fast**: Optimized for speed
  - **Docker-Native**: First-class Docker support
- **Cons**:
  - **Paid**: Free tier limited to 6,000 minutes/month
  - **External Service**: Additional account required

### Decision: GitHub Actions

**Rationale**:
1. **Zero External Setup**: Native to GitHub, no additional accounts or integrations
2. **Free for Public Repos**: Unlimited build minutes (project is open-source)
3. **GitHub Pages Integration**: One-line deployment to GitHub Pages
4. **Ecosystem**: Pre-built actions for Node.js, Python, Docker, link checking, etc.
5. **Community Standard**: Increasingly dominant in open-source projects

**Workflows to Implement**:
1. **Deploy Book** (`.github/workflows/deploy-book.yml`):
   - Trigger: Push to `main` branch
   - Steps: Install Node → Build Docusaurus → Deploy to `gh-pages` branch
2. **Test Code Examples** (`.github/workflows/test-code.yml`):
   - Trigger: Push, PR
   - Steps: Build Docker images → Run basic import/compilation tests
3. **Check Links** (`.github/workflows/check-links.yml`):
   - Trigger: Weekly schedule + PR
   - Steps: Crawl site → Validate all external URLs (non-404)
4. **Plagiarism Check** (`.github/workflows/plagiarism.yml` - manual trigger):
   - Trigger: Manual (`workflow_dispatch`) or on PR with label "check-plagiarism"
   - Steps: Run Copyleaks API on new/modified chapters

**Trade-offs Accepted**:
- Vendor lock-in to GitHub (acceptable; project already on GitHub, open-source can be migrated if needed)
- YAML complexity (acceptable; well-documented, community examples abundant)

---

## 9. PDF Export: Docusaurus Plugins vs. Manual

### Research Question
How to generate high-quality PDF from Docusaurus site with preserved formatting, syntax highlighting, and hyperlinks?

### Options Considered

**Option A: docusaurus-prince-pdf Plugin**
- **Pros**:
  - **High Quality**: Uses PrinceXML engine, excellent typography
  - **Preserves Formatting**: Code syntax highlighting, diagrams, styling maintained
  - **Hyperlinks**: Internal and external links functional in PDF
- **Cons**:
  - **PrinceXML License**: Free for non-commercial (open-source book qualifies), but technically proprietary engine
  - **Setup**: Requires PrinceXML installation (Docker-able)

**Option B: docusaurus-pdf Plugin (mr-pdf)**
- **Pros**:
  - **Open Source**: Pure Node.js, no proprietary dependencies
  - **Automated**: Generates PDF from built Docusaurus site
- **Cons**:
  - **Quality**: Lower than PrinceXML (simpler rendering engine)
  - **Maintenance**: Less actively maintained than Prince plugin

**Option C: Manual Print to PDF (Browser)**
- **Pros**:
  - **Zero Setup**: Use browser's Print → Save as PDF
  - **No Dependencies**: No plugins or engines required
- **Cons**:
  - **Manual Process**: Not automated
  - **Inconsistent**: Output varies by browser and settings
  - **Page Breaks**: Difficult to control chapter breaks

**Option D: LaTeX Export (via pandoc)**
- **Pros**:
  - **Professional Typography**: LaTeX is gold standard for academic PDFs
  - **Full Control**: Complete customization of layout
- **Cons**:
  - **Complex Workflow**: Markdown → pandoc → LaTeX → PDF (many steps)
  - **Maintenance Burden**: Two formats to maintain (Docusaurus + LaTeX)
  - **Code Highlighting**: Requires minted package and Python Pygments

### Decision: docusaurus-prince-pdf Plugin (Primary) + Browser Print (Fallback)

**Rationale**:
1. **Quality**: PrinceXML produces professional-grade PDFs suitable for academic distribution
2. **Automation**: Single command (`npm run pdf`) generates PDF from built site
3. **Preservation**: Code syntax highlighting, images, diagrams all preserved
4. **Hyperlinks**: Internal references (Chapter 5 → Chapter 8) remain functional
5. **Free for Open Source**: PrinceXML free license covers this project
6. **Browser Fallback**: If PrinceXML licensing becomes issue, browser print is adequate backup

**Implementation**:
- Week 12: Install docusaurus-prince-pdf plugin
- Configure PDF output: Title page, table of contents, page numbers, headers
- Test rendering: Verify code blocks, diagrams, hyperlinks
- Generate final PDF: `npm run pdf` → `physical-ai-humanoid-robotics.pdf`
- Upload to GitHub Releases alongside website

**Trade-offs Accepted**:
- PrinceXML proprietary (acceptable; free for open source, fallback available)
- PDF generation adds build step (acceptable; one-time per release)

---

## 10. Source Identification Strategy

### Research Question
Where to find ≥20 high-quality peer-reviewed sources (≥60%) on ROS 2, humanoid robotics, VLA models, and sim-to-real transfer?

### Key Databases & Search Strategies

**1. IEEE Xplore Digital Library**
- **Focus**: Robotics conferences (ICRA, IROS), journals (T-RO, RA-L)
- **Search Queries**:
  - "ROS 2 robotics" (2020-2025) → Control systems, middleware papers
  - "humanoid robot locomotion" (2020-2025) → Bipedal walking, whole-body control
  - "visual SLAM" (2020-2025) → Perception and mapping
- **Expected**: 5-8 papers (peer-reviewed)

**2. ACM Digital Library**
- **Focus**: HCI, AI conferences (HRI, ICRA, AAAI)
- **Search Queries**:
  - "embodied AI" (2020-2025) → Embodiment hypothesis, physical AI
  - "vision-language-action models" (2022-2025) → VLA, RT-1, RT-2 papers
  - "human-robot interaction" (2020-2025) → Voice interfaces, natural language
- **Expected**: 3-5 papers (peer-reviewed)

**3. arXiv (Preprints)**
- **Focus**: Latest ML/robotics research (not peer-reviewed, but citable)
- **Search Queries**:
  - "sim-to-real transfer" (2022-2025) → Domain randomization, reality gap
  - "vision language action" (2023-2025) → Cutting-edge VLA papers
- **Expected**: 2-3 preprints (recent, may cite if no peer-reviewed alternative)

**4. Google Scholar**
- **Focus**: Cross-database search, official documentation
- **Search Queries**:
  - "NVIDIA Isaac Sim robotics" → Isaac Sim papers, technical reports
  - "Nav2 ROS 2 navigation" → Official docs, ROS 2 navigation papers
  - "MoveIt 2" → MoveIt papers, manipulation research
- **Expected**: 3-5 sources (mix of peer-reviewed papers and official docs)

**5. Official Documentation (Non-Peer-Reviewed but Authoritative)**
- **Sources**:
  - ROS 2 Documentation (docs.ros.org)
  - NVIDIA Isaac Sim Documentation
  - OpenAI Whisper Paper (arXiv, but official)
  - NAV2 Documentation
  - MoveIt 2 Documentation
- **Expected**: 5-7 official sources (technical references)

### Source Quality Targets

| Source Type | Target Count | Notes |
|------------|--------------|-------|
| **Peer-Reviewed Journals** | ≥8 | IEEE T-RO, RA-L, IJRR, etc. |
| **Peer-Reviewed Conferences** | ≥4 | ICRA, IROS, RSS, CoRL, HRI |
| **Technical Books** | 1-2 | Academic publishers (Springer, MIT Press) |
| **Official Documentation** | 5-7 | ROS 2, Isaac Sim, Nav2, MoveIt 2 |
| **arXiv Preprints** | 2-3 | Latest VLA/sim-to-real (if no peer-reviewed available) |
| **Industry Reports** | 0-1 | Optional: Gartner/Forrester on humanoid robotics market |
| **TOTAL** | ≥20 | ≥60% peer-reviewed (12+ of 20) |

### Citation Strategy by Chapter

| Chapter | Key Sources | Expected Citations |
|---------|-------------|-------------------|
| Ch 1 (Intro) | Embodiment papers, Physical AI definitions | 3-4 |
| Ch 2 (Landscape) | Recent humanoid robotics papers, industry surveys | 4-5 |
| Ch 3 (ROS 2) | ROS 2 design papers, official docs | 2-3 |
| Ch 4 (URDF) | URDF specification, robot modeling papers | 2 |
| Ch 5 (Simulation) | Isaac Sim papers, Gazebo papers, sim comparison | 3-4 |
| Ch 6 (Sensors) | Sensor simulation papers, RealSense docs | 2-3 |
| Ch 7 (Isaac ROS) | Isaac ROS papers, VSLAM papers, perception | 3-4 |
| Ch 8 (Navigation) | Nav2 docs, path planning papers, bipedal locomotion | 3-4 |
| Ch 9 (VLA) | RT-1, RT-2, PaLM-E, VLA survey papers | 4-5 |
| Ch 10 (Voice) | Whisper paper, LLM papers, embodied reasoning | 3-4 |
| Ch 11 (Manipulation) | MoveIt 2 docs, grasp planning, manipulation | 3 |
| Ch 12 (Sim-to-Real) | Sim-to-real papers, domain randomization | 4-5 |
| Ch 13 (Capstone) | Integrated systems, capstone pedagogy | 2 |
| Ch 14 (Hardware) | Hardware specs, educational lab papers | 2 |

**Total Expected**: 40-50 total citations across book (some sources cited in multiple chapters)
**Unique Sources**: 20-25 (target ≥20, allowing some reuse across chapters)

---

## 11. Readability Target: Flesch-Kincaid Grade 10-12

### Research Question
How to achieve FK Grade 10-12 readability for technical content while maintaining academic rigor?

### Readability Guidelines

**Flesch-Kincaid Grade Level Formula**:
```
FK Grade = 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
```

**Target Range**: 10-12 (high school sophomore to senior level)
- **FK Grade 10**: Comprehensible to most adults and advanced high school students
- **FK Grade 12**: Challenging but accessible to college freshmen and technical professionals

### Strategies to Achieve FK 10-12

**1. Sentence Length**
- **Target**: 15-25 words per sentence average
- **Avoid**: >30-word sentences (break into two)
- **Mix**: Vary sentence length (10-word sentences + 25-word sentences = 17.5 average)

**2. Word Choice**
- **Prefer**: 1-2 syllable words where possible ("use" > "utilize", "help" > "facilitate")
- **Accept**: 3-4 syllable technical terms when necessary ("simulation", "navigation", "manipulation")
- **Define**: All jargon on first use ("URDF (Unified Robot Description Format)")

**3. Active Voice**
- **Target**: >80% active voice
- **Example Active**: "The robot executes the action" (FK easier than passive)
- **Example Passive**: "The action is executed by the robot" (FK harder, less clear)

**4. Paragraph Structure**
- **Target**: 3-5 sentences per paragraph
- **Avoid**: Dense 10-sentence paragraphs (break into subsections)

**5. Examples and Analogies**
- **Use**: Concrete examples to explain abstract concepts
- **Example**: "ROS 2 topics are like radio channels: publishers broadcast, subscribers listen"

### Tools for Validation

**Hemingway Editor** (Primary):
- **Web**: hemingwayapp.com (free)
- **Desktop**: $19.99 (one-time, optional)
- **Features**: Highlights complex sentences, passive voice, simpler alternatives
- **Grade Target**: Aim for Grade 10 in Hemingway (equivalent to FK 10-12)

**Grammarly** (Secondary):
- **Readability Score**: Included in Premium
- **Suggestions**: Simplify sentences, remove jargon

**Microsoft Word** (Built-in):
- **Readability Stats**: File → Options → Proofing → "Show readability statistics"
- **After Spell Check**: Displays FK Grade Level

### Expected Results by Chapter Type

| Chapter Type | Expected FK Grade | Rationale |
|--------------|------------------|-----------|
| **Conceptual (Ch 1-2)** | 10-11 | Less code, more narrative, easier |
| **Technical (Ch 3-11)** | 11-12 | More jargon, code explanations, slightly harder |
| **Integration (Ch 12-13)** | 11-12 | Complex system descriptions |
| **Hardware (Ch 14)** | 10 | Concrete specifications, simpler language |

### Trade-offs

**Accept Higher FK When**:
- Technical terms unavoidable ("inverse kinematics", "visual-inertial odometry")
- Precision required (safety-critical instructions)
- Code explanations (variable names, API calls)

**Compensate with**:
- Shorter surrounding sentences
- Glossary entries for complex terms
- Diagrams and visual aids

---

## Summary of Research Findings

### Technology Stack Confirmed

**Content Creation**:
- ✅ Docusaurus 3.x (React-based static site generator)
- ✅ Zotero + Better BibTeX (APA 7th edition, auto-export)
- ✅ Grammarly Premium + Copyleaks (plagiarism <1%)
- ✅ Hemingway Editor (FK Grade 10-12 validation)
- ✅ GitHub Actions (CI/CD, deployment)
- ✅ GitHub Pages (hosting)

**Robotics Stack**:
- ✅ ROS 2 Humble Hawksbill (LTS, primary)
- ✅ ROS 2 Iron Irwini (secondary, compatibility notes)
- ✅ NVIDIA Isaac Sim 2024.1+ (GPU-accelerated simulation)
- ✅ NVIDIA Isaac ROS 2.x (GPU perception)
- ✅ Nav2 (navigation)
- ✅ MoveIt 2 (manipulation)
- ✅ Docker + docker-compose (reproducibility)

**AI/ML Stack**:
- ✅ OpenAI Whisper (speech-to-text)
- ✅ GPT-4 Turbo (primary LLM)
- ✅ Claude 3 (secondary LLM)
- ✅ Llama 3 (local LLM fallback)

### Key Decisions Rationale

1. **Long-Term Support**: Humble LTS (until 2027) ensures book relevance
2. **State-of-the-Art**: Isaac Sim + Isaac ROS prepares students for industry
3. **Dual Validation**: Grammarly + Copyleaks reduces plagiarism detection false negatives
4. **Hybrid LLM**: GPT-4 for demos, open-source for cost-conscious students
5. **Reproducibility**: Docker containers freeze dependencies, ensure portability

### Remaining Unknowns (To Be Resolved in Development)

1. **PDF Plugin Configuration**: Fine-tune PrinceXML settings for optimal layout
2. **Docker Image Size Optimization**: Balance between "full" and "lite" images
3. **LLM Prompt Engineering**: Optimal prompts for voice → ROS 2 action translation
4. **Peer Reviewer Availability**: Confirm 2-3 reviewers for Week 11-12

### Next Phase: data-model.md

Define content structure:
- Chapter entity schema (title, word count, code examples, citations)
- Exercise entity schema (problem, starter code, solution, estimated time)
- Citation entity schema (BibTeX key, type, chapter tags)
- Hardware configuration entity schema (components, costs, assembly notes)

---

**Research Status**: ✅ **COMPLETE** - All technology decisions documented and justified.

**Phase 0 Output**: This document (`research.md`) provides foundation for Phase 1 design artifacts.
