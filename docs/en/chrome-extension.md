# Chrome extension

GitHub Freshness is available as both a Chrome extension and a userscript. The Chrome extension does not require Tampermonkey and provides the same features and settings as the userscript.

## Get and install

The Chrome extension is distributed separately through official channels. The public [GitHub Freshness repository](https://github.com/rational-stars/GitHub-Freshness) contains the userscript and project documentation, but does not include the Chrome extension source or an `extension` directory for loading an unpacked build.

The official installation link will be added to this page when it is available. Do not install extension files from unofficial sources.

After installation, open any GitHub repository or search page to apply freshness highlighting. Click the GitHub Freshness toolbar icon to open the settings panel.

When opening or switching repositories, the extension preserves GitHub's native Skeleton state and finishes colors, dates, and sorting before real rows are first painted, without hiding or revealing content a second time. The branch-clock shortcut after the repository Code button also opens the settings panel directly.

The settings panel provides icon links to the documentation, GitHub repository, personal homepage, and Telegram community, followed by a subtle Star reminder at the very bottom. All links open in a new tab.

## Update the extension

Chrome extensions installed through an official channel update through that channel. Saved settings are preserved.

## Settings backup

The settings panel can import and export settings as a JSON file. Exports include themes, colors, freshness periods, sorting, and language preferences, but never include the AWESOME token.

When importing settings, the extension ignores any token field from older backup files and keeps the local AWESOME token. This prevents accidental replacement or disclosure of sensitive credentials.
