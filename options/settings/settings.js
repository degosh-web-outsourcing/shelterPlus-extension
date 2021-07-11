$(function () {
    $("#resetP").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
    });
});

chrome.storage.local.set({
    'proxyHttps': {
        use: true,
        ip: "194.226.120.195",
        port: 51764,
        username: "yEkEANrp",
        password: "8NeCArZ5"
    }
});

$(function () {
    chrome.storage.local.get('proxy', function (sw) {
        if (sw.proxy) {
            if (sw.proxy.status) {
                $('#useProxy').attr('class', 'proxyOn');
            }
        } else {
            chrome.storage.local.set({ 'proxy': { status: false, proxy: null } });
        }

        $('#useProxy').on('click', function () {
            if ($('#useProxy').attr('class') == 'proxyOff') {
                $('#useProxy').attr('class', 'proxyOn');
                chrome.tabs.create({ url: "https://degosh.com/" });
                chrome.storage.local.set({ 'proxy': { status: true, proxy: null } });
                chrome.runtime.reload();
            } else {
                $('#useProxy').attr('class', 'proxyOff');
                chrome.storage.local.set({ 'proxy': { status: false, proxy: null } });
            }
        });
    });
});