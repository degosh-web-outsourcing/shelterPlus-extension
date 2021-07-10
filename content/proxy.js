chrome.storage.local.get('proxyHttps', function (settings) {
    if (settings.proxyHttps) {
        if (settings.proxyHttps.use) {
            var config = {
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
        }
    }
});