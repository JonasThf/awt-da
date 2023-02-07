import React from "react";
import './CreateInstance.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

var parsedTemplates = [];
var templateStrings = [];

const CreateInstance = (props) => {

    const [urlInput, setUrlInput] = React.useState(null);
    const [showHidePreview, setShowHidePreview] = React.useState(true);

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
        let selectedTemplate = null;
        
        for (let i = 0; i < parsedTemplates.length; i++) {
            if (parsedTemplates[i].name === document.getElementById('select-template').value) {
                selectedTemplate = parsedTemplates[i];
            }
        }
        
        // Set duration in format hh:mm:ss
        function formatSeconds(seconds) {
            let hours = Math.floor(seconds / 3600);
            let minutes = Math.floor((seconds % 3600) / 60);
            let remainingSeconds = seconds % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
          }
        //Set duration
        selectedTemplate.duration = formatSeconds((document.getElementById('duration').value));

        // Set media URLs
        selectedTemplate.media_urls = loadMedia();
        
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
        setUrlInput(null);
        props.setPreview(null);
    }

    function getTemplateByName(name) {
        for (let i = 0; i < parsedTemplates.length; i++) {
            if(parsedTemplates[i].name === name) {
                return parsedTemplates[i];
            }
        }
    }

    // function showUpload() {
    //     let select = document.getElementById("select-template");
    //     props.setPreview(null);
    //     setuploadElement(<div></div>);
    //     if(select.value === 'Choose Template' ) {
    //         setuploadElement(null);
    //     } else {
    //         let selectedTemplate = getTemplateByName(select.value);
    //         if(selectedTemplate.interactions === '1') {
    //             setuploadElement(<Form.Group controlId="formFileMultiple" className="mb-3">
    //                                 <Form.Label>Choose media to upload</Form.Label>
    //                                 <Form.Control type="file" multiple onChange={uploadFiles}/>
    //                             </Form.Group>);
    //         } else {
    //             setuploadElement(<Form.Group controlId="formFile" className="mb-3">
    //                                 <Form.Label>Choose media to upload</Form.Label>
    //                                 <Form.Control type="file" onChange={uploadFiles}/>
    //                             </Form.Group>);
    //         }
    //     }
    // }
    
    // const uploadFiles = imageFiles => {
    //     // Get files in array form
    //     let images = Array.from(imageFiles.target.files);
    //     console.log('test');
    //     // Map each file to a promise and read file data 
    //     Promise.all(images.map(file => {
    //         return (new Promise((resolve,reject) => {
    //             const reader = new FileReader();
    //             reader.addEventListener('load', (ev) => {
    //                 resolve(ev.target.result);
    //             });
    //             reader.addEventListener('error', reject);
    //             reader.readAsDataURL(file);
    //         }));
    //     }))
    //     .then(images => {

    //         // Once all promises are resolved, update state with image array //
    //         setImages(images);
    //         console.log('Images: ',images);
    //         showPreview(images);
    //     });
    // }

    function showInputURL() {
        let select = document.getElementById("select-template");

        // Switch button if selected-template is switched and button is false
        if(!showHidePreview) {
            setShowHidePreview(true);
        }

        if (!(select.value === 'Choose Template')) {
            let selectedTemplate = getTemplateByName(select.value);
            let url_input = <Form.Group className="mb-3" id="url-upload-group">
                                <Form.Control className="input-url" type="url" placeholder="Example URL"/>
                            </Form.Group>;

            // Show empty preview box based on selected template
            if (selectedTemplate.shape === 'l-banner') {
                props.setPreview(null);
                props.setPreviewLBanner(<div style={{
                    position: 'absolute',
                    backgroundColor: 'gray',
                    right: '1px',
                    top: '1px',
                    width: '80%',
                    height: '70%', 
                    padding: 0,
                    zIndex: 4
                }}></div>);
            } else {
                props.setPreviewLBanner(null);
                props.setPreview(<div style={{
                    height: selectedTemplate.height, 
                    width: selectedTemplate.width, 
                    left: selectedTemplate.x, 
                    top: selectedTemplate.y, 
                    position: "absolute",
                    border: "1px solid black",
                    padding: 0
                }}></div>);
            }
            
            if(selectedTemplate.interactions === '1') {
                setUrlInput(
                <div className="url-input-div">
                    {url_input}
                    {url_input}
                    {url_input}
                </div>
                );
            } else if (selectedTemplate.interactions === '2') {
                setUrlInput(
                    <div className="url-input-div">
                        {url_input}
                    </div>
                );
            } else {
                setUrlInput(<div className="url-input-div"></div>);
            }
        } else {
            setUrlInput(null);
            props.setPreview(null);
            props.setPreviewLBanner(null);
        }
    }

    function loadMedia() {
        let media_urls = [];
        let url_input_elements = document.getElementsByClassName("input-url");

        for (let i = 0; i < url_input_elements.length; i++) {
            if(!(url_input_elements[i].value === '')) {
                media_urls.push(url_input_elements[i].value);
            }
        }
        return media_urls;
    }

    function showPreview() {
        if (showHidePreview) {
            let select = document.getElementById("select-template");
            let selectedTemplate = getTemplateByName(select.value);

            let media_urls = loadMedia();
            
            if (media_urls[0]) {
                let frontImgURL = media_urls[0];
                props.setPreview(<img style={{
                    height: selectedTemplate.height, 
                    width: selectedTemplate.width, 
                    left: selectedTemplate.x, 
                    top: selectedTemplate.y, 
                    position: "absolute",
                    border: "1px solid black",
                    padding: 0,
                    zIndex: -1
                }} alt='preview' src={frontImgURL}></img>);
            }
        } else {
            props.setPreview(null);
        }
        return;
    }

    return (
        <div id="create-instance">
            <h1> Create Instance</h1>
            <Form id="instance-form">
                <Button variant="primary" id="get-templates-button" onClick={getTemplates}>Get Existing Templates</Button>
                <Form.Select id="select-template" onChange={() => {
                    showInputURL();
                    // showUpload();
                    }}>
                    <option>Choose Template</option>
                </Form.Select>
                <InputGroup className="mb-3">
                    <Form.Control id="duration" type="number" placeholder="Duration in Seconds" min="5" max="60"/>
                </InputGroup>
                { urlInput ? <Form.Label id="url-label">Media URL(s)</Form.Label> : null}
                {urlInput}
                {/* {uploadElement} */}
                </Form>
                <Button variant="primary" id="show-preview-button" onClick={() => {
                    setShowHidePreview(!showHidePreview);
                    showPreview();
                    }}>{ showHidePreview ? "Show Preview" : "Hide Preview" }
                </Button>
                <Button variant="primary" id="create-instance-button" onClick={submitInstance}>Create Instance</Button>
        </div>
    )
};

export default CreateInstance;
