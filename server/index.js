const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('../db/index.js');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/API/restaurant/photo/:id', (req, res) => {
  var id = req.params.id;
  db.getPhotos(id, (err, photos) => {
    if(err){
      console.log('Unable to getRestaurant')
      res.sendStatus(500);
    }
    res.status(200).send(photos);
  })
});

app.listen(port, () => console.log( 'Listening on port ' + port ));