checkKey();

setInterval(() => {
	checkKey();
}, 30000);


chrome.storage.local.get('kithSettings', function (kS) {
	if (kS.kithSettings != undefined) {
		Object.keys(kS.kithSettings).forEach(id => {
			if (kS.kithSettings[id] == "actionBtnOn") {
				$(`#kithModuleBtnDiv`).attr('class', 'moduleBtnOn');
			}
		});
	}
});

chrome.storage.local.get('adiSettings', function (aS) {
	if (aS.adiSettings != undefined) {
		Object.keys(aS.adiSettings).forEach(id => {
			if (aS.adiSettings[id] == "sizeOn" || aS.adiSettings[id] == "actionBtnOn") {
				$(`#adiModuleBtnDiv`).attr('class', 'moduleBtnOn');
			}
		});
	}
});

chrome.storage.local.get('solseaSettings', function (solS) {
	if (solS.solseaSettings != undefined) {
		Object.keys(solS.solseaSettings).forEach(id => {
			if (solS.solseaSettings[id] == "sizeOn" || solS.solseaSettings[id] == "actionBtnOn") {
				$(`#solseaModuleBtnDiv`).attr('class', 'moduleBtnOn');
			}
		});
	}
});

chrome.storage.local.get('shopifySettings', function (sS) {
	if (sS.shopifySettings != undefined) {
		$(`#shopifyModuleBtnDiv`).attr('class', sS.shopifySettings['shopifyModuleBtnStatus']);
	}
});

$(function () {
	$('#MSprofileSelect').on('change', function () {
		chrome.storage.local.get('profiles', function (list) {
			if (list.profiles) {
				for (var i = 0; i < list.profiles.length; i++) {
					if (list.profiles[i].profileName == document.getElementById('MSprofileSelect').value) {
						list.profiles[i].selected = true;
					} else {
						list.profiles[i].selected = false;
					}
				}
				chrome.storage.local.set({ 'profiles': list.profiles });
			}
		});
	});

	$('#adiModuleBtnDiv').on('click', function () {
		if (window.location.pathname != "/options/modules/adiModuleSettings.html") {
			window.location.href = "/options/modules/adiModuleSettings.html";
		}
	});

	$('#kithModuleBtnDiv').on('click', function () {
		if (window.location.pathname != "/options/modules/kithModuleSettings.html") {
			window.location.href = "/options/modules/kithModuleSettings.html";
		}
	});

	$('#shopifyModuleBtnDiv').on('click', function () {
		if (window.location.pathname != "/options/modules/shopifyModuleSettings.html") {
			window.location.href = "/options/modules/shopifyModuleSettings.html";

			if ($(this).attr('class') == 'moduleBtnOff') {
				$(this).attr('class', 'moduleBtnOn');
				$("#pInsideShopify").html("?????????????? ??????????????");
				writeSettingsToStorage();
			} else {
				$(this).attr('class', 'moduleBtnOff');
				$("#pInsideShopify").html("?????????????? ????????????????");
				writeSettingsToStorage();
			}
		}

		function writeSettingsToStorage() {
			var settings = {
				'shopifyModuleBtnStatus': $('div[id="shopifyModuleBtnDiv"]').attr('class')
			}

			chrome.storage.local.set({ 'shopifySettings': settings });
		}
	});

	$('#solseaModuleBtnDiv').on('click', function () {
		if (window.location.pathname != "/options/modules/solseaModuleSettings.html") {
			window.location.href = "/options/modules/solseaModuleSettings.html";
		}
	});

	const profilesList = document.getElementById('MSprofileSelect');

	chrome.storage.local.get('profiles', function (list) {
		list.profiles.forEach(function (profile) {
			profilesList.insertAdjacentHTML('beforeend',
				`<option value="${profile.profileName}">${profile.profileName}</option>`
			);
			if (profile.selected) {
				$('#MSprofileSelect').val(profile.profileName);
			}
		});
	});
});

function checkKey() {
	chrome.storage.local.get('license', function (key) {
		if (key.license == undefined) {
			window.location.href = "../auth/auth.html";
		} else {
			fetch('https://dashboard.degosh.com/shelter/enter', {
				method: 'POST',
				body: new URLSearchParams({
					key: key.license.replace(/\s/g, '')
				}),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
			})
				.then(res => res.json())
				.then((json) => {
					if (json.giveAccess == "Wrong IP" || json.giveAccess == "No key") {
						window.location.href = "../auth/auth.html";
					}
				}).catch(function (err) {
					window.location.href = "../auth/auth.html";
				});
		}
	});
}