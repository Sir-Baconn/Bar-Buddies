var faker = require('faker');
var mysql = require('mysql');
var express = require('express');
var app = express();
var http = require('http');
var htmlparser = require("htmlparser");
var csvdata = require('csvdata');

function test() {
    var promise = csvdata.load('barnames.csv');
    promise.then(function(bars) {
        console.log(bars[0].bar);
        var oneThousandBars = [];
        for (var i = 0; i < 1000; i++) {
            var selectedBarObj = bars[(Math.random() * (0 - bars.length) + bars.length).toFixed(0)];
            if (selectedBarObj) {
                oneThousandBars.push(selectedBarObj.bar);
            }
        }
        var nextPromise = csvdata.load('beernames.csv');
        nextPromise.then(function(beers) {
            // console.log(beers[0].beer);
            console.log(oneThousandBars.length);
            var data = [];
            for (var i = 0; i < 1000; i++) {
                var beersPerBar = [];
                var pricesPerBB = [];
                var pickedBarThreePeat = [];
                for (var j = 0; j < 3; j++) {
                    // console.log(oneThousandBars[i]);
                    pickedBarThreePeat.push([oneThousandBars[i]]);
                    var selectedBeerObj = beers[(Math.random() * (0 - beers.length) + beers.length).toFixed(0)];
                    if (selectedBeerObj) {
                        beersPerBar.push([selectedBeerObj.beer]);
                    }
                    pricesPerBB.push([(Math.random() * (0.01 - 40.00) + 40.00).toFixed(2)]);

                    //just doing this to keep the 3 arrays in scope, do the stuff when its the last index and all data is available
                    if (j == 2) {
                        for (var k = 0; k < 3; k++) {
                            // console.log(pickedBarThreePeat[k] + " - " + beersPerBar[k] + " - " + pricesPerBB[k]);
                            data.push({ bar: pickedBarThreePeat[k], beer: beersPerBar[k], price: pricesPerBB[k] });
                        }
                        // console.log("About to write");
                        // console.log(pickedBarThreePeat);
                        // csvdata.write('sales_test_v2.csv', pickedBarThreePeat, { header: 'bar' });
                        // csvdata.write('sales_test_v2.csv', beersPerBar, { header: 'beer' });
                        // csvdata.write('sales_test_v2.csv', pricesPerBB, { header: 'price' });
                        csvdata.write('sales_test_v2.csv', data, { header: 'bar,beer,price' });
                    }
                }
            }
            // csvdata.write('sales_test_v2.csv', pickedBarThreePeat);
        });
    });
    // console.log(csvdata.load('beernames.csv')[0]);
}

test();