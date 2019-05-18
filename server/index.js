const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const Restaurant = require('../db/index.js');

// let jsonParser = bodyParser.json();
// let urlencodedParser = bodyParser.urlencoded();

// mongoose.connect('mongodb://localhost/restaurants');

// use Restaurant.findOne()
app.get('/restaurants', (req, res) => res.send('Hello World'));



app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('../client/dist'));


app.listen(port, () => console.log( 'Listening on port ' + port ));