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

chrome.storage.local.get('kithSettings', function (kS) {
	Object.keys(kS.kithSettings).forEach(id => {
		if (kS.kithSettings[id] == "actionBtnOn") {
			$(`#kithModuleBtnDiv`).attr('class', 'moduleBtnOn');
		}
	});
});

chrome.storage.local.get('adiSettings', function (aS) {
	Object.keys(aS.adiSettings).forEach(id => {
		if (aS.adiSettings[id] == "sizeOn" || aS.adiSettings[id] == "actionBtnOn") {
			$(`#adiModuleBtnDiv`).attr('class', 'moduleBtnOn');
		}
	});
});