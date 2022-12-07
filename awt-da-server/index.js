const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { waitForDebugger } = require("inspector");
//var jsonParser = bodyParser.json();

const PORT = process.env.PORT || 3001;

const app = express();

let templates = readDirectory('./templates/');

app.use(cors()) 
app.use(bodyParser.json());

app.post("/createTemplate", (req, res) => {
    const template = req.body;
    console.log(template)
    
    const title = template.name;
    fs.writeFile('./templates/'+title+'.json', JSON.stringify(template), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Template was not created.");
        }
        else {
          res.status(200).send("Template was created.");
        }
      });
    
  });

function readDirectory(templatesFolder) {
    const templates = [];
    fs.readdir(templatesFolder, (err, files) => {
        files.forEach(fileName => {
            fs.readFile(templatesFolder+fileName, 'utf8', (err, file) => {
                console.log(file);
                templates.push(JSON.parse(file));
                console.log(templates.length);
            });
            console.log(templates);
        });
    });
    return templates;
};

app.get("/getTemplates", async (req, res) => {
    try {
        res.status(200).send((templates));
    } catch (e) {
        res.send({message: "Error in Fetching user"});
    }
});

app.post("/createInstance", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


app.get("/getInstance", (req, res) => {
res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
