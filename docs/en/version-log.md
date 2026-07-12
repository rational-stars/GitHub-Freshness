# GitHub Freshness Changelog

## Bug fixes and improvements

Version: v1.1.6 - July 13, 2026

- Fixed GitHub DOM changes that broke repository lists, search results, and Awesome project link detection.
- Fixed the Pickr color picker stylesheet loading issue caused by GitHub Content Security Policy.
- Prevented Chrome from showing a password-save prompt when saving settings.
- Added fallback handling for dark theme configuration.
- Added compatibility for Chinese and English GitHub interfaces.
- Added **Current language** with Auto, Chinese, and English options.
- Improved GitHub search date parsing for Chinese and English page states.
- Optimized Awesome API requests with caching, duplicate guards, and one-time rate-limit warnings.
- Reduced noisy console output with a debug switch.

## Bug fixes

Version: v1.1.5 - February 24, 2025

Fixed cases where only one page worked after opening multiple pages, and changed the default AWESOME token setting to false.

## Bug fixes

Version: v1.1.4 - February 24, 2025

Fixed script activation on some subpages.
