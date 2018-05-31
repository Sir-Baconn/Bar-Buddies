var faker = require('faker');
var csvdata = require('csvdata');

var promise = csvdata.load('./csvs/beers/beernames.csv');

promise.then(function(beers) {
    var promise2 = csvdata.load('./csvs/drinkers/drinkers.csv');
    promise2.then(function(drinkers) {
        var tonOfLikes = [];
        for (var i = 0; i < drinkers.length; i++) {
            var numBeersLiked = (Math.random() * (3 - 6) + 6).toFixed(0);
            for (var j = 0; j < numBeersLiked; j++) {
                var selectedBeerObj = beers[(Math.random() * (0 - beers.length) + beers.length).toFixed(0)];
                if (selectedBeerObj) {
                    var likes = {
                        drinker: drinkers[i].name,
                        beer: selectedBeerObj.beer
                    };
                    tonOfLikes.push(likes);
                }
            }
        }
        console.log(tonOfLikes.length);
        csvdata.write('csvs/likes/likes_test.csv', tonOfLikes, { header: 'drinker,beer' });
    });
});