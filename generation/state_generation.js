var faker = require('faker');
var csvdata = require('csvdata');

var promise = csvdata.load('./csvs/states_pool.csv');

promise.then(function(states) {
    console.log(states[0].state);
    var tonOfStates = [];
    for (var i = 0; i < 5550; i++) {
        var selectedStateObj = states[(Math.random() * (0 - states.length) + states.length).toFixed(0)];
        if (selectedStateObj) {
            tonOfStates.push([selectedStateObj.state]);
        }
    }
    console.log(tonOfStates.length);
    csvdata.write('csvs/uber_driver/states_final.csv', tonOfStates, { header: 'state' });
});