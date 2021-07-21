chrome.storage.local.get('kithSettings', function (kS) {
    fillField('.product__swatch-select', kS.kithSettings['size']);

    let addToCard = setInterval(function () {
        if ($('[aria-label="Add To Cart"]').length) {
            clearInterval(addToCard);
            $('[aria-label="Add To Cart"]').click();
        }
    }, 100);

    let checkout1 = setInterval(function () {
        if ($('[aria-label="Checkout"]').length) {
            clearInterval(checkout1);
            //$('[aria-label="Checkout"]').click();
            window.location.href = "https://eu.kith.com/pages/international-checkout#Global-e_International_Checkout";
        }
    }, 100);


    chrome.storage.local.get('profiles', function (list) {
        for (var i = 0; i < list.profiles.length; i++) {
            if (list.profiles[i].selected == true && kS.kithSettings['autofill'] == 'actionBtnOn') {
                var profile = list.profiles[i];
                let fields1 = {
                    '#CheckoutData_BillingFirstName': profile.fname,
                    '#CheckoutData_BillingLastName': profile.sname,
                    '#CheckoutData_BillingAddress1': profile.address1,
                    '#CheckoutData_BillingAddress2': profile.address2,
                    '#CheckoutData_Email': profile.email,
                    '#BillingCity': profile.city,
                    '#BillingZIP': profile.zip,
                    '#CheckoutData_BillingPhone': profile.phone,
                    '#cardNum': profile.cardNumber,
                    '#cvdNumber': profile.cvv
                }

                let checkExists = setInterval(() => {
                    if ($('#CheckoutData_BillingFirstName')) {
                        clearInterval(checkExists);
                    }

                    var month = new Number();

                    switch (profile.expdate[0] + profile.expdate[1]) {
                        case "01":
                            month = "1";
                            break;
                        case "02":
                            month = "2";
                            break;
                        case "03":
                            month = "3";
                            break;
                        case "04":
                            month = "4";
                            break;
                        case "05":
                            month = "5";
                            break;
                        case "06":
                            month = "6";
                            break;
                        case "07":
                            month = "7";
                            break;
                        case "08":
                            month = "8";
                            break;
                        case "09":
                            month = "9";
                            break;
                        case "10":
                            month = "10";
                            break;
                        case "11":
                            month = "11";
                            break;
                        case "12":
                            month = "12";
                            break;
                    }

                    fillField('#cardExpiryMonth', parseInt(month), true);
                    fillField('#cardExpiryYear', parseInt("20" + profile.expdate[3] + profile.expdate[4]), true);

                    Object.keys(fields1).forEach(id => {
                        fillField(id, fields1[id]);
                    });

                    if (kS.kithSettings['autocheckout'] == "actionBtnOn") {
                        setTimeout(() => {
                            $('#btnPay').click();
                        }, 1000);
                    }

                }, 1000);
            }
        }
    });
});

function fillField(id, value, select = false) {
    $(`${id}`).val("");
    let element = document.querySelector(id);

    if (element) {
        element.focus();
        element.dispatchEvent(new Event('focus'));
        element.value = value;
        element.dispatchEvent(new Event('change', { bubbles: true }));
        element.blur()
        element.dispatchEvent(new Event('blur'));
    }
}