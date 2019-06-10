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

let count = 1;

const genUDT = () => {
  const writer = fs.createWriteStream('cassandra-udt.csv', {
    flag: 'a'
  });
  writer.write('id,name,photos\n');
  for (let i = 0; i < 3; i++) {
    let photoSet = '"{';

    for (let j = 0; j < Math.floor(Math.random() * 5) + 12; j++) {
      const id = Math.ceil(Math.random() * 1028);
      const random = Math.floor(Math.random() * 100000);
      const url = 'https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-' + id + '.webp';
      const user = usernames[random];
      const date = dates[random];

      if (j > 0) photoSet += ',';
      photoSet += '{id:' + count + ",url:'" + url + "',username:'" + user + "',date:" + date + ',flag:false}';
      count++;
    }
    photoSet += '}"';
    const random = Math.floor(Math.random() * 100000);
    const name = restaurantNames[random];
    writer.write(
      i + ',' + name + ',' + photoSet + '\n'
    );
  }
  writer.end();
  console.log(count);
};

genUDT();