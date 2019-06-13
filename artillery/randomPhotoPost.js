const moment = require('moment');
const faker = require('faker');

// INSERT INTO photos (r_id,url,username,date,flag) 
// VALUES (
// 10000000,'https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-120.webp',
// 'vinh2','2019-05-01-12-31',true);

const postPhoto = (context, events, done) => {
  const photoId = Math.ceil(Math.random() * 1028);
  const url = `https://sdc-vinh-photo-carousel-images.s3-us-west-1.amazonaws.com/images/img-${photoId}.webp`;
  const date = moment(faker.date.past()).format('YYYY-MM-DD-HH-MM');
  const username = faker.internet.userName();

  context.vars.url = url;
  context.vars.date = date;
  context.vars.username = username;
  return done();
};

module.exports = {
  postPhoto,
};