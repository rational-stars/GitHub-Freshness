![settings](../../img/setting.png)

# Feature settings

GitHub Freshness compares each repository or file update time with your configured time threshold. Items inside the threshold are treated as fresh; older items are treated as stale.

## Theme

Choose which theme configuration you are editing:

- **Light**
- **Dark**

The option labels follow the selected interface language. Saving writes the current colors, threshold, and switches to the selected theme.

## Time threshold

Controls when a repository or file is considered fresh. For example, `22 days` means updates within the last 22 days use the fresh colors.

Supported units:

- Day
- Week
- Month
- Year

## Color settings

**Background color**, **Font color**, and **Folder color** each have two color swatches:

- The left swatch is used for fresh items inside the threshold.
- The right swatch is used for stale items outside the threshold.

## Date formatting

Converts GitHub update times to `yyyy-mm-dd`.

## File sorting

Sort repository files and folders by update time in ascending or descending order.

## Current theme

Choose the active theme behavior:

- **Auto**: follow the system light/dark preference.
- **Light**: use the light theme configuration.
- **Dark**: use the dark theme configuration.

## Current language

Choose the language used by the settings panel, menu, and dialogs:

- **Auto**: follow the GitHub page language first, then the browser language.
- **Chinese**: force Chinese.
- **English**: force English.

Changing the language immediately previews the panel title, labels, options, buttons, and hints. The preference is written only after clicking **Save settings**; **Cancel** discards the language change. Previewing a language does not clear unsaved colors, thresholds, switches, or the token.

Both the extension and userscript support update-time parsing on Chinese and English GitHub search pages.

## Settings panel appearance

The panel uses the “Midnight Mint” palette derived from the branch-clock icon: a deep navy panel, dark controls, mint primary actions, cyan links, and amber warning states. This palette affects only the settings interface and does not change repository highlight colors configured by the user.

## Settings backup

Click **Export JSON** to back up themes, colors, time thresholds, sorting, and language preferences. Click **Import JSON** to restore them. The page reloads automatically after a successful import.

Exports never include the AWESOME token. Imports also ignore any token field in the backup and preserve the local AWESOME token.

## AWESOME token

Go to [AWESOME token](./awesome-xxx.md#awesome-token).
