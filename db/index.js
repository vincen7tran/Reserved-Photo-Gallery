// include mongoose in project and open a connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var faker = require('faker');


// get notified if we connect successfully or if a connection error occurs:
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
  
  //============================== SCHEMA =========================
  let restaurantSchema = mongoose.Schema({
    restaurant_id: Number,
    photos: [{
      // photo_id: Number,
      restaurant_id: Number,
      file_path: String,
      user: String,
      date_posted: Date,
      flagged: Boolean, 
    }]
  });
  
  // ============================== MODEL ====================================
  let Restaurant = mongoose.model('Restaurant', restaurantSchema);
  
  
  var randomImage = faker.image.food();
  var randomUser = faker.internet.userName();
  var randomDate = faker.date.recent();
  var restaurantId = Math.floor(Math.random() * Math.floor(100));
  var images = [];
  
  // for loop to 100 pushing data into array
  var restaurant = new Restaurant({
    restaurant_id: restaurantId,
    photos: []
  });
  
  // for loop to push random # of photos into array
  var restaurantPhoto = {
    // photo_id: 1,
    file_path: randomImage,  //update filepath and increment photo_id
    user: randomUser,
    date_posted: randomDate,
    flagged: false
  };
  
  restaurant.photos.push(restaurantPhoto);
  
  restaurant.save();
  

  // consider using promise.all to close connection
  // needs empty promise array before for loop
  // each instance of restaurant is one promise
  // need to push each restaurant instance into promises array

});
  
  module.exports = Restaurant;
  
  
  // run file in terminal using 'node db/index.js'