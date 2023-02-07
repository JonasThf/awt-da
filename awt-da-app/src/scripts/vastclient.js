function getInstance() {
  const date = new Date();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3001/getInstance?date=${date.toISOString()}`, true);
  xhr.setRequestHeader("Content-Type", "text/xml");
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xhr.responseText, "text/xml")
      console.log(xmlDoc);
      var imageURLs = xmlDoc.getElementsByTagName("StaticResource");
      console.log(imageURLs);
      if (imageURLs.length >= 1) {
          for(let i = 0; i < imageURLs.length; i++) {
              var imageURL = imageURLs[i].textContent;
              var image = document.createElement("img");
              image.src = imageURL;
              document.getElementById("ad").appendChild(image);
          }
      } else if (imageURLs.length === 1) {
          var imageURL = xmlDoc.getElementsByTagName("StaticResource")[0].textContent;
          var image = document.createElement("img");
          image.src = imageURL;
          document.getElementById("ad").appendChild(image);
      } else {
          console.log('No image URLs found.');
      }
    }
  };
  xhr.send();
}

getInstance();    // Es geht komischerweise nur wenn diese Zeile hier drin ist, ansonsten findet er die methode nicht. Es liegt daran dass es im div ist nur nicht im body.