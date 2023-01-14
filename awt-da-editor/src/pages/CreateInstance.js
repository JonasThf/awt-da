import React from "react";
import './CreateInstance.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

var parsedTemplates = [];
var templateStrings = [];

const CreateInstance = () => {

    async function getTemplates() {
        
        try {
            const response = await axios.get("http://localhost:3001/getTemplates");
            templateStrings = response.data;
            if (parsedTemplates.length === 0) {
                for (let i = 0; i < templateStrings.length; i++) {
                    let parsedTemplate = JSON.parse(templateStrings[i]);
                    parsedTemplates.push(parsedTemplate);
                }
                showTemplates(parsedTemplates);
            }
            if (parsedTemplates.length !== 0 && parsedTemplates.length < templateStrings.length) {
                parsedTemplates = [];
                for (let i = 0; i < templateStrings.length ; i++) {
                    parsedTemplates.push(JSON.parse(templateStrings[i]));
                }
                showTemplates(parsedTemplates);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
    function showTemplates(parsedTemplates) {
        var select = document.getElementById("selectTemplate");
        for (let i = 0; i < parsedTemplates.length; i++) {
            var el = document.createElement("option");
            el.textContent = parsedTemplates[i].name;
            el.value = parsedTemplates[i].name;
            el.id = parsedTemplates[i].name;
            select.appendChild(el);
        }
    }

    async function submitInstance() {
        var selectedTemplate;
        for (let i = 0; i < parsedTemplates.length; i++) {
            if (parsedTemplates[i].name === document.getElementById('selectTemplate').value) {
                selectedTemplate = parsedTemplates[i];
            }
        }
        
        selectedTemplate.duration = document.getElementById('duration').value;
        selectedTemplate.media_ressource = document.getElementById('URL').value;
        console.log(JSON.stringify(selectedTemplate));

        try {
            const response = await axios.post("http://localhost:3001/createInstance", selectedTemplate, {headers: {'Content-Type': 'application/json'}});
            document.getElementById("formular").reset();
            alert(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
     

    return (
        <div id="createInstance">
            <h1> Create Instance</h1>
            <form id="formular">
            <Button variant="primary" id="gettemp" onClick={getTemplates}>Get Existing Templates</Button>
            <Form.Select id="selectTemplate">
                <option>Choose Template</option>
            </Form.Select>
            
            <br></br><br></br>
                <label id="DurationInSec">Duration in seconds:</label><br></br>
                <input type="number" id="duration" name="duration" min="1" max="20" defaultValue={5}></input><br></br><br></br>
                <label id="AddMedia">Add Media Ressource URL</label><br></br>
                <input type="url" id="URL" name="URL"></input><br/> <br/>
            </form>
            <button id="SubmitInstance" type="button" onClick={submitInstance}>Create Instance</button>
        </div>
    )
};

export default CreateInstance;
