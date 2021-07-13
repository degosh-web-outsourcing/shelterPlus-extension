chrome.storage.local.get('license', function (key) {
    $("#key").val(key.license);
    if ($('#key').val().length) {
        fetch(`https://degosh.com/shelterPlus-extension/${key.license}/`).then(function (response) {
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
    }
});

$(document).ready(function () {
    $('#img').on('click', function () {
        chrome.storage.local.get('license', function (key) {
            let lkey = $("#key").val();
            chrome.storage.local.set({ 'license': lkey });
        });
        location.reload();
    });
});