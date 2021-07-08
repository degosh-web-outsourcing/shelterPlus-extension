$(function() {
    $("#resetP").on('click', function() {
        chrome.storage.local.set({ 'profiles': new Array() });
    });
});