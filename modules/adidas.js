const changeValue = (element, value) => {
    var event = new Event('change', { bubbles: true });
    var evnt = new Event('focus');
    var evt = new Event('blur');
    element.value = value;
    element.dispatchEvent(event);
    element.focus();
    element.dispatchEvent(evnt);
    element.blur();
    element.dispatchEvent(evt);
}


chrome.storage.local.get('profiles', function (list) {
    for (var i = 0; i < list.profiles.length; i++) {
        if (list.profiles[i].selected == true) {
            var profile = list.profiles[i];
            chrome.storage.local.get('adiSettings', function (aS) {
                let checkExist = setInterval(function () {
                    if ($('[data-qa-payment-option-preview-type="anyCard"]').length) {
                        $('[data-qa-payment-option-preview-type="anyCard"]').click();
                    }

                    setTimeout(function () {
                        if (aS.adiSettings['adiAutofill'] == "actionBtnOn") {
                            changeValue(document.getElementsByName("card-number")[0], profile.cardNumber);
                            changeValue(document.getElementsByName("expiry-month")[0], profile.expdate[0] + profile.expdate[1]);
                            changeValue(document.getElementsByName("expiry-year")[0], profile.expdate[3] + profile.expdate[4]);
                            changeValue(document.getElementsByName("security-code")[0], profile.cvv);
                        }

                        if (aS.adiSettings['adiAutocheckout'] == "actionBtnOn") {
                            $('span[class="MuiButton-label"]').click();
                        }
                    }, 500);
                }, 500);
            });
        }
    }
});

chrome.storage.local.get('profiles', function (list) {
    chrome.storage.local.get('adiSettings', function (aS) {
        for (var i = 0; i < list.profiles.length; i++) {
            if (list.profiles[i].selected == true) {
                var profile = list.profiles[i];

                if (profile.phone[1] == "7" || profile.phone[2] == "7") {
                    profile.phone = profile.phone[0] + profile.phone[1] + "7" + profile.phone[2] + profile.phone[3] + profile.phone[4] + profile.phone[5] + profile.phone[6] + profile.phone[7] + profile.phone[8] + profile.phone[9];
                }

                let checkExist = setInterval(function () {
                    if (aS.adiSettings['adiAutofill'] == "actionBtnOn") {
                        if ($('input[name="firstName"]').length) {
                            changeValue(document.getElementsByName("firstName")[0], profile.fname);
                            changeValue(document.getElementsByName("lastName")[0], profile.sname);
                            changeValue(document.getElementsByName("city")[0], profile.city);
                            changeValue(document.getElementsByName("zipcode")[0], profile.zip);
                            changeValue(document.getElementsByName("address1")[0], profile.address1);
                            changeValue(document.getElementsByName("houseNumber")[0], parseInt(profile.address1.match(/\d+/)));
                            changeValue(document.getElementsByName("apartmentNumber")[0], parseInt(profile.apt));
                            changeValue(document.getElementsByName("emailAddress")[0], profile.email);
                            changeValue(document.getElementsByName("phoneNumber")[0], profile.phone);
                        }

                        if ($('input[name="shippingAddress.firstName"]').length) {
                            changeValue(document.getElementsByName("shippingAddress.firstName")[0], profile.fname);
                            changeValue(document.getElementsByName("shippingAddress.lastName")[0], profile.sname);
                            changeValue(document.getElementsByName("shippingAddress.city")[0], profile.city);
                            changeValue(document.getElementsByName("shippingAddress.zipcode")[0], profile.zip);
                            changeValue(document.getElementsByName("shippingAddress.address1")[0], profile.address1);
                            changeValue(document.getElementsByName("shippingAddress.houseNumber")[0], parseInt(profile.address1.match(/\d+/)));
                            changeValue(document.getElementsByName("shippingAddress.apartmentNumber")[0], parseInt(profile.apt));
                            changeValue(document.getElementsByName("shippingAddress.emailAddress")[0], profile.email);
                            changeValue(document.getElementsByName("shippingAddress.phoneNumber")[0], profile.phone);
                        }

                        if ($('[data-auto-id="explicit-consent-checkbox"]:checked').length == 0 && window.location.href.includes("delivery")) {
                            $('[type="checkbox"]')[1].click();
                        }


                        if (aS.adiSettings['adiAutocheckout'] == "actionBtnOn") {
                            setTimeout(function () {
                                $('[data-auto-id="review-and-pay-button"]').click();
                            }, 600);
                        }
                    }
                }, 1000);
            }
        }
    });
});

if (window.location.pathname.includes("yeezy")) {
    var positiveSizes = new Array();
    chrome.storage.local.get('adiSettings', function (aS) {
        if (aS.adiSettings) {
            for (var i = 0; i < Object.keys((aS.adiSettings)).length; i++) {
                if (Object.entries(aS.adiSettings)[i][1] == "sizeOn") {
                    if (Object.keys(aS.adiSettings)[i] == "35") {
                        positiveSizes.push("3.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "45") {
                        positiveSizes.push("4.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "55") {
                        positiveSizes.push("5.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "65") {
                        positiveSizes.push("6.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "75") {
                        positiveSizes.push("7.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "85") {
                        positiveSizes.push("8.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "95") {
                        positiveSizes.push("9.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "105") {
                        positiveSizes.push("10.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "115") {
                        positiveSizes.push("11.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "125") {
                        positiveSizes.push("12.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "135") {
                        positiveSizes.push("13.5");
                    } else if (Object.keys(aS.adiSettings)[i] == "145") {
                        positiveSizes.push("14.5");
                    } else {
                        positiveSizes.push(Object.keys(aS.adiSettings)[i]);
                    }
                }
            }
        }
    });

    let checkExist = setInterval(function () {
        if ($('li:contains("UK")').length) {
            clearInterval(checkExist);

            setTimeout(function () {
                clickSize(positiveSizes);
            }, 500);
        }
    }, 100);
}


chrome.storage.local.get('adiSettings', function (aS) {
    if (aS.adiSettings['adiAutocheckout'] == "actionBtnOn") {
        let checkExistAddToCart = setInterval(function () {
            if (aS.adiSettings['adiWaitForAvailability'] != "actionBtnOn") {
                clearInterval(checkExistAddToCart);
            }

            if ($('[data-auto-id="glass-checkout-button-right-side"]').length) {
                setTimeout(function () {
                    $('[data-auto-id="glass-checkout-button-right-side"]').click();
                }, 500);

                setTimeout(function () {
                    $('[data-auto-id="glass-checkout-button-right-side"]').click();
                }, 1000);
            }
        }, 200);
    }
});

function clickSize(array) {
    var size = array[Math.floor(Math.random() * array.length)];
    if ($(`li:contains(" ${size} UK")`).length) {
        $(`li:contains(" ${size} UK")`).click();
        setTimeout(function () {
            $('[data-auto-id="button-add-to-bag"]').click();
        }, 1000);
    } else {
        clickSize(array);
    }
}