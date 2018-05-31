var faker = require('faker');
var csvdata = require('csvdata');

var ratings = [];

for (var i = 0; i < 5500; i++) {
    var probabilityNum = (Math.random() * (1 - 100) + 100).toFixed(0);
    if (probabilityNum > 0 && probabilityNum < 78)
        ratings.push([(Math.random() * (3 - 5) + 5).toFixed(0)]);
    else
        ratings.push([(Math.random() * (1 - 2) + 2).toFixed(0)]);
}

console.log(ratings.length);
console.log(ratings);
csvdata.write('ratings.csv', ratings, { header: 'rating' });