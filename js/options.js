function saveOptions() {
    // Get all the option values
    var facescrubber = document.getElementById('enable-facescrubber').checked;
    var filterDomains = document.getElementById('filter-domains').checked;
    var removeLists = document.getElementById('remove-lists').checked;
    var removeCaps = document.getElementById('remove-caps').checked;
    var faceScrubberHardcore = document.getElementById('enable-hardcore').checked;
    // 
    chrome.storage.sync.set({
        facescrubber: facescrubber,
        filterDomains: filterDomains,
        removeLists: removeLists,
        removeCaps: removeCaps,
        faceScrubberHardcore: faceScrubberHardcore
    }, function() {
        var status = document.getElementById('status');
        status.className = "visible";
        setTimeout(function() {
            status.className = "";
        }, 2000);
        facescrubber ? toggleOptions(false) : toggleOptions(true)        
    });
}

// Finds settings from chrome storage and updates checkbox states
function restoreOptions() {
    // Sets default options
    chrome.storage.sync.get({
        facescrubber: true,
        filterDomains: true,
        removeLists: false,
        removeCaps: false,
        faceScrubberHardcore: false
    }, function(items) {
        document.getElementById('enable-facescrubber').checked = items.facescrubber;
        document.getElementById('filter-domains').checked = items.filterDomains;
        document.getElementById('remove-lists').checked = items.removeLists;
        document.getElementById('remove-caps').checked = items.removeCaps;
        document.getElementById('enable-hardcore').checked = items.faceScrubberHardcore;

        items.facescrubber ? toggleOptions(false) : toggleOptions(true)
    });
}

function toggleOptions(status) {
    var optionsForm = document.querySelector('.options');
    var overlay = document.querySelector('.overlay');
    if (status) {
        optionsForm.className = "options avoid-clicks"
        overlay.className = "overlay dark"
    } else {
        optionsForm.className = "options"
        overlay.className = "overlay"
    }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
