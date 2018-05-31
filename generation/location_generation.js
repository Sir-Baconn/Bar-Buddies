var faker = require('faker');
var csvdata = require('csvdata');

var promise = csvdata.load('./csvs/states/Addresses.csv');

promise.then(function(locations) {
    console.log(locations[0]);
    var tonOfLocations = [];
    for (var i = 0; i < 17000; i++) {
        var selectedLocationObj = locations[(Math.random() * (0 - locations.length) + locations.length).toFixed(0)];
        if (selectedLocationObj) {
            var cleanedObj = {
                LON: selectedLocationObj.LON,
                LAT: selectedLocationObj.LAT,
                NUMBER: selectedLocationObj.NUMBER,
                ADDRESS: selectedLocationObj.ADDRESS,
                CITY: selectedLocationObj.CITY,
                STATE: selectedLocationObj.STATE
            };
            tonOfLocations.push(cleanedObj);
        }
    }
    console.log(tonOfLocations.length);
    csvdata.write('csvs/uber_driver/locations_all.csv', tonOfLocations, { header: 'LON,LAT,NUMBER,ADDRESS,CITY,STATE' });
});