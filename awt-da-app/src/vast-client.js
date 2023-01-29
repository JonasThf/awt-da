const vastParser = require('vast-client');

const date = new Date();
console.log(date.toISOString());

const vastClient = new vastParser.VASTClient();

vastClient.get(`http://localhost:3001/getInstance?date=${date.toISOString()}`)
  .then(res => {
    console.log(res)
    // Do something with the parsed VAST response
  })
  .catch(err => {
    // Deal with the error
  });