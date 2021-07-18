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

$(document).ready(function () {

    //для выхода из расширения
    var exitAppModal = document.getElementById("exitAppModal");
    $("#exitAppBtn").on("click", function () {
        exitAppModal.style.display = "block";
    });
    
    //убрать по нажатию на нет
	$("#exitAppNoBtn").on("click", function () {
		exitAppModal.style.display = "none";
	});

    //модал удаления всего
    var resetAllModal = document.getElementById("resetAllModal");
    $("#resetAllBtn").on("click", function () {
       resetAllModal.style.display = "block";
    });
   
    //убрать по нажатию на нет
	$("#resetAllNoBtn").on("click", function () {
		resetAllModal.style.display = "none";
	});

    //убрать по нажатию на да
    $("#resetAllYesBtn").on("click", function () {
		resetAllModal.style.display = "none";
	});

    //модал удаления профилей
    var resetPfofilesModal = document.getElementById("resetProfilesModal");
    $("#resetProfilesBtn").on("click", function () {
       resetPfofilesModal.style.display = "block";
    });
    
    //убрать по нажатию на нет
	$("#resetProfilesNoBtn").on("click", function () {
		resetPfofilesModal.style.display = "none";
	});
    //убрать по нажатию на да
	$("#resetProfilesYesBtn").on("click", function () {
		resetPfofilesModal.style.display = "none";
	});
});
  
$(function () {
    $("#resetProfilesYesBtn").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
    });

    $("#resetAllYesBtn").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
        chrome.storage.local.set({ 'adiSettings': null });
        chrome.storage.local.set({ 'kithSettings': null });
        chrome.storage.local.set({ 'kithSettings': null });
        chrome.storage.local.set({ 'shopifySettings': null });
        chrome.storage.local.set({ 'proxyHttps': null });
        location.reload();
    });

    $('#exitAppYesBtn').on('click', function () {
        chrome.storage.local.set({ 'license': null });
        window.location.href = "../auth/auth.html";
    });
});

$(function () {
    chrome.storage.local.get('proxyHttps', function (sw) {
        if (sw.proxyHttps) {
            $('#proxyInput').val(sw.proxyHttps.proxyD);

            if (sw.proxyHttps.status) {
                $('#useProxyBtn').attr('class', 'proxyOn');
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

        $('#useProxyBtn').on('click', function () {
            var proxyData = $('#proxyInput').val();
            if (document.getElementById('proxyInput').value.length) {
                if ($('#useProxyBtn').attr('class') == 'proxyOff') {
                    $('#useProxyBtn').attr('class', 'proxyOn');
                    chrome.storage.local.set({ 'proxyHttps': { status: true, proxyD: proxyData } });
                    chrome.tabs.create({ url: "https://degosh.com/" });
                    chrome.runtime.reload();
                } else {
                    $('#useProxyBtn').attr('class', 'proxyOff');
                    chrome.storage.local.set({ 'proxyHttps': { status: false, proxyD: proxyData } });
                    chrome.tabs.create({ url: "https://degosh.com/" });
                    chrome.runtime.reload();
                }
            }
        });
    });
});