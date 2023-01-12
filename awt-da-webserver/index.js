const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors()) 
app.use(bodyParser.json());

function readDirectory() {
    let templates = [];
    let fileNames = fs.readdirSync('./templates/');
    fileNames.forEach(file => {
        let fileData = fs.readFileSync('./templates/'+file, 'utf8');
        templates.push(fileData);
    });
    return templates;
};

app.post("/createTemplate", (req, res) => {
    const template = req.body;
    console.log(template)
    var refused = false;
    const title = template.name;
    const templates = readDirectory();


    

    templates.forEach(x => {
      if (title.toLowerCase() === JSON.parse(x).name.toLowerCase()) {
        refused = true;
        res.status(200).send("Template "+title+" already exists! \nChoose different Name.")
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
          res.status(500).send("Template was not created.");
      }
      else {
        res.status(200).send("Template was created.");
      }
    });
    }
});


app.get("/getTemplates", async (req, res) => {
    try {
        res.status(200).send((readDirectory()));
    } catch (e) {
        res.send({message: "Error in Fetching user"});
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


app.get("/getInstance", (req, res) => {
res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
