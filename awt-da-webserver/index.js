const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(bodyParser.json());

// Read the current server directory and store the files
function readDirectory(directory) {
  let files = [];
  let fileNames = fs.readdirSync(directory);
  fileNames.forEach(file => {
    let fileData = fs.readFileSync(directory + file, 'utf8');
    files.push(fileData);
  });
  return files;
};

// Middleware to submit a template
app.post("/createTemplate", (req, res) => {
  const template = req.body;
  const title = template.name;
  var refused = false;

  // Check if template name is too short or empty
  if (title.length < 1 || title.includes(' ')) {
    refused = true;
    res.status(406).send("Template name is empty or spaces were used.");
    return;
  }

  // Check if template shape or interaction are empty
  if (template.shape === '' || template.interactions === '') {
    refused = true;
    res.status(406).send("Banner type or interaction not selected.");
    return;
  }
  
  const templates = readDirectory('./templates/');

  // Check if template name already exists
  templates.forEach(x => {
    if (title.toLowerCase() === JSON.parse(x).name.toLowerCase()) {
      refused = true;
      res.status(409).send("Template " + title + " already exists! \nChoose a different Name.");
      return;
    }
  });

  if (!refused) {
    fs.writeFile('./templates/' + title + '.json', JSON.stringify(template), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Template could not be created.");
      }
      else {
        res.status(200).send("Template was created.");
      }
    });
  }
});

// Middleware to pull all templates
app.get("/getTemplates", async (req, res) => {
  try {
    res.status(200).send((readDirectory('./templates/')));
  } catch (e) {
    res.send({ message: "Error in Fetching templates." });
  }
});

// Middleware to submit an instance
app.post("/createInstance", (req, res) => {
  const instance = req.body;
  let fileNames = fs.readdirSync('./instances/');
  let addTitle = 'instance_';

  // Create unique instance names
  const title = addTitle + (fileNames.length + 1) + '_' + instance.name;

  fs.writeFile('./instances/' + title + '.json', JSON.stringify(instance), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Instance was not created.");
    }
    else {
      res.status(200).send("Instance was created.");
    }
  });
});

// Helper function to create XML icons for the VAST XML
function createIcons(instance) {
  const urlTags = instance.media_urls;
  const image = "image/jpeg"
  let xmlTag = ``;
  for (let i = 0; i < urlTags.length; i++) {
    //replace '&' with '&#38;' in URLs since they have to be escaped
    let urlTag = urlTags[i].replaceAll('&', '&#38;');
    xmlTag += `<Icon width="${instance.ad_width}" height="${instance.ad_height}" xPosition="${instance.ad_x}" yPosition="${instance.ad_y}" duration="${instance.duration}">
                  <StaticResource creativeType="${image}">
                      <URL>${urlTag}</URL>
                  </StaticResource>
              </Icon>\n                  `;
  }
  return xmlTag;
}

// Function to create a VAST XML filled with instance parameters
function createXml(instance) {
  const root = "VAST";
  const version = "4.1";
  const system = "Node.js Express Server";
  let shape = instance.shape;
  let iconTags = createIcons(instance)

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <${root} version="${version}">
    <Ad id="${instance.name}">
      <InLine>
        <AdSystem>${system}</AdSystem>
        <AdTitle>${instance.name}</AdTitle>
        <Description>${shape}</Description>
        <Creatives>
          <Creative sequence ="${1}">
            <Linear>
              <Duration>${instance.duration}</Duration>
              <Icons>
                ${iconTags}
              </Icons>
            </Linear>
          </Creative>
        </Creatives>  
      </InLine>  
    </Ad>
  </${root}>`;

  return xml;
}

// Send an instance back in VAST format based on date parameter together with coresponding JSON file TODO
app.get("/getInstance", (req, res) => {
  let instances = readDirectory('./instances/');
  let instance = null;
  const range = instances.length;

  const minutes = new Date(req.query.date).getMinutes();
  if (instances != null) {
    if (instances.length === 0) {
      res.send({ message: "No instances available!" });
    }
    if (instances.length === 1) {
      instance = JSON.parse(instances[0])
    } else {
      // Randomize xml response based on time
      if (minutes % 2 === 0) {
        let number = Math.floor(Math.random() * (range - 1) / 2) * 2;
        instance = JSON.parse(instances[number]);
      } else {
        var number = (Math.floor((Math.random() * (range - 1) / 2)) * 2) + 1;
        instance = JSON.parse(instances[number]);
      }
    }
    // Create VAST XML
    let xmlResponse = createXml(instance);
    res.send({vastXML: xmlResponse, instance: instance});
  } else {
    res.send({ message: "No instances available." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

