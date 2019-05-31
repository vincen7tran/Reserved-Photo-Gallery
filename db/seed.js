var faker = require('faker');
var mongoose = require('mongoose');
var db = require('./index.js');
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });
const imagePaths = require('./photoData.js');

// create restaurant instance 
var RestaurantInstance = function(n){
  var obj = {};
  obj.restaurant_id = n.toString().padStart(3, '0');
  obj.photos = [];
  return obj;
};

// create photo instance
var Photo =  function(){
  var photo = {};
  photo.file_path = imagePaths.imagePaths[Math.floor(Math.random() * (imagePaths.imagePaths.length - 0) + 0)];
  photo.user = faker.internet.userName();
  photo.date_posted = faker.date.past();
  photo.flagged = false;
  return photo;
};

// Save restaurants with photos to db
for (var i = 1; i < 101; i++){
  var restaurant = RestaurantInstance(i);
  var numOfPhotos = Math.random() * (20 - 12) + 12;
  for (var j = 0; j < numOfPhotos; j++){
    var photo = Photo();  
    restaurant.photos.push(photo);
  }
  db.Restaurant.create(restaurant, function(err){
    if (err) {
      console.log('Unable to save restaurant instance to database');
    }
  });
  console.log(restaurant);
}