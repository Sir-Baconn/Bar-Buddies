var csvdata = require('csvdata');

var promise = csvdata.load('./csvs/drinker_profiles/drinker_profiles_pool2.csv');

var numUsual = 4; //0-4 = 5
var numGenders = 1; //0-1 = 2
var numDrinkTimes = 2; //0-2 = 3

promise.then(function(profiles) {
    var tonOfProfiles = [];
    for (var i = 0; i < 7000; i++) {
        var employment = (Math.random() * (0 - 100) + 100).toFixed(0);
        var profile = {
            stressLevel: profiles[(Math.random() * (0 - numUsual) + numUsual).toFixed(0)].stressLevel,
            jobHours: (employment < 5) ? profiles[numUsual].jobHours : profiles[(Math.random() * (0 - 3) + 3).toFixed(0)].jobHours,
            familyStatus: profiles[(Math.random() * (0 - numUsual) + numUsual).toFixed(0)].familyStatus,
            drinkLevel: profiles[(Math.random() * (0 - numUsual) + numUsual).toFixed(0)].drinkLevel,
            gender: profiles[(Math.random() * (0 - numGenders) + numGenders).toFixed(0)].gender,
            drinkTime: profiles[(Math.random() * (0 - numDrinkTimes) + numDrinkTimes).toFixed(0)].drinkTime,
            personality: profiles[(Math.random() * (0 - numUsual) + numUsual).toFixed(0)].personality,
            money: profiles[(Math.random() * (0 - numUsual) + numUsual).toFixed(0)].money,
            daysBar: profiles[(Math.random() * (0 - numUsual) + numUsual).toFixed(0)].daysBar
        };

        if (profile.drinkLevel === 'alcoholic') {
            profile.daysBar = 5;
        } else if (profile.drinkLevel === 'heavy') {
            profile.daysBar = (Math.random() * (3 - 4) + 4).toFixed(0);
        } else if (profile.drinkLevel === 'moderate') {
            profile.daysBar = (Math.random() * (1 - 3) + 3).toFixed(0);
        } else if (profile.drinkLevel === 'light') {
            profile.daysBar = (Math.random() * (1 - 2) + 2).toFixed(0);
        } else if (profile.drinkLevel === 'very light') {
            profile.daysBar = 1;
        } else {
            console.log('hit here but shouldn\'t have');
        }

        tonOfProfiles.push(profile);
    }


    console.log(tonOfProfiles.length);
    csvdata.write('csvs/drinker_profiles/drinker_profiles.csv', tonOfProfiles, { header: 'stressLevel,jobHours,familyStatus,drinkLevel,gender,drinkTime,personality,money,daysBar' });
});