import React from "react";
import './CreateInstance.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

var parsedTemplates = [];
var templateStrings = [];

const CreateInstance = (props) => {

    const [uploadElement, setuploadElement] = React.useState(<div></div>);
    const [images, setImages] = React.useState(null);

    async function getTemplates() {
        
        try {
            const response = await axios.get("http://localhost:3001/getTemplates");
            templateStrings = response.data;
            if (parsedTemplates.length === 0) {
                for (let i = 0; i < templateStrings.length; i++) {
                    let parsedTemplate = JSON.parse(templateStrings[i]);
                    parsedTemplates.push(parsedTemplate);
                }
                addChildren(parsedTemplates);
            }
            if (parsedTemplates.length !== 0 && parsedTemplates.length < templateStrings.length) {
                removeChildren(parsedTemplates);
                parsedTemplates = [];
                for (let i = 0; i < templateStrings.length ; i++) {
                    parsedTemplates.push(JSON.parse(templateStrings[i]));
                }
                addChildren(parsedTemplates);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
    function removeChildren(parsedTemplates) {
        var select = document.getElementById("select-template");
        for (let i = 0; i < parsedTemplates.length; i++) {
            select.removeChild(document.getElementById(parsedTemplates[i].name));
        }
    }

    function addChildren(parsedTemplates) {
        var select = document.getElementById("select-template");
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
            if (parsedTemplates[i].name === document.getElementById('select-template').value) {
                selectedTemplate = parsedTemplates[i];
            }
        }
        
        selectedTemplate.duration = document.getElementById('duration').value;
        if (selectedTemplate.interactions === '1') {
            selectedTemplate.media_ressource = images;
        }
        selectedTemplate.media_ressource = images;
        
        console.log(JSON.stringify(selectedTemplate));

        try {
            const response = await axios.post(
                "http://localhost:3001/createInstance",
                selectedTemplate,
                {headers: {'Content-Type': 'application/json'},
                maxContentLength: 100000000,
                maxBodyLength: 1000000000
            });
            if(response.data.includes('Instance could not be created.')) {
                props.setColor('rgb(253, 192, 184)');
              } else {
                props.setColor('rgb(198, 253, 184)');
              }
              props.setShow();
              props.setRespone(response.data);
        }
        catch (error) {
            console.log(error);
        }
        document.getElementById('instance-form').reset();
        showPreview(images);
    }

    function getTemplateByName(name) {
        for (let i = 0; i < parsedTemplates.length; i++) {
            if(parsedTemplates[i].name === name) {
                return parsedTemplates[i];
            }
        }
    }

    function showUpload() {
        let select = document.getElementById("select-template");
        props.setPreview(null);
        setuploadElement(<div></div>);
        if(select.value === 'Choose Template' ) {
            setuploadElement(null);
        } else {
            let selectedTemplate = getTemplateByName(select.value);
            if(selectedTemplate.interactions === '1') {
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

    function showPreview(images) {
        let select = document.getElementById("select-template");
        let frontImg = images[0];
        let selectedTemplate = getTemplateByName(select.value);
        props.setPreview(<img id="preview" style={{
            height: selectedTemplate.height, 
            width: selectedTemplate.width, 
            left: selectedTemplate.x, 
            top: selectedTemplate.y, 
            position: "absolute",
            border: "1px solid black"
        }} alt='preview' src={frontImg}></img>);
    
        return null;
    }

    const uploadFiles = imageFiles => {
        // Get files in array form
        let images = Array.from(imageFiles.target.files);
        console.log('test');
        // Map each file to a promise and read file data 
        Promise.all(images.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
        .then(images => {

            // Once all promises are resolved, update state with image array //
            setImages(images);
            console.log('Images: ',images);
            showPreview(images);
        });
    }
    
    
    return (
        <div id="createInstance">
            <h1> Create Instance</h1>
            <Form id="instance-form">
                <Button variant="primary" id="gettemp" onClick={getTemplates}>Get Existing Templates</Button>
                <Form.Select id="select-template" onChange={() => {
                    showUpload();
                    }}>
                    <option>Choose Template</option>
                </Form.Select>
                <Form.Label htmlFor="duration" id="duration-label">Duration in Seconds</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control id="duration" type="number" min="5" max="60"/>
                </InputGroup>
                {uploadElement}
                <Button variant="primary" id="createinstancebutton" onClick={submitInstance}>Create Instance</Button>
            </Form>
        </div>
    )
};

export default CreateInstance;
