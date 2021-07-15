chrome.storage.local.get('license', function (key) {
    fetch(`https://degosh.com/shelterPlus-extension/${key.license}/`).then(function (response) {
        return response.text();
    }).then(function (html) {
        if (html !== "OK") {
            window.location.href = "../auth/auth.html";
        } else {
            $('#status').text("Ошибка");
        }
    }).catch(function (err) {
        console.log('Something went wrong', err);
    });
});

//как только документ готов
$(document).ready(function () {
    //переключить цвет кнопки proxy по тыку
	$('button[id="useProxyBtn"]').on('click', function () {
		let elementId = $(this).attr('id');

		if ($(`#${elementId}`).attr('class') == 'BtnOff') {
			$(`#${elementId}`).attr('class', 'BtnOn');
		} else {
			$(`#${elementId}`).attr('class', 'BtnOff');
		}

        //записываем статус кнопки в chrome storage
		SettingsSizeRange();
	});
});

//перезаписывает статусы кнопок в переменную в chrome storage
function SettingsSizeRange() {
	chrome.storage.sync.get('Settings', function (Set) {
		var btnsStatus = {
			'proxyBtnClass': $('button[id="useProxyBtn"]').attr('class')
		}

		chrome.storage.sync.set({ 'Settings': btnsStatus});
	});
}

//делает кнопки такими же, как записано в соответствующей переменной в chrome storage
function syncBtns() {
	chrome.storage.sync.get('Settings', function (Set) {
		//если в сторадже записано что proxy включен
		if (Set.Settings['proxyBtnClass'] == 'BtnOn') {
			//сделать эту кнопку on и в открытой странице
			$(`#proxyBtnClass`).attr('class', 'BtnOn');
		}
    });

    //снова записываем статус этой кнопки
	SettingsSizeRange();
}
    

$(function () {
    $("#resetP").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
    });

    $('#exit').on('click', function () {
        chrome.storage.local.set({ 'license': null });
        window.location.href = "../auth/auth.html";
    });
});

$(function () {
    chrome.storage.local.get('proxyHttps', function (sw) {
        if (sw.proxyHttps) {
            $('#proxyInput').val(sw.proxyHttps.proxyD);

            if (sw.proxyHttps.status) {
                $('#useProxy').attr('class', 'proxyOn');
            } else {
                chrome.storage.local.set({ 'proxyHttps': { status: false, proxyD: sw.proxyHttps.proxyD } });
            }
        }

        $('#proxyInput').change(function () {
            chrome.storage.local.get('proxyHttps', function (sw) {
                var proxyData = $('#proxyInput').val();
                chrome.storage.local.set({ 'proxyHttps': { status: sw.proxyHttps.status, proxyD: proxyData } });
            });
        });

        $('#useProxy').on('click', function () {
            var proxyData = $('#proxyInput').val();
            if (document.getElementById('proxyInput').value.length) {
                if ($('#useProxy').attr('class') == 'proxyOff') {
                    $('#useProxy').attr('class', 'proxyOn');
                    chrome.storage.local.set({ 'proxyHttps': { status: true, proxyD: proxyData } });
                    chrome.tabs.create({ url: "https://degosh.com/" });
                    chrome.runtime.reload();
                } else {
                    $('#useProxy').attr('class', 'proxyOff');
                    chrome.storage.local.set({ 'proxyHttps': { status: false, proxyD: proxyData } });
                    chrome.tabs.create({ url: "https://degosh.com/" });
                    chrome.runtime.reload();
                }
            }
        });
    });
});