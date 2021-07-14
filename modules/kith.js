fillField('.product__swatch-select', "7");

let addToCard = setInterval(function () {
    if ($('[aria-label="Add To Cart"]').length) {
        clearInterval(addToCard);
        $('[aria-label="Add To Cart"]').click();
    }
}, 100);

let checkout1 = setInterval(function () {
    if ($('[aria-label="Checkout"]').length) {
        clearInterval(checkout1);
        $('[aria-label="Checkout"]').click();
    }
}, 100);

let fields1 = {
    '#CheckoutData_BillingFirstName': "Dima",
    '#CheckoutData_BillingLastName': "Tolmachev",
    '#CheckoutData_BillingAddress1': "Mur",
    '#CheckoutData_BillingAddress2': "Mur",
    '#CheckoutData_Email': "dima.tolmachev@gmail.com",
    '#BillingCity': "Moscow",
    '#BillingZIP': "90011",
    '#CheckoutData_BillingPhone': "9154771318",
    '#cardNum': "4242 4242 4242 4242",
    '#cvdNumber': "124"
}

fillField('#cardExpiryMonth', "3", true);
fillField('#cardExpiryYear', "2025", true);

Object.keys(fields1).forEach(id => {
    fillField(id, fields1[id]);
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