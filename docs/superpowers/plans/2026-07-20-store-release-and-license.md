# Store Release and Noncommercial License Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the approved Chrome Web Store installation link throughout the project and replace MIT with PolyForm Noncommercial License 1.0.0 plus separate commercial licensing.

**Architecture:** This is a documentation-only release update. The canonical license lives in `LICENSE`; Chinese and English README/docs summarize the same permissions and use one canonical Chrome Web Store URL. No extension source, runtime code, screenshots, or version numbers change.

**Tech Stack:** Markdown, VitePress 1.6, npm, Git

## Global Constraints

- Use `https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj` as the only Chrome Web Store installation URL.
- Use the official PolyForm Noncommercial License 1.0.0 text without changing its standard terms.
- Add `Required Notice: Copyright (c) 2026 rational-stars`.
- Add `Required Notice: Commercial licensing inquiries: rational.stars127@gmail.com`.
- Allow personal, educational, research, modification, and noncommercial redistribution under the license terms.
- Treat all use by companies, commercial organizations, and for-profit activities, including internal company use, as requiring separate written commercial permission.
- Describe the public repository as `source-available`, not OSI open source.
- Keep the release version at `v2.0.0`.
- Do not modify or commit `.DS_Store`, extension source, extension archives, runtime code, or screenshots.

---

### Task 1: Replace the Repository License

**Files:**
- Modify: `LICENSE`

**Interfaces:**
- Consumes: Official PolyForm text from `https://raw.githubusercontent.com/polyformproject/polyform-licenses/1.0.0/PolyForm-Noncommercial-1.0.0.md`
- Produces: The canonical repository license linked by both README files

- [ ] **Step 1: Download a verification copy of the official license**

Run:

```bash
curl -L --fail --silent --show-error \
  https://raw.githubusercontent.com/polyformproject/polyform-licenses/1.0.0/PolyForm-Noncommercial-1.0.0.md \
  -o /tmp/PolyForm-Noncommercial-1.0.0.md
```

Expected: exit code `0`, and `/tmp/PolyForm-Noncommercial-1.0.0.md` starts with `# PolyForm Noncommercial License 1.0.0`.

- [ ] **Step 2: Replace MIT with the approved license**

Use `apply_patch` to replace `LICENSE` with these project notices followed by the complete downloaded official text:

```text
Required Notice: Copyright (c) 2026 rational-stars
Required Notice: Commercial licensing inquiries: rational.stars127@gmail.com

# PolyForm Noncommercial License 1.0.0
```

Append every official section unchanged, from `Acceptance` through the final `Definitions` paragraph.

- [ ] **Step 3: Verify the standard terms were not changed**

Run:

```bash
tail -n +4 LICENSE | diff -u /tmp/PolyForm-Noncommercial-1.0.0.md -
```

Expected: no output and exit code `0`.

- [ ] **Step 4: Commit the canonical license**

```bash
git add LICENSE
git commit -m "legal: adopt PolyForm noncommercial license"
```

Expected: only `LICENSE` is included in this commit.

### Task 2: Update Chinese Release and License Copy

**Files:**
- Modify: `README.md`
- Modify: `docs/chrome-extension.md`
- Modify: `docs/getting-started.md`
- Modify: `docs/index.md`
- Modify: `docs/version-log.md`
- Modify: `docs/what-is-GitHubFreshness.md`
- Modify: `docs/privacy/index.md`

**Interfaces:**
- Consumes: The canonical Web Store URL and `LICENSE` from Task 1
- Produces: All user-facing Chinese installation, release, source-availability, and licensing copy

- [ ] **Step 1: Update the Chinese README**

Use `apply_patch` to make these exact content changes in `README.md`:

- Replace review-status language with a statement that the extension is officially available.
- Add `[从 Chrome Web Store 安装 GitHub Freshness](https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj)` in the introduction and Chrome installation section.
- Preserve the warning that extension source is not included in the public repository and unofficial extension packages should not be installed.
- Replace the MIT section with:

```markdown
## 许可证

本仓库中的公开源码和文档采用 [PolyForm Noncommercial License 1.0.0](./LICENSE)：

- 可用于个人学习、教育、研究和其他非商业项目。
- 可以为非商业目的修改和重新发布，但必须保留版权及许可证声明。
- 公司、商业组织及其他营利用途（包括公司内部使用）需要获得单独的书面授权。

商业授权请联系：`rational.stars127@gmail.com`
```

- [ ] **Step 2: Update Chinese installation pages and homepage**

Use `apply_patch` to update `docs/chrome-extension.md`, `docs/getting-started.md`, and `docs/index.md`:

- Rename `## 审核状态` to `## 官方安装`.
- Put the official Web Store installation link in both installation pages.
- State that store installations update automatically.
- Change the homepage feature copy from “开源 Tampermonkey 脚本版” to “源码可用的 Tampermonkey 脚本版”.
- Remove all references to waiting for review or adding a link later.

- [ ] **Step 3: Update Chinese project scope, privacy, and changelog**

Use `apply_patch` to update `docs/what-is-GitHubFreshness.md`, `docs/privacy/index.md`, and `docs/version-log.md`:

- Rename `版本与开源范围` to `版本与源码范围`.
- State that the extension is officially available from the Chrome Web Store and link it.
- Change “开源油猴脚本” to “源码可用的油猴脚本”.
- In the existing `v2.0.0` entry, replace the review-status sentence with “已通过审核并在 Chrome Web Store 正式上架”, preserving the note that extension source is not in the public repository.

