const { Pool } = require('pg');

const pool = new Pool({
  user: 'vtran',
  host: 'localhost',
  database: 'ot',
  password: '',
  port: 5432
});

getPhotos = (id, callback) => {
  const q = 'SELECT * FROM photos where r_id = ' + id;

  pool.query(q, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
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
  flagPhoto,
  addFlag,
};