var profile = { 'fname': null, 'sname': null, 'email': null, 'phone': null, 'country': null, 'state': null, 'city': null, 'zip': null, 'address1': null, 'address2': null, 'apt': null, 'cardNumber': null, 'expdate': null, 'cvv': null, 'bname': null, 'profileName': null, 'selected': null };
var testProfile = { 'fname': "Игорь", 'sname': "Павлов", 'email': "test@example.com", 'phone': "9155553322", 'country': "Russia", 'state': "Moscow", 'city': "Москва", 'zip': "125310", 'address1': "Ул. Полянка, 25", 'address2': "подъезд 2", 'apt': "75", 'cardNumber': "4242 4242 4242 4242", 'expdate': "0230", 'cvv': "123", 'bname': "Игорь Павлов", 'profileName': "Test" };

$(function () {
    chrome.storage.local.get('profiles', function (list) {
        if (!list.profiles) {
            chrome.storage.local.set({ 'profiles': new Array() });
        } else {
            for (let i = 0; i < list.profiles.length; i++) {
                pushProfile(list.profiles[i]);
            }
        }
    });
});

$(function () {
    $('#go').on('click', function () {
        Object.keys(profile).forEach(id => {
            profile[id] = $(`#${id}`).val();
        });

        pushProfile(profile);
        createProfile(profile);
    });

    $('#test').on('click', function () {
        Object.keys(testProfile).forEach(id => {
            $(`#${id}`).val(testProfile[id]);
        });
    });

    $('#clear').on('click', function () {
        $('input').val("");
    });

    $('input[id="fname"]').on('input', function () {
        if ($('input[id="fname"]').length) {
            $('input[id="bname"]').val($('input[id="fname"]').val());
        }

        if ($('input[id="sname"]').length) {
            let bubble = $('input[id="fname"]').val() + " " + $('input[id="sname"]').val()
            $('input[id="bname"]').val(bubble);
        }
    });

    $('input[id="sname"]').on('input', function () {
        if ($('input[id="sname"]').length) {
            let bubble = $('input[id="fname"]').val() + " " + $('input[id="sname"]').val()
            $('input[id="bname"]').val(bubble);
        }
    });

    document.getElementById('cardNumber').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    });

    document.getElementById('expdate').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').trim();
    });

    document.getElementById('cvv').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').trim();
    });
});

function pushProfile(newProfile) {
    let { profileName, country, cardNumber } = newProfile;
    let cardEnding = cardNumber[15] + cardNumber[16] + cardNumber[17] + cardNumber[18];
    var profilesPlace = document.getElementById("profilesList");

    profilesPlace.insertAdjacentHTML('beforeend', `
            <div id="${profileName}" class="profile">
                <a class="name">${profileName}</a>
                <a class="country">${country}</a>
                <a class="card">${cardEnding}</a>
                <a id="${profileName}" class="trash">[X]</a>
            </div>
        `);

    $('.profile').on('click', function () {
        var remote = $(this).attr('id');
        setTimeout(function () {
            chrome.storage.local.get('profiles', function (list) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if (remote == list.profiles[i].profileName) {
                        readProfile(list.profiles[i]);
                    }
                }
            });
        }, 100);
    });

    $('.trash').on('click', function () {
        var remote = $(this).attr('id');

        setTimeout(function () {
            chrome.storage.local.get('profiles', function (list) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if (list.profiles[i].profileName == remote) {
                        list.profiles.splice(i, 1);
                        $(this).parent().remove();
                        location.reload();
                    }
                }
                chrome.storage.local.set({ 'profiles': list.profiles });
            });
        }, 100);
    });
}

function createProfile(newProfile) {
    chrome.storage.local.get('profiles', function (list) {
        list.profiles.push(newProfile)

        chrome.storage.local.set({ 'profiles': list.profiles });
        console.log(list.profiles)
    });
}

function readProfile(profile) {
    Object.keys(profile).forEach(id => {
        $(`#${id}`).val(profile[id]);
    });
}