var faker = require('faker');
var csvdata = require('csvdata');

function generatePool() {
    var manfs = [];

    for (var i = 0; i < 700; i++) {
        manfs.push([faker.company.companyName()]);
        // console.log(faker.company.companyName());
    }

    console.log(manfs.length);
    csvdata.write('csvs/beers/manfs_pool.csv', manfs, { header: 'manf' });
}

function chooseManfs() {
    var promise = csvdata.load('./csvs/beers/manfs_pool.csv');

    promise.then(function(manfs) {
        console.log(manfs[0].manf);
        var tonOfManfs = [];
        for (var i = 0; i < 5000; i++) {
            var selectedManfObj = manfs[(Math.random() * (0 - manfs.length) + manfs.length).toFixed(0)];
            if (selectedManfObj) {
                tonOfManfs.push([selectedManfObj.manf]);
            }
        }
        console.log(tonOfManfs.length);
        csvdata.write('csvs/beers/manfs.csv', tonOfManfs, { header: 'manf' });
    });
}