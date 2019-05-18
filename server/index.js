const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const Restaurant = require('../db/index.js');

// let jsonParser = bodyParser.json();
// let urlencodedParser = bodyParser.urlencoded();

// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '../client/dist'));

// app.get('/restaurants', (req, res) => res.send('Server connected!'));


app.get('/restaurants', (req, res) => {
  Restaurant.getRestaurant(function(err, data){
    if(err){
      res.status(500).send();
    }
    console.log('data in server', data)
    res.status(200).send(data);
  }); 
})


app.listen(port, () => console.log( 'Listening on port ' + port ));