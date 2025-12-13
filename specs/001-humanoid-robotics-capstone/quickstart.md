# Quickstart Guide: Physical AI & Humanoid Robotics Book

**Feature**: 001-humanoid-robotics-capstone
**Date**: 2025-12-07
**Audience**: Authors, contributors, and reviewers

This guide helps you get started with authoring, reviewing, or contributing to the Physical AI & Humanoid Robotics book project.

---

## Prerequisites

Before you begin, ensure you have:

**Required**:
- Git 2.x+ installed
- Node.js 18+ and npm
- Docker 24.x+ (for code examples)
- Text editor (VS Code recommended)
- GitHub account

**Optional but Recommended**:
- Zotero 6.x + Better BibTeX plugin (for citation management)
- Grammarly account (for writing quality)
- NVIDIA GPU with 8GB+ VRAM (for testing Isaac Sim examples)

---

## Quick Start (5 Minutes)

### 1. Clone Repository

```bash
git clone https://github.com/[org]/physical-ai-humanoid-robotics-book.git
cd physical-ai-humanoid-robotics-book
```

### 2. Install Docusaurus Dependencies

```bash
cd book
npm install
```

### 3. Start Local Development Server

```bash
npm start
```

Opens browser at `http://localhost:3000` with live reload.

### 4. View Current Content

Navigate to `book/docs/` to see chapter Markdown files.

---

## Repository Structure

```
/
├── book/                   # Docusaurus book content
│   ├── docs/              # Chapter markdown files
│   ├── static/            # Images, diagrams, assets
│   ├── docusaurus.config.js
│   └── package.json
├── code-examples/         # Executable ROS 2 code
├── hardware/              # Hardware guides and BOMs
├── course-materials/      # Syllabus, exercises, rubrics
├── references/            # Citations (bibliography.bib)
├── specs/                 # Project planning docs
└── README.md
```

---

## Authoring Workflow

### Writing a Chapter

1. **Open Chapter File**: `book/docs/XX-title.md`
2. **Follow Structure**:
   ```markdown
   # Chapter X: Title

   ## Learning Objectives
   - Objective 1
   - Objective 2

   ## Section 1
   Content...

   ## Section 2
   Content...

   ## Exercises
   Exercise content...
   ```
3. **Write Content**: Aim for FK Grade 10-12 readability
4. **Add Citations**: Use `[@bibtexkey]` format (e.g., `[@quigley2009ros]`)
5. **Save**: Auto-reloads in browser at `localhost:3000`

### Adding Code Examples

1. **Create Directory**: `code-examples/chapter-XX-topic/example-name/`
2. **Add Files**:
   ```
   example-name/
   ├── src/                # Python ROS 2 code
   ├── Dockerfile          # Environment setup
   ├── docker-compose.yml  # Orchestration
   └── README.md           # Setup, run, troubleshooting
   ```
3. **Test Locally**:
   ```bash
   cd code-examples/chapter-XX-topic/example-name/
   docker-compose up
   ```
4. **Embed in Chapter**: Link from chapter markdown

### Managing Citations

**Using Zotero**:
1. Find paper (IEEE Xplore, ACM, arXiv, Google Scholar)
2. Click Zotero browser extension → Auto-import
3. Tag with chapter (e.g., "chapter-05")
4. Better BibTeX auto-exports to `references/bibliography.bib`

**Manual (Without Zotero)**:
1. Add entry to `references/bibliography.bib`:
   ```bibtex
   @inproceedings{author2024keyword,
     title={Paper Title},
     author={Author Name},
     booktitle={Conference Name},
     year={2024},
     doi={10.xxxx/xxxxx}
   }
   ```
2. Cite in markdown: `[@author2024keyword]`

---

## Quality Checks

### Before Committing a Chapter

Run these checks:

**1. Word Count**:
```bash
cd book/docs
wc -w XX-title.md
```
Target: 1,200-2,500 words (depending on chapter)

