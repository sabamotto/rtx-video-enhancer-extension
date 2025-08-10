# Chrome Web Store Submission Guide

## Pre-Submission Checklist

### Extension Files
- [ ] manifest.json properly configured
- [ ] content.js functional and tested
- [ ] background.js minimal and clean
- [ ] Icons created (16x16, 32x32, 48x48, 128x128)
- [ ] All files compressed into .zip package

### Documentation
- [ ] README.md and README_JA.md updated
- [ ] LICENSE.md included
- [ ] Privacy Policy created
- [ ] Store listing content prepared (English & Japanese)

### Testing
- [ ] Extension tested on multiple streaming services
- [ ] Fullscreen functionality verified
- [ ] Toggle on/off works properly
- [ ] No console errors
- [ ] Works in incognito mode

## Developer Dashboard Setup

### Account Requirements
1. Google account
2. Chrome Web Store developer account ($5 one-time fee)
3. Verify your identity with Google

### Publishing Settings
- **Visibility**: Public
- **Category**: Productivity > Developer Tools
- **Regions**: Worldwide (or specific regions if preferred)

## Store Listing Information

### Basic Info
- **Item name**: RTX Video Enhancer
- **Item summary**: Enable NVIDIA RTX Super Resolution for video streaming
- **Item description**: Use content from STORE_LISTING_EN.md
- **Category**: Productivity → Developer Tools
- **Language**: English (primary), Japanese (additional)

### Privacy & Security
- **Single purpose**: Video enhancement via RTX Super Resolution
- **Host permission justification**: Access streaming sites to add overlay elements
- **Are you using remote code?**: No
- **Data usage disclosure**: No user data collected

*Note: All detailed permission justifications and testing instructions are now included in STORE_LISTING_EN.md*

### Store Assets
- **Icon**: 128x128 PNG (from icons/icon128.png)
- **Screenshots**: At least 1, maximum 5
- **Small promotional tile**: 440x280 (optional but recommended)
- **Large promotional tile**: 920x680 (optional)
- **Marquee**: 1400x560 (if applying for featuring)

### Distribution
- **Pricing**: Free
- **Countries**: All countries (or specific regions)
- **Sample data for testing**: N/A

## Submission Process

### Step 1: Create Package
```bash
cd rtx-activator-extension
zip -r rtx-video-enhancer-v1.0.0.zip manifest.json content.js background.js icons/ -x generate_icons.py -x docs/ -x README_JA.md -x package.json
```

### Step 2: Upload to Store
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Click "Add new item"
3. Upload the ZIP file
4. Fill in all required fields
5. Upload promotional images

### Step 3: Review Process
- **Automated review**: Usually within minutes
- **Manual review**: Can take 1-7 days for new developers
- **Common rejection reasons**:
  - Missing privacy policy
  - Unclear permission justifications
  - Low-quality screenshots
  - Trademark violations

### Step 4: Post-Publication
- Monitor reviews and ratings
- Respond to user feedback
- Plan updates based on user requests
- Consider internationalization

## Common Issues & Solutions

### Permission Warnings
**Issue**: "This extension can read and change all your data on websites"
**Solution**: This is expected due to host permissions for streaming sites

### Trademark Concerns
**Issue**: Using "RTX" in the name
**Solution**: Add disclaimer that extension is not affiliated with NVIDIA

### Functionality Verification
**Issue**: Chrome reviewers can't test RTX functionality
**Solution**: Provide clear documentation and screenshots showing the overlay element

## Update Process
1. Increment version in manifest.json
2. Package new ZIP file
3. Upload to Developer Dashboard
4. Updates typically auto-publish faster than initial submission

## Monetization (Future)
- Chrome Web Store allows various monetization models
- Current version is free
- Consider premium features in future versions

## Analytics & Monitoring
- Use Chrome Web Store Developer Dashboard for basic analytics
- Monitor user reviews and ratings
- Track installation and usage statistics

## Legal Considerations
- Extension complies with Chrome Web Store policies
- Privacy policy meets GDPR/CCPA requirements
- No trademark infringement (includes appropriate disclaimers)
- Open source license allows for transparency

## Support Strategy
- GitHub Issues for bug reports
- GitHub Discussions for feature requests
- Monitor Chrome Web Store reviews
- Maintain responsive communication with users