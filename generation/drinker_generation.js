var faker = require('faker');
var csvdata = require('csvdata');


function generateNames() {
    var names = [];

    for (var i = 0; i < 10000; i++) {
        names.push([faker.name.firstName() + " " + faker.name.lastName()]);
    }

    csvdata.write('csvs/drinkers/names.csv', names, { header: 'name' });
}

function generatePhoneNumbers() {
    var phone_numbers = [];

    for (var i = 0; i < 7050; i++) {
        phone_numbers.push([faker.phone.phoneNumberFormat(0)]);
    }

    csvdata.write('csvs/drinkers/phone_numbers.csv', phone_numbers, { header: 'phone' });
}