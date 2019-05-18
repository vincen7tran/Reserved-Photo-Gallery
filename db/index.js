// mongod --config /usr/local/etc/mongod.conf
// mongo
// show dbs
// use <db>
// db.restaurants.find({})

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;
var faker = require('faker');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
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




// ================= Save restaurants to db ================================
for (var i = 1; i < 2; i++){

  var randomUser = faker.internet.userName();
  var randomDate = faker.date.recent();  
  var numPhotosPerRestaurant = Math.floor(Math.random() * 21);

  // create restaurant document / instance
  var RestaurantInstance = function(n){
    var obj = {};
    obj.restaurant_id = n;
    obj.photos = [];
    return obj;
  };
  var restaurant = RestaurantInstance(i);
  
  // push random # of photos (1 to 20) into document's photos array
  for (var i = 0; i < numPhotosPerRestaurant; i++){
    var Photo =  function(){
      var photo = {};
      photo.file_path = 'REPLACE WITH RANDOM AMAZON S3 PATH';
      photo.user = randomUser;
      photo.date_posted = randomDate;
      photo.flagged = false;
      return photo;
    };      
    var photo = Photo();
    
    console.log(restaurant);
    restaurant.photos.push(photo);
  }
    
  Restaurant.create(restaurant, function(err){
    if (err) {
      console.log('Unable to save restaurant to database');
    }
  });
} 


// consider using promise.all to close connection
// needs empty promise array before for loop
// each instance of restaurant is one promise
// need to push each restaurant instance into promises array


module.exports = Restaurant;
// run file in terminal using 'node db/index.js'