- [ ] **Step 4: Verify Chinese copy**

Run:

```bash
rg -n "正在等待审核|等待审核|审核通过后|开源油猴脚本|开源 Tampermonkey|版本与开源范围|MIT License" \
  README.md docs --glob '!docs/en/**' --glob '!docs/superpowers/**'
```

Expected: no output and exit code `1` because no obsolete text remains.

- [ ] **Step 5: Commit Chinese documentation**

```bash
git add README.md docs/chrome-extension.md docs/getting-started.md docs/index.md \
  docs/version-log.md docs/what-is-GitHubFreshness.md docs/privacy/index.md
git commit -m "docs: publish Chrome extension release details"
```

Expected: only the listed Chinese documentation files are included.

### Task 3: Update English Release and License Copy

**Files:**
- Modify: `README_EN.md`
- Modify: `docs/en/chrome-extension.md`
- Modify: `docs/en/getting-started.md`
- Modify: `docs/en/index.md`
- Modify: `docs/en/version-log.md`
- Modify: `docs/en/what-is-GitHubFreshness.md`
- Modify: `docs/en/privacy/index.md`

**Interfaces:**
- Consumes: The canonical Web Store URL, `LICENSE`, and approved Chinese meaning
- Produces: English copy semantically equivalent to Task 2

- [ ] **Step 1: Update the English README**

Use `apply_patch` to make these exact content changes in `README_EN.md`:

- Replace review-status language with an official release statement and Web Store link.
- Preserve the public-repository scope and unofficial-package warning.
- Replace the MIT section with:

```markdown
## License

The public source code and documentation in this repository are available under the [PolyForm Noncommercial License 1.0.0](./LICENSE):

- You may use them for personal study, education, research, and other noncommercial projects.
- You may modify and redistribute them for noncommercial purposes, provided that you retain the copyright and license notices.
- Companies, commercial organizations, and all other commercial use, including internal company use, require separate written permission.

For commercial licensing, contact `rational.stars127@gmail.com`.
```

- [ ] **Step 2: Update English installation pages and homepage**

Use `apply_patch` to update `docs/en/chrome-extension.md`, `docs/en/getting-started.md`, and `docs/en/index.md`:

- Rename `## Review status` to `## Official installation`.
- Add the official Web Store installation link to both installation pages.
- State that store installations update automatically.
- Replace `open-source Tampermonkey userscript` with `source-available Tampermonkey userscript`.
- Remove every under-review or post-approval promise.

- [ ] **Step 3: Update English project scope, privacy, and changelog**

Use `apply_patch` to update `docs/en/what-is-GitHubFreshness.md`, `docs/en/privacy/index.md`, and `docs/en/version-log.md`:

- Keep the heading `Versions and source availability`.
- State and link the official Chrome Web Store release.
- Replace `open-source userscript` with `source-available userscript`.
- In the existing `v2.0.0` entry, state that the extension has passed review and is officially available in the Chrome Web Store, while preserving the source-availability note.

- [ ] **Step 4: Verify English copy**

Run:

```bash
rg -n "currently under review|under store review|After approval|open-source userscript|open-source Tampermonkey|MIT License" \
  README_EN.md docs/en
```

Expected: no output and exit code `1` because no obsolete text remains.

- [ ] **Step 5: Commit English documentation**

```bash
git add README_EN.md docs/en/chrome-extension.md docs/en/getting-started.md \
  docs/en/index.md docs/en/version-log.md docs/en/what-is-GitHubFreshness.md \
  docs/en/privacy/index.md
git commit -m "docs: update English release and license copy"
```

Expected: only the listed English documentation files are included.

### Task 4: Verify the Complete Documentation Release

**Files:**
- Verify: `LICENSE`
- Verify: `README.md`
- Verify: `README_EN.md`
- Verify: `docs/**`

**Interfaces:**
- Consumes: Tasks 1 through 3
- Produces: A buildable, internally consistent bilingual documentation release

- [ ] **Step 1: Confirm all public status and license references**

Run:

```bash
rg -n "正在等待审核|等待审核|审核通过后|currently under review|under store review|After approval|MIT License|开源油猴脚本|open-source userscript" \
  README.md README_EN.md docs \
  --glob '!docs/superpowers/**'
```

Expected: no output and exit code `1`.

- [ ] **Step 2: Confirm the official store URL appears in both languages**

Run:

```bash
rg -l "https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj" \
  README.md README_EN.md docs \
  --glob '!docs/superpowers/**'
```

Expected: both README files and the Chinese/English installation, getting-started, project-introduction, and changelog pages are listed.

- [ ] **Step 3: Build the VitePress documentation**

Run:

```bash
npm run build
```

Expected: VitePress exits with code `0` and reports a completed build.

- [ ] **Step 4: Check formatting and final scope**

Run:

```bash
git diff --check HEAD~3..HEAD
git status --short
```

Expected: `git diff --check` has no output. `git status --short` shows only the pre-existing `.DS_Store` modification and the implementation plan if it has not yet been committed.

- [ ] **Step 5: Commit the implementation plan without unrelated files**

```bash
git add docs/superpowers/plans/2026-07-20-store-release-and-license.md
git commit -m "docs: add store and license implementation plan"
```

Expected: the plan is committed by itself, and `.DS_Store` remains unstaged.
