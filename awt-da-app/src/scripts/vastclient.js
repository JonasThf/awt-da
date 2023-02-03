const vastclient = require('vast-client');

const date = new Date();

const vastClient = new vastclient.VASTClient();

function getInstance() {
  let icons = [];
  vastClient.get(`http://localhost:3001/getInstance?date=${date.toISOString()}`)
      .then(res => {
        console.log(res.ads[0].creatives[0].icons)
        icons = res.ads[0].creatives[0].icons;
      })
      .catch(function(error) {
        console.log(error)
      });
  return icons;
}



  // if (icons) {
  //   // for (let i = 0; i < icons.length; i++) {
  //   //   let image = new Image();
  //   //   image.src = icons[i];

  //   //   document.body.appendChild(image);

  //   //   image.addEventListener('load', function() {
  //   //     // Show the image
  //   //     image.style.display = 'block';
  //   //   });
      
  //   //   // Listen for a user interaction with the ad
  //   //   image.addEventListener('click', function() {
  //   //     // Remove the image element from the DOM
  //   //     document.body.removeChild(image);
  //   //   });
  //   // }
  //   console.log(document.getElementById('applicationManager'));
  //   let image = document.createElement('img');
  //   image.src = icons[0].staticResource;

  //   document.body.appendChild(image);

  //   image.addEventListener('load', function() {
  //     // Show the image
  //     image.style.display = 'block';
  //   });
    
  //   // Listen for a user interaction with the ad
  //   image.addEventListener('click', function() {
  //     // Remove the image element from the DOM
  //     document.body.removeChild(image);
  //   });
  // }
  // return icons;

  getInstance();