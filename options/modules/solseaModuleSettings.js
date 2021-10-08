$(function () {
    chrome.storage.local.get('solseaSettings', function (solS) {
        if (solS.solseaSettings != undefined) {
            $(`#MSLRbtnssolseaAutofillBtn`).attr('class', solS.solseaSettings['autofill']);
            $(`#MSLRbtnssolseaAutocheckoutBtn`).attr('class', solS.solseaSettings['autocheckout']);
            //$(`#MSLRsizeSelect`).val(solS.solseaSettings['size']);
        }
    });
});

$(document).ready(function () {
    $('[id^="MSLRbtnssolseaAuto"]').on('click', function () {
        if ($(this).attr('class') == 'actionBtnOff') {
            $(this).attr('class', 'actionBtnOn');
        } else {
            $(this).attr('class', 'actionBtnOff');
        }
    });

    $('select').on('change', function () {
        getSettings();
    });

    $('button').on('click', function () {
        getSettings();
    });

    $('#gotoshortcuts').on('click', function () {
        chrome.tabs.query({
            currentWindow: true,
            active: true,
        }, function (tabs) {
            const tab = tabs[0];
            chrome.tabs.create({
                active: true,
                index: tab.index + 1,
                openerTabId: tab.id,
                url: "chrome://extensions/shortcuts"
            });
        });
    });
});

function getSettings() {
    var settings = {
        'autofill': $('#MSLRbtnssolseaAutofillBtn').attr('class'),
        'autocheckout': $('#MSLRbtnssolseaAutocheckoutBtn').attr('class'),
        'size': $('#MSLRsizeSelect').val()
    }

    chrome.storage.local.set({ 'solseaSettings': settings });
    getModuleStatus();
}

function getModuleStatus() {
    chrome.storage.local.get('solseaSettings', function (solS) {
        if (solS.solseaSettings != undefined) {
            let activated = 0;
            Object.keys(solS.solseaSettings).forEach(id => {
                if (solS.solseaSettings[id] == "sizeOn" || solS.solseaSettings[id] == "actionBtnOn") {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $(`#solseaModuleBtnDiv`).attr('class', 'moduleBtnOff');
                } else {
                    $(`#solseaModuleBtnDiv`).attr('class', 'moduleBtnOn');
                }
            }, 100);
        }
    });
}