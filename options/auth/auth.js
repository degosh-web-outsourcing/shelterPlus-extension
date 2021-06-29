chrome.storage.sync.get('license', function (key) {
    $("#key").val(key.license);

    $.getJSON('https://ipapi.co/json/', function (data) {
        var ipAddress = data.ip;
    });

    setTimeout(function () {
        fetch(`https://degosh.com/shelterPlus-extension/${$("#key").val()}/${ipAddress}`).then(function (response) {
            return response.text();
        }).then(function (html) {
            if (html == "OK") {
                alert("Good key!");
                //window.location.replace('/options/profiles/profiles.html');
            } else {
                alert("Bad key!");
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