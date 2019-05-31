const path = require('path');
const express = require('express');
const app = express();
const port = 3002;
const db = require('../db/index.js');
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.send(200);
});

app.get('/API/restaurant/photo/:id', (req, res) => {
  var id = req.params.id;
  db.getPhotos(id, (err, photos) => {
    if(err){
      console.log('Unable to getRestaurant')
      res.status(500).send();
    }
    console.log('app.get worked')
    res.status(200).send(photos);
  })
});

app.listen(port, () => console.log( 'Listening on port ' + port ));