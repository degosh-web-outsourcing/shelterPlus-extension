chrome.storage.local.get('shopifySettings', function (sS) {
    $(`#shopifyModuleBtnDiv`).attr('class', sS.shopifySettings['shopifyModuleBtnStatus']);
    if (sS.shopifySettings['shopifyModuleBtnStatus'] == "moduleBtnOn") {
        $("#pInsideShopify").html("Автофил включен");
    } else {
        $("#pInsideShopify").html("Автофил выключен");
    }
});

$(document).ready(function () {
    
    $('[id="shopifyModuleBtnDiv"]').on('click', function () {
        if ($(this).attr('class') == 'moduleBtnOff') {
            $(this).attr('class', 'moduleBtnOn');
            $("#pInsideShopify").html("Автофил включен");
            writeSettingsToStorage();
        } else {
            $(this).attr('class', 'moduleBtnOff');
            $("#pInsideShopify").html("Автофил выключен");
            writeSettingsToStorage();
        }
    }); 
});

function writeSettingsToStorage() {
    var settings = {
        'shopifyModuleBtnStatus': $('div[id="shopifyModuleBtnDiv"]').attr('class')
    }

    chrome.storage.local.set({ 'shopifySettings': settings });
}