chrome.storage.local.get('proxyHttps', function (sw) {
    chrome.tabs.create({ url: "../options/settings/settings.html" });

    setTimeout(function () {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(tb => {
                if (tb.url == "https://degosh.com/") {
                    chrome.tabs.sendMessage(tb.id, chrome.tabs.remove(tb.id));
                }
            });
        });
    }, 100);
});

chrome.storage.local.get('proxyHttps', function (sw) {
    var proxy = sw.proxyHttps.proxyD.split(':');
    var port = parseInt(proxy[1]);
    if (sw.proxyHttps) {
        if (sw.proxyHttps.status) {
            let config = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: "http",
                        host: proxy[0],
                        port: port
                    },
                    bypassList: ["degosh.com"]
                }
            };

            chrome.proxy.settings.set(
                { value: config, scope: 'regular' },
                function () { });

            chrome.webRequest.onAuthRequired.addListener(
                function (details, callbackFn) {
                    console.log("onAuthRequired!", details, callbackFn);
                    callbackFn({
                        authCredentials: { username: proxy[2], password: proxy[3] }
                    });
                },
                { urls: ["<all_urls>"] },
                ['asyncBlocking']
            );
        } else {
            let config = {
                mode: "direct"
            };

            chrome.proxy.settings.set(
                { value: config, scope: 'regular' },
                function () { });
        }
    }
});
