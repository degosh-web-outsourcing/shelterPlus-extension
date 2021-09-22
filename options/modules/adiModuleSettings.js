$(function () {
    chrome.storage.local.get('adiSettings', function (aS) {
        if (aS.adiSettings != undefined) {
            Object.keys(aS.adiSettings).forEach(id => {
                if (aS.adiSettings[id] == "sizeOn") {
                    $(`#adidas${id}`).attr('class', 'sizeOn');
                }
            });
            
            $(`#MSLRbtnsAdiAutofillBtn`).attr('class', aS.adiSettings['adiAutofill']);
            $(`#MSLRbtnsAdiAutocheckoutBtn`).attr('class', aS.adiSettings['adiAutocheckout']);
            $(`#MSLRbtnsAdiWaitAvailabilityBtn `).attr('class', aS.adiSettings['adiWaitForAvailability']);
        }
    });
});

$(document).ready(function () {
    $('button[class^="size"]').on('click', function () {
        if ($(this).attr('class') == 'sizeOff') {
            $(this).attr('class', 'sizeOn');
        } else {
            $(this).attr('class', 'sizeOff');
        }
    });

    $('[id^="MSLRbtnsAdi"]').on('click', function () {
        if ($(this).attr('class') == 'actionBtnOff') {
            $(this).attr('class', 'actionBtnOn');
        } else {
            $(this).attr('class', 'actionBtnOff');
        }
    });

    $('#MSLLselectAllBtn').on('click', function () {
        selectAllSizes();
    });

    $('#MSLLunselectAllBtn').on('click', function () {
        resetSizes();
    });

    $('button').on('click', function () {
        getSettings();
    });
});

function resetSizes() {
    $('button[class^="size"]').attr('class', 'sizeOff');
}

function selectAllSizes() {
    $('button[class^="size"]').attr('class', 'sizeOn');
}

function getSettings() {
    var settings = {
        '35': $('button[id="adidas35"]').attr('class'),
        '4': $('button[id="adidas4"]').attr('class'),
        '45': $('button[id="adidas45"]').attr('class'),
        '5': $('button[id="adidas5"]').attr('class'),
        '55': $('button[id="adidas55"]').attr('class'),
        '6': $('button[id="adidas6"]').attr('class'),
        '65': $('button[id="adidas65"]').attr('class'),
        '7': $('button[id="adidas7"]').attr('class'),
        '75': $('button[id="adidas75"]').attr('class'),
        '8': $('button[id="adidas8"]').attr('class'),
        '85': $('button[id="adidas85"]').attr('class'),
        '9': $('button[id="adidas9"]').attr('class'),
        '95': $('button[id="adidas95"]').attr('class'),
        '10': $('button[id="adidas10"]').attr('class'),
        '105': $('button[id="adidas105"]').attr('class'),
        '11': $('button[id="adidas11"]').attr('class'),
        '115': $('button[id="adidas115"]').attr('class'),
        '12': $('button[id="adidas12"]').attr('class'),
        '125': $('button[id="adidas125"]').attr('class'),
        '13': $('button[id="adidas13"]').attr('class'),
        '135': $('button[id="adidas135"]').attr('class'),
        '14': $('button[id="adidas14"]').attr('class'),
        '145': $('button[id="adidas145"]').attr('class'),
        '15': $('button[id="adidas15"]').attr('class'),
        '16': $('button[id="adidas16"]').attr('class'),
        '17': $('button[id="adidas17"]').attr('class'),
        '18': $('button[id="adidas18"]').attr('class'),
        '19': $('button[id="adidas19"]').attr('class'),
        'adiAutofill': $('button[id="MSLRbtnsAdiAutofillBtn"]').attr('class'),
        'adiAutocheckout': $('button[id="MSLRbtnsAdiAutocheckoutBtn"]').attr('class'),
        'adiWaitForAvailability': $('button[id="MSLRbtnsAdiWaitAvailabilityBtn"]').attr('class')
    }

    chrome.storage.local.set({ 'adiSettings': settings });
    getModuleStatus();
}

function getModuleStatus() {
    chrome.storage.local.get('adiSettings', function (aS) {
        if (aS.adiSettings != undefined) {
        let activated = 0;
        Object.keys(aS.adiSettings).forEach(id => {
            if (aS.adiSettings[id] == "sizeOn" || aS.adiSettings[id] == "actionBtnOn") {
                activated += 1;
            }
        });

        setTimeout(function () {
			if (activated == 0) {
				$(`#adiModuleBtnDiv`).attr('class', 'moduleBtnOff');
			} else {
				$(`#adiModuleBtnDiv`).attr('class', 'moduleBtnOn');
			}
		}, 100);
        }
    });
}