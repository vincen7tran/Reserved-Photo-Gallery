const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const input = 'images/*.{jpeg,jpg}';
const output = 'build/webp';

imagemin([input], output, {
  use: [
    imageminWebp({quality: 60})
  ]
});