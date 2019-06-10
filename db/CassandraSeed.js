const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const usernames = [];
const dates = [];
const restaurantNames = [];

for (let i = 0; i <= 100000; i++) {
  usernames.push(faker.internet.userName());
  dates.push(moment(faker.date.past()).format('YYYY-MM-DD-HH-MM'));
  restaurantNames.push(faker.address.city());
}

const restaurantGen = async () => {
  let count = 1;
  const writer = fs.createWriteStream('cassandra-restaurant.csv', {
    flag: 'a'
  });

  writer.write('id,name,photos\n');
  for (let i = 1; i <= 10000000; i++) {
    let photoSet = '"{';
    const random = Math.floor(Math.random() * 100000);
    const name = restaurantNames[random];

    for (let j = 0; j < Math.floor(Math.random() * 3) + 12; j++) {
      const photoId = Math.ceil(Math.random() * 1028);
      const url = "'https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-" + photoId + ".webp'";
      
      if (j > 0) photoSet += ',';
      photoSet += count + ':' + url;
      count++;
    }
    const result = writer.write(
      i + ',' + name + ',' + photoSet + '}"\n'
    );
      
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
  const writer = fs.createWriteStream('cassandra-photo.csv', {
    flag: 'a'
  });
  writer.write('id,username,date,flag\n');
  for (let i = 1; i < 150000000; i++) {
    const random = Math.floor(Math.random() * 100000); 
    const user = usernames[random];
    const date = dates[random];
    const result = writer.write(
      count + ',' + user + ',' + date + ',false\n'
    );

    if (!result) {
        await new Promise((resolve) => {
            writer.once('drain', resolve);
        });
    }
    count++;
  }
  writer.end();
  console.log(count);
}

// photoGen()
restaurantGen();
