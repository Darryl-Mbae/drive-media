# Publication Checklist for drive-media

This document provides all steps needed to publish `drive-media` to npm.

## Pre-Publication Checklist

- [x] Code review completed
- [x] All tests passing (20/20)
- [x] TypeScript strict mode clean
- [x] ESLint passing
- [x] Build successful
- [x] npm pack validation successful
- [x] README complete with examples
- [x] LICENSE included
- [x] .gitignore correct
- [x] package.json configured correctly
- [x] No secrets or credentials in code
- [x] No unnecessary dev files in published package
- [x] Demo files organized separately

## Package Contents

The npm package will include:

```
drive-media@0.1.0
├── package.json           (1.3 kB)
├── README.md              (8.8 kB)
├── LICENSE                (1.1 kB)
└── lib/
    ├── index.js           (742 B)
    ├── index.d.ts         (111 B)
    ├── convert.js         (840 B)
    ├── convert.d.ts       (324 B)
    ├── parse.js           (741 B)
    └── parse.d.ts         (61 B)
```

**Total Size**: 4.9 kB packed, 14.0 kB unpacked
**File Count**: 9 files

## Pre-Publication Steps

### 1. Verify Final Build

```powershell
npm run test
npm run typecheck
npm run lint
npm run build:lib
```

Expected: All pass with no errors.

### 2. Verify Package Contents

```powershell
npm pack --dry-run
```

Expected output should match the package contents listed above.

### 3. Review Git Status

```powershell
git status
```

Ensure all changes are committed:
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Updated to include built lib/
- `package.json` - Updated with engines, scripts, and metadata
- `README.md` - Comprehensive documentation
- `tsconfig.build.json` - Updated to exclude demo files
- `src/demo.ts` - Demo application (excluded from npm)
- `demo/index.html` - Demo HTML (excluded from npm)

### 4. Commit Changes (if not already committed)

```powershell
git add .
git commit -m "chore: prepare for npm publication - add linting, improve docs, organize demo files"
```

### 5. Tag Release

```powershell
git tag -a v0.1.0 -m "Initial npm release"
```

## Publication Steps

### 1. Authenticate with npm

First time only - authenticate with npm:

```powershell
npm login
```

Follow prompts to enter your npm credentials. This creates a token in `~/.npmrc` (your home directory).

**IMPORTANT**: Never commit this token to git. The `~/.npmrc` file is automatically protected by npm and Git.

### 2. Publish to npm

```powershell
npm publish
```

The `prepublishOnly` hook will automatically run:
- Tests (must pass)
- Build (must succeed)
- Type checking (must pass)

If any check fails, publishing is blocked.

### 3. Verify Published Package

```powershell
npm view drive-media
```

Check that:
- Version is 0.1.0
- Main points to `lib/index.js`
- Types points to `lib/index.d.ts`
- All keywords are present
- Repository URL is correct

## Post-Publication Steps

### 1. Push Git Tags

```powershell
git push origin main
git push origin v0.1.0
```

### 2. Create GitHub Release (Optional)

Visit: https://github.com/Darryl-Mbae/drive-media/releases

Create a new release with:
- Tag: `v0.1.0`
- Title: `v0.1.0 - Initial Release`
- Body: Copy the changelog from README.md

### 3. Test Installation

Create a test project and verify the package works:

```powershell
mkdir test-consumer
cd test-consumer
npm init -y
npm install drive-media
```

Create `test.js`:

```javascript
const { extractFileId, toImageUrl, toVideoEmbedUrl } = require('drive-media');

const link = 'https://drive.google.com/file/d/abc123/view';
console.log('File ID:', extractFileId(link));
console.log('Image URL:', toImageUrl(link));
console.log('Video URL:', toVideoEmbedUrl(link));
```

Run:

```powershell
node test.js
```

Expected output:
```
File ID: abc123
Image URL: https://drive.google.com/thumbnail?id=abc123&sz=w1000
Video URL: https://drive.google.com/file/d/abc123/preview
```

## Troubleshooting

### "npm ERR! 403 Forbidden - You do not have permission to publish"

**Cause**: Not authenticated or wrong user
**Solution**: Run `npm login` and verify you're logged in with `npm whoami`

### "npm ERR! You must enable two-factor authentication to publish"

**Cause**: npm account has 2FA enabled
**Solution**: Use `npm publish --otp=<your-otp>` with your authenticator code

### "npm ERR! package name already taken"

**Cause**: Package name `drive-media` already exists on npm
**Solution**: Choose a different package name in `package.json`

### Tests fail during publish

**Cause**: Changes not reflected in build
**Solution**: Run `npm run build:lib` locally, commit, then retry

## Version Management & Future Releases

### Versioning Strategy

This project uses Semantic Versioning (SemVer):

- **MAJOR** (1.0.0): Breaking changes to public API
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.1.1): Bug fixes, backward compatible

Current version: `0.1.0` (Initial release, stable API)

### Updating for Next Release

1. Make changes and commit to git
2. Update version in `package.json`:
   ```json
   "version": "0.2.0"
   ```
3. Update `CHANGELOG.md` or README changelog section
4. Run full test suite: `npm run prepublishOnly`
5. Commit with message: `chore: bump version to 0.2.0`
6. Tag: `git tag -a v0.2.0 -m "Release 0.2.0"`
7. Publish: `npm publish`
8. Push: `git push origin main` and `git push origin v0.2.0`

## Package Maintenance

### Scripts Available

```bash
npm test              # Run tests
npm run typecheck     # Type check
npm run lint          # Lint code
npm run build:lib     # Build library
npm run build         # Alias for build:lib
npm run prepublishOnly # Full pre-publish check (tests, build, typecheck)
```

### Supported Node.js Versions

- Minimum: Node.js 12.0.0
- Recommended: Node.js 18+ or Node.js 20+

### Repository Structure

```
drive-media/
├── src/                 # TypeScript source
│   ├── index.ts        # Public exports
│   ├── parse.ts        # File ID extraction
│   ├── convert.ts      # URL generation
│   ├── demo.ts         # Browser demo (not published)
│   ├── parse.test.ts   # Tests (not published)
│   └── convert.test.ts # Tests (not published)
├── lib/                # Compiled JavaScript (generated, published)
│   ├── *.js           # Compiled files
│   └── *.d.ts         # TypeScript declarations
├── demo/               # Demo files (not published)
│   └── index.html     # Demo HTML
├── .github/
│   └── workflows/test.yml  # CI/CD
├── .eslintrc.json     # Lint config
├── jest.config.js     # Test config
├── tsconfig.json      # TypeScript config
├── tsconfig.build.json # Build config
├── package.json       # Package metadata
├── README.md          # Documentation
├── LICENSE            # MIT License
└── .gitignore         # Git ignore rules
```

## Support

For issues with the package, open a GitHub issue:
https://github.com/Darryl-Mbae/drive-media/issues

For npm publishing questions, see:
https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages
