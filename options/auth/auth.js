chrome.storage.local.get('license', function (key) {
    if (key.license != undefined) {
        $("#key").val(key.license.replace(/\s/g, ''));
    }
    if ($('#key').val().length) {
        fetch('https://dashboard.degosh.com/shelter/enter', {
            method: 'POST',
            body: new URLSearchParams({
                key: key.license.replace(/\s/g, '')
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        })
            .then(res => res.json())
            .then((json) => {
                if (json.giveAccess == "Correct") {
                    window.location.href = "../profiles/profiles.html";
                } else if (json.giveAccess == "No key") {
                    iziToast.error({
                        title: `Такого ключа нет :(`,
                        backgroundColor: 'red',
                        position: 'topCenter',
                        icon: '',
                        titleColor: 'white',
                        timeout: 2500
                    });
                } else if (json.giveAccess == "Wrong IP") {
                    iziToast.error({
                        title: `Ключ привязан к другому IP`,
                        description: 'Напиши !reset дс боту',
                        backgroundColor: 'red',
                        position: 'topCenter',
                        icon: '',
                        titleColor: 'white',
                        timeout: 2500
                    });
                }
            }).catch(function (err) {
                iziToast.error({
                    title: `Ошибка`,
                    description: 'Сервер не отвечает',
                    backgroundColor: 'red',
                    position: 'topCenter',
                    icon: '',
                    titleColor: 'white',
                    timeout: 2500
                });
                console.log('Something went wrong', err);
            });
    }
});

$(document).ready(function () {    
    $('img').on('click', function () {
        setTimeout(() => { syncLicense(); }, 500);
    });

    $('body').on('keypress', function (e) {
        if (e.which === 13) {
            $('img').click();
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

/*
chrome.storage.local.get('license', function (key) {
    $("#key").val(key.license);
    if ($('#key').val()) {
        syncLicense();
    }
});

$(function () {
    $('#img').on('click', function () {
        location.reload();    
    });

    $('*').on('click', function () {
        if ($('#key').val()) {
            $('#key').val($('#key').val().replace(/\s/g, ''));
        }
    });


    $('*').on('keyup', function (e) {
        if ($('#key').val()) {
            $('#key').val($('#key').val().replace(/\s/g, ''));
        }

        if (e.which === 13) {
            $('#img').click();
        }
    });
})

function syncLicense() {
    chrome.storage.local.get('license', function (key) {
        chrome.storage.local.set({ 'license': $("#key").val().replace(/\s/g, '') });

        if (key.license.length) {
            fetch('https://dashboard.degosh.com/shelter/enter', {
                method: 'POST',
                body: new URLSearchParams({
                    key: key.license.replace(/\s/g, '')
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            })
                .then(res => res.json())
                .then((json) => {
                    if (json.giveAccess == "Correct") {
                        window.location.href = "../profiles/profiles.html";
                    } else if (json.giveAccess == "No key") {
                        iziToast.error({
                            title: `Такого ключа нет :(`,
                            backgroundColor: 'red',
                            position: 'topCenter',
                            icon: '',
                            titleColor: 'white',
                            timeout: 2500
                        });
                    } else if (json.giveAccess == "Wrong IP") {
                        iziToast.error({
                            title: `Ключ привязан к другому IP`,
                            description: 'Напиши !reset дс боту',
                            backgroundColor: 'red',
                            position: 'topCenter',
                            icon: '',
                            titleColor: 'white',
                            timeout: 2500
                        });
                    }
                })/*.catch(function (err) {
                    iziToast.error({
                        title: `Ошибка`,
                        description: 'Сервер не отвечает',
                        backgroundColor: 'red',
                        position: 'topCenter',
                        icon: '',
                        titleColor: 'white',
                        timeout: 2500
                    });
                    //window.location.href = "./auth.html";
                });
            }
        });
    }
*/