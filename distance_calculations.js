app.get('/drink_together', function(req, res, next) {

    //General uber to driver to bar cost
    /*
     *SELECT name FROM drinkers WHERE state = (SELECT state FROM drinkers WHERE NAME = 'Aaliyah Conn') AND name != 'Aaliyah Conn'
     *Above query selects all drinkers residing in same state was Aaliyah, populate a form with these and use result to fill in query below
     */
    var personlocal = con.query("SELECT lon, lat, state FROM drinkers WHERE name = 'Aaliyah Conn'", function(err, res) {
        var user1min;
        var user2min;
        var user1mileage;
        var user2mileage;
        var user1;
        var user2;
        var mainuser;
        if (err) {
            throw err;
        }
        user1 = {
            "name": "Aaliyah Conn",
            "lon": res[0].lon,
            "lat": res[0].lat,
            "state": res[0].state
        }
        var oldres = res;
        var query = con.query("SELECT uber_drivers.id, lon, lat, rating from uber_drivers where state = ?", user1.state, function(err, res) {
            if (err) {
                throw err;
            }
            var ubermin = 999999999;
            var tempmin;
            //console.log(oldres[0].lon);
            var counter = 0;
            for (var i = 0; i < res.length; i++) {
                tempmin = ubermin;
                ubermin = Math.min(999999999, dist.distance(oldres[0].lat, oldres[0].lon, res[i].lat, res[i].lon, "M"));
                if (ubermin < tempmin) {
                    uberdriver1 = {
                        "id": res[i].id,
                        "lon": res[i].lon,
                        "lat": res[i].lat
                    }
                }
                counter++;
            }
            //console.log(counter);
            user1min = ubermin;
            user1mileage = ubermin;
            console.log('Distance in miles: ' + ubermin);

            var person2local = con.query("SELECT lon, lat FROM drinkers WHERE name = 'Alex Von'", function(err, res) {
                if (err) {
                    throw err;
                }
                user2 = {
                    "name": "Alex Von",
                    "lon": res[0].lon,
                    "lat": res[0].lat
                }
                var query = con.query("SELECT uber_drivers.id, lon, lat, rating from uber_drivers where state = ?", user1.state, function(err, res) {
                    if (err) {
                        throw err;
                    }
                    var ubermin = 999999999;
                    var tempmin;
                    //console.log(oldres[0].lon);
                    var counter = 0;
                    for (var i = 0; i < res.length; i++) {
                        tempmin = ubermin;
                        ubermin = Math.min(999999999, dist.distance(user2.lat, user2.lon, res[i].lat, res[i].lon, "M"));
                        if (ubermin < tempmin) {
                            uberdriver2 = {
                                "id": res[i].id,
                                "lon": res[i].lon,
                                "lat": res[i].lat
                            }
                        }
                        counter++;
                    }
                    console.log("HELLO", ubermin);
                    user2mileage = ubermin;
                    user2min = ubermin;
                    //console.log(counter);
                    console.log('Distance in miles: ' + ubermin);


                    if (user1min > user2min) {
                        mainuser = user2;
                        ubermin = user2min;
                        uberdriver = uberdriver2;
                    } else {
                        mainuser = user1;
                        ubermin = user1min;
                        uberdriver = uberdriver1;
                    }
                    //console.log(uberdriver);
                    values = [uberdriver.id, uberdriver.id];
                    var uberres;
                    var uberdet = con.query("SELECT name, phone, rating, v.year, v.make, v.model, v.color from uber_drivers, vehicles v where uber_drivers.id = ? AND v.id = ?", values, function(err, res) {
                        if (err) {
                            throw err;
                        }
                        console.log('Uber driver detail: ', res);
                        uberres = res;

                        var query = con.query("SELECT name, lon, lat from bars where state = ?", user1.state, function(err, res) {
                            if (err) {
                                throw err;
                            }
                            var min = 999999999;
                            var tempmin;
                            //console.log(oldres[0].lon);
                            var counter = 0;
                            console.log(mainuser);
                            console.log(user1mileage);
                            console.log(user2mileage);
                            for (var i = 0; i < res.length; i++) {
                                tempmin = min;
                                min = Math.min(999999999, dist.distance(mainuser.lat, mainuser.lon, res[i].lat, res[i].lon, "M"));
                                if (min < tempmin) {
                                    bar = {
                                        "name": res[i].name,
                                        "lon": res[i].lon,
                                        "lat": res[i].lat
                                    }
                                }
                                counter++;
                            }
                            console.log(bar);
                            console.log(min);
                            console.log('Ride cost: ', dist.cost(user1mileage + user2mileage + min, dist.type(uberres[0].make, uberres[0].model, uberres[0].color, uberres[0].year)));
                        });
                    });


                });

            });




            //console.log(res[0]);
        });

    });

    //console.log(dist.cost(5, "X"));
    res.render('drink_together');
});



app.get('/drink', function(req, res, next) {

    //General uber to driver to bar cost
    var personlocal = con.query("SELECT lon, lat FROM drinkers WHERE name = 'Aaliyah Conn'", function(err, res) {
        if (err) {
            throw err;
        }
        var oldres = res;
        var query = con.query("SELECT uber_drivers.id, lon, lat, rating from uber_drivers where state = (SELECT state from drinkers where name = 'Aaliyah Conn')", function(err, res) {
            if (err) {
                throw err;
            }
            var ubermin = 999999999;
            var tempmin;
            //console.log(oldres[0].lon);
            var counter = 0;
            for (var i = 0; i < res.length; i++) {
                tempmin = ubermin;
                ubermin = Math.min(999999999, dist.distance(oldres[0].lat, oldres[0].lon, res[i].lat, res[i].lon, "M"));
                if (ubermin < tempmin) {
                    uberdriver = {
                        "id": res[i].id,
                        "lon": res[i].lon,
                        "lat": res[i].lat
                    }
                }
                counter++;
            }
            //console.log(counter);
            console.log('Distance in miles: ' + ubermin);
            //console.log(uberdriver);
            values = [uberdriver.id, uberdriver.id];
            var uberres;
            var uberdet = con.query("SELECT name, phone, rating, v.year, v.make, v.model, v.color from uber_drivers, vehicles v where uber_drivers.id = ? AND v.id = ?", values, function(err, res) {
                if (err) {
                    throw err;
                }
                console.log('Uber driver detail: ', res);
                uberres = res;


            });

            var query = con.query("SELECT name, lon, lat from bars where state = (SELECT state from drinkers where name = 'Aaliyah Conn')", function(err, res) {
                if (err) {
                    throw err;
                }
                var min = 999999999;
                var tempmin;
                //console.log(oldres[0].lon);
                var counter = 0;
                for (var i = 0; i < res.length; i++) {
                    tempmin = min;
                    min = Math.min(999999999, dist.distance(oldres[0].lat, oldres[0].lon, res[i].lat, res[i].lon, "M"));
                    if (min < tempmin) {
                        bar = {
                            "name": res[i].name,
                            "lon": res[i].lon,
                            "lat": res[i].lat
                        }
                    }
                    counter++;
                }
                console.log(bar);
                console.log(min);
                console.log('Ride cost: ', dist.cost(ubermin + min, dist.type(uberres[0].make, uberres[0].model, uberres[0].color, uberres[0].year)));
            });

            //console.log(res[0]);
        });

    });

    //Below is personalized bar for user

    var personlocal = con.query("SELECT lon, lat FROM drinkers WHERE name = 'Aaliyah Conn'", function(err, res) {
        if (err) {
            throw err;
        }
        var oldres = res;
        var query = con.query("SELECT uber_drivers.id, lon, lat, rating from uber_drivers where state = (SELECT state from drinkers where name = 'Aaliyah Conn')", function(err, res) {
            if (err) {
                throw err;
            }
            var ubermin = 999999999;
            var tempmin;
            //console.log(oldres[0].lon);
            var counter = 0;
            for (var i = 0; i < res.length; i++) {
                tempmin = ubermin;
                ubermin = Math.min(999999999, dist.distance(oldres[0].lat, oldres[0].lon, res[i].lat, res[i].lon, "M"));
                if (ubermin < tempmin) {
                    uberdriver = {
                        "id": res[i].id,
                        "lon": res[i].lon,
                        "lat": res[i].lat
                    }
                }
                counter++;
            }
            //console.log(counter);
            console.log('Distance in miles: ' + ubermin);
            //console.log(uberdriver);
            values = [uberdriver.id, uberdriver.id];
            var uberres;
            var uberdet = con.query("SELECT name, phone, rating, v.year, v.make, v.model, v.color from uber_drivers, vehicles v where uber_drivers.id = ? AND v.id = ?", values, function(err, res) {
                if (err) {
                    throw err;
                }
                console.log('Uber driver detail: ', res);
                uberres = res;


            });

            var query = con.query("SELECT name, lon, lat from bars where state = (SELECT state from drinkers where name = 'Aaliyah Conn') AND name IN (SELECT bar FROM frequents WHERE drinker = 'Aaliyah Conn')", function(err, res) {
                if (err) {
                    throw err;
                }
                var min = 999999999;
                var tempmin;
                //console.log(oldres[0].lon);
                var counter = 0;
                for (var i = 0; i < res.length; i++) {
                    tempmin = min;
                    min = Math.min(999999999, dist.distance(oldres[0].lat, oldres[0].lon, res[i].lat, res[i].lon, "M"));
                    if (min < tempmin) {
                        bar = {
                            "name": res[i].name,
                            "lon": res[i].lon,
                            "lat": res[i].lat
                        }
                    }
                    counter++;
                }
                console.log(bar);
                console.log(min);
                console.log('Ride cost: ', dist.cost(ubermin + min, dist.type(uberres[0].make, uberres[0].model, uberres[0].color, uberres[0].year)));
            });

            //console.log(res[0]);
        });

    });





    res.render('drink');
});