var bodyParser = require('body-parser');
var express = require('express');
var dist = require('./public/js/distance');
var mysql = require('mysql');
var app = express();
var session = require('express-session');

var database = require('./node/database');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'the memes will be memes'
}));

// GET /
app.get('/', function(req, res, next) {
    database.startConnection();
    res.render('index');
});

// GET /drink_together
app.get('/drink_together', function(req, res, next) {
    //console.log(dist.cost(5, "X"));
    database.startConnection();
    database.getDrinkers(function(resultDrinkers) {
        res.render('drink_together', {
            drinkers: resultDrinkers
        });
    });

});

var drinkerA;

app.post('/drink_together', function(req, res, next) {
    //Retrieve the data via req.body forms, insert into distance function

    if (req.body.friend) {
        // console.log(req.body);
        // console.log('drinkerA: ' + drinkerA);
        database.getDrinkerLocation(drinkerA, function(drinkerALocation) {
            // console.log('drinkerALocation: ' + drinkerALocation[0]);
            var user1 = {
                "name": drinkerA,
                "lon": drinkerALocation[0].lon,
                "lat": drinkerALocation[0].lat,
                "state": drinkerALocation[0].state
            }
            database.getUberDriverLocation(drinkerALocation[0].state, function(uberDriverLocation) {
                // console.log('uberDriverLocation: ' + uberDriverLocation[0]);
                var user1min;
                var user1mileage;

                var uberdriver1;

                var ubermin = 999999999;
                var tempmin;

                var counter = 0;
                for (var i = 0; i < uberDriverLocation.length; i++) {
                    tempmin = ubermin;
                    ubermin = Math.min(999999999, dist.distance(drinkerALocation[0].lat, drinkerALocation[0].lon, uberDriverLocation[i].lat, uberDriverLocation[i].lon, "M"));
                    if (ubermin < tempmin) {
                        uberdriver1 = {
                            "id": uberDriverLocation[i].id,
                            "lon": uberDriverLocation[i].lon,
                            "lat": uberDriverLocation[i].lat
                        };
                    }
                    counter++;
                }

                user1min = ubermin;
                user1mileage = ubermin;
                // console.log('Distance in miles: ' + ubermin);

                database.getDrinkerLocation(req.body.friend, function(drinkerBLocation) {
                    // console.log('drinkerBLocation: ' + drinkerBLocation[0]);

                    var user2 = {
                        "name": req.body.friend,
                        "lon": drinkerBLocation[0].lon,
                        "lat": drinkerBLocation[0].lat
                    };

                    database.getUberDriverLocation(drinkerALocation[0].state, function(uberDriverLocation2) {
                        // console.log('uberDriverLocation2: ' + uberDriverLocation2[0]);

                        var ubermin = 999999999;
                        var tempmin;

                        var user2mileage;
                        var user2min;

                        var uberdriver2;

                        var counter = 0;
                        for (var i = 0; i < uberDriverLocation2.length; i++) {
                            tempmin = ubermin;
                            ubermin = Math.min(999999999, dist.distance(user2.lat, user2.lon, uberDriverLocation2[i].lat, uberDriverLocation2[i].lon, "M"));
                            if (ubermin < tempmin) {
                                uberdriver2 = {
                                    "id": uberDriverLocation2[i].id,
                                    "lon": uberDriverLocation2[i].lon,
                                    "lat": uberDriverLocation2[i].lat
                                }
                            }
                            counter++;
                        }
                        // console.log("HELLO", ubermin);
                        user2mileage = ubermin;
                        user2min = ubermin;
                        //console.log(counter);
                        // console.log('Distance in miles: ' + ubermin);

                        var uberdriver;
                        var mainuser;

                        if (user1min > user2min) {
                            mainuser = user2;
                            ubermin = user2min;
                            uberdriver = uberdriver2;
                        } else {
                            mainuser = user1;
                            ubermin = user1min;
                            uberdriver = uberdriver1;
                        }

                        database.getUberDriverDetails(uberdriver.id, function(uberDriverDetails) {
                            database.getBarDetails(drinkerALocation[0].state, function(barRes) {

                                var min = 999999999;
                                var tempmin;

                                var bar;

                                var counter = 0;
                                for (var i = 0; i < barRes.length; i++) {
                                    tempmin = min;
                                    min = Math.min(999999999, dist.distance(mainuser.lat, mainuser.lon, barRes[i].lat, barRes[i].lon, "M"));
                                    if (min < tempmin) {
                                        bar = {
                                            "name": barRes[i].name,
                                            "lon": barRes[i].lon,
                                            "lat": barRes[i].lat
                                        }
                                    }
                                    counter++;
                                }

                                var cost = dist.cost(user1mileage + user2mileage + min, dist.type(uberDriverDetails[0].make, uberDriverDetails[0].model, uberDriverDetails[0].color, uberDriverDetails[0].year));
                                // console.log('Ride cost: ', dist.cost(user1mileage + user2mileage + min, dist.type(uberDriverDetails[0].make, uberDriverDetails[0].model, uberDriverDetails[0].color, uberDriverDetails[0].year)));
                                res.render('drink_together_result', {
                                    driver: uberDriverDetails[0],
                                    bar: bar,
                                    cost: cost.toFixed(2)
                                });
                            });
                        });
                    });
                });
            });;
        });
    }else if(req.body.freqFriend){
        database.getDrinkerLocation(drinkerA, function(drinkerALocation) {
            var user1 = {
                "name": drinkerA,
                "lon": drinkerALocation[0].lon,
                "lat": drinkerALocation[0].lat,
                "state": drinkerALocation[0].state
            }
            database.getUberDriverLocation(drinkerALocation[0].state, function(uberDriverLocation) {
                var user1min;
                var user1mileage;

                var uberdriver1;

                var ubermin = 999999999;
                var tempmin;

                var counter = 0;
                for (var i = 0; i < uberDriverLocation.length; i++) {
                    tempmin = ubermin;
                    ubermin = Math.min(999999999, dist.distance(drinkerALocation[0].lat, drinkerALocation[0].lon, uberDriverLocation[i].lat, uberDriverLocation[i].lon, "M"));
                    if (ubermin < tempmin) {
                        uberdriver1 = {
                            "id": uberDriverLocation[i].id,
                            "lon": uberDriverLocation[i].lon,
                            "lat": uberDriverLocation[i].lat
                        };
                    }
                    counter++;
                }

                user1min = ubermin;
                user1mileage = ubermin;

                database.getDrinkerLocation(req.body.freqFriend, function(drinkerBLocation) {

                    var user2 = {
                        "name": req.body.freqFriend,
                        "lon": drinkerBLocation[0].lon,
                        "lat": drinkerBLocation[0].lat
                    };

                    database.getUberDriverLocation(drinkerALocation[0].state, function(uberDriverLocation2) {

                        var ubermin = 999999999;
                        var tempmin;

                        var user2mileage;
                        var user2min;

                        var uberdriver2;

                        var counter = 0;
                        for (var i = 0; i < uberDriverLocation2.length; i++) {
                            tempmin = ubermin;
                            ubermin = Math.min(999999999, dist.distance(user2.lat, user2.lon, uberDriverLocation2[i].lat, uberDriverLocation2[i].lon, "M"));
                            if (ubermin < tempmin) {
                                uberdriver2 = {
                                    "id": uberDriverLocation2[i].id,
                                    "lon": uberDriverLocation2[i].lon,
                                    "lat": uberDriverLocation2[i].lat
                                }
                            }
                            counter++;
                        }
                        user2mileage = ubermin;
                        user2min = ubermin;

                        var uberdriver;
                        var mainuser;

                        if (user1min > user2min) {
                            mainuser = user2;
                            ubermin = user2min;
                            uberdriver = uberdriver2;
                        } else {
                            mainuser = user1;
                            ubermin = user1min;
                            uberdriver = uberdriver1;
                        }

                        database.getUberDriverDetails(uberdriver.id, function(uberDriverDetails) {
                            database.getBarsSharedByFrequents(drinkerA, req.body.freqFriend, function(barRes) {

                                var min = 999999999;
                                var tempmin;

                                var bar;

                                var counter = 0;

                                for (var i = 0; i < barRes.length; i++) {
                                    tempmin = min;
                                    min = Math.min(999999999, dist.distance(mainuser.lat, mainuser.lon, barRes[i].lat, barRes[i].lon, "M"));
                                    if (min < tempmin) {
                                        bar = {
                                            "name": barRes[i].name,
                                            "lon": barRes[i].lon,
                                            "lat": barRes[i].lat
                                        }
                                    }
                                    counter++;
                                }

                                var cost = dist.cost(user1mileage + user2mileage + min, dist.type(uberDriverDetails[0].make, uberDriverDetails[0].model, uberDriverDetails[0].color, uberDriverDetails[0].year));
                                
                                res.render('drink_together_result', {
                                    driver: uberDriverDetails[0],
                                    bar: bar,
                                    cost: cost.toFixed(2)
                                });
                            });
                        });
                    });
                });
            });;
        });
    }

    if (req.body.drinker) {
        drinkerA = req.body.drinker;
        database.getState(req.body.drinker, function(state) {
            var stateText = state;
            database.getBarsInState(stateText[0].state, function(bars) {
                database.getDrinkersInState(stateText[0].state, function(drinkers) {
                    database.getDrinkersThatShareFrequents(req.body.drinker, function(freqDrinkers){
                        var obj = {
                            bars: bars,
                            drinkers: drinkers,
                            freqDrinkers: freqDrinkers
                        }
                        res.send(obj);
                    });
                });
            });
        });
        // res.send('hey');
    }
    var mi = dist.distance();
});

