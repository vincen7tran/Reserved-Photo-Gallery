var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

//============================= SCHEMA =========================
var restaurantSchema = mongoose.Schema({
  id: Number,
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
  Restaurant.findOne({id: id}).exec((err, data) => {
    if(err){
      console.log('getPhotos failed', err);
      callback(err);
    }
    callback(null, data);
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