const list = ["profiles", "adiSettings", "kithSettings", "shopifySettings", "proxy"];

$(document).ready(function () {
    $('#impEverythingBtn').on('click', function () {
        $('#upload').click();

        const input = document.getElementById('upload');
        input.addEventListener('change', function (e) {
            const reader = new FileReader();

            reader.onload = function () {
                let allData = reader.result;
                allData= JSON.parse(allData);

                chrome.storage.local.set({ 'profiles': allData.profiles });
                chrome.storage.local.set({ 'proxy': allData.proxy });
                chrome.storage.local.set({ 'kithSettings': allData.kithSettings });
                chrome.storage.local.set({ 'adiSettings': allData.adiSettings });
                chrome.storage.local.set({ 'shopifySettings': allData.shopifySettings });
            }

            reader.readAsText(input.files[0]);
            location.reload();
        });
    });

    $('#expEverytingBtn').on('click', function () {
        var exportData = new Object;


        for (let i in list) {
            chrome.storage.local.get(list[i], function (data) {
                let method = list[i];
                exportData[method] = data[method];
            });
        }

        setTimeout(() => {
            download("extensionAllData.shelter", JSON.stringify(exportData));
        }, 650);
    });

    var exitAppModal = document.getElementById("exitAppModal");
    $("#exitAppBtn").on("click", function () {
        exitAppModal.style.display = "block";
    });
    //убрать по нажатию на нет
	$("#exitAppNoBtn").on("click", function () {
		exitAppModal.style.display = "none";
	});

    var resetAllModal = document.getElementById("resetAllModal");
    $("#resetAllBtn").on("click", function () {
        resetAllModal.style.display = "block";
    });
    $("#resetAllNoBtn").on("click", function () {
        resetAllModal.style.display = "none";
    });
    $("#resetAllYesBtn").on("click", function () {
        resetAllModal.style.display = "none";
    });

    var resetPfofilesModal = document.getElementById("resetProfilesModal");
    $("#resetProfilesBtn").on("click", function () {
        resetPfofilesModal.style.display = "block";
    });
    $("#resetProfilesNoBtn").on("click", function () {
        resetPfofilesModal.style.display = "none";
    });
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
        chrome.storage.local.set({ 'proxy': null });
        location.reload();
    });

    $('#exitAppYesBtn').on('click', function () {
        chrome.storage.local.set({ 'license': null });
        window.location.href = "../auth/auth.html";
    });
});

function download(filename, text) { 
    var element = document.createElement('a'); 
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)); 
    element.setAttribute('download', filename); 
    element.style.display = 'none'; 
    document.body.appendChild(element); 
    element.click(); 
    document.body.removeChild(element); 
}

$(function () {
    /*
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
    */
});