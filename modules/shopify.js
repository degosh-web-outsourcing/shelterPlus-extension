chrome.storage.local.get('profiles', function (list) {
    chrome.storage.local.get('shopifySettings', function (sS) {
        for (var i = 0; i < list.profiles.length; i++) {
            if (list.profiles[i].selected == true && sS.shopifySettings['shopifyModuleBtnStatus'] == 'moduleBtnOn') {
                var profile = list.profiles[i];

                let fields = {
                    '#checkout_shipping_address_first_name': profile.fname,
                    '#checkout_shipping_address_last_name': profile.sname,
                    '#checkout_shipping_address_address1': profile.address1,
                    '#checkout_shipping_address_address2': profile.address2,
                    '#checkout_shipping_address_city': profile.city,
                    '#checkout_shipping_address_zip': profile.zip,
                    '#checkout_shipping_address_phone': profile.phone,
                    '#checkout_billing_address_first_name': profile.fname,
                    '#checkout_billing_address_last_name': profile.sname,
                    '#checkout_billing_address_address1': profile.address1,
                    '#checkout_billing_address_address2': profile.address2,
                    '#checkout_billing_address_city': profile.city,
                    '#checkout_billing_address_zip': profile.zip,
                    '#checkout_billing_address_phone': profile.phone,
                    '[autocomplete="cc-name"]': profile.bname,
                    '[autocomplete="cc-number"]': profile.cardNumber,
                    '[autocomplete="cc-exp"]': profile.expdate,
                    '[autocomplete="cc-csc"]': profile.cvv
                }

                Object.keys(fields).forEach(id => {
                    fillField(id, fields[id]);
                });

                fillField('[name="checkout[email_or_phone]"]', profile.email, false, true);
                fillField('[name="checkout[email]"]', profile.email, false, true);
                fillField('#checkout_email', profile.email, false, true);
                fillField('#checkout_email_or_phone', profile.email, false, true);

                fillField('#checkout_shipping_address_country', profile.country, true);
                fillField('#checkout_billing_address_country', profile.country, true);

                if ($(`option:contains("${profile.state}")`).length) {
                    profile.state = $(`option:contains("${profile.state}")`).val();
                }

                fillField('#checkout_shipping_address_province', profile.state, true);
                fillField('#checkout_billing_address_province', profile.state, true);

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
            }
        }
    });
});