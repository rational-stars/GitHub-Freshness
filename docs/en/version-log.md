# GitHub Freshness Changelog

## v2.0.0 - July 15, 2026

### Chrome extension

- Added a Manifest V3 Chrome extension with synchronized settings and toolbar access to the settings panel.
- The Chrome extension is now distributed separately, has passed review, and is officially available in the [Chrome Web Store](https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj). The public repository no longer includes its source code or local unpacked-install directory.
- Fixed storage errors that could occur on stale pages after the extension was reloaded.

### Page experience

- Reworked repository loading to preserve GitHub's native loading state and apply colors, dates, and sorting before the file list first appears, reducing visible flashes.
- Added support for in-page GitHub navigation, repository changes, search results, and dynamically loaded content.
- Styled the Code button with the active theme's fresh background and text colors while preserving GitHub's native style when the related options are disabled.
- Added GitHub Freshness shortcuts after the repository Code button and in the search-page controls.
- Search-result backgrounds now fill the complete card. Descriptions, languages, star counts, and update times follow the configured text colors, while repository names, topics, and action buttons keep GitHub's native styles.
- Fixed GitHub DOM changes that broke repository lists, search results, and Awesome project link detection.
- Fixed folder and file icon colors being overridden by GitHub styles.

### Settings and backups

- Added JSON settings import and export. Exports exclude the AWESOME token, and imports preserve the local token.
- Changed the default interface language to Chinese while keeping Auto, Chinese, and English options.
- Language changes now preview immediately and are persisted only after saving.
- Light and dark theme edits are retained separately when switching themes before saving.
- Made the AWESOME enabled state independent from the selected light or dark theme.
- Applied the new default palette and Auto theme mode only when local settings are absent, preserving existing configurations.
- Reloads the current page after settings are saved or imported successfully.

### Settings panel

- Added the new branch-clock icon across the userscript, settings title, and page shortcuts.
- Applied the new Midnight Mint palette and refined desktop and mobile layouts.
- Reworded several settings with clearer labels for freshness periods, text colors, file icons, and date formatting.
- Added Fresh color and Stale color hover hints to the two color controls.
- Added separate documentation and token-generation links for AWESOME and token.
- Added bottom links for the documentation, GitHub repository, personal homepage, and Telegram community, followed by a subtle Star reminder as the final panel content.

### Fixes

- Fixed Pickr color-picker styling and stale color values after switching themes.
- Prevented Chrome from treating the AWESOME token field as a password input.
- Improved Awesome API caching, duplicate processing guards, and rate-limit warnings.
- Improved update-time parsing on Chinese and English GitHub pages.

## Bug fixes

Version: v1.1.5 - February 24, 2025

Fixed cases where only one page worked after opening multiple pages, and changed the default AWESOME token setting to false.

## Bug fixes

Version: v1.1.4 - February 24, 2025

Fixed script activation on some subpages.