// GET /drink
app.get('/drink', function(req, res, next) {
    // res.render('drink');
    database.getBarsSharedByFrequents('Aaliyah Conn', 'Alexandrea Hammes', function(bars){
        res.send(bars);
    });
});

app.post('/drink', function(req, res, next) {

});

app.get('/find_drinkers_start', function(req, res, next) {
    if (req.body.drinker) {

    }else if(req.query.retry){
        database.getState(req.query.retry, function(state){
            database.getAllStates(function(states){
                database.getDrinkersInState(state[0].state, function(drinkers) {
                    res.render('find_drinkers_start', {
                        drinkers: drinkers,
                        drinkerYou: req.query.retry,
                        drinkerState: state[0].state,
                        states: states
                    });
                });
            });
        });
    }else {
        database.getAllStates(function(states){
            database.getDrinkers(function(drinkers) {
                res.render('find_drinkers_start', {
                    drinkers: drinkers,
                    drinkerYou: null,
                    drinkerState: null,
                    states: states
                });
            });
        });
    }
});
var drinkerMatchA;
app.post('/find_drinkers_start', function(req, res, next) {
    if(req.body.state){
        database.getDrinkersInState(req.body.state, function(drinkers) {
            var obj = {
                drinkers: drinkers
            }
            res.send(obj);
        });
    }else if(req.body.drinker && !req.session.drinkerMatchA){
        // req.session.drinkerMatchA = req.body.drinker;
        drinkerMatchA = req.body.drinker;
    }
});

