const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const usernames = [];
const dates = [];

for (let i = 1; i < 1029; i++) {
  usernames.push(faker.internet.userName());
  dates.push(moment(faker.date.past()).format('YYYY-MM-DD-HH-MM'));
}

const restaurantGen = async () => {
  let count = 1;
  const writer = fs.createWriteStream('cassandra-restaurant.csv', {
    flag: 'a'
  });

  writer.write('id, photos\n');
  for (let i = 1; i <= 10000000; i++) {
      let photoSet = '"{';
      for (let j = 0; j < 15; j++) {
          const photoId = Math.ceil(Math.random() * 1028);
          const path = "'https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-"+ photoId + ".webp'";

          if (j > 0) photoSet += ',';
          photoSet += photoId + ':' + path;
      }
      const result = writer.write(
          count + ',' + photoSet + '}"\n'
      );
      
      count++;
      if (!result) {
          await new Promise((resolve) => {
              writer.once('drain', resolve);
          });
      }
  }
  writer.end();
}

const photoGen = async () => {
  const writer = fs.createWriteStream('cassandra-photo.csv', {
    flag: 'a'
  });

  writer.write('id, user, date, flagged, url\n');
  for (let i = 1; i <= 1028; i++) {
    const path = 'https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-'+ i + '.webp';
    const user = usernames[i];
    const date = dates[i];

    const result = writer.write(
        i + ',' + user + ',' + date + ',' + path + 'false\n'
    );
    
    if (!result) {
        await new Promise((resolve) => {
            writer.once('drain', resolve);
        });
    }
  }
  writer.end();
}

// photoGen()
restaurantGen();
