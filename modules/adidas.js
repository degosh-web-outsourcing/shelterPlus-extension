var profile = {
    fname: "Дмитрий",
    sname: "Толмачев",
    city: "Москва",
    zip: "125310",
    address1: "Муравская 32",
    flat: "32",
    email: "dima.tolmachev@gmail.ru",
    phone: "9154771318"
}

let checkExist = setInterval(function () {
    if ($('input[name="firstName"]').length) {
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

        //if (aS.adiSettings['autofill'] == "settingOn") {
        changeValue(document.getElementsByName("firstName")[0], profile.fname);
        changeValue(document.getElementsByName("lastName")[0], profile.sname);
        changeValue(document.getElementsByName("city")[0], profile.city);
        changeValue(document.getElementsByName("zipcode")[0], profile.zip);
        changeValue(document.getElementsByName("address1")[0], profile.address1);
        changeValue(document.getElementsByName("houseNumber")[0], parseInt(profile.address1.match(/\d+/)));
        changeValue(document.getElementsByName("apartmentNumber")[0], parseInt(profile.flat));
        changeValue(document.getElementsByName("emailAddress")[0], profile.email);

        if (profile.phone[1] == "7" || profile.phone[2] == "7") {
            profile.phone = profile.phone[0] + profile.phone[1] + "7" + profile.phone[2] + profile.phone[3] + profile.phone[4] + profile.phone[5] + profile.phone[6] + profile.phone[7] + profile.phone[8] + profile.phone[9];
        }
        changeValue(document.getElementsByName("phoneNumber")[0], profile.phone);

        if ($('[data-auto-id="explicit-consent-checkbox"]:checked').length == 0) {
            $('[type="checkbox"]')[1].click();
        }
        //}

        setTimeout(function () {
            $('[data-auto-id="review-and-pay-button"]').click();
        }, 600);
    }
}, 1000);



if (window.location.pathname.includes("yeezy")) {

    var positiveSizes = new Array();

    chrome.storage.sync.get('adiSettings', function (aS) {
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


let checkExistAddToCart = setInterval(function () {
        if ($('[data-auto-id="glass-checkout-button-right-side"]').length) {
            setTimeout(function () {
                $('[data-auto-id="glass-checkout-button-right-side"]').click();
            }, 500);

            setTimeout(function () {
                $('[data-auto-id="glass-checkout-button-right-side"]').click();
            }, 1000);
        }
}, 200);

/*
if (window.location.origin.includes("yoomoney")) {
    chrome.storage.sync.get('profiles', function (list) {
        for (var i = 0; i < list.profiles.length; i++) {
            if (list.profiles[i].selected == true) {
                var profile = list.profiles[i];
            }
        }

        chrome.storage.sync.get('adiSettings', function (aS) {
            let checkExist = setInterval(function () {
                if ($('input[name="card-number"]').length) {
                    clearInterval(checkExist);

                    const changeValue = (element, value) => {
                        const event = new Event('input', { bubbles: true })
                        element.value = value
                        element.dispatchEvent(event)
                    }

                    if (aS.adiSettings['autofill'] == "settingOn") {
                        changeValue(document.getElementsByName("card-number")[0], profile.cardNumber);
                        changeValue(document.getElementsByName("expiry-month")[0], profile.cardDate[0] + profile.cardDate[1]);
                        changeValue(document.getElementsByName("expiry-year")[0], profile.cardDate[2] + profile.cardDate[3]);
                        changeValue(document.getElementsByName("security-code")[0], profile.cardCVV);
                    }

                    if (aS.adiSettings['autocheckout'] == "settingOn") {
                        setTimeout(function () {
                            $('span[class="MuiButton-label"]').click();
                        }, 1000);
                    }
                }
            }, 100);
        });


    });
}

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

*/