// GET /find_drinkers
app.get('/find_drinkers', function(req, res, next) {
    if (req.body.drinker) {

    } else {
        database.getAllStates(function(states){
            database.getDrinkers(function(drinkers) {
                res.render('find_drinkers_start', {
                    drinkers: drinkers,
                    states: states
                });
            });
        });
    }
});

app.post('/find_drinkers', function(req, res, next) {
    var differences = [];
    var commonalities = [];

    database.getNumBeersMatched(req.body.drinkerThey, drinkerMatchA, function(numBeers) {
        database.getNumBarsMatched(req.body.drinkerThey, drinkerMatchA, function(numBars) {
            database.getDrinkerProfile(req.body.drinkerThey, function(profileOtherRaw) {
                database.getDrinkerProfile(drinkerMatchA, function(profileMeRaw) {
                    var beers = numBeers;
                    var bars = numBars;
                    var profileOther = profileOtherRaw;
                    var profileMe = profileMeRaw;
                    if (profileOther[0].stressLevel !== profileMe[0].stressLevel) {
                        if (profileOther[0].stressLevel === 'none') {
                            differences.push('stress free');
                        } else {
                            differences.push(profileOther[0].stressLevel + ' stress level');
                        }
                    } else {
                        if (profileOther[0].stressLevel === 'none') {
                            commonalities.push('stress free');
                        } else {
                            commonalities.push(profileOther[0].stressLevel + ' stress level');
                        }
                    }
                    if (profileOther[0].jobHours !== profileMe[0].jobHours) {
                        if (profileOther[0].jobHours === 0) {
                            differences.push('unemployed');
                        } else {
                            differences.push('works ' + profileOther[0].jobHours + ' hours/week');
                        }
                    } else {
                        if (profileOther[0].jobHours === 0) {
                            commonalities.push('unemployed');
                        } else {
                            commonalities.push('works ' + profileOther[0].jobHours + ' hours/week');
                        }
                    }
                    if (profileOther[0].familyStatus !== profileMe[0].familyStatus) {
                        if (profileOther[0].familyStatus === 'none') {
                            differences.push('no family');
                        } else {
                            differences.push(profileOther[0].familyStatus);
                        }
                    } else {
                        if (profileOther[0].familyStatus === 'none') {
                            commonalities.push('no family');
                        } else {
                            commonalities.push(profileOther[0].familyStatus);
                        }
                    }
                    if (profileOther[0].drinkLevel !== profileMe[0].drinkLevel) {
                        if (profileOther[0].drinkLevel === 'alcoholic') {
                            differences.push(profileOther[0].drinkLevel);
                        } else {
                            differences.push(profileOther[0].drinkLevel + " drinker");
                        }
                    } else {
                        if (profileOther[0].drinkLevel === 'alcoholic') {
                            commonalities.push(profileOther[0].drinkLevel);
                        } else {
                            commonalities.push(profileOther[0].drinkLevel + " drinker");
                        }
                    }
                    if (profileOther[0].gender !== profileMe[0].gender) {
                        differences.push(profileOther[0].gender);
                    } else {
                        commonalities.push(profileOther[0].gender);
                    }
                    if (profileOther[0].drinkTime !== profileMe[0].drinkTime) {
                        if (profileOther[0].drinkTime === 'any') {
                            differences.push(profileOther[0].drinkTime + ' time bar go-er');
                        } else {
                            differences.push(profileOther[0].drinkTime + ' bar go-er');
                        }
                    } else {
                        if (profileOther[0].drinkTime === 'any') {
                            commonalities.push(profileOther[0].drinkTime + ' time bar go-er');
                        } else {
                            commonalities.push(profileOther[0].drinkTime + ' bar go-er');
                        }
                    }
                    if (profileOther[0].personality !== profileMe[0].personality) {
                        differences.push(profileOther[0].personality);
                    } else {
                        commonalities.push(profileOther[0].personality);
                    }
                    if (profileOther[0].money !== profileMe[0].money) {
                        differences.push(profileOther[0].money);
                    } else {
                        commonalities.push(profileOther[0].money);
                    }
                    var daysDiff = Math.abs(profileOther[0].daysBar - profileMe[0].daysBar);
                    if(daysDiff === 0 || daysDiff === 1){
                        if(daysDiff === 1)
                            commonalities.push('bar\'s ' + profileOther[0].daysBar + ' day/week');
                        else
                            commonalities.push('bar\'s ' + profileOther[0].daysBar + ' days/week');
                    }else{
                        if(daysDiff === 1)
                            differences.push('bar\'s ' + profileOther[0].daysBar + ' day/week');
                        else
                            differences.push('bar\'s ' + profileOther[0].daysBar + ' days/week');
                    }
                    res.render('find_drinkers', {
                        drinker: req.body.drinkerThey,
                        drinkerYou: drinkerMatchA,
                        numBeers: beers[0].beers,
                        numBars: bars[0].bars,
                        commonalities: commonalities,
                        differences: differences,
                        gender: profileOther[0].gender
                    });
                });
            });
        });
    });
});

