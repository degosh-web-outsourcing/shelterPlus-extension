chrome.storage.local.get('license', function (key) {
    $("#key").val(key.license);

    $.getJSON('https://ipapi.co/json/', function (data) {
        var ipAddress = data.ip;
        setTimeout(function () {
            fetch(`https://degosh.com/shelterPlus-extension/${$("#key").val()}/${ipAddress}`).then(function (response) {
                return response.text();
            }).then(function (html) {
                if (html == "OK") {
                    window.location.href = "../profiles/profiles.html";
                } else {
                    $('#status').text("Ошибка");
                }
            }).catch(function (err) {
                console.log('Something went wrong', err);
            });
        }, 500);
    });
});

$(document).ready(function () {
    $('#img').on('click', function () {
        chrome.storage.local.get('license', function (key) {
            let lkey = $("#key").val();
            chrome.storage.local.set({ 'license': lkey });
        });
        $('#status').text("Ключ привязан к другому IP"); 
        location.reload();
    });
});