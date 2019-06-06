const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const usernames = [];
const dates = [];

for (let i = 1; i < 1029; i++) {
  usernames.push(faker.internet.userName());
  dates.push(moment(faker.date.past()).format('YYYY-MM-DD-HH-MM'));
}

const resturantGen = async () => {
  const writer = fs.createWriteStream('postgres-restaurant.csv', {
    flag: 'a'
  });

  writer.write('id\n');
  for (let i = 1; i <= 10000000; i++) {
    const result = writer.write(i + '\n');
    if (!result) {
        await new Promise((resolve) => {
            writer.once('drain', resolve);
        });
    }
  }
  writer.end();
}

const photoGen = async () => {
  const writer = fs.createWriteStream('postgres-photo.csv', {
    flag: 'a'
  });
  writer.write('id, path, username, date, flagged\n');
  for (let i = 1; i < 1029; i++) {
    const path = `https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-${i}.webp`;
    const user = usernames[i];
    const date = dates[i];
    const result = writer.write(
      i + ',' + path + ',' + user + ',' + date + ',' + false + '\n'
    );
    if (!result) {
        await new Promise((resolve) => {
            writer.once('drain', resolve);
        });
    }
  }
  writer.end();
}

let batch = 1;
let count = 1;
let rId = 1;
const joinGen = async () => {
  console.log('start', batch, count, rId);
  const writer = fs.createWriteStream('postgres-join-' + batch + '.csv', {
    flag: 'a'
  });
  writer.write('id, restaurantId, photoId\n');
  for (let i = 1; i <= 10000000; i++) {
    for (let j = 0; j < Math.ceil(Math.random() * 10) + 15; j++) {
      const photoId = Math.ceil(Math.random() * 1028);
      const result = writer.write(
          count + ',' + rId + ',' + photoId + '\n'
      );
      if (!result) {
        j--;
        await new Promise((resolve) => {
          writer.once('drain', resolve);
        });
      } else {
        count++;
      }
    }
    rId++;
  }
  writer.end();
  if (batch < 10) {
    writer.on('finish', () => {
        batch++;
        joinGen();
    })
  }
}

// resturantGen();
// photoGen();
joinGen();