**2. Readability** (Hemingway Editor):
- Copy chapter text to [hemingwayapp.com](https://hemingwayapp.com)
- Target: Grade 10-12
- Fix highlighted complex sentences

**3. Plagiarism** (Grammarly):
- Copy chapter to Grammarly
- Run plagiarism check
- Target: <5% at draft stage, <1% final

**4. Citations**:
```bash
# Check for orphaned citations
grep -o '\[@[^]]*\]' book/docs/XX-title.md | sort -u
# Verify each key exists in references/bibliography.bib
```

**5. Build Test**:
```bash
cd book
npm run build
# Should complete without errors
```

---

## Common Tasks

### Add a New Chapter

1. Create file: `book/docs/XX-title.md`
2. Add to sidebar: `book/sidebars.js`
   ```javascript
   tutorialSidebar: [
     'intro',
     '01-physical-ai',
     // Add your chapter here
     'XX-title',
   ],
   ```
3. Write content following template
4. Test: `npm start`

### Add a Diagram

1. Create diagram (draw.io, Mermaid, or export from tool)
2. Export as SVG: `book/static/diagrams/chapter-XX-topic.svg`
3. Embed in markdown:
   ```markdown
   ![Topic Diagram](../static/diagrams/chapter-XX-topic.svg)
   ```

### Add a Video Demo

1. Upload to YouTube (project channel)
2. Embed in markdown:
   ```markdown
   <iframe width="560" height="315"
     src="https://www.youtube.com/embed/VIDEO_ID"
     frameborder="0" allowfullscreen>
   </iframe>
   ```

### Test a Code Example

```bash
cd code-examples/chapter-XX-topic/example-name/
docker-compose up
# Follow instructions in README.md
# Verify expected output matches documentation
```

---

## Git Workflow

### For Authors (Write Access)

**Daily Work**:
```bash
git checkout main
git pull origin main
git checkout -b chapter-XX-drafting
# Make changes
git add book/docs/XX-title.md
git commit -m "Draft: Chapter XX section 1-2 complete"
git push origin chapter-XX-drafting
```

**Submit for Review**:
```bash
# After chapter complete
git push origin chapter-XX-drafting
# Create Pull Request on GitHub
# Request review from peer reviewer
```

### For Contributors (No Write Access)

**Fork and PR**:
```bash
# 1. Fork repo on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/physical-ai-humanoid-robotics-book.git
cd physical-ai-humanoid-robotics-book

# 3. Create branch
git checkout -b fix-chapter-05-typo

# 4. Make changes
# Edit files...

# 5. Commit and push
git add .
git commit -m "Fix: Typo in Chapter 5, section 2"
git push origin fix-chapter-05-typo

# 6. Create PR on GitHub from your fork to main repo
```

---

## Development Tools

### Recommended VS Code Extensions

- **Markdown All in One**: Keyboard shortcuts, TOC generation
- **markdownlint**: Markdown linting
- **Code Spell Checker**: Catch typos
- **Docker**: Dockerfile syntax highlighting
- **Python**: For code examples
- **Grammarly**: Writing assistant (requires account)

### Useful Scripts

Located in `scripts/` directory:

**Check Word Count**:
```bash
./scripts/check-wordcount.sh
# Outputs word count per chapter and total
```

**Validate Citations**:
```bash
python scripts/validate-citations.py
# Checks for orphaned citations and references
```

**Plagiarism Check** (requires Grammarly API key):
```bash
./scripts/plagiarism-check.sh book/docs/XX-title.md
```

**Generate PDF**:
```bash
cd book
npm run pdf
# Outputs: physical-ai-humanoid-robotics.pdf
```

---

## Troubleshooting

### Docusaurus Build Fails

**Error**: `Module not found`
**Solution**:
```bash
cd book
rm -rf node_modules package-lock.json
npm install
npm start
```

### Docker Compose Fails (Code Examples)

**Error**: `docker-compose: command not found`
**Solution**: Install Docker Desktop or docker-compose CLI

**Error**: `NVIDIA GPU not found` (Isaac Sim examples)
**Solution**: Either:
1. Use cloud GPU (AWS g4dn, Google Cloud with T4)
2. Skip GPU examples (focus on non-Isaac Sim chapters)
3. Wait for Chapter 5 where simulation options are discussed

### Citation Not Rendering

**Error**: `[@key]` appears as literal text, not citation
**Solution**:
1. Verify `key` exists in `references/bibliography.bib`
2. Check Docusaurus bibliography plugin is installed
3. Rebuild: `npm run build`

### Readability Too High (FK Grade >12)

**Solutions**:
- Break long sentences (>30 words) into two
- Replace complex words with simpler alternatives
- Use active voice instead of passive
- Add examples to explain abstract concepts
- Consult Hemingway Editor suggestions

---

## Getting Help

### Internal Resources

- **Project Docs**: `specs/001-humanoid-robotics-capstone/`
  - `spec.md`: Feature requirements
  - `plan.md`: Implementation plan
  - `research.md`: Technology decisions
  - `data-model.md`: Content structure
- **README**: `README.md` (project overview)
- **Contributing Guide**: `CONTRIBUTING.md`

### External Resources

- **Docusaurus Docs**: https://docusaurus.io/docs
- **ROS 2 Docs**: https://docs.ros.org/en/humble/
- **Isaac Sim Docs**: https://docs.omniverse.nvidia.com/isaacsim/
- **Zotero Guide**: https://www.zotero.org/support/

### Contact

- **GitHub Issues**: For bugs, enhancements, questions
- **GitHub Discussions**: For Q&A and general discussion
- **Email**: [project-email@example.com] (if applicable)

---

## Next Steps

### For New Authors

1. ✅ Read this Quickstart (you're here!)
2. ✅ Review `specs/001-humanoid-robotics-capstone/spec.md`
3. ✅ Review `specs/001-humanoid-robotics-capstone/plan.md`
4. ✅ Set up local environment (Install Node, Docker, Zotero)
5. ✅ Clone repo and run `npm start` in `book/` directory
6. ✅ Pick a chapter to draft (check project board for assignments)
7. ✅ Follow authoring workflow above
8. ✅ Submit PR when chapter complete

### For Reviewers

1. ✅ Read this Quickstart
2. ✅ Review `specs/001-humanoid-robotics-capstone/spec.md` (success criteria)
3. ✅ Set up local environment to preview PRs
4. ✅ Use review checklist (TBD: link to checklist template)
5. ✅ Provide feedback on GitHub PRs

### For Contributors (Community)

1. ✅ Read `CONTRIBUTING.md`
2. ✅ Check GitHub Issues for "good first issue" or "help wanted" labels
3. ✅ Fork, clone, branch, make changes, PR (see Git Workflow above)
4. ✅ Be respectful and follow project code of conduct

---

**Quickstart Version**: 1.0
**Last Updated**: 2025-12-07

**Ready to Start?** Pick a chapter from `book/docs/`, open in your editor, and start writing! 🚀
