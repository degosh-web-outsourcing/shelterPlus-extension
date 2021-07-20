chrome.storage.local.get('license', function (key) {
    $("#key").val(key.license);
    if ($('#key').val().length) {
        fetch(`https://degosh.com/shelterPlus-extension/${key.license}/`).then(function (response) {
            return response.text();
        }).then(function (html) {
            if (html == "OK") {
                window.location.href = "../profiles/profiles.html";
            } else if (html == "No key") {
                $('#status').text("Ошибка");
            } else if (html == "Bad") {
                $('#status').text("Ключ привязан к другому IP");
            }
        }).catch(function (err) {
            console.log('Something went wrong', err);
        });
    }
});


$(document).ready(function () {
    $('#img').on('click', function () {
        syncLicense();
    });
    $('body').on('keypress', function (e) {
        if (e.which === 13) {
            syncLicense();
        }
    });

    function syncLicense() {
        chrome.storage.local.get('license', function (key) {
            let lkey = $("#key").val();
            chrome.storage.local.set({ 'license': lkey });
        });
        location.reload();
    }
});