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
    //переключить цвет кнопки размера при нажатии
	$('div[id^="adidas"]').on('click', function () {
		let elementId = $(this).attr('id');

		if ($(`#${elementId}`).attr('class') == 'sizeDivOff') {
			$(`#${elementId}`).attr('class', 'sizeDivOn');
		} else {
			$(`#${elementId}`).attr('class', 'sizeDivOff');
		}

		adiGetSizeRange();
	});

    //переключить цвет кнопки настройки при нажатии
	$('div[class^="MSLRbtnsClickableDiv"]').on('click', function () {
		let elementId = $(this).attr('id');

		if ($(`#${elementId}`).attr('class') == 'MSLRbtnsClickableDivOff') {
			$(`#${elementId}`).attr('class', 'MSLRbtnsClickableDivOn');
		} else {
			$(`#${elementId}`).attr('class', 'MSLRbtnsClickableDivOff');
		}

		adiGetSizeRange();
	});

    //кнопка отключения всех размеры
	$('#MSLLClearBtnDiv').on('click', function () {
		$('div[id^="adidas"]').attr('class', 'sizeDivOff');

		adiGetSizeRange();
	});

	//кнопка включения всех размеров
	$('#MSLLAllSizesBtnDiv').on('click', function () {
		$('div[id^="adidas"]').attr('class', 'sizeDivOn');

		adiGetSizeRange();
	});
});

// функция которая включает и выключает div адидаса
// 1
function checkModuleAdi() {
	chrome.storage.sync.get('adiSettings', function (aS) {
		let activated = 0;
		//Составляем массив из adiSettings и для каждого элемента
		//Проверяем, стоит ли в нем sizeOn или settingOn
		Object.keys(aS.adiSettings).forEach(id => {
			if (aS.adiSettings[id] == "sizeDivOn" || aS.adiSettings[id] == "MSLRbtnsClickableDivOff") {
				//Если да, то мы нашли нажатую кнопку. Обновляем счетчик нажатых кнопок
				activated += 1;
			}
		});

		//тут таймаут тк это должно выполняться строго после первой функции
		//еси была найдена хоть одна нажатая кнопка, то включаем див адидаса
		setTimeout(function () {
			if (activated == 0) {
				$("#adiModuleBtnDiv").attr("class", "moduleDivOff");
			} else {
				$("#moduleDivAdidas ").attr("class", "moduleDivOn");
			}
		}, 100);
	});
}

//функция, которая перезаписывает статусы каждых кнопок (нажата, не нажата)
//2
function adiGetSizeRange() {
	chrome.storage.sync.get('adiSettings', function (aS) {
		var sizeStatus = {
			'35': $('div[id="adidas35"]').attr('class'),
			'4': $('div[id="adidas4"]').attr('class'),
			'45': $('div[id="adidas45"]').attr('class'),
			'5': $('div[id="adidas5"]').attr('class'),
			'55': $('div[id="adidas55"]').attr('class'),
			'6': $('div[id="adidas6"]').attr('class'),
			'65': $('div[id="adidas65"]').attr('class'),
			'7': $('div[id="adidas7"]').attr('class'),
			'75': $('div[id="adidas75"]').attr('class'),
			'8': $('div[id="adidas8"]').attr('class'),
			'85': $('div[id="adidas85"]').attr('class'),
			'9': $('div[id="adidas9"]').attr('class'),
			'95': $('div[id="adidas95"]').attr('class'),
			'10': $('div[id="adidas10"]').attr('class'),
			'105': $('div[id="adidas105"]').attr('class'),
			'11': $('div[id="adidas11"]').attr('class'),
			'115': $('div[id="adidas115"]').attr('class'),
			'12': $('div[id="adidas12"]').attr('class'),
			'125': $('div[id="adidas125"]').attr('class'),
			'13': $('div[id="adidas13"]').attr('class'),
			'135': $('div[id="adidas135"]').attr('class'),
			'14': $('div[id="adidas14"]').attr('class'),
			'145': $('div[id="adidas145"]').attr('class'),
			'15': $('div[id="adidas15"]').attr('class'),
			'16': $('div[id="adidas16"]').attr('class'),
			'17': $('div[id="adidas17"]').attr('class'),
			'18': $('div[id="adidas18"]').attr('class'),
			'19': $('div[id="adidas19"]').attr('class'),
			'autofill': $('div[id="MSLRbtnsFillForms"]').attr('class'),
			'autocheckout': $('div[id="MSLRbtnsPayOrder"]').attr('class'),
			'waitForAvailability': $('div[id="MSLRbtnsWaitAvailability"]').attr('class') 
		}

		chrome.storage.sync.set({ 'adiSettings': sizeStatus });
		checkModuleAdi();
	});
}

function syncBtns() {
	chrome.storage.sync.get('adiSettings', function (aS) {
		//если в сторадже записано что автофил включен
		if (aS.adiSettings['autofill'] == 'MSLRbtnsClickableDivOn') {
			//сделать on и в открытой странице
			$(`#MSLRbtnsFillForms`).attr('class', 'MSLRbtnsClickableDivOn');
		}

		//то же самое для ожидания наличия
		if (aS.adiSettings['waitForAvailability'] == 'MSLRbtnsClickableDivOn') {
			$(`#MSLRbtnsWaitAvailability`).attr('class', 'MSLRbtnsClickableDivOn');
		}

		//то же самое для авточекаута
		if (aS.adiSettings['autocheckout'] == 'MSLRbtnsClickableDivOn') {
			$(`#MSLRbtnsPayOrder`).attr('class', 'MSLRbtnsClickableDivOn');
		}

		//то же самое для размера
		Object.keys(aS.adiSettings).forEach(id => {
			if (aS.adiSettings[id] == "sizeDivOn") {
				$(`#adidas${id}`).attr('class', 'sizeDivOn');
			}
		});
	});

	adiGetSizeRange();
}