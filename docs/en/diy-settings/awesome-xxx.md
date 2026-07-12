# Awesome projects

**Awesome** projects are curated lists of high-quality resources around a specific topic, usually named in the format `awesome-topic`.

GitHub Freshness can detect GitHub repository links in Awesome-style README files and show:

- Star count
- Latest update date
- Freshness highlighting

## AWESOME token

This feature calls the GitHub API. Unauthenticated requests are limited, so frequent use can hit GitHub API rate limits.

To increase the limit, create a GitHub personal access token:

1. Open https://github.com/settings/tokens
2. Generate a new token. The default permissions are enough for public repository metadata.
3. Paste the token into the **AWESOME token** field in the GitHub Freshness settings panel and enable the checkbox.

The token field is visually masked, but it is not a real browser password input. This avoids Chrome or password managers incorrectly asking to save the token as a website password.
