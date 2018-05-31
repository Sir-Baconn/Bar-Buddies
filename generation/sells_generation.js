var csvdata = require('csvdata');

var promise = csvdata.load('./csvs/bars/bars.csv');

promise.then(function(bars) {
    console.log(bars[0].bar);
    var promise2 = csvdata.load('./csvs/beers/beers.csv');
    promise2.then(function(beers) {
        var tonOfSells = [];
        console.log(beers[0].beer);
        for (var i = 0; i < bars.length; i++) {
            var numSells = (Math.random() * (2 - 5) + 5).toFixed(0);
            for (var j = 0; j < numSells; j++) {
                var selectedBeerObj = beers[(Math.random() * (0 - beers.length) + beers.length).toFixed(0)];
                if (selectedBeerObj) {
                    // If first iteration, push the top 3 beers into sells for that bar so each bar has 3 of the same beer
                    if (j === 0) {
                        var popSells1 = {
                            bar: bars[i].bar,
                            beer: "Budwesier",
                            price: (Math.random() * (5.00 - 8.00) + 8.00).toFixed(2)
                        };
                        var popSells2 = {
                            bar: bars[i].bar,
                            beer: "Heineken",
                            price: (Math.random() * (5.00 - 8.00) + 8.00).toFixed(2)
                        };
                        var popSells3 = {
                            bar: bars[i].bar,
                            beer: "Coors Light",
                            price: (Math.random() * (5.00 - 8.00) + 8.00).toFixed(2)
                        };
                        tonOfSells.push(popSells1);
                        tonOfSells.push(popSells2);
                        tonOfSells.push(popSells3);
                    }
                    var sells = {
                        bar: bars[i].bar,
                        beer: selectedBeerObj.beer,
                        price: (Math.random() * (2.00 - 15.00) + 15.00).toFixed(2)
                    };
                    tonOfSells.push(sells);
                }
            }
        }
        console.log(tonOfSells.length);
        csvdata.write('csvs/sells/sells_test.csv', tonOfSells, { header: 'bar,beer,price' });
    });
});