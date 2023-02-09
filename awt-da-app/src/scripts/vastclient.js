function getInstance() {
  const date = new Date();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3001/getInstance?date=${date.toISOString()}`, true);
  xhr.setRequestHeader("Content-Type", "text/xml");
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml")
      console.log(xmlDoc);
      let imageURLs = xmlDoc.getElementsByTagName("StaticResource");
      let icons = xmlDoc.getElementsByTagName("Icon");
      let shape = xmlDoc.getElementsByTagName("Description")[0].textContent;
      
      if (icons.length > 0) {
        if( imageURLs.length > 0) {
          for(let i = 0; i < imageURLs.length; i++) {
            addImage(imageURLs[i].textContent, icons, shape);
          }
          let images = document.getElementById('ad').getElementsByTagName('img');
          console.log(images);
          // show first image
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

function addImage(imageURL, icons, shape) {
  var image = document.createElement("img");
  image.src = imageURL;
  image.style.height = icons[0].attributes.height.textContent;
  image.style.width = icons[0].attributes.width.textContent;
  image.style.left = icons[0].attributes.xPosition.textContent + "px";
  image.style.top = icons[0].attributes.yPosition.textContent + "px";
  image.style.position = "absolute";
  image.style.zIndex = 0;

  // hide image by default
  image.style.display = "none";

  document.getElementById("ad").appendChild(image);
  console.log("image: ", image);
  if (shape === 'l-banner') {
    setBackground(true);
  } else {
    setBackground(false);
  }
}

function deleteImage() {
  let ad = document.getElementById('ad');
  ad.replaceChildren();
}

function setBackground(LBanner) {
  let background = document.getElementById('background-img');
  if(LBanner) {
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

function showAd(duration) {
  let split = duration.split(':');
  let parsedDuration = +(split[0] * 60 * 60 + +split[1] * 60 + +split[2]) * 1000;
  let ad = document.getElementById('ad');
  ad.style.visibility='visible';
  
  setTimeout(function(){
    ad.style.visibility='hidden';
    deleteImage();
    setBackground(false);
  }, parsedDuration);

}