var mysql = require('mysql');
var csvdata = require('csvdata');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //needs my usual password, removed for submission
    database: 'BBD_test'
});

function test(callback) {
    var currentBBQuery = 'SELECT bar, beer FROM sells';
    db.query(currentBBQuery, function(err, result) {
        if (err) throw error;
        return callback(result);
    });
}

test(function(currentData) {
    console.log(currentData[0].bar);
    var promise = csvdata.load('barnames.csv');
    promise.then(function(bars) {
        var selectedBar = bars[(Math.random() * (0 - bars.length) + bars.length).toFixed(0)].bar;
        var nextPromise = csvdata.load('beernames.csv');
        nextPromise.then(function(beers) {
            var selectedBeer = beers[(Math.random() * (0 - beers.length) + beers.length).toFixed(0)].beer;
            var price = (Math.random() * (0.01 - 40.00) + 40.00).toFixed(2);

            //Assertion implemented here: bar,beer --> price
            for (var i = 0; i < currentData.length; i++) {
                if (currentData[i].bar === selectedBar && currentData[i].beer === selectedBeer) {
                    console.log("REJECT");
                    return 'REJECT';
                }
            }

            console.log("ACCEPT");

            //return 'ACCEPT';
            //end assertion

            //The insert would happen here if accepted
            var query = 'INSERT INTO sells SET ?';
            var data = {
                bar: selectedBar,
                beer: selectedBeer,
                price: Number(price)
            };

            var queryDone = db.query(query, data, function(error, results, fields) {
                console.log(queryDone.sql);
                if (error) throw error;
                console.log(results);
            });

        });
    });
});

// db.end();