# drive-media

Turn Google Drive share links into usable image and video URLs for your projects.

> **Status:** in development. Not yet published to npm.

## The problem
A Google Drive share link opens Drive's viewer page, not the file itself,
so it can't be used directly in an `<img src>`. Working URL formats are
undocumented and have changed over time.

## What it does
- Extracts the file ID from common Drive link formats
- Returns a direct image URL with an automatic fallback
- Returns an embed URL and iframe snippet for videos
- Converts many links at once
- Includes a React component

## Planned usage
```js
import { driveToSrc, driveToVideo } from "drive-media";

const { primary, fallback } = driveToSrc("https://drive.google.com/file/d/abc123/view");
const { embed } = driveToVideo("https://drive.google.com/file/d/xyz789/view");
```

## Limitations
- Files must be shared as "Anyone with the link".
- This relies on undocumented Google behaviour that may change.
- Drive is not a production image host. Use this for prototypes and
  personal projects.

## Roadmap
- [ ] Link parser
- [ ] Image URLs with fallback
- [ ] Video embeds
- [ ] Bulk conversion
- [ ] React component
- [ ] Demo site
- [ ] npm release

## Contributing
Issues and pull requests are welcome. See CONTRIBUTING.md.

## License
MIT
