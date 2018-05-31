var csvdata = require('csvdata');

var promise = csvdata.load('./csvs/drinkers/drinkers.csv');

promise.then(function(drinkers) {
    var tonOfShares = [];
    for (var i = 0; i < drinkers.length; i++) {
        var share = {
            drinker: drinkers[i].name,
            drinker_profile_id: (i + 1)
        };
        tonOfShares.push(share);
    }
    console.log(tonOfShares.length);
    csvdata.write('csvs/shares/shares.csv', tonOfShares, { header: 'drinker,drinker_profile_id' });
});