// GET /find_drinkers/add_drinker_circle
app.get('/find_drinkers/add_drinker_circle', function(req, res, next) {
    // console.log('req.body: ' + JSON.stringify(req.body));
    if (req.query.drinker) {
        // console.log('ayyy');
        // console.log(req.query.drinker);
    } else {
        // console.log('THE DRINKER: ' + req.query.retry);
        database.getDrinkers(function(drinkers) {
            res.redirect('/find_drinkers');
        });
    }
});

// GET /data
app.get('/data', function(req, res, next) {
    database.getAllBars(function(bars){
        database.getPercentagesOfBarsCommonBeers(function(results){
            if(req.session.freqVer === true){
                req.session.freqVer = false;
                res.render('data', {
                    bars: bars,
                    pieData: results,
                    freqVer: true,
                    freqVerFailed: ''
                });
            }else if(req.session.freqVerFailed === true){
                req.session.freqVerFailed = false;
                res.render('data', {
                    bars: bars,
                    pieData: results,
                    freqVer: '',
                    freqVerFailed: true
                });
            }else{
                res.render('data', {
                    bars: bars,
                    pieData: results,
                    freqVer: '',
                    freqVerFailed: ''
                });
            }
        });
    });
    // res.render('data');
});

app.post('/data', function(req, res, next) {
    if(req.body.bar){
        database.getSellsOfBar(req.body.bar, function(sells){
            var obj = {
                sells: sells
            };
            res.send(obj);
        });
    }else if(req.body.submit){
        database.verifyFrequentsPattern(function(result){
            if(result[0].result === 1){
                req.session.freqVer = true;
                res.redirect('/data');
            }else{
                req.session.freqVerFailed = true;
                res.redirect('/data');
            }
        });
    }
});

