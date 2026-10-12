# drive-media

[![Tests](https://github.com/Darryl-Mbae/drive-media/actions/workflows/test.yml/badge.svg)](https://github.com/Darryl-Mbae/drive-media/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/drive-media.svg)](https://www.npmjs.com/package/drive-media)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Darryl-Mbae.drive-media)](https://visitor-badge.laobi.icu/badge?page_id=Darryl-Mbae.drive-media)

**Free image hosting using Google Drive.** Convert Google Drive share links into direct URLs for images and videos—no expensive image hosting services needed.

## The Problem

You have tons of free storage in Google Drive. Why pay for Cloudflare, Supabase, or other image hosting services when you can use Drive for free?

The issue: Google Drive share links don't work directly in `<img>` tags or video players. This library fixes that in seconds.

## What drive-media Does

- ✅ Converts Google Drive share links to direct image URLs
- ✅ Generates embed URLs for videos
- ✅ Supports custom image widths for responsive designs
- ✅ Batch converts multiple links with error handling
- ✅ Zero dependencies, fully typed TypeScript
- ✅ Tiny package (4.9 kB)

## Installation

```bash
npm install drive-media
```

Requires Node.js 12.0.0 or higher.

## Usage

### Extract File ID

```typescript
import { extractFileId } from "drive-media";

const fileId = extractFileId("https://drive.google.com/file/d/abc123xyz/view");
console.log(fileId); // "abc123xyz"
```

Supports multiple Drive link formats:
- `https://drive.google.com/file/d/{id}/view`
- `https://drive.google.com/file/d/{id}/view?usp=sharing`
- `https://drive.google.com/open?id={id}`
- `https://drive.google.com/uc?export=view&id={id}`

### Convert to Image URL

```typescript
import { toImageUrl } from "drive-media";

// Default width (1000px)
const url = toImageUrl("https://drive.google.com/file/d/abc123xyz/view");
console.log(url); 
// "https://drive.google.com/thumbnail?id=abc123xyz&sz=w1000"

// Custom width
const smallUrl = toImageUrl("https://drive.google.com/file/d/abc123xyz/view", 500);
console.log(smallUrl);
// "https://drive.google.com/thumbnail?id=abc123xyz&sz=w500"

// Use in HTML
const img = document.createElement("img");
img.src = toImageUrl(driveLink);
img.alt = "Image from Google Drive";
document.body.appendChild(img);
```

### Convert to Video Embed URL

```typescript
import { toVideoEmbedUrl } from "drive-media";

const embedUrl = toVideoEmbedUrl("https://drive.google.com/file/d/abc123xyz/view");
console.log(embedUrl);
// "https://drive.google.com/file/d/abc123xyz/preview"

// Create iframe
const iframe = document.createElement("iframe");
iframe.src = toVideoEmbedUrl(driveLink);
iframe.width = "640";
iframe.height = "360";
iframe.allowFullscreen = true;
document.body.appendChild(iframe);
```

### Batch Convert with Error Handling

```typescript
import { convertMany, toImageUrl } from "drive-media";

const links = [
  "https://drive.google.com/file/d/abc123/view",
  "https://drive.google.com/file/d/invalid/view",
  "https://drive.google.com/drive/folders/xyz789", // Invalid: folder
];

const { results, errors } = convertMany(links, toImageUrl);

console.log("Success:", results);
// [
//   "https://drive.google.com/thumbnail?id=abc123&sz=w1000"
// ]

console.log("Errors:", errors);
// [
//   { link: "https://drive.google.com/file/d/invalid/view", message: "Not a valid Google Drive link" },
//   { link: "https://drive.google.com/drive/folders/xyz789", message: "Folder links are not supported..." }
// ]
```

## API Reference

### `extractFileId(link: string): string`

Extracts the file ID from a Google Drive link.

**Parameters:**
- `link` (string): A Google Drive share link

**Returns:** The file ID as a string

**Throws:** 
- `Error` if the link is empty or whitespace
- `Error` if the link points to a folder (not supported)
- `Error` if the link format is not recognized

**Examples:**
```typescript
extractFileId("https://drive.google.com/file/d/1a-B_c2/view") 
// → "1a-B_c2"

extractFileId("https://drive.google.com/open?id=abc123")
// → "abc123"

extractFileId("") 
// → throws Error: "Please provide a Google Drive link"

extractFileId("https://drive.google.com/drive/folders/abc123")
// → throws Error: "Folder links are not supported..."
```

### `toImageUrl(link: string, width?: number): string`

Converts a Google Drive link to a thumbnail/image URL.

**Parameters:**
- `link` (string): A Google Drive share link to an image file
- `width` (number, optional): Image width in pixels. Default: `1000`

**Returns:** A direct image URL

**Throws:** Same as `extractFileId`

**Examples:**
```typescript
toImageUrl("https://drive.google.com/file/d/abc123/view")
// → "https://drive.google.com/thumbnail?id=abc123&sz=w1000"

toImageUrl("https://drive.google.com/file/d/abc123/view", 500)
// → "https://drive.google.com/thumbnail?id=abc123&sz=w500"
```

### `toVideoEmbedUrl(link: string): string`

Converts a Google Drive link to a video preview/embed URL suitable for iframes.

**Parameters:**
- `link` (string): A Google Drive share link to a video file

**Returns:** A preview URL

**Throws:** Same as `extractFileId`

**Examples:**
```typescript
toVideoEmbedUrl("https://drive.google.com/file/d/abc123/view")
// → "https://drive.google.com/file/d/abc123/preview"
```

### `convertMany(links: string[], converter: (link: string) => string): { results: string[], errors: { link: string, message: string }[] }`

Batch converts multiple links with graceful error handling.

**Parameters:**
- `links` (string[]): Array of Google Drive links
- `converter` (function): Conversion function to apply (e.g., `toImageUrl`, `toVideoEmbedUrl`)

**Returns:** Object with:
- `results` (string[]): Successfully converted URLs in order
- `errors` (object[]): Failed conversions with original link and error message

**Examples:**
```typescript
const { results, errors } = convertMany(
  ["https://drive.google.com/file/d/abc/view", ""],
  toImageUrl
);
// results → ["https://drive.google.com/thumbnail?id=abc&sz=w1000"]
// errors → [{ link: "", message: "Please provide a Google Drive link" }]
```

## How to Use Google Drive for Free Image Hosting

1. **Upload images to Google Drive** (any folder)
2. **Right-click → Share** and set to "Anyone with the link"
3. **Copy the share link**
4. **Use this library to get a direct URL**
5. **Use the URL in your `<img>`, `<video>`, or anywhere else**

## Requirements

- **Minimum Node.js:** 12.0.0
- **Module Format:** CommonJS (ES2019 target)
- **TypeScript:** 4.0+ (if using TypeScript)

## Limitations

1. **Files must be shared**: Files must be shared as "Anyone with the link" to generate working URLs
2. **Undocumented behavior**: This relies on undocumented Google Drive behavior that may change without notice
3. **Not a production CDN**: Google Drive is not designed to serve images at massive scale. Use this for personal projects, portfolios, and prototypes—not high-traffic production sites
4. **File accessibility**: URLs are only valid as long as the file remains shared

## Error Handling

All functions throw descriptive errors for invalid inputs:

```typescript
try {
  const id = extractFileId("invalid-input");
} catch (error) {
  console.error(error.message); 
  // "Not a valid Google Drive link"
}
```

For batch operations, use `convertMany` to collect errors without interrupting processing:

```typescript
const { results, errors } = convertMany(links, toImageUrl);

if (errors.length > 0) {
  console.warn("Some links failed to convert:", errors);
}
```

## Development

### Prerequisites

- Node.js 12+
- npm or yarn

### Setup

```bash
git clone https://github.com/Darryl-Mbae/drive-media.git
cd drive-media
npm install
```

### Scripts

```bash
# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build:lib

# Build before publishing
npm run prepublishOnly
```

### Testing

Tests are written with Jest and cover:
- Link parsing for multiple formats
- URL generation for images and videos
- Error handling for invalid inputs
- Batch conversion with error collection

```bash
npm test
```

## Changelog

### 0.2.0 (Latest)

- Production release with complete documentation
- File ID extraction from Google Drive links
- Image URL generation with custom widths
- Video embed URL generation
- Batch conversion with error handling
- Full test coverage (20 tests)
- TypeScript support with strict mode

### 0.1.0

- Initial placeholder version (deprecated)

## License

MIT © [Darryl Mbae](https://github.com/Darryl-Mbae)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for bugs and feature requests.

## Support

For issues, questions, or suggestions, please open an issue on [GitHub Issues](https://github.com/Darryl-Mbae/drive-media/issues).

## Installation

```bash
npm install drive-media
```

Requires Node.js 12.0.0 or higher.

## Usage

### Extract File ID

```typescript
import { extractFileId } from "drive-media";

const fileId = extractFileId("https://drive.google.com/file/d/abc123xyz/view");
console.log(fileId); // "abc123xyz"
```

Supports multiple Drive link formats:
- `https://drive.google.com/file/d/{id}/view`
- `https://drive.google.com/file/d/{id}/view?usp=sharing`
- `https://drive.google.com/open?id={id}`
- `https://drive.google.com/uc?export=view&id={id}`

### Convert to Image URL

```typescript
import { toImageUrl } from "drive-media";

// Default width (1000px)
const url = toImageUrl("https://drive.google.com/file/d/abc123xyz/view");
console.log(url); 
// "https://drive.google.com/thumbnail?id=abc123xyz&sz=w1000"

// Custom width
const smallUrl = toImageUrl("https://drive.google.com/file/d/abc123xyz/view", 500);
console.log(smallUrl);
// "https://drive.google.com/thumbnail?id=abc123xyz&sz=w500"

// Use in HTML
const img = document.createElement("img");
img.src = toImageUrl(driveLink);
img.alt = "Image from Google Drive";
document.body.appendChild(img);
```

### Convert to Video Embed URL

```typescript
import { toVideoEmbedUrl } from "drive-media";

const embedUrl = toVideoEmbedUrl("https://drive.google.com/file/d/abc123xyz/view");
console.log(embedUrl);
// "https://drive.google.com/file/d/abc123xyz/preview"

// Create iframe
const iframe = document.createElement("iframe");
iframe.src = toVideoEmbedUrl(driveLink);
iframe.width = "640";
iframe.height = "360";
iframe.allowFullscreen = true;
document.body.appendChild(iframe);
```

### Batch Convert with Error Handling

```typescript
import { convertMany, toImageUrl } from "drive-media";

const links = [
  "https://drive.google.com/file/d/abc123/view",
  "https://drive.google.com/file/d/invalid/view",
  "https://drive.google.com/drive/folders/xyz789", // Invalid: folder
];

const { results, errors } = convertMany(links, toImageUrl);

console.log("Success:", results);
// [
//   "https://drive.google.com/thumbnail?id=abc123&sz=w1000"
// ]

console.log("Errors:", errors);
// [
//   { link: "https://drive.google.com/file/d/invalid/view", message: "Not a valid Google Drive link" },
//   { link: "https://drive.google.com/drive/folders/xyz789", message: "Folder links are not supported..." }
// ]
```

## API Reference

### `extractFileId(link: string): string`

Extracts the file ID from a Google Drive link.

**Parameters:**
- `link` (string): A Google Drive share link

**Returns:** The file ID as a string

**Throws:** 
- `Error` if the link is empty or whitespace
- `Error` if the link points to a folder (not supported)
- `Error` if the link format is not recognized

**Examples:**
```typescript
extractFileId("https://drive.google.com/file/d/1a-B_c2/view") 
// → "1a-B_c2"

extractFileId("https://drive.google.com/open?id=abc123")
// → "abc123"

extractFileId("") 
// → throws Error: "Please provide a Google Drive link"

extractFileId("https://drive.google.com/drive/folders/abc123")
// → throws Error: "Folder links are not supported..."
```

### `toImageUrl(link: string, width?: number): string`

Converts a Google Drive link to a thumbnail/image URL.

**Parameters:**
- `link` (string): A Google Drive share link to an image file
- `width` (number, optional): Image width in pixels. Default: `1000`

**Returns:** A direct image URL

**Throws:** Same as `extractFileId`

**Examples:**
```typescript
toImageUrl("https://drive.google.com/file/d/abc123/view")
// → "https://drive.google.com/thumbnail?id=abc123&sz=w1000"

toImageUrl("https://drive.google.com/file/d/abc123/view", 500)
// → "https://drive.google.com/thumbnail?id=abc123&sz=w500"
```

### `toVideoEmbedUrl(link: string): string`

Converts a Google Drive link to a video preview/embed URL suitable for iframes.

**Parameters:**
- `link` (string): A Google Drive share link to a video file

**Returns:** A preview URL

**Throws:** Same as `extractFileId`

**Examples:**
```typescript
toVideoEmbedUrl("https://drive.google.com/file/d/abc123/view")
// → "https://drive.google.com/file/d/abc123/preview"
```

### `convertMany(links: string[], converter: (link: string) => string): { results: string[], errors: { link: string, message: string }[] }`

Batch converts multiple links with graceful error handling.

**Parameters:**
- `links` (string[]): Array of Google Drive links
- `converter` (function): Conversion function to apply (e.g., `toImageUrl`, `toVideoEmbedUrl`)

**Returns:** Object with:
- `results` (string[]): Successfully converted URLs in order
- `errors` (object[]): Failed conversions with original link and error message

**Examples:**
```typescript
const { results, errors } = convertMany(
  ["https://drive.google.com/file/d/abc/view", ""],
  toImageUrl
);
// results → ["https://drive.google.com/thumbnail?id=abc&sz=w1000"]
// errors → [{ link: "", message: "Please provide a Google Drive link" }]
```

## Requirements

- **Minimum Node.js:** 12.0.0
- **Module Format:** CommonJS (ES2019 target)
- **TypeScript:** 4.0+ (if using TypeScript)

## Limitations

1. **Files must be shared**: Files must be shared as "Anyone with the link" to generate working URLs
2. **Undocumented behavior**: This relies on undocumented Google Drive behavior that may change without notice
3. **Not a production image host**: Google Drive is not designed to serve images at scale. Use this for prototypes and personal projects, not production applications
4. **File accessibility**: URLs are only valid as long as the file remains shared

## Error Handling

All functions throw descriptive errors for invalid inputs:

```typescript
try {
  const id = extractFileId("invalid-input");
} catch (error) {
  console.error(error.message); 
  // "Not a valid Google Drive link"
}
```

For batch operations, use `convertMany` to collect errors without interrupting processing:

```typescript
const { results, errors } = convertMany(links, toImageUrl);

if (errors.length > 0) {
  console.warn("Some links failed to convert:", errors);
}
```

## Development

### Prerequisites

- Node.js 12+
- npm or yarn

### Setup

```bash
git clone https://github.com/Darryl-Mbae/drive-media.git
cd drive-media
npm install
```

### Scripts

```bash
# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build:lib

# Build before publishing
npm run prepublishOnly
```

### Testing

Tests are written with Jest and cover:
- Link parsing for multiple formats
- URL generation for images and videos
- Error handling for invalid inputs
- Batch conversion with error collection

```bash
npm test
```

## Changelog

### 0.1.0 (Initial Release)

- Initial npm release
- File ID extraction from Google Drive links
- Image URL generation with custom widths
- Video embed URL generation
- Batch conversion with error handling
- Complete test coverage
- TypeScript support with strict mode

## License

MIT © [Darryl Mbae](https://github.com/Darryl-Mbae)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for bugs and feature requests.

## Support

For issues, questions, or suggestions, please open an issue on [GitHub Issues](https://github.com/Darryl-Mbae/drive-media/issues).
