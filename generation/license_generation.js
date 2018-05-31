var faker = require('faker');
var csvdata = require('csvdata');

//need 2 letters followed by 5 numbers

var licenses = [];
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];

for (var i = 0; i < 3087; i++) {
    licenses.push([letters[(Math.random() * (0 - letters.length) + letters.length).toFixed(0)] + "" + letters[(Math.random() * (0 - letters.length) + letters.length).toFixed(0)] + "" + (Math.random() * (0 - 9) + 9).toFixed(0) + "" + (Math.random() * (0 - 9) + 9).toFixed(0) + "" + (Math.random() * (0 - 9) + 9).toFixed(0) + "" + (Math.random() * (0 - 9) + 9).toFixed(0) + "" + (Math.random() * (0 - 9) + 9).toFixed(0)]);
}


console.log(licenses.length);
csvdata.write('csvs/bars/licenses.csv', licenses, { header: 'license' });