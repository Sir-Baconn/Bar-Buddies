var csvdata = require('csvdata');
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //needs my usual password, removed for doing
    database: 'BBD_test',
    multipleStatements: true
});

var promise = csvdata.load('./csvs/drinkers/drinkers.csv');

promise.then(function(drinkers) {
    // var tonOfFreqs = [];
    // for (var i = 0; i < drinkers.length; i++) {

    // }
    x(drinkers, function(results) {
        console.log(results.length);
        var theEnd = [];
        for (var i = 0; i < results.length; i++) {
            theEnd.push(results[i]);
        }
        console.log(theEnd);
        csvdata.write('csvs/frequents/frequents_test.csv', theEnd, { header: 'drinker,bar' });
    });
});

function x(drinkers, callback) {
    var tonOfFreqs = [];
    var query = "";
    for (var j = 0; j < drinkers.length; j++) {
        query = query + "SELECT name FROM bbd_test.bars WHERE state= '" + drinkers[j].state + "';";
    }
    var q = db.query(query, function(error, results, fields) {
        var t = 0;
        console.log(q.sql);
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            var numBarsFreq = (Math.random() * (2 - 4) + 4).toFixed(0);
            console.log('num of results: ' + results.length);
            for (var j = 0; j < numBarsFreq; j++) {
                var chosenBar = (Math.random() * (0 - (results[t].length - 1)) + (results[t].length - 1)).toFixed(0);
                // console.log('chosenBar: ' + chosenBar);
                // console.log('t is: ' + t);
                // console.log('results[t] length: ' + results[t].length);
                // console.log('results[t]: ' + JSON.stringify(results[t]));
                var obj = {
                    drinker: drinkers[t].name,
                    bar: results[t][chosenBar].name
                }
                tonOfFreqs.push(obj);
            }
            t++;
        }
        return callback(tonOfFreqs);
    });
}