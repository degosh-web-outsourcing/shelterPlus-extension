let fields = {
    '#checkout_shipping_address_first_name': "Dima",
    '#checkout_shipping_address_last_name': "Tolmachev",
    '#checkout_shipping_address_address1': "Mur",
    '#checkout_shipping_address_address2': "Mur",
    '#checkout_shipping_address_city': "Moscow",
    '#checkout_shipping_address_zip': "90011",
    '#checkout_shipping_address_phone': "9154771318",
    '#checkout_billing_address_first_name': "Dima",
    '#checkout_billing_address_last_name': "Tolmachev",
    '#checkout_billing_address_address1': "Mur",
    '#checkout_billing_address_address2': "Mur",
    '#checkout_billing_address_city': "Moscow",
    '#checkout_billing_address_zip': "90011",
    '#checkout_billing_address_phone': "9154771318",
    '[autocomplete="cc-name"]': "Dima Tolmachev",
    '[autocomplete="cc-number"]': "4242 4242 4242 4242",
    '[autocomplete="cc-exp"]': "0325",
    '[autocomplete="cc-csc"]': "124"
}

Object.keys(fields).forEach(id => {
    fillField(id, fields[id]);
});

fillField('[name="checkout[email_or_phone]"]', "dima.tolmachev@gmail.com", false, true);
fillField('[name="checkout[email]"]', "dima.tolmachev@gmail.com", false, true);
fillField('#checkout_email', "dima.tolmachev@gmail.com", false, true);
fillField('#checkout_email_or_phone', "dima.tolmachev@gmail.com", false, true);

fillField('#checkout_shipping_address_country', "United States", true);
fillField('#checkout_billing_address_country', "United States", true);

fillField('#checkout_shipping_address_province', "CA", true);
fillField('#checkout_billing_address_province', "CA", true);

function fillField(id, value, select = false, smt = false) {
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


/*
$(document).ready(function () {
    let checkExist = setInterval(function () {
        if ($('input[type="email"]').length) {
            clearInterval(checkExist);
            changeValue(document.getElementById("checkout_email_or_phone"), "dima.tolmachev@gmail.com");
            $('input[name="checkout[billing_address][first_name]"]').val('Dmitrii');
            $('input[name="checkout[billing_address][last_name]"]').val('Tolmachev');
            $('input[name="checkout[billing_address][address1]"]').val('Muravskaya St, 38k2');
            $('input[name="checkout[billing_address][address2]"]').val('73');
            $('input[name="checkout[billing_address][zip]"]').val('125310');
            $('input[name="checkout[billing_address][city]"]').val('Moscow');
        }
    }, 100);
});

const changeValue = (element, value) => {
    var event = new Event('change', { bubbles: true });
    var evnt = new Event('focus');
    var evt = new Event('blur');
    element.focus();
    element.dispatchEvent(evnt);
    simulateTyping(element, value, 0);
    element.dispatchEvent(event);
    element.blur();
    element.dispatchEvent(evt);
}

function simulateTyping(element, value, i) {
    if (i < value.length) {
        element.value += value.charAt(i);
        element.dispatchEvent(new Event('change'));
        setTimeout(() => {
            i++;
            simulateTyping(element, value, i);
        }, 1);
    }
}
*/