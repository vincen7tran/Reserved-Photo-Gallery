const { Pool } = require('pg');

const pool = new Pool({
  user: 'vtran',
  host: 'localhost',
  database: 'ot',
  password: '',
  port: 5432
});

getPhotos = (id, callback) => {
  const q = 'SELECT * FROM photos WHERE r_id = ' + id;

  pool.query(q, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};

getPhoto = (id) => {
  const q = 'SELECT * FROM photos WHERE id = ' + id;

  return new Promise((resolve, reject) => {
    pool.query(q, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

addPhoto = (r_id, url, username, date) => {
  const q = `INSERT INTO photos (r_id, url, username, date, flag) VALUES (${r_id},'${url}','${username}','${date}',false)`;
  
  return new Promise((resolve, reject) => {
    pool.query(q, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

deletePhoto = (id) => {
  const q = 'DELETE FROM photos WHERE id = ' + id;

  return new Promise((resolve, reject) => {
    pool.query(q, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

updatePhotoURL = (id, url) => {
  const q = `UPDATE photos SET url = '${url}' WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    pool.query(q, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

updatePhotoUser = (id, username) => {
  const q = `UPDATE photos SET username = '${username}' WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    pool.query(q, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

flagPhoto = (id) => {
  const q = 'UPDATE photos SET FLAG = TRUE WHERE id = ' + id;

  return new Promise((resolve, reject) => {
    pool.query(q, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

addFlag = (id, reason, date) => {
  const q = `INSERT INTO flags (reason,date,p_id) VALUES ('${reason}','${date}',${id})`;

  return new Promise((resolve, reject) => {
    pool.query(q, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

module.exports = {
  getPhotos,
  getPhoto,
  addPhoto,
  updatePhotoURL,
  updatePhotoUser,
  deletePhoto,
  flagPhoto,
  addFlag,
};