var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

//============================= SCHEMA =========================
var restaurantSchema = mongoose.Schema({
  id: String,
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
var getPhotos = function(id, callback){
  console.log(typeof id)
  console.log('getPhotos query initiated using id: ', id)
  Restaurant.findOne({id: id}).exec(callback);
};

module.exports = {
  getPhotos,
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