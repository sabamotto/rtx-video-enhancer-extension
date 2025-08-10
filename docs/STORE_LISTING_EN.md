# Chrome Web Store Listing - English

## Extension Name
RTX Video Enhancer

## Short Description (132 characters max)
Enable NVIDIA RTX Super Resolution for video streaming services to enhance video quality in fullscreen mode.

## Detailed Description (16,000 characters max)

RTX Video Enhancer enables high-quality upscaling when watching videos in fullscreen mode on streaming platforms, particularly on high-resolution displays where standard upscaling quality may be insufficient. The extension leverages NVIDIA RTX Super Resolution's AI-powered upscaling technology to maintain superior video quality.

KEY FEATURES:
- Automatic activation in fullscreen mode
- Works with major streaming services worldwide  
- Lightweight with minimal performance impact
- Simple on/off toggle via extension icon
- No configuration required
- No data collection or tracking

REQUIREMENTS:
- NVIDIA RTX Graphics Card (RTX 20/30/40 series)
- Latest NVIDIA drivers (526.98+) with RTX Super Resolution support
- Microsoft Windows 10/11
- Google Chrome with hardware acceleration enabled

HOW IT WORKS:
The extension adds a minimal overlay element to video players that triggers NVIDIA's RTX Super Resolution when videos are played in fullscreen mode. This is especially beneficial on high-resolution displays where native upscaling quality may be inadequate, allowing the RTX GPU to provide superior video enhancement in real-time.

PRIVACY:
The extension operates entirely locally with no data collection, external communication, or user tracking. It only stores your enable/disable preference locally on your device.

SUPPORT:
For issues and feature requests, visit: https://github.com/sabamotto/rtx-activator-extension

DISCLAIMER:
This extension is not affiliated with NVIDIA Corporation. NVIDIA, GeForce, and RTX are trademarks of NVIDIA Corporation.

## Store Submission Details

### Category
Productivity → Developer Tools

### Single Purpose Description
This extension serves a single purpose: to enable NVIDIA RTX Super Resolution technology for video streaming services by adding a minimal overlay element that triggers the GPU's high-quality AI upscaling when videos are played in fullscreen mode, particularly improving video quality on high-resolution displays where standard upscaling may be insufficient.

### Permission Justifications

**Host Permissions**: The extension requires access to video streaming domains to:
1. Detect video elements on the page
2. Add the overlay element necessary for RTX Super Resolution activation  
3. Monitor fullscreen state changes
4. Ensure compatibility with various video player implementations

**Storage Permission**: Used exclusively to save user preferences for enabling/disabling the extension functionality. Only stores a boolean value and version number locally.

**ActiveTab Permission**: Required to interact with the current tab's video elements and apply the RTX enhancement overlay when users are actively on supported streaming sites.

### Remote Code Usage
No - this extension does not use any remote code. All functionality is contained within the extension package with no external JavaScript files, no communication with external servers, and no remote configuration.

## Testing Instructions for Reviewers

### Hardware Requirements
NVIDIA RTX Graphics Card (RTX 20/30/40 series) + Windows 10/11

### Setup
1. Install latest NVIDIA drivers (526.98+)
2. Enable RTX Super Resolution in NVIDIA Control Panel > Manage 3D settings > Global Settings  
3. Enable hardware acceleration in Chrome settings

### Testing Steps
1. Install extension - icon appears in toolbar with no badge
2. Go to Netflix and play any video
3. Enter fullscreen mode (press F key) - **this is critical**
4. Extension adds 1x1 pixel overlay to trigger RTX enhancement
5. Click extension icon to toggle - shows "OFF" badge when disabled
6. Test works on Netflix, Hulu, Prime Video, Twitch

### Alternative Testing Without RTX Hardware
1. Open Chrome DevTools (F12) > Console tab
2. Play video in fullscreen on Netflix
3. Look for console messages: "RTX Upsampling Trigger: Initialized successfully"
4. Check Elements tab for div with "data-rtx-upsampling-overlay" attribute
5. Verify extension only adds overlay element, no data collection

**Expected**: Extension adds overlay in fullscreen, shows proper toggle states, logs initialization messages.