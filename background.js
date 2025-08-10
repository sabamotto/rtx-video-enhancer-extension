// RTX Video Enhancer - Background Service Worker

// Initialize extension on install
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Set default settings
        chrome.storage.local.set({ 
            enabled: true,
            installedVersion: chrome.runtime.getManifest().version
        });
        console.log('RTX Video Enhancer installed successfully');
    } else if (details.reason === 'update') {
        console.log('RTX Video Enhancer updated to version', chrome.runtime.getManifest().version);
    }
});

// Handle extension icon click to toggle on/off
chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get(['enabled'], (result) => {
        const newState = !result.enabled;
        chrome.storage.local.set({ enabled: newState });
        
        // Update icon badge
        updateIconBadge(newState);
        
        // Notify content script
        chrome.tabs.sendMessage(tab.id, { 
            action: 'toggleEnabled', 
            enabled: newState 
        }).catch(() => {
            // Ignore errors if content script is not injected
        });
    });
});

// Update icon badge based on enabled state
function updateIconBadge(enabled) {
    if (enabled) {
        chrome.action.setBadgeText({ text: '' });
    } else {
        chrome.action.setBadgeText({ text: 'OFF' });
        chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    }
}

// Check and update badge on startup
chrome.storage.local.get(['enabled'], (result) => {
    updateIconBadge(result.enabled !== false);
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'logMessage') {
        console.log('Content Script:', request.message);
    } else if (request.action === 'getSettings') {
        chrome.storage.local.get(['enabled'], (result) => {
            sendResponse({ enabled: result.enabled !== false });
        });
        return true; // Keep message channel open for async response
    }
});