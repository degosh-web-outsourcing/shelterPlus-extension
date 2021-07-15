$(function () {
    chrome.storage.local.get('kithSettings', function (kS) {
        $(`#MSLRbtnsKithAutofillBtn`).attr('class', kS.kithSettings['autofill']);
        $(`#MSLRbtnsKithAutocheckoutBtn`).attr('class', kS.kithSettings['autocheckout']);
        $(`#MSLRsizeSelect`).val(kS.kithSettings['size']);
        console.log(kS.kithSettings['size'])
    });
});

$(document).ready(function () {
    $('[id^="MSLRbtnsKithAuto"]').on('click', function () {
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
});

function getSettings() {
    var settings = {
        'autofill': $('#MSLRbtnsKithAutofillBtn').attr('class'),
        'autocheckout': $('#MSLRbtnsKithAutocheckoutBtn').attr('class'),
        'size': $('#MSLRsizeSelect').val()
    }

    chrome.storage.local.set({ 'kithSettings': settings });
    getModuleStatus();
}

function getModuleStatus() {
    chrome.storage.local.get('kithSettings', function (kS) {
        let activated = 0;
        Object.keys(kS.kithSettings).forEach(id => {
            if (kS.kithSettings[id] == "sizeOn" || kS.kithSettings[id] == "actionBtnOn") {
                activated += 1;
            }
        });

        setTimeout(function () {
			if (activated == 0) {
				$(`#kithModuleBtnDiv`).attr('class', 'moduleBtnOff');
			} else {
				$(`#kithModuleBtnDiv`).attr('class', 'moduleBtnOn');
			}
		}, 100);
    });
}