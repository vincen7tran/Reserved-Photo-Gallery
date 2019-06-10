const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../db/index.js');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/API/restaurant/photo/:id', (req, res) => {
  const id = req.params.id;

  db.getPhotos(id, (err, { rows }) => {
    if (err) {
      console.log('Failed to get photos!');
      res.sendStatus(500);
    }
    res.status(200).send(rows);
  });
});

app.post('/flag', async (req, res) => {
  const { id, reason, date } = req.body.params;

  try {
    await db.flagPhoto(id);
    await db.addFlag(id, reason, date);
    res.sendStatus(200);
  } catch (e) {
    res.status(401).send(e);
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist') + '/index.html');
})

app.listen(port, () => console.log( 'Listening on port ' + port ));