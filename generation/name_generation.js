var faker = require('faker');
var csvdata = require('csvdata');

var promise = csvdata.load('names.csv');

promise.then(function(names) {
    console.log(names[0].name);
    var tonOfNames = [];
    for (var i = 0; i < 5500; i++) {
        var selectedNameObj = names[(Math.random() * (0 - names.length) + names.length).toFixed(0)];
        if (selectedNameObj) {
            tonOfNames.push([selectedNameObj.name]);
        }
    }
    console.log(tonOfNames.length);
    csvdata.write('names_final.csv', tonOfNames, { header: 'name' });
});