
// Function to pull a random ad instance from the webserver and display it based on a date parameter
function getInstance() {
  const date = new Date();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3001/getInstance?date=${date.toISOString()}`, true);
  xhr.setRequestHeader("Content-Type", "text/xml");
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let parser = new DOMParser();
      let response = JSON.parse(xhr.responseText);
      let xmlDoc = parser.parseFromString(response.vastXML, "text/xml");
      let instance_json = response.instance;
      let imageURLs = xmlDoc.getElementsByTagName("StaticResource");
      let icons = xmlDoc.getElementsByTagName("Icon");
      let shape = xmlDoc.getElementsByTagName("Description")[0].textContent;

      if (icons.length > 0) {
        if (imageURLs.length > 0) {
          for (let i = 0; i < imageURLs.length; i++) {
            addImage(imageURLs[i].textContent, icons, shape, instance_json);
          }

          // If shape is l-banner, change the background accordingly
          if (shape === 'l-banner') {
            setBackground(1, instance_json);
          } else {
            setBackground(0, instance_json);
          }

          let images = document.getElementById('ad').getElementsByTagName('img');
          
          // Show only the first image
          images[0].style.display = "block";
          showAd(icons[0].attributes.duration.textContent, shape, instance_json);
        } else {
          console.log('No image URLs found.');
        }
      } else {
        console.log('No icons found.')
      }
    }
  };
  xhr.send();
}

// Add an image child tag to the object 'ad'
function addImage(imageURL, icons) {
  var image = document.createElement("img");
  image.src = imageURL;
  image.style.height = icons[0].attributes.height.textContent;
  image.style.width = icons[0].attributes.width.textContent;
  image.style.left = icons[0].attributes.xPosition.textContent + "px";
  image.style.top = icons[0].attributes.yPosition.textContent + "px";
  image.style.position = "absolute";
  image.style.zIndex = 0;

  // Hide image by default
  image.style.display = "none";

  document.getElementById("ad").appendChild(image);
}

// Delete an image child tag from the object 'ad'
function deleteImage() {
  let ad = document.getElementById('ad');
  ad.replaceChildren();
}

// Set the background for each banner case
function setBackground(bannerCase, instance_json) {
  let broadcast = document.getElementById('background-img');
  switch (bannerCase) {

    // Resize breadcast to fullscreen and behind ad
    case 0:
      broadcast.style.position = 'absolute';
      broadcast.style.width = '100%';
      broadcast.style.height = '100%';
      broadcast.style.zIndex = -1;
      break;
    
    // Resize broadcast to smaler window infront of ad
    case 1:
      broadcast.style.position = "absolute";
      broadcast.style.top = 0;
      broadcast.style.right = 0;
      broadcast.style.width = instance_json.broadcast_width;
      broadcast.style.height = instance_json.broadcast_height;
      broadcast.style.zIndex = 1;
      break;

    // Resize broadcast to fullscreen and infront of ad
    case 2:
      broadcast.style.position = 'absolute';
      broadcast.style.width = '100%';
      broadcast.style.height = '100%';
      broadcast.style.zIndex = 1;
      break;

    default:
      break;
  }
}

// Show an ad based on a duration
function showAd(duration, shape, instance_json) {
  let split = duration.split(':');
  let parsedDuration = +(split[0] * 60 * 60 + +split[1] * 60 + +split[2]) * 1000;
  let ad = document.getElementById('ad');
  ad.style.visibility = 'visible';

  // Hide the ad when the duration is over
  if (shape === 'l-banner') {
    // Set background first
    setTimeout(function () {
      setBackground(2, instance_json);
    }, parsedDuration);
    // Hold ad image for two more seconds
    setTimeout(function () {
      ad.style.visibility = 'hidden';
      deleteImage();
    }, parsedDuration+2000);
  } else {
    setTimeout(function () {
      ad.style.visibility = 'hidden';
      deleteImage();
      setBackground(0, instance_json);
    }, parsedDuration);
  }
}