var profile = { 'fname': null, 'sname': null, 'email': null, 'phone': null, 'country': null, 'state': null, 'city': null, 'zip': null, 'address1': null, 'address2': null, 'flat': null, 'cardNumber': null, 'cardDate': null, 'cardCVV': null, 'cardName': null, 'profileName': null, 'dTag': null, 'tTag': null, 'selected': null };
var testProfile = { 'fname': "Игорь", 'sname': "Павлов", 'email': "test@example.com", 'phone': "9155553322", 'country': "Russia", 'state': "Moscow", 'city': "Москва", 'zip': "125310", 'address1': "Ул. Полянка, 25", 'address2': "подъезд 2", 'apt': "75", 'cardNumber': "4242 4242 4242 4242", 'expdate': "0230", 'cvv': "123", 'bname': "Igor Pavlov", 'profileName': "Test" };

$(function () {
    $('#test').on('click', function() {
        Object.keys(testProfile).forEach(id => {
            $(`#${id}`).val(testProfile[id]);
        });
    });

    $('#clear').on('click', function() {
        $('input').val("");
    });
});