var faker = require('faker');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');
var db = mongoose.connection;


// ================= Save restaurants to db ================================
for (var i = 1; i < 2; i++){

  // create restaurant document / instance 
  var RestaurantInstance = function(i){
    var obj = {};
    obj.restaurant_id = i;
    obj.photos = [];
    return obj;
  };
  var restaurant = RestaurantInstance(i);

  var numPhotosPerRestaurant = Math.floor(Math.random() * 21);
  
  // push random # of photos (1 to 20) into document's photos array
  for (var i = 0; i < numPhotosPerRestaurant; i++){

    var Photo =  function(){
      var photo = {};
      photo.file_path = 'REPLACE WITH RANDOM AMAZON S3 PATH';
      photo.user = faker.internet.userName();
      photo.date_posted = faker.date.recent();
      photo.flagged = false;
      return photo;
    };      
    var photo = Photo();  
    restaurant.photos.push(photo);
    console.log(restaurant);
  }

  Restaurant.create(restaurant, function(err){
    if (err) {
      console.log('Unable to save restaurant to database');
    }
  });
} 