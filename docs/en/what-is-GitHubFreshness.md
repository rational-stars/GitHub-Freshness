# What is GitHub Freshness?

![GitHub Freshness](../img/github-freshness-marquee.png)

GitHub Freshness is a repository-activity tool for GitHub pages, available as a Chrome extension and a Tampermonkey userscript. It reads update times visible on the current page and turns them into color, date, and sorting cues that make repository maintenance status easier to scan.

## Why use it?

A high star count does not guarantee that a project is still maintained. GitHub spreads activity information across file lists, commit history, and search results. GitHub Freshness converts update times into clear fresh and stale colors so you can evaluate activity before investing time in a codebase.

## Where does it work?

### Repository file lists

Apply background, text, and file icon colors based on each file or directory update time. Dates can also be formatted and rows sorted by update time.

![Repository file list](../img/screenshots/repository-overview-light.png)

### Repository tree views

Continue processing the tree sidebar and current file list after entering a subdirectory, including GitHub's current repository browser.

### GitHub search results

Color the complete repository result card according to its freshness, making recently maintained projects easier to find in long result lists.

### Awesome-style projects

The optional AWESOME feature reads public repository metadata for linked projects and shows star counts and latest update dates.

## Personalization

- Configure light and dark themes independently.
- Set the freshness period in days, weeks, months, or years.
- Customize fresh and stale background, text, and file icon colors.
- Format update dates and sort repository files.
- Use Chinese, English, or automatic language selection.
- Back up and restore settings as JSON without exporting the AWESOME token.

See the [complete preview](./preview.md) and [Feature settings](./diy-settings/index.md) for details.

## Versions and source availability

The Chrome extension is officially available in the Chrome Web Store: [Install GitHub Freshness from the Chrome Web Store](https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj). The public repository contains the source-available userscript and project documentation. The Chrome extension is distributed separately and its source code is not published here.

GitHub Freshness does not track users, display advertising, or upload settings to a server operated by the project author. See the [Privacy Policy](./privacy/) for complete details.
