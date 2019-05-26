var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

//============================= SCHEMA =========================
var restaurantSchema = mongoose.Schema({
  restaurant_id: String,
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
  console.log('Query initiated using id: ', id)
  Restaurant.find({ restaurant_id: id }, (err, photos) => {
    if (err) {
      callback(err);
      console.log('error with getPhotos query')
    }
    callback(null, photos);
    console.log('getPhotos worked!')
  });
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