function savePopupStatus() {
    var facescrubber = document.getElementById('enable-fs-popup').checked;
    chrome.storage.sync.set({facescrubber: facescrubber});
    console.log("Enabled set to " + facescrubber);
    refreshTab();
}

// Finds settings from chrome storage and updates checkbox states
function restorePopupOptions() {
    // Sets default options
    chrome.storage.sync.get({facescrubber: true}, function(items) {
        document.getElementById('enable-fs-popup').checked = items.facescrubber;
    });
}

function refreshTab() {
	var tab = chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var currentTab = tabs[0];
		chrome.tabs.reload(currentTab.id);
	});
}

document.addEventListener('DOMContentLoaded', restorePopupOptions);
document.getElementById('enable-fs-popup').addEventListener('click', savePopupStatus);

document.querySelector('#open-options').addEventListener("click", function() {
	if (chrome.runtime.openOptionsPage) {
		// Open options page Chrome 42+ method
		chrome.runtime.openOptionsPage();
	} else {
		// Fallback
		window.open(chrome.runtime.getURL('options.html'));
	}
});