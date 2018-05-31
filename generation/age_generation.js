var faker = require('faker');
var csvdata = require('csvdata');

var ages = [];

for (var i = 0; i < 5500; i++) {
    ages.push([(Math.random() * (18 - 50) + 50).toFixed(0)]);
}

console.log(ages.length);
csvdata.write('ages.csv', ages, { header: 'age' });