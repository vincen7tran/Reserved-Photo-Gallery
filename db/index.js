var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

// schema
var restaurantSchema = mongoose.Schema({
  restaurant_id: String,
  photos: [{
    file_path: String,
    user: String,
    date_posted: Date,
    flagged: Boolean 
  }]
});

// model 
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

// query
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