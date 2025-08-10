# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RTX Video Enhancer is a Chrome extension that enables NVIDIA RTX Super Resolution for video streaming services. The extension adds a minimal 1x1 pixel overlay element to video players that triggers RTX Super Resolution when videos are played in fullscreen mode.

## Architecture

This is a Manifest V3 Chrome extension with a simple three-component architecture:

### Core Components
- **content.js**: Main functionality implemented as `RTXUpsamplingTrigger` class that detects videos, manages overlay placement, and handles fullscreen state changes
- **background.js**: Service worker that manages extension state (enabled/disabled) and handles icon badge updates
- **manifest.json**: Defines extensive host permissions for global and Japanese streaming services

### Key Technical Details
- Uses `MutationObserver` and `ResizeObserver` to track dynamic video element changes
- Overlay positioning adapts between absolute and fixed positioning for fullscreen vs normal modes
- Extension state persists using Chrome storage API
- No external communication - operates entirely locally

## Development Commands

### Testing the Extension
Load unpacked extension in Chrome:
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the repository directory

### Packaging for Distribution
```bash
# Create package directory with required files (already created in /package)
# Manual ZIP creation required for Chrome Web Store submission

# The package/ directory contains the distribution-ready files:
# - manifest.json, content.js, background.js
# - icons/ directory with 4 icon sizes
# - LICENSE.md, README.md
```

### Testing Functionality
- Must test in fullscreen mode (critical requirement)
- Check browser console for "RTX Upsampling Trigger" log messages
- Verify overlay element with `data-rtx-upsampling-overlay="true"` attribute
- Test toggle functionality via extension icon click

## Chrome Web Store Submission

The `/docs` directory contains all required submission materials:
- Store listing descriptions (English/Japanese)
- Privacy policy and form responses
- Testing instructions for reviewers
- Promotional image guidelines

Key submission requirements:
- RTX hardware (RTX 20/30/40 series) needed for full functionality testing
- Alternative testing via browser DevTools for reviewers without RTX hardware
- Extension operates with no data collection and minimal permissions

## Streaming Service Support

The extension targets both global and Japanese streaming platforms via extensive host permissions in manifest.json. Adding new services requires updating both `host_permissions` and `content_scripts.matches` arrays.

## Important Constraints

- Extension functionality depends on fullscreen mode activation
- RTX Super Resolution must be enabled in NVIDIA Control Panel
- Hardware acceleration must be enabled in Chrome
- Some DRM-protected content may not be enhanced due to technical limitations