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

$(function () {
    $("#resetProfilesBtn").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
    });

    $("#resetAllBtn").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
        chrome.storage.local.set({ 'adiSettings': null });
        chrome.storage.local.set({ 'kithSettings': null });
        chrome.storage.local.set({ 'kithSettings': null });
        chrome.storage.local.set({ 'shopifySettings': null });
        chrome.storage.local.set({ 'proxyHttps': null });
        location.reload();
    });

    $('#impEverythingBtn').on('click', function () {
        $('#upload').click();

        const input = document.getElementById('upload');
        input.addEventListener('change', function (e) {
            const reader = new FileReader();

            reader.onload = function () {
                let allData = reader.result.substring(1);
                allData = allData.substring(0, allData.length - 1);

                let pr = JSON.parse((allData.split(',{"adiSettings":')[0]));
                let other = allData.split(',{"adiSettings":')[1];

                let adi = JSON.parse(other.split('},{"kithSettings":')[0]);

                other = other.split('},{"kithSettings":')[1];

                let ki = JSON.parse(other.split('},{"shopifySettings')[0]);

                other = other.split('},{"shopifySettings":')[1];

                let sh = other;
                sh = sh.substring(0, sh.length - 1);

                let prUpdate = new Array();
                for (var i = 0; i < pr.profiles.length; i++) {
                    prUpdate.push(pr.profiles[i]);
                }
                
                chrome.storage.local.set({ 'profiles': prUpdate });
                chrome.storage.local.set({ 'adiSettings': adi });
                chrome.storage.local.set({ 'kithSettings': ki });
                chrome.storage.local.set({ 'shopifySettings': sh });
            }

            reader.readAsText(input.files[0]);
        });
    });

    $('#expEverytingBtn').on('click', function () {
        chrome.storage.local.get("profiles", function (obj) {
            chrome.storage.local.get('adiSettings', function (aS) {
                chrome.storage.local.get('kithSettings', function (kS) {
                    chrome.storage.local.get('shopifySettings', function (sS) {
                        let arr = new Array();
                        arr.push(obj);
                        arr.push(aS);
                        arr.push(kS);
                        arr.push(sS);
                        download("shelterPlusExtension.txt", JSON.stringify(arr));
                    });
                });
            });
        });
    });

    $('#exitAppBtn').on('click', function () {
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


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}