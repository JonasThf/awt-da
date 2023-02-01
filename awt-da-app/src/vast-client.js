const VAST = require('vast-client');

const date = new Date();

const vastClient = new VAST.VASTClient();
const vastParser = new VAST.VASTParser();

vastClient.get(`http://localhost:3001/getInstance?date=${date.toISOString()}`)
      .then(res => {
        console.log(res.ads[0].creatives[0].icons)
      })
      .catch(function(error) {
        console.log(error)
      });

