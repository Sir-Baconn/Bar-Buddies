// var faker = require('faker');
// var mysql = require('mysql');
// var express = require('express');
// var app = express();
// var http = require('http');
// var htmlparser = require("htmlparser");
// var csvdata = require('csvdata');

// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '', //needs my usual password, removed for doing
//     database: 'BBD_test'
// });


// var query = 'INSERT INTO drinkers (name, city, phone, address) VALUES ?';
// var drinkers = [];

// console.time("test");

// for (var i = 0; i < 500; i++) {
//     drinkers.push([faker.name.findName(), faker.address.city(), faker.phone.phoneNumberFormat(0), faker.address.streetAddress()]);
// }

// db.query(query, [drinkers], function(error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

// db.end();

// console.log("donezo ez");
// console.timeEnd("test");

// //Generate random drinkers
// function generateDrinkers(numDrinkers) {
//     var query = 'INSERT INTO drinkers (name, city, phone, address) VALUES ?';
//     var drinkers = [];

//     for (var i = 0; i < numDrinkers; i++) {
//         drinkers.push([faker.name.findName(), faker.address.city(), faker.phone.phoneNumberFormat(0), faker.address.streetAddress()]);
//     }

//     db.query(query, [drinkers], function(error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });
// }

// //Generate random bars
// function generateBars(numBars) {
//     var query = 'INSERT INTO bars (name, city, phone, address) VALUES ?';
//     var bars = [];

//     for (var i = 0; i < numDrinkers; i++) {
//         bars.push([faker.random.word(), faker.address.city(), faker.phone.phoneNumberFormat(0), faker.address.streetAddress()]);
//     }

//     db.query(query, [bars], function(error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });
// }

//Generate random beers doesn't really generate but this is how I got real beers about 1.5k
//I google searched beer list, got a list and got the html from that page, used an site
//that converts html to csv so I input the html table structure containing all the beers
//into the site and got the csv, this was mandatory because the beer list was 2 columns
//instead of just a single column so I could not just copy paste - took the csv and made
//the 2 columns into 1 and copy pasted that into mysql
// function getHTMLFromBeersSite() {
//     var options = {
//         host: 'www.thebeerguy.ca',
//         port: 80,
//         path: '/alphabetical_beer'
//     };

//     var data = "";

//     http.get(options, function(res) {
//         console.log("Got response: " + res);

//         // this event fires many times, each time collecting another piece of the response
//         res.on("data", function(chunk) {
//             // append this chunk to our growing `data` var
//             data += chunk;
//         });

//         // this event fires *one* time, after all the `data` events/chunks have been gathered
//         res.on("end", function() {
//             // you can use res.send instead of console.log to output via express
//             // console.log(data);
//         });
//     }).on('error', function(e) {
//         console.log("Got error: " + e.message);
//     });

//     var handler = new htmlparser.DefaultHandler(function(error, dom) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(dom);
//         }
//     });

//     var parser = new htmlparser.Parser(handler);
//     console.log(data);
//     parser.parseComplete(data);
// }

// function generateExtraBeers(num) {
//     var query = 'INSERT INTO beernames (beer) VALUES ?';
//     var beers = [];

//     for (var i = 0; i < num; i++) {
//         beers.push([faker.random.word()]);
//     }

//     db.query(query, [uniqBeersAsObjects], function(error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });
// }

// function generateExtraBeersCSV() {
//     var beers = [];

//     for (var i = 0; i < 1285; i++) {
//         beers.push([faker.random.word()]);
//     }

//     csvdata.write('out2.csv', beers, { header: 'beer names' });
// }

// function generateRandomPriceCSV() {
//     var prices = [];

//     for (var i = 0; i < 1285; i++) {
//         // console.log(faker.commerce.price(1.00, 100.00, 2, '$'));
//         prices.push([(Math.random() * (0.01 - 100.00) + 100.00).toFixed(2)]);
//     }

//     csvdata.write('price.csv', prices, { header: 'price' });
// }

// generateRandomPriceCSV();