// GET /add_yourself
app.get('/add_yourself', function(req, res, next) {
    if(req.query.valid === 'false'){
        if(req.session.name === ''){
            res.render('add_yourself', {
                validDrinker: false,
                name: '',
                phone: ''
            });
        }else{
            // console.log('session stuff');
            // console.log(req.session.name);
            // console.log(req.session.phone);
            var name = req.session.name;
            var phone = req.session.phone;
            req.session.name = '';
            req.session.phone = '';
            res.render('add_yourself', {
                validDrinker: false,
                name: name,
                phone: phone
             });
        }
    }else{
        res.render('add_yourself', {
           validDrinker: true ,
           name: '',
           phone: ''
        });
    }
});

app.post('/add_yourself', function(req, res, next) {

});

app.post('/add_yourself_profile', function(req, res, next) {

    //if req.body.lat is "" then say that they must choose an address from the dropdown after searching and dont do any of the rest of this code
    //if req.body.drinker_name is "" then it should redirect to adding yourself because this means they just typed in the url without creating tthemselevs

    // console.log('AYYY: ' + JSON.stringify(req.body));
    var rawDbLat;
    var rawDbLon;
    var rndDbLat;
    var rndDbLon;
    var rawInputLat;
    var rawInputLon;
    var rndInputLat;
    var rndInputLon;
    database.getDrinkersLocations(function(locations) {
        // console.log('num drinkers: ' + locations.length);
        // console.log('from db: ' + rawDbLat + " , " + rawDbLon);
        // console.log('from jquery: ' + rawInputLat + " , " + rawInputLon);
        // console.log('from db ROUNDED: ' + rndDbLat + " , " + rndDbLon);
        // console.log('from jquery ROUNDED: ' + rndInputLat + " , " + rndInputLon);

        var validDrinker = true;
        for (var i = 0; i < locations.length; i++) {
            rawDbLat = locations[i].lat;
            rawDbLon = locations[i].lon;
            rawInputLat = req.body.lat;
            rawInputLon = req.body.lng;
            rndDbLat = database.roundCoordinates(locations[i].lat, 2);
            rndDbLon = database.roundCoordinates(locations[i].lon, 2);
            rndInputLat = database.roundCoordinates(req.body.lat, 2);
            rndInputLon = database.roundCoordinates(req.body.lng, 2);
            if (rndDbLat === rndInputLat && rndDbLon === rndInputLon) {
                validDrinker = false;
            }
        }
        if (validDrinker) {
            //insert then render
            var drinkerObj = {
                name: req.body.drinker_name,
                phone: req.body.drinker_phone.replace(/[()]/g, '').replace(/\s+/g, '-'),
                lon: rawInputLon.substring(0, 12),
                lat: rawInputLat.substring(0, 11),
                number: req.body.street_number,
                address: req.body.route,
                city: req.body.locality,
                state: req.body.administrative_area_level_1_short
            };
            database.insertDrinker(drinkerObj, function(result){
                if(result.code && result.code === 'ER_DUP_ENTRY'){
                    //primary key violation
                    res.redirect('add_yourself?valid=false');
                }else{
                    //success
                    req.session.name = req.body.drinker_name;
                    database.getAllOptionsForProfileAttributes(function(results){
                        //0 = stressLevel, 1 = familyStatus, 2 = drinkLevel, 3 = personality, 4 = money
                        res.render('add_yourself_profile', {
                            drinker: req.body.drinker_name,
                            stressLevels: results[0],
                            familyStatuses: results[1],
                            drinkLevels: results[2],
                            personalities: results[3],
                            moneys: results[4]
                        });
                    });
                }
            });
        } else {
            //say drinker already at that location exists under submit button
            req.session.valid = false;
            req.session.name = req.body.drinker_name;
            req.session.phone = req.body.drinker_phone;
            res.redirect('add_yourself?valid=false');
        }
    });

});

