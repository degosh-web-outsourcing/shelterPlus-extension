chrome.tabs.create({ url: "../options/profiles/profiles.html" });

setTimeout(function () {
    chrome.tabs.query({}, function(tabs){
        tabs.forEach(tb => {
            if (tb.url == "https://degosh.com/") {
                chrome.tabs.sendMessage(tb.id, chrome.tabs.remove(tb.id));
            }
        });
    });
}, 100);

chrome.storage.local.get('proxyHttps', function (settings) {
    if (settings.proxyHttps) {
        if (settings.proxyHttps.use) {
            let config = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: "http",
                        host: "194.226.120.195",
                        port: 51764
                    },
                    bypassList: ["foobar.com"]
                }
            };

            chrome.proxy.settings.set(
                { value: config, scope: 'regular' },
                function () { });

            chrome.webRequest.onAuthRequired.addListener(
                function (details, callbackFn) {
                    console.log("onAuthRequired!", details, callbackFn);
                    callbackFn({
                        authCredentials: { username: "yEkEANrp", password: "8NeCArZ5" }
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
