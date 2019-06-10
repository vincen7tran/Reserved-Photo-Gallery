const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const usernames = [];
const dates = [];
const restaurantNames = [];

for (let i = 1; i < 100000; i++) {
  usernames.push(faker.internet.userName());
  dates.push(moment(faker.date.past()).format('YYYY-MM-DD-HH-MM'));
  restaurantNames.push(faker.address.city());
}

const resturantGen = async () => {
  const writer = fs.createWriteStream('postgres-restaurant.csv', {
    flag: 'a'
  });

  writer.write('id,name\n');
  for (let i = 1; i <= 10000000; i++) {
    const random = Math.floor(Math.random() * 100000);
    const result = writer.write(i + ',' + restaurantNames[random] + '\n');
    if (!result) {
        await new Promise((resolve) => {
            writer.once('drain', resolve);
        });
    }
  }
  writer.end();
}

const photoGen = async () => {
  let count = 1;
  const writer = fs.createWriteStream('postgres-photo.csv', {
    flag: 'a'
  });
  writer.write('id,r_id,url,username,date,flag\n');
  for (let i = 1; i < 10000000; i++) {
    for (let j = 0; j < Math.floor(Math.random() * 7) + 12; j++) {
      const photoId = Math.ceil(Math.random() * 1028);
      const url = 'https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-' + photoId + '.webp';
      const random = Math.floor(Math.random() * 100000); 
      const user = usernames[random];
      const date = dates[random];
      const result = writer.write(
        count + ',' + i + ',' + url + ',' + user + ',' + date + ',false\n'
      );

      if (!result) {
          await new Promise((resolve) => {
              writer.once('drain', resolve);
          });
      }
      count++;
    }
  }
  writer.end();
}

// resturantGen();
// photoGen();

const pIds = [140000000, 140178037, 140178038, 140178039, 140178040, 140178041, 140178042, 500000, 1000000, 50000000, 10000000, 75000000, 100000000];
const reasons = ['Unrelated to restaurant', 'Inappropriate content', "I don't like this photo"];

const flagGen = async () => {
  const writer = fs.createWriteStream('postgres-flags-1M.csv', {
    flag: 'a'
  });
  let count = 100001;
  pId = 1;
  writer.write('id,reason,date,p_id\n');
  for (let i = 1; i <= 1000000; i++) {
    const random = Math.floor(Math.random() * 100000);
    const reason = reasons[Math.floor(Math.random() * 2)];
    const date = dates[random]
    const result = writer.write(count + ',' + reason + ',' + date + ',' + pId + '\n');
    if (!result) {
        await new Promise((resolve) => {
            writer.once('drain', resolve);
        });
    }
    count++;
    pId++;
  }
  writer.end();
}

flagGen();