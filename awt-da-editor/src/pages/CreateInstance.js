import React from "react";
import './CreateInstance.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Filecontext } from '../Filecontext';
import { useContext } from 'react';

var parsedTemplates = [];
var templateStrings = [];

const CreateInstance = () => {

    const [uploadElement, setuploadElement] = React.useState(<div></div>);
    const [files, setFiles] = React.useState(null);
    const [picture, setPicture] = React.useState(null);
    const { setImgData } = useContext(Filecontext)
    

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

    function uploadMedia() {
        const formData = new FormData();
     
        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
     
        // Details of the uploaded file
        console.log(this.state.selectedFile);
        
        // Request made to the backend api
        // Send formData object
        //axios.post("api/uploadfile", formData);
    };

    function showUpload() {
        var select = document.getElementById("selectTemplate");
        if(select.value === 'Choose Template' ) {
            setuploadElement(<div></div>);  
        } else {
            for (let i = 0; i < parsedTemplates.length; i++) {
                if(parsedTemplates[i].name === select.value) {
                    var selectedTemplate = parsedTemplates[i];
                    if(selectedTemplate.interactions.includes('Change Image')) {
                        setuploadElement(<Form.Group controlId="formFileMultiple" className="mb-3">
                                            <Form.Label>Choose media to upload</Form.Label>
                                            <Form.Control type="file" multiple onChange={uploadFiles}/>
                                        </Form.Group>);
                    } else {
                        setuploadElement(<Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Choose media to upload</Form.Label>
                                            <Form.Control type="file" onChange={uploadFiles}/>
                                        </Form.Group>);
                    }
                }
            }
        }
        
    }

    const uploadFiles = e => {
        if (e.target.files[0]) {
          console.log("picture: ", e.target.files);
          setPicture(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };

    return (
        <div id="createInstance">
            <h1> Create Instance</h1>
            <Button variant="primary" id="gettemp" onClick={getTemplates}>Get Existing Templates</Button>
            <Form.Select id="selectTemplate" onChange={showUpload}>
                <option>Choose Template</option>
            </Form.Select>
            
            <br></br><br></br>
            <Form.Label htmlFor="duration"><b>Duration in Seconds</b></Form.Label>
            <InputGroup className="mb-3">
                <Form.Control id="duration"/>
            </InputGroup>
            {uploadElement}
            <Button variant="primary" id="upload" onClick={uploadMedia}>Upload</Button><br></br>
            <Button variant="primary" id="createinstancebutton" onClick={submitInstance}>Create Instance</Button>
        </div>
    )
};

export default CreateInstance;
