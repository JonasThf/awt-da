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
      var icons = xmlDoc.getElementsByTagName("Icon");
      console.log("ICON 0", icons[0].attributes.height.textContent)
      console.log(imageURLs);
      if (imageURLs.length >= 1) {
          for(let i = 0; i < imageURLs.length; i++) {
              var imageURL = imageURLs[i].textContent;
              var image = document.createElement("img");
              image.src = imageURL;
              image.style.height = icons[i].attributes.height.textContent + "px";
              image.style.width = icons[i].attributes.width.textContent + "px";
              image.style.left = icons[i].attributes.xPosition.textContent + "px";
              image.style.top = icons[i].attributes.yPosition.textContent + "px";
              image.style.duration = icons[i].attributes.duration.textContent;
              document.getElementById("ad").appendChild(image);
              
          }
      } else if (imageURLs.length === 1) {
          var imageURL = xmlDoc.getElementsByTagName("StaticResource")[0].textContent;
          var image = document.createElement("img");
          image.src = imageURL;
          document.getElementById("ad").appendChild(image);
          image.style.height = icons[0].attributes.height.textContent + "px";
          image.style.width= icons[0].attributes.width.textContent + "px";
          image.style.left = icons[0].attributes.xPosition.textContent + "px";
          image.style.top = icons[0].attributes.yPosition.textContent + "px";
          image.style.duration = icons[0].attributes.duration.textContent;
      } else {
          console.log('No image URLs found.');
      }

      console.log("imagee1", image)

      //hier kann ich dann das style attribut setzen mit den Variablem

      console.log("image 222", image)

      //hier dann ein Style attribut erstellen mit den sizes und den duration
      //dann noch gucken welcher banner bei L banner dann einfach 100 % müssen dann aber den TV resizen das noch nicht ganz klar
    }
  };
  xhr.send();
}

getInstance();    // Es geht komischerweise nur wenn diese Zeile hier drin ist, ansonsten findet er die methode nicht. Es liegt daran dass es im div ist nur nicht im body.