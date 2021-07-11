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