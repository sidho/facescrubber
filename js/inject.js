// Set default values upon installation
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({
        facescrubber: true,
        filterDomains: true,
        removeLists: false,
        removeCaps: false,
        faceScrubberHardcore: false
    })
});

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (tab.url.toLowerCase().indexOf("facebook.com") > -1){
        // Shows page action icon if the url is facebook
        chrome.pageAction.show(tab.id);
        // If navigating between facebook pages, this tells the content script to clear out
        // the removedPosts object, and reset the counter to 0. changeInfo.url would be
        // null if the page was simply refreshed.
    	if (changeInfo.url) messageScript(tab);
    }
});

function messageScript(tab) {
	chrome.tabs.sendMessage(tab.id, {changed: true});
}