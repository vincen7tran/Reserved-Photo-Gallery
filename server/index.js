const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const db = require('../db/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));


app.get('/', (req, res) => {
  res.send(200);
});


app.get('/restaurants', (req, res) => {
  var id = req.query.restaurant_id;
  db.getPhotos(id, (err, photos) => {
    if(err){
      console.log('Unable to getRestaurant')
      res.status(500).send();
    }
    res.status(200).send(photos);
  })
});



app.listen(port, () => console.log( 'Listening on port ' + port ));