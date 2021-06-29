chrome.storage.sync.get('license', function (key) {
    $("#key").val(key.license);

    setTimeout(function() {
        fetch(`https://degosh.com/activekey.php?key=` + $("#key").val()).then(function (response) {
                return response.text();
            }).then(function (html) {
                if (html == "OK") {
                    window.location.replace('/options/profiles/profiles.html');
                }
            }).catch(function (err) {
                console.warn('Something went wrong', err);
            });
    }, 200);
});

$(document).ready(function () {
    $('#go').on('click', function () {
        chrome.storage.sync.get('license', function (key) {
            let lkey = $("#key").val();
            chrome.storage.sync.set({ 'license': lkey });
        });
        location.reload();
    });
});