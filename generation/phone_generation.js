var faker = require('faker');
var csvdata = require('csvdata');

var pNumbers = [];

for (var i = 0; i < 5500; i++) {
    pNumbers.push([faker.phone.phoneNumberFormat(0)]);
}

console.log(pNumbers.length);
csvdata.write('phone_numbers.csv', pNumbers, { header: 'phone' });