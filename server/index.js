const nr = require('newrelic');
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
    if (err) return res.sendStatus(500);
    res.status(200).send(rows);
  });
});

app.get('/photo/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const { rows } = await db.getPhoto(id);
    res.status(200).send(rows);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.post('/photo', async (req, res) => {
  const { r_id, url, username, date } = req.body;

  try {
    const photo = await db.addPhoto(r_id, url, username, date);
    res.status(201).send(photo);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/photo/url', async (req, res) => {
  const { id, url } = req.query;
  
  try {
    await db.updatePhotoURL(id, url);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/photo/user', async (req, res) => {
  const { id, username } = req.query;

  try {
    await db.updatePhotoUser(id, username);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/photo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await db.deletePhoto(id);
    res.status(200).send(photo);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/flag', async (req, res) => {
  const { id, reason, date } = req.body;

  try {
    await db.flagPhoto(id);
    await db.addFlag(id, reason, date);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/flag/:id', async (req, res) => {
  const id = req.query;

  try {
    await db.deleteFlag(id);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist') + '/index.html');
});

app.listen(port, () => console.log( 'Listening on port ' + port ));