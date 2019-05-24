var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

//============================= SCHEMA =========================
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


// ============================= QUERY =========================
var getRestaurant = function(callback){
  Restaurant.find({}, function(err, restaurants){
    if(err){
      callback(err);
    }
    callback(null, restaurants);
  });
}

module.exports = {
  getRestaurant,
  Restaurant
};

/*
Terminal commands to remember:

mongo
show dbs
use <db>
db.restaurants.find({})
db.dropDatabase()
re-run seed.js
*/