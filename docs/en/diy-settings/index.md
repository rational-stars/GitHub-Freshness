![settings](../../img/setting.png)

# Feature settings

GitHub Freshness compares each repository or file update time with your configured time threshold. Items inside the threshold are treated as fresh; older items are treated as stale.

## Theme

Choose which theme configuration you are editing:

- **light**
- **dark**

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

- **auto**: follow the system light/dark preference.
- **light**: use the light theme configuration.
- **dark**: use the dark theme configuration.

## Current language

Choose the language used by the settings panel, menu, and dialogs:

- **Auto**: follow the GitHub page language first, then the browser language.
- **Chinese**: force Chinese.
- **English**: force English.

The script also supports update-time parsing on both Chinese and English GitHub search pages.

## Settings backup

Click **Export JSON** to back up themes, colors, time thresholds, sorting, and language preferences. Click **Import JSON** to restore them. The page reloads automatically after a successful import.

Exports never include the AWESOME token. Imports also ignore any token field in the backup and preserve the local AWESOME token.

## AWESOME token

Go to [AWESOME token](./awesome-xxx.md#awesome-token).
