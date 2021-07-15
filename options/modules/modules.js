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
	checkModuleKith();
	checkModuleAdi();
	adiSyncBtns();
	kithSyncBtns();

	//ПЕРЕКЛЮЧАТЕЛИ ADIDAS
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
	$('button[id^="MSLRbtnsAdi"]').on('click', function () {
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

	//ПЕРЕКЛЮЧАТЕЛИ KITH
	//переключить цвет кнопки настройки при нажатии
	$('button[id^="MSLRbtnsKith"]').on('click', function () {
		let elementId = $(this).attr('id');

		if ($(`#${elementId}`).attr('class') == 'actionBtnOff') {
			$(`#${elementId}`).attr('class', 'actionBtnOn');
		} else {
			$(`#${elementId}`).attr('class', 'actionBtnOff');
		}

		kithRange();
	});	

	//ПЕРЕКЛЮЧАТЕЛИ Shopify
	//Включено или нет автозаполнение для shopify
	$('div[id^="shopifyModuleBtnDiv"]').on('click', function () {
		let elementId = $(this).attr('id');

		if ($(`#${elementId}`).attr('class') == 'moduleBtnOff') {
			$(`#${elementId}`).attr('class', 'moduleBtnOn');
			/*$("#pInsideShopify").attr('class', 'shopifyIsOn');*/
			$("#pInsideShopify").html("Включено")
		} else {
			$(`#${elementId}`).attr('class', 'moduleBtnOff');
			//$("#pInsideShopify").attr('class', 'shopifyIsOff');
			$("#pInsideShopify").html("Выключено");
		}

		kithRange();
	});	
});



//ДЛЯ ADIDAS
// функция которая включает и выключает div адидаса
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
//перезаписывает статусы кнопок в chrome storage
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
			'adiAutofill': $('button[id="MSLRbtnsAdiAutofillBtn"]').attr('class'),
			'adiAutocheckout': $('button[id="MSLRbtnsAdiAutocheckoutBtn"]').attr('class'),
			'adiWaitForAvailability': $('button[id="MSLRbtnsAdiWaitAvailabilityBtn"]').attr('class') 
		}

		chrome.storage.sync.set({ 'adiSettings': sizeStatus });
		checkModuleAdi();
	});
}
//делает кнопки такими же, как записано в chrome storage
function adiSyncBtns() {
	chrome.storage.sync.get('adiSettings', function (aS) {
		//если в сторадже записано что автофил включен
		if (aS.adiSettings['adiAutofill'] == 'actionBtnOn') {
			//сделать on и в открытой странице
			$(`#MSLRbtnsAdiAutofillBtn`).attr('class', 'actionBtnOn');
		}

		//то же самое для ожидания наличия
		if (aS.adiSettings['adiWaitForAvailability'] == 'actionBtnOn') {
			$(`#MSLRbtnsAdiWaitAvailabilityBtn `).attr('class', 'actionBtnOn');
		}

		//то же самое для авточекаута
		if (aS.adiSettings['adiAutocheckout'] == 'actionBtnOn') {
			$(`##MSLRbtnsAdiAutocheckoutBtn`).attr('class', 'actionBtnOn');
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



//ДЛЯ KITH
// функция которая включает и выключает div kith
function checkModuleKith() {
	chrome.storage.sync.get('kithSettings', function (kS) {
		let activated = 0;
		//проверяем нажато ли автозаполнение/авточекаут
		Object.keys(kS.kithSettings).forEach(id => {
			if (kS.kithSettings[id] == "actionBtnOn") {
				//Если да, то мы нашли нажатую кнопку. Обновляем счетчик нажатых кнопок
				activated += 1;
			}
		});

		//тут таймаут тк это должно выполняться строго после первой функции
		//еси была найдена хоть одна нажатая кнопка, то включаем див адидаса
		setTimeout(function () {
			if (activated == 0) {
				$("#kithModuleBtnDiv").attr("class", "moduleBtnOff");
			} else {
				$("#kithModuleBtnDiv").attr("class", "moduleBtnOn");
			}
		}, 100);
	});
}

//перезаписывает статусы кнопок в chrome storage
function kithRange() {
	chrome.storage.sync.get('kithSettings', function (kS) {
		var btnsStatus = {
			'kithAutofill': $('button[id="MSLRbtnsKithAutofillBtn"]').attr('class'),
			'kithAutocheckout': $('button[id="MSLRbtnsKithAutocheckoutBtn"]').attr('class'),
		}

		chrome.storage.sync.set({ 'kithSettings': btnsStatus });
		checkModuleKith();
	});
}

//делает кнопки kith такими же, как записано в chrome storage
function kithSyncBtns() {
	chrome.storage.sync.get('kithSettings', function (kS) {

		//если в сторадже записано что автофил включен
		if (kS.kithSettings['kithAutofill'] == 'actionBtnOn') {
			//сделать on и в открытой странице
			$(`#MSLRbtnsKithAutofillBtn`).attr('class', 'actionBtnOn');
		}

		//то же самое для авточекаута
		if (aS.adiSettings['adiAutocheckout'] == 'actionBtnOn') {
			$(`#MSLRbtnsKithAutocheckoutBtn`).attr('class', 'actionBtnOn');
		}
	});

	kithRange();
}