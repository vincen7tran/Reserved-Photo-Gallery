// mongod --config /usr/local/etc/mongod.conf
// mongo
// show dbs
// use <db>
// db.restaurants.find({})

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});


//============================== SCHEMA =========================
var restaurantSchema = mongoose.Schema({
  restaurant_id: Number,
  photos: [{
    file_path: String,
    user: String,
    date_posted: Date,
    flagged: Boolean 
  }]
});

// ============================== MODEL ====================================
var Restaurant = mongoose.model('Restaurant', restaurantSchema);







// consider using promise.all to close connection
// needs empty promise array before for loop
// each instance of restaurant is one promise
// need to push each restaurant instance into promises array


module.exports = Restaurant;
// run file in terminal using 'node db/index.js'