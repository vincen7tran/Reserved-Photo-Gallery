const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const Restaurant = require('../db/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));


app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('req.params: ', req.params);
  Restaurant.getRestaurant(function(err, data){
    if(err){
      console.log('Unable to getRestaurant')
      res.status(500).send();
    }
    console.log('data in server', data)
    let photoArr = data.
    res.status(200).send(data);
  }); 
});



app.listen(port, () => console.log( 'Listening on port ' + port ));