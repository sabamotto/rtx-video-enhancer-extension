# Comprehensive Testing Instructions

## Prerequisites for Testing RTX Video Enhancer

### Hardware Requirements
- **NVIDIA RTX Graphics Card** (RTX 20, 30, or 40 series)
- **Windows 10 or Windows 11** operating system
- **Chrome browser** (latest version recommended)

### Software Setup Required Before Testing

#### Step 1: Update NVIDIA Drivers
1. Download and install the latest NVIDIA drivers from https://www.nvidia.com/drivers/
2. Ensure drivers support RTX Super Resolution feature (version 526.98 or later)
3. Restart computer after driver installation

#### Step 2: Enable RTX Super Resolution
1. Right-click on desktop and select "NVIDIA Control Panel"
2. Navigate to "Manage 3D settings" → "Global Settings"
3. Scroll down to find "RTX Super Resolution"
4. Set RTX Super Resolution to "On"
5. Click "Apply" to save changes

#### Step 3: Enable Hardware Acceleration in Chrome
1. Open Chrome and go to `chrome://settings/`
2. Click "Advanced" → "System"
3. Ensure "Use hardware acceleration when available" is enabled
4. Restart Chrome

## Extension Testing Procedure

### Step 1: Install Extension
1. Load the unpacked extension or install from Chrome Web Store
2. Confirm extension icon appears in Chrome toolbar
3. Extension should show no badge (indicating it's enabled by default)

### Step 2: Test Basic Functionality
1. Navigate to any supported streaming service (e.g., Netflix, Hulu)
2. Start playing any video
3. **Important**: Enter fullscreen mode (press F key or click fullscreen button)
4. **Expected Result**: A tiny overlay element (1x1 pixel) is added to trigger RTX enhancement

### Step 3: Verify RTX Super Resolution Activation
1. While in fullscreen mode, you should notice:
   - Improved video sharpness and clarity
   - Enhanced details in the video content
   - Better upscaling of lower-resolution content
2. **Note**: Enhancement is most visible with lower-resolution source videos

### Step 4: Test Toggle Functionality
1. Click the extension icon in Chrome toolbar
2. Icon should show "OFF" badge when disabled
3. Reload the page and enter fullscreen again
4. **Expected Result**: No enhancement should occur when disabled
5. Click extension icon again to re-enable
6. Badge should disappear, indicating extension is active

### Step 5: Test on Multiple Services
Test the extension on various supported platforms:
- **Netflix**: https://netflix.com (requires subscription)
- **Hulu**: https://hulu.com (requires subscription)  
- **Amazon Prime**: https://primevideo.com (requires subscription)
- **Twitch**: https://twitch.tv (any stream)

## Alternative Testing for Reviewers Without RTX Hardware

### Visual Inspection Method
If RTX hardware is not available, you can still verify the extension's functionality:

1. **Install Extension**: Load the extension and confirm it appears in toolbar
2. **Open Developer Tools**: Press F12 to open Chrome DevTools
3. **Navigate to Console**: Click the "Console" tab
4. **Visit Streaming Site**: Go to Netflix or any supported service
5. **Start Video**: Play any video and enter fullscreen mode
6. **Check Console Logs**: Look for messages like:
   ```
   RTX Upsampling Trigger: Initialized successfully
   RTX Upsampling Trigger: Found X video elements, selecting the largest one
   RTX Upsampling Trigger: Adding overlay to the largest video element
   ```
7. **Inspect DOM**: In Elements tab, look for div with attribute `data-rtx-upsampling-overlay="true"`

### Code Review Verification
1. **Examine manifest.json**: Verify permissions are limited to activeTab, storage, and specific streaming domains
2. **Review content.js**: Confirm code only adds overlay elements and monitors video states
3. **Check background.js**: Verify no external network requests or data collection
4. **Verify Privacy**: Confirm no user data is accessed or transmitted

## Expected Behavior Summary

### When Extension is Active:
- ✅ Overlay element added to video players in fullscreen mode
- ✅ Console logs show successful initialization and video detection
- ✅ Extension icon has no badge
- ✅ RTX Super Resolution enhances video quality (with compatible hardware)

### When Extension is Disabled:
- ✅ No overlay elements added to videos
- ✅ Extension icon shows "OFF" badge
- ✅ No console logs related to RTX functionality
- ✅ No video enhancement occurs

### Privacy Compliance:
- ✅ No data transmitted to external servers
- ✅ No user information collected or stored
- ✅ Only minimal local storage for enable/disable preference
- ✅ No modification of website content beyond overlay addition

## Troubleshooting for Reviewers

### If Extension Doesn't Seem to Work:
1. Ensure you're testing in fullscreen mode (this is critical)
2. Check that hardware acceleration is enabled in Chrome
3. Try refreshing the page after installation
4. Look for console logs to confirm extension is running
5. Test on multiple streaming services

### Contact Information
For any testing issues or questions, please refer to the GitHub repository: https://github.com/sabamotto/rtx-activator-extension

*Note: A condensed version of these instructions is included in STORE_LISTING_EN.md for Chrome Web Store reviewers.*