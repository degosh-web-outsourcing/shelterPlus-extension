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
	$('button[id^="adidas"]').on('click', function () {
		let elementId = $(this).attr('id');

		if ($(`#${elementId}`).attr('class') == 'sizeOff') {
			$(`#${elementId}`).attr('class', 'sizeOn');
		} else {
			$(`#${elementId}`).attr('class', 'sizeOff');
		}

		adiGetSizeRange();
	});

    //переключить цвет кнопки настройки при нажатии
	$('button[id^="MSLRbtns"]').on('click', function () {
		let elementId = $(this).attr('id');

		if ($(`#${elementId}`).attr('class') == 'actionBtnOff') {
			$(`#${elementId}`).attr('class', 'actionBtnOn');
		} else {
			$(`#${elementId}`).attr('class', 'actionBtnOff');
		}

		adiGetSizeRange();
	});

    //кнопка отключения всех размеры
	$('#MSLLunselectAllBtn').on('click', function () {
		$('button[id^="adidas"]').attr('class', 'sizeOff');

		adiGetSizeRange();
	});

	//кнопка включения всех размеров
	$('#MSLLselectAllBtn').on('click', function () {
		$('button[id^="adidas"]').attr('class', 'sizeOn');

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
			if (aS.adiSettings[id] == "sizeOn" || aS.adiSettings[id] == "actionBtnOn") {
				//Если да, то мы нашли нажатую кнопку. Обновляем счетчик нажатых кнопок
				activated += 1;
			}
		});

		//тут таймаут тк это должно выполняться строго после первой функции
		//еси была найдена хоть одна нажатая кнопка, то включаем див адидаса
		setTimeout(function () {
			if (activated == 0) {
				$("#adiModuleBtnDiv").attr("class", "moduleBtnOff");
			} else {
				$("#adiModuleBtnDiv").attr("class", "moduleBtnOn");
			}
		}, 100);
	});
}

//функция, которая перезаписывает статусы каждых кнопок (нажата, не нажата)
//2
function adiGetSizeRange() {
	chrome.storage.sync.get('adiSettings', function (aS) {
		var sizeStatus = {
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
			'autofill': $('button[id="MSLRbtnsAutofillBtn"]').attr('class'),
			'autocheckout': $('button[id="MSLRbtnsAutocheckoutBtn"]').attr('class'),
			'waitForAvailability': $('button[id="MSLRbtnsWaitAvailabilityBtn"]').attr('class') 
		}

		chrome.storage.sync.set({ 'adiSettings': sizeStatus });
		checkModuleAdi();
	});
}

function syncBtns() {
	chrome.storage.sync.get('adiSettings', function (aS) {
		//если в сторадже записано что автофил включен
		if (aS.adiSettings['autofill'] == 'actionBtnOn') {
			//сделать on и в открытой странице
			$(`#MSLRbtnsAutofillBtn`).attr('class', 'actionBtnOn');
		}

		//то же самое для ожидания наличия
		if (aS.adiSettings['waitForAvailability'] == 'actionBtnOn') {
			$(`#MSLRbtnsAutocheckoutBtn`).attr('class', 'actionBtnOn');
		}

		//то же самое для авточекаута
		if (aS.adiSettings['autocheckout'] == 'actionBtnOn') {
			$(`#MSLRbtnsWaitAvailabilityBtn`).attr('class', 'actionBtnOn');
		}

		//то же самое для размера
		Object.keys(aS.adiSettings).forEach(id => {
			if (aS.adiSettings[id] == "sizeOn") {
				$(`#adidas${id}`).attr('class', 'sizeOn');
			}
		});
	});

	adiGetSizeRange();
}