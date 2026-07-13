# Chrome extension installation

GitHub Freshness is available as both a Chrome extension and a userscript. The Chrome extension does not require Tampermonkey and provides the same features and settings as the userscript.

## Install locally

1. Download or clone the [GitHub Freshness repository](https://github.com/rational-stars/GitHub-Freshness).
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository's `extension` folder.

After installation, open any GitHub repository or search page to apply freshness highlighting. Click the GitHub Freshness toolbar icon to open the settings panel.

When opening or switching repositories, the extension preserves GitHub's native Skeleton state and finishes colors, dates, and sorting before real rows are first painted, without hiding or revealing content a second time. The branch-clock shortcut after the repository Code button also opens the settings panel directly.

## Update the extension

After pulling or downloading the latest code, find GitHub Freshness on `chrome://extensions/` and click its reload button. Saved settings are preserved.

## Settings backup

The settings panel can import and export settings as a JSON file. Exports include themes, colors, time thresholds, sorting, and language preferences, but never include the AWESOME token.

When importing settings, the extension ignores any token field from older backup files and keeps the local AWESOME token. This prevents accidental replacement or disclosure of sensitive credentials.
