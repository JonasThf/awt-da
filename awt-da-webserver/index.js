
const createVast = require('vast-builder');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { version } = require('os');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors()) 
app.use(bodyParser.json());

function readDirectory(directory) {
    let files = [];
    let fileNames = fs.readdirSync(directory);
    fileNames.forEach(file => {
        let fileData = fs.readFileSync(directory+file, 'utf8');
        files.push(fileData);
    });
    return files;
};

app.post("/createTemplate", (req, res) => {
    const template = req.body;
    console.log(template);
    var refused = false;
    const title = template.name;
    const templates = readDirectory('./templates/');

    templates.forEach(x => {
      if (title.toLowerCase() === JSON.parse(x).name.toLowerCase()) {
        refused = true;
        res.status(200).send("Template "+title+" already exists! \nChoose a different Name.")
      }
      else if (title.length < 1 || title.includes(' ')) {
          refused = true;
          res.status(200).send("Template name is empty or spaces were used.")
      }
    });

    if(!refused) {
      fs.writeFile('./templates/'+title+'.json', JSON.stringify(template), (err) => {
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


app.get("/getTemplates", async (req, res) => {
    try {
        res.status(200).send((readDirectory('./templates/')));
    } catch (e) {
        res.send({message: "Error in Fetching templates."});
    }
});

app.post("/createInstance", (req, res) => {
    const instance = req.body;
    console.log(instance);
    let fileNames = fs.readdirSync('./instances/');
    let addTitle = 'instance_';
    const title = addTitle+(fileNames.length+1)+'_'+instance.name;
    fs.writeFile('./instances/'+title+'.json', JSON.stringify(instance), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Instance was not created.");
        }
        else {
          res.status(200).send("Instance was created.");
        }
      });
  });

  function createIcons(instance){
    const urlTags = instance.media_urls;
    const image = "image/jpeg"
    let xmlTag = ``;
    for (let i = 0; i<urlTags.length; i++){
      xmlTag += `<Icon width ="${instance.width}" height="${instance.height}" xPosition="${instance.x}" yPosition="${instance.y}" duration="${instance.duration}">
                    <StaticResource creativeType="${image}">
                       <URL>${urlTags[i]}</URL>
                    </StaticResource>
                </Icon>\n                  `;
    }
    return xmlTag;
  }
function createXml(instance){
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

app.get("/getInstance", (req, res) => {
  let instances = readDirectory('./instances/');
  console.log('length',instances.length)
  let instance = null;
  const range = instances.length;

  const minutes = new Date(req.query.date).getMinutes();
  if(instances != null){
    if (instances.length === 0) {
      res.send({ message: "No instances available!" });
    }
    if(instances.length === 1){
      instance = JSON.parse(instances[0])
    }
    else{
    // for random xml response
      if(minutes % 2 === 0){
        let number = Math.floor( Math.random() * (range-1) / 2 ) * 2;
        instance = JSON.parse(instances[number]);
      } else {
        var number = (Math.floor( (Math.random() * (range-1)/ 2 )) * 2)+1;
        instance = JSON.parse(instances[number]);
      }

    }
    let xmlResponse = createXml(instance)
  console.log(xmlResponse)
  res.send(xmlResponse);

}
  //res.send({message: "No instances"})
});
  


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

