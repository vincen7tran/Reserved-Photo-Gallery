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
  console.log('Database connected!');
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


// ================== QUERY =========================
var getRestaurant = function(callback){
  Restaurant.find({}, function(err, restaurants){
    if(err){
      callback(err);
    }
    callback(null, restaurants);
  });
}


// consider using promise.all to close connection
// needs empty promise array before for loop
// each instance of restaurant is one promise
// need to push each restaurant instance into promises array


module.exports = {
  getRestaurant
};
// run file in terminal using 'node db/index.js'