app.post('/add_yourself_profile_result', function(req, res, next){
    var gender;
    var drinkTime;

    if(req.body.female)
        gender = 'female';
    else
        gender = 'male';
    
    if(req.body.lateNight)
        drinkTime = 'lateNight';
    else if(req.body.night)
        drinkTime = 'night';
    else
        drinkTime = 'any';

    // console.log(JSON.stringify(req.body));
    var profile = {
        stressLevel: req.body.stressLevel,
        jobHours: Number(req.body.jobHours),
        familyStatus: req.body.familyStatus,
        drinkLevel: req.body.drinkLevel,
        gender: gender,
        drinkTime: drinkTime,
        personality: req.body.personality,
        money: req.body.money,
        daysBar: req.body.daysBar
    };
    database.insertDrinkerProfile(profile, function(result){
        var share = {
            drinker: req.session.name,
            drinker_profile_id: result.insertId
        };
        database.insertShares(share, function(resultShare){
            // console.log(resultShare);
            res.render('add_yourself_success');
        });
    });
});

app.get('/add_beer', function(req, res, next){
    if(req.session.fd === false){
        var fd = false;
        req.session.fd = true;
        database.getAllBars(function(bars){
            res.render('add_beer', {
                bars: bars,
                violatedFD: fd,
                violatedFK: '',
                beer: req.session.beer,
                price: req.session.price
            });
        });
    }else if(req.session.fk === false){
        var fk = false;
        req.session.fk = true;
        database.getAllBars(function(bars){
            res.render('add_beer', {
                bars: bars,
                violatedFD: '',
                violatedFK: fk,
                beer: req.session.beer,
                price: req.session.price
            });
        });
    }else{
        database.getAllBars(function(bars){
            res.render('add_beer', {
                bars: bars,
                violatedFD: '',
                violatedFK: '',
                beer: '',
                price: ''
            });
        });
    }
});

app.post('/add_beer', function(req, res, next){
    var sells = {
        bar: req.body.bar,
        beer: req.body.beer,
        price: Number(req.body.price)
    };
    database.insertSells(sells, function(result){
        if(result.code && result.code === 'ER_DUP_ENTRY'){
            //violation of bar,beer -> price
            // console.log('got the error');
            req.session.fd = false;
            req.session.beer = req.body.beer;
            req.session.price = req.body.price;
            res.redirect('add_beer');
        }else if(result.code && result.code === 'ER_NO_REFERENCED_ROW_2'){
            //violation of fk between beer and sells
            // console.log('got the other error');
            req.session.fk = false;
            req.session.beer = req.body.beer;
            req.session.price = req.body.price;
            res.redirect('add_beer');
        }else{
            res.render('add_beer_success');
        }
    });
});

app.listen(process.env.PORT || 5000, function() {
    console.log("Server running on 5000!");
});