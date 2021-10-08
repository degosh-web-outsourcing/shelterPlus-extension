chrome.storage.local.get("proxy", function (data) {
    if (data.proxy) {
        b = data.proxy.switcher;
        pr = data.proxy.data.split(':');
        var config = {
            mode: "direct"
        };

        if (b == true) {
            var config = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: "http",
                        host: pr[0],
                        port: parseInt(pr[1])
                    },
                    bypassList: ["degosh.com", "dashboard.degosh.com"]
                }
            };
        }

        setTimeout(() => {
            chrome.proxy.settings.set(
                { value: config, scope: 'regular' },
                function () { });

            if (b == true) {
                chrome.webRequest.onAuthRequired.addListener(
                    function (details, callbackFn) {
                        console.log("onAuthRequired!", details, callbackFn);
                        callbackFn({
                            authCredentials: { username: pr[2], password: pr[3] }
                        });
                    },
                    { urls: ["<all_urls>"] },
                    ['asyncBlocking']
                );
            }
        }, 250);
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command == "dublicate") {
        chrome.storage.local.get('solseaSettings', function (solS) {
            if (solS.solseaSettings.autofill == "actionBtnOn") {
                chrome.tabs.query({
                    currentWindow: true,
                    active: true,
                }, function (tabs) {
                    const tab = tabs[0];
                    if (tab.url.includes('http') || tab.url.includes('https') || tab.url.includes('www')) {
                        chrome.tabs.create({
                            active: false,
                            index: tab.index + 1,
                            openerTabId: tab.id,
                            url: tab.url,
                        });

                        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                            port = chrome.tabs.connect(tabs[0].id, { name: "dublicateDone" });
                            port.postMessage({ notify: true });
                        });
                    }
                });
            }
        });
    }
});