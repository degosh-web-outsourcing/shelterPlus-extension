chrome.storage.local.get('license', function (key) {
    $.getJSON('https://ipapi.co/json/', function (data) {
        var ipAddress = data.ip;
        setTimeout(function () {
            fetch(`https://degosh.com/shelterPlus-extension/${key.license}/${ipAddress}`).then(function (response) {
                return response.text();
            }).then(function (html) {
                if (html != "OK") {
                    window.location.href = "../auth/auth.html";
                }
            }).catch(function (err) {
                console.log('Something went wrong', err);
            });
        }, 500);
    });
});

$(function () {
    $("#resetP").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
    });
});

$(function () {
    chrome.storage.local.get('proxyHttps', function (sw) {
        if (sw.proxyHttps) {
            $('#proxyInput').val(sw.proxyHttps.proxyD);

            if (sw.proxyHttps.status) {
                $('#useProxy').attr('class', 'proxyOn');
            } else {
                chrome.storage.local.set({ 'proxyHttps': { status: false, proxyD: sw.proxyHttps.proxyD } });
            }
        }

        $('#proxyInput').change(function () {
            chrome.storage.local.get('proxyHttps', function (sw) {
                var proxyData = $('#proxyInput').val();
                chrome.storage.local.set({ 'proxyHttps': { status: sw.proxyHttps.status, proxyD: proxyData } });
            });
        });

        $('#useProxy').on('click', function () {
            var proxyData = $('#proxyInput').val();
            if (document.getElementById('proxyInput').value.length) {
                if ($('#useProxy').attr('class') == 'proxyOff') {
                    $('#useProxy').attr('class', 'proxyOn');
                    chrome.storage.local.set({ 'proxyHttps': { status: true, proxyD: proxyData } });
                    chrome.tabs.create({ url: "https://degosh.com/" });
                    chrome.runtime.reload();
                } else {
                    $('#useProxy').attr('class', 'proxyOff');
                    chrome.storage.local.set({ 'proxyHttps': { status: false, proxyD: proxyData } });
                    chrome.tabs.create({ url: "https://degosh.com/" });
                    chrome.runtime.reload();
                }
            }
        });
    });
});