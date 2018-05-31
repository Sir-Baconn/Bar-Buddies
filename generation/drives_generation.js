var faker = require('faker');
var csvdata = require('csvdata');

const vehiclesLength = 7268;
const uberLength = 5500;
var drives = [];
for (var i = 1; i < uberLength + 1; i++) {
    var obj = {
        uber_driver_id: i,
        vehicle_id: (Math.random() * (0 - vehiclesLength) + vehiclesLength).toFixed(0)
    }
    drives.push(obj);
}

console.log(drives.length);
csvdata.write('csvs/drives/drives.csv', drives, { header: 'uber_driver_id,vehicle_id' });