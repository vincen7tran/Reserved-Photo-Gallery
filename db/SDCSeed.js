const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const csvWriter = require('csv-write-stream');

// Cassandra
// https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-1.webp

const usernames = [];
const dates = [];
let batchCount = 0;
let currentId = 1;

for (let i = 1; i < 1029; i++) {
  usernames.push(faker.internet.userName());
  dates.push(moment(faker.date.past()).format('YYYY-MM-DD-HH-MM'));
}

// Cassandra
const cassandraSeeder = (limit) => {
  const writer = batchCount === 0 ? csvWriter() : csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream('cassandra-data.csv', { flags: 'a' }));
  for (let i = 0; i < limit; i++) {
    let photoSet = '{';

    for (let j = 0; j < 15; j++) {
      const random = Math.ceil(Math.random() * 1028);
      const path = `https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-${random}.webp`;
      const user = usernames[random];
      const date = dates[random];

      if (j > 0) photoSet += ',';
      photoSet += `{path:'${path}',user:'${user}',date:'${date}',flagged:false}`;
    }
    photoSet += '}';
    writer.write({ id: currentId, photos: photoSet});
    currentId++;
  }
  writer.end();
  writer.on('finish', () => {
    if (batchCount < 99) {
      batchCount++;
      cassandraSeeder(100000);
    }
  });
};

cassandraSeeder(100000);
