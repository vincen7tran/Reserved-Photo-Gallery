var faker = require('faker');
var mongoose = require('mongoose');
var db = require('./index.js');
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });
const imagePaths = require('./photoData.js');


// creates a restaurant document / instance 
var RestaurantInstance = function(n){
  var obj = {};
  obj.restaurant_id = n.toString().padStart(3, '0');
  obj.photos = [];
  return obj;
};

// picks a random filepath for the photo obj (no duplicates)
var choosePhotoForRestaurant = function(){
  var photo = imagePaths.imagePaths[Math.floor(Math.random() * (imagePaths.imagePaths.length - 0) + 0)];
  imagePaths.imagePaths.splice(imagePaths.imagePaths.indexOf(photo), 1);
  return photo;
}

// creates instance of a photo obj
var Photo =  function(){
  var photo = {};
  photo.file_path = choosePhotoForRestaurant();
  photo.user = faker.internet.userName();
  photo.date_posted = faker.date.past();
  photo.flagged = false;
  return photo;
};

// ================= Save restaurants to db ================================

for (var i = 1; i < 101; i++){
  // create restaurant instance with id = i
  var restaurant = RestaurantInstance(i);
  // push 10-20 photos into restaurant's photos array
  var numOfPhotos = Math.random() * (20 - 10) + 10;
  for (var j = 0; j < numOfPhotos; j++){
    var photo = Photo();  
    restaurant.photos.push(photo);
  }
  // save restaurant instance to db
  db.Restaurant.create(restaurant, function(err){
    if (err) {
      console.log('Unable to save restaurant instance to database');
    }
    console.log('Saved restaurant instance to db!');
  });
} 