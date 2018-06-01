var mysql = require('mysql');

// Global variable - gives access to mysql db connection
var db;

function startConnection() {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_db,
        multipleStatements: true
    });
}

// Closes the connection
function closeConnection() {
    if (db !== "undefined")
        db.end();
}

// Put functions here that run queries or insert data
function getBarsInState(state, callback) {
    var query = "SELECT name FROM bar_buddies.bars WHERE state= ?";
    var q = db.query(query, state, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getAllBars(callback){
    var query = "SELECT * FROM bar_buddies.bars";
    db.query(query, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getSellsOfBar(bar, callback){
    var query = "SELECT beer, price FROM bar_buddies.sells WHERE bar = ?";
    db.query(query, bar, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getAllSells(callback){
    var query = "SELECT * FROM bar_buddies.sells";
    db.query(query, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getDrinkers(callback) {
    var query = "SELECT name FROM bar_buddies.drinkers";
    db.query(query, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getDrinkersInState(state, callback) {
    var query = "SELECT name FROM bar_buddies.drinkers WHERE state= ?";
    db.query(query, state, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getDrinkersThatShareFrequents(drinker, callback) {
    var query = "SELECT DISTINCT(f2.drinker) FROM bar_buddies.frequents f1, bar_buddies.frequents f2 WHERE f1.bar = f2.bar and f1.drinker = ? AND f1.drinker != f2.drinker";
    db.query(query, drinker, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getBarsSharedByFrequents(drinkerA, drinkerB, callback){
    var query = "SELECT name, lon, lat FROM bar_buddies.bars WHERE name IN (SELECT f1.bar FROM frequents f1, frequents f2 WHERE f1.bar = f2.bar and f1.drinker = ? AND f2.drinker = ?)";
    var drinkers = [drinkerA, drinkerB];
    db.query(query, drinkers, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getState(drinkerName, callback) {
    var query = "SELECT state FROM bar_buddies.drinkers WHERE name = ?";
    var q = db.query(query, drinkerName, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getAllStates(callback){
    var query ="SELECT DISTINCT(state) FROM bar_buddies.drinkers ORDER BY state ASC";
    db.query(query, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getDrinkerLocation(drinker, callback) {
    var query = "SELECT lon, lat, state FROM bar_buddies.drinkers WHERE name = ?";
    db.query(query, drinker, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getDrinkersLocations(callback) {
    var query = "SELECT lon, lat, state FROM bar_buddies.drinkers";
    db.query(query, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getUberDriverLocation(state, callback) {
    var query = "SELECT uber_drivers.id, lon, lat, rating FROM bar_buddies.uber_drivers WHERE state = ?";
    db.query(query, state, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getUberDriverDetails(uberDriverId, callback) {
    var query = "SELECT name, phone, rating, v.year, v.make, v.model, v.color FROM bar_buddies.uber_drivers, vehicles v WHERE uber_drivers.id = ? AND v.id = ?";
    var values = [uberDriverId, uberDriverId];
    db.query(query, values, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getBarDetails(state, callback) {
    var query = "SELECT name, lon, lat FROM bar_buddies.bars WHERE state = ?";
    db.query(query, state, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getNumBeersMatched(drinkerA, drinkerB, callback) {
    var query = "SELECT COUNT(l1.beer) AS beers FROM bar_buddies.likes l1, bar_buddies.likes l2 WHERE l1.drinker = ? AND l2.drinker= ? AND l1.beer = l2.beer";
    var drinkers = [drinkerA, drinkerB];
    db.query(query, drinkers, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getNumBarsMatched(drinkerA, drinkerB, callback) {
    var query = "SELECT COUNT(f1.bar) AS bars FROM bar_buddies.frequents f1, bar_buddies.frequents f2 WHERE f1.drinker = ? AND f2.drinker= ? AND f1.bar = f2.bar";
    var drinkers = [drinkerA, drinkerB];
    db.query(query, drinkers, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getDaysSpentAtBar(drinker, callback) {
    var query = "SELECT daysBar FROM bar_buddies.drinker_profiles WHERE drinker_profiles.id =(SELECT drinker_profile_id FROM shares WHERE drinker= ?)";
    db.query(query, drinker, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getDrinkerProfile(drinker, callback) {
    var query = "SELECT * FROM bar_buddies.drinker_profiles WHERE drinker_profiles.id =(SELECT drinker_profile_id FROM shares WHERE drinker= ?)";
    db.query(query, drinker, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getAllOptionsForProfileAttributes(callback){
    var query = "SELECT DISTINCT(stressLevel) FROM bar_buddies.drinker_profiles;SELECT DISTINCT(familyStatus) FROM bar_buddies.drinker_profiles;SELECT DISTINCT(drinkLevel) FROM bar_buddies.drinker_profiles;SELECT DISTINCT(personality) FROM bar_buddies.drinker_profiles;SELECT DISTINCT(money) FROM bar_buddies.drinker_profiles;";
    db.query(query, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function getPercentagesOfBarsCommonBeers(callback){
    var query = "SELECT beer, COUNT(*) AS num_bars, COUNT(*) / T.total * 100 AS percent FROM bar_buddies.sells s, (SELECT COUNT(DISTINCT(bar)) AS total FROM bar_buddies.sells) AS T GROUP BY beer ORDER BY num_bars DESC LIMIT 3";
    db.query(query, function(err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function insertDrinker(drinkerObj, callback){
    var query = "INSERT INTO bar_buddies.drinkers SET ?";
    db.query(query, drinkerObj, function(err, result){
        if(err) return callback(err);
        return callback(result);
    });
}

function insertDrinkerProfile(profile, callback){
    var query = "INSERT INTO bar_buddies.drinker_profiles SET ?";
    db.query(query, profile, function(err, result){
        if(err) return callback(err);
        return callback(result);
    });
}

function insertShares(share, callback){
    var query = "INSERT INTO bar_buddies.shares SET ?";
    db.query(query, share, function(err, result){
        if(err) return callback(err);
        return callback(result);
    });
}

function insertSells(sells, callback){
    var query = "INSERT INTO bar_buddies.sells SET ?";
    db.query(query, sells, function(err, result){
        if(err) return callback(err);
        return callback(result);
    });
}

function verifyFrequentsPattern(callback){
    var query = "SELECT NOT EXISTS(SELECT name FROM bar_buddies.drinkers WHERE name NOT IN(SELECT DISTINCT(f.drinker) FROM bar_buddies.frequents f, bar_buddies.bars b, bar_buddies.drinkers d WHERE b.state = d.state AND f.drinker = d.name AND f.bar = b.name)) AS 'result'";
    db.query(query, function(err, result){
        if(err) throw err;
        return callback(result);
    });
}

function roundCoordinates(_float, _digits) {
    var rounder = Math.pow(10, _digits);
    return (Math.round(_float * rounder) / rounder).toFixed(_digits);
}

module.exports.startConnection = startConnection;
module.exports.closeConnection = closeConnection;
module.exports.getBarsInState = getBarsInState;
module.exports.getAllBars = getAllBars;
module.exports.getAllSells = getAllSells;
module.exports.getSellsOfBar = getSellsOfBar;
module.exports.getDrinkers = getDrinkers;
module.exports.getDrinkersInState = getDrinkersInState;
module.exports.getDrinkersThatShareFrequents = getDrinkersThatShareFrequents;
module.exports.getBarsSharedByFrequents = getBarsSharedByFrequents;
module.exports.getState = getState;
module.exports.getAllStates = getAllStates;
module.exports.getDrinkerLocation = getDrinkerLocation;
module.exports.getDrinkersLocations = getDrinkersLocations;
module.exports.getUberDriverLocation = getUberDriverLocation;
module.exports.getUberDriverDetails = getUberDriverDetails;
module.exports.getBarDetails = getBarDetails;
module.exports.getNumBeersMatched = getNumBeersMatched;
module.exports.getNumBarsMatched = getNumBarsMatched;
module.exports.getDaysSpentAtBar = getDaysSpentAtBar;
module.exports.getDrinkerProfile = getDrinkerProfile;
module.exports.getAllOptionsForProfileAttributes = getAllOptionsForProfileAttributes;
module.exports.getPercentagesOfBarsCommonBeers = getPercentagesOfBarsCommonBeers;

module.exports.insertDrinker = insertDrinker;
module.exports.insertDrinkerProfile = insertDrinkerProfile;
module.exports.insertShares = insertShares;
module.exports.insertSells = insertSells;

module.exports.verifyFrequentsPattern = verifyFrequentsPattern;

module.exports.roundCoordinates = roundCoordinates;