chrome.runtime.onConnect.addListener(function (port) {
    if (port.name == "dublicateDone") {
        port.onMessage.addListener(function (response) {
            if (response.notify) {
                iziToast.success({
                    title: 'Страница продублирована',
                    message: 'Shelter+ ACO',
                    position: 'topCenter',
                });
            }
        });
    }
});

function notify(mintClick) {
    clearInterval(mintClick);
    iziToast.success({
        title: '"Mint" нажат',
        message: 'Shelter+ ACO',
        position: 'topCenter',
    });
}

chrome.storage.local.get('solseaSettings', function (solS) {
    if (solS.solseaSettings.autocheckout == "actionBtnOn" && !location.href.includes('google') && !location.href.includes('yandex.ru') && !location.href.includes('youtube.com') && !location.href.includes('vk.com') && !location.href.includes('twitter.com') && !location.href.includes('discord') && !location.href.includes('gmail.com') && !location.href.includes('sheltercook') && !location.href.includes('mail.ru')) {
        let mintClick = setInterval(() => {
            $('span:contains("MINT")').parent().click();
            $('span:contains("Mint")').parent().click();
            $('span:contains("mint")').parent().click();
            $('button:contains("Mint")').click();
            $('button:contains("mint")').click();
            $('button:contains("MINT")').click();
            $('button:contains("for")').click();
            $('button:contains("For")').click();
            $('button[id*="Mint"]').click();
            $('button[id*="mint"]').click();
            $('h1:contain("Mint")').parent().parent().click();
            $('h1:contain("MINT")').parent().parent().click();
            $('h1:contain("mint")').parent().parent().click();
            $('h2:contain("Mint")').parent().parent().click();
            $('h2:contain("MINT")').parent().parent().click();
            $('h2:contain("mint")').parent().parent().click();
            $('h3:contain("Mint")').parent().parent().click();
            $('h3:contain("MINT")').parent().parent().click();
            $('h3:contain("mint")').parent().parent().click();
            $('h3:contain("mint")').parent().click();
            $('h1:contain("Mint")').parent().click();
            $('h1:contain("MINT")').parent().click();
            $('h1:contain("mint")').parent().click();
            $('h2:contain("Mint")').parent().click();
            $('h2:contain("MINT")').parent().click();
            $('h2:contain("mint")').parent().click();
            $('h3:contain("Mint")').parent().click();
            $('h3:contain("MINT")').parent().click();
            $('h3:contain("mint")').parent().click();
            $('h3:contain("mint")').parent().click();
            $('h3:contain("Mint")').parent().click();
            $('p:contain("MINT")').parent().click();
            $('p:contain("mint")').parent().click();
            $('p:contain("mint")').parent().click();
            $('a:contain("MINT")').parent().click();
            $('a:contain("mint")').parent().click();
            $('a:contain("mint")').parent().click();
        }, 200);
    }
});


/*
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name == "dublicateDone") {
        port.onMessage.addListener(function (response) {
            if (response.notify) {
                iziToast.success({
                    title: 'Страница продублирована',
                    message: 'Shelter+ ACO',
                    position: 'topCenter',
                });
            }
        });
    }
});

chrome.storage.local.get('solseaSettings', function (solS) {
    if (solS.solseaSettings.autocheckout == "actionBtnOn") {
        let mintClick = setInterval(() => {
            clearInterval(mintClick);
            if ($('span:contains("MINT")').parent().length ||
                $('span:contains("Mint")').parent().length ||
                $('span:contains("mint")').parent().length ||
                $('button:contains("Mint")').length ||
                $('button:contains("Mint")').length ||
                $('button:contains("mint")').length ||
                $('button:contains("MINT")').length ||
                $('button[id*="Mint"]').length ||
                $('button[id*="mint"]').length ||
                $('a:contains("Mint")').length ||
                $('a:contains("mint")').length ||
                $('a:contains("MINT")').length ||
                $('a[id*="Mint"]').length ||
                $('a[id*="MINT"]').length ||
                $('a[id*="mint"]').length ||
                $('a[id^="Mint"]').length ||
                $('a[id^="MINT"]').length ||
                $('a[id^="mint"]').length) {

                iziToast.success({
                    title: '"Mint" нажат',
                    message: 'Shelter+ ACO',
                    position: 'topCenter',
                });

                $('span:contains("MINT")').parent().click();
                $('span:contains("Mint")').parent().click();
                $('span:contains("mint")').parent().click();
                $('button:contains("Mint")').click();
                $('button:contains("mint")').click();
                $('button:contains("MINT")').click();
                $('button:contains("for")').click();
                $('button:contains("For")').click();
                $('button[id*="Mint"]').click();
                $('button[id*="mint"]').click();
                $('a:contains("Mint")').click();
                $('a:contains("mint")').click();
                $('a:contains("MINT")').click();
                $('a:contains("for")').click();
                $('a:contains("For")').click();
                $('a:contains("FOR")').click();
                $('a[id*="Mint"]').click();
                $('a[id*="MINT"]').click();
                $('a[id*="mint"]').click();
                $('a[id^="Mint"]').click();
                $('a[id^="MINT"]').click();
                $('a[id^="mint"]').click();

                $('span:contains("MINT")').parent().click();
                $('span:contains("Mint")').parent().click();
                $('span:contains("mint")').parent().click();
                $('button:contains("Mint")').click();
                $('button:contains("mint")').click();
                $('button:contains("MINT")').click();
                $('button:contains("for")').click();
                $('button:contains("For")').click();
                $('button[id*="Mint"]').click();
                $('button[id*="mint"]').click();
                $('a:contains("Mint")').click();
                $('a:contains("mint")').click();
                $('a:contains("MINT")').click();
                $('a:contains("for")').click();
                $('a:contains("For")').click();
                $('a:contains("FOR")').click();
                $('a[id*="Mint"]').click();
                $('a[id*="MINT"]').click();
                $('a[id*="mint"]').click();
                $('a[id^="Mint"]').click();
                $('a[id^="MINT"]').click();
                $('a[id^="mint"]').click();
            }
        }, 100);

        let mintClick = setInterval(() => {
            clearInterval(mintClick);
            if ($('h1:contains("mint")').length || $('h2:contains("mint")').length || $('h3:contains("mint")').length || $('h4:contains("mint")').length ||$('h1:contains("Mint")').length || $('h2:contains("Mint")').length || $('h3:contains("Mint")').length || $('h4:contains("Mint")').length || $('span:contains("mint")').length || $('span:contains("Mint")').length) {
                iziToast.success({
                    title: '"Mint" нажат',
                    message: 'Shelter+ ACO',
                    position: 'topCenter',
                });

                $('h1:contains("mint")').click()
                $('h2:contains("mint")').click()
                $('h3:contains("mint")').click()
                $('h4:contains("mint")').click()
                $('h1:contains("Mint")').click()
                $('h2:contains("Mint")').click()
                $('h3:contains("Mint")').click()
                $('h4:contains("Mint")').click()
                $('span:contains("mint")').click()
                $('span:contains("Mint")').click()

                $('h2:contains("mint")').click()
                $('h1:contains("mint")').click()
                $('h3:contains("mint")').click()
                $('h4:contains("mint")').click()
                $('h1:contains("Mint")').click()
                $('h2:contains("Mint")').click()
                $('h3:contains("Mint")').click()
                $('h4:contains("Mint")').click()
                $('span:contains("mint")').click()
                $('span:contains("Mint")').click()
            }
        }, 200);
    }
});
*/