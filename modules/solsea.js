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
            }
        }, 100);
    }
});