chrome.storage.local.get('kithSettings', function (kS) {
    fillField('.product__swatch-select', kS.kithSettings['size']);

    let addToCard = setInterval(function () {
        if ($('[aria-label="Add To Cart"]').length) {
            clearInterval(addToCard);
            $('[aria-label="Add To Cart"]').click();
        }
    }, 100);

    if (kS.kithSettings['autocheckout'] == 'actionBtnOn') {
        let checkout1 = setInterval(function () {
            if ($('[aria-label="Checkout"]').length) {
                clearInterval(checkout1);
                $('[aria-label="Checkout"]').click();
            }
        }, 100);
    }

});

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

            if (profile.expade[0] == "1") {
                fillField('#cardExpiryMonth', profile.expdate[0] + profile.expdate[1], true);
            } else {
                fillField('#cardExpiryMonth', profile.expdate[1], true);
            }

            fillField('#cardExpiryYear', "20" + profile.expdate[3] + profile.expdate[4], true);

            Object.keys(fields1).forEach(id => {
                fillField(id, fields1[id]);
            });
        }
    }
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