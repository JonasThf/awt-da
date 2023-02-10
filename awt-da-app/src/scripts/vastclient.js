
// Function to pull a random ad instance from the webserver and display it based on a date parameter
function getInstance() {
  const date = new Date();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3001/getInstance?date=${date.toISOString()}`, true);
  xhr.setRequestHeader("Content-Type", "text/xml");
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml")
      let imageURLs = xmlDoc.getElementsByTagName("StaticResource");
      let icons = xmlDoc.getElementsByTagName("Icon");
      let shape = xmlDoc.getElementsByTagName("Description")[0].textContent;

      if (icons.length > 0) {
        if (imageURLs.length > 0) {
          for (let i = 0; i < imageURLs.length; i++) {
            addImage(imageURLs[i].textContent, icons, shape);
          }
          let images = document.getElementById('ad').getElementsByTagName('img');
          
          // Show only the first image
          images[0].style.display = "block";
          showAd(icons[0].attributes.duration.textContent);
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
function addImage(imageURL, icons, shape) {
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
  
  // If the shape is l-banner, change the background accordingly
  if (shape === 'l-banner') {
    setBackground(true);
  } else {
    setBackground(false);
  }
}

// Delete an image child tag from the object 'ad'
function deleteImage() {
  let ad = document.getElementById('ad');
  ad.replaceChildren();
}

// Set the background whenever an l-banner should be shown
function setBackground(LBanner) {
  let background = document.getElementById('background-img');
  if (LBanner) {
    background.style.position = "absolute";
    background.style.right = 0;
    background.style.top = 0;
    background.style.width = '80%';
    background.style.height = '70%';
    background.style.zIndex = 1;
  } else {
    background.style.position = 'absolute';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = -1;
  }
}

// Show an ad based on a duration
function showAd(duration) {
  let split = duration.split(':');
  let parsedDuration = +(split[0] * 60 * 60 + +split[1] * 60 + +split[2]) * 1000;
  let ad = document.getElementById('ad');
  ad.style.visibility = 'visible';

  // Hide the ad when the duration is over
  setTimeout(function () {
    ad.style.visibility = 'hidden';
    deleteImage();
    setBackground(false);
  }, parsedDuration);

}