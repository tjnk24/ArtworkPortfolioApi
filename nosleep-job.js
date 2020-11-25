const fetch = require('node-fetch');

fetch('https://artworks-portfolio-api.herokuapp.com/ping', {
  method: 'POST',
  body: 'no sleep till brooklin',
})
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
  });
