import React from "react";
import './CreateInstance.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

let parsedTemplates = [];
let templateStrings = [];

const CreateInstance = (props) => {

    // State to store the URL input objects
    const [urlInput, setUrlInput] = React.useState(null);

    // State to either show or hide the preview of a template
    const [showHidePreview, setShowHidePreview] = React.useState(true);

    // Pull all templates from the webserver and add them to select
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
                for (let i = 0; i < templateStrings.length; i++) {
                    parsedTemplates.push(JSON.parse(templateStrings[i]));
                }
                addChildren(parsedTemplates);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // Remove options from a select object based on templates available
    function removeChildren(parsedTemplates) {
        var select = document.getElementById("select-template");
        for (let i = 0; i < parsedTemplates.length; i++) {
            select.removeChild(document.getElementById(parsedTemplates[i].name));
        }
    }

    // Add options to a select object based on templates available
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

    // Set duration in format hh:mm:ss
    function formatSeconds(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Helper function that returns a template based on given name
    function getTemplateByName(name) {
        for (let i = 0; i < parsedTemplates.length; i++) {
            if (parsedTemplates[i].name === name) {
                return parsedTemplates[i];
            }
        }
    }

    // Submit an instance to the webserver together with its media
    async function submitInstance() {
        let selectedTemplateName = document.getElementById('select-template').value;
        let selectedTemplate = null;

        if (selectedTemplateName === "") {
            props.setColor('rgb(253, 192, 184)');
            props.setShow();
            props.setRespone("No Template selected. Please select a Template.");
            return;
        }

        // Find the selected template and store it in variable
        for (let i = 0; i < parsedTemplates.length; i++) {
            if (parsedTemplates[i].name === selectedTemplateName) {
                selectedTemplate = parsedTemplates[i];
            }
        }

        //Set duration
        let duration = document.getElementById('duration').value;

        // Default duration is 5 seconds
        if (duration === "") {
            duration = 5;
            selectedTemplate.duration = "00:00:05";
        } else {
            selectedTemplate.duration = formatSeconds((document.getElementById('duration').value));
        }
        
        // Check if media URLs are empty
        let urls = loadMedia();

        // If urls is empty show error message
        if(urls.length === 0) {
            props.setColor('rgb(253, 192, 184)');
            props.setShow();
            props.setRespone("No URL(s) were provided. Please enter a URL.");
            return;
        } else {
            selectedTemplate.media_urls = loadMedia();
        }

        try {
            const response = await axios.post("http://localhost:3001/createInstance", selectedTemplate, {
                    headers: { 'Content-Type': 'application/json' },
                    maxContentLength: 100000000,
                    maxBodyLength: 1000000000
            });
           
            if (response.status === 200) {
                props.setColor('rgb(198, 253, 184)');
                props.setShow();
                props.setRespone(response.data+' Ad duration: '+duration+'s.');
            }
        }
        catch (error) {
            props.setColor('rgb(253, 192, 184)');
            props.setShow();
            props.setRespone(error.response.data);
            return;
        }
        document.getElementById('instance-form').reset();
        setUrlInput(null);
        props.setPreview(null);
    }

    // Shows preview box of ad based on template
    function showPreview(template) {
        // Show preview box based on template shape
        if (template.shape === 'l-banner') {
            props.setPreview(null);
            props.setPreviewLBanner(<div style={{
                position: 'absolute',
                display: "flex",
                backgroundColor: '#0d6efd',
                fontSize: '30px',
                justifyContent: "center",
                alignItems: "center",
                color: '#FFFFFF',
                left: template.broadcast_x,
                top: template.broadcast_y,
                width: template.broadcast_width,
                height: template.broadcast_height,
                zIndex: 4
            }}>Broadcast</div>);
        } else {
            props.setPreviewLBanner(null);
            props.setPreview(<div style={{
                position: "absolute",
                display: "flex",
                backgroundColor: '#0d6efd',
                fontSize: '30px',
                justifyContent: "center",
                alignItems: "center",
                color: '#FFFFFF',
                height: template.ad_height,
                width: template.ad_width,
                left: template.ad_x,
                top: template.ad_y,
                border: "1px solid black"
            }}>Your ad!</div>);
        }
    }

    // Make fields visible for URL inputs based on the template type. If no interaction -> show one URL input
    function showInputURL() {
        let select = document.getElementById("select-template");

        // Switch button if selected-template is switched and button is false
        if (!showHidePreview) {
            setShowHidePreview(true);
        }

        if (!(select.value === "")) {
            let selectedTemplate = getTemplateByName(select.value);
            let url_input = <Form.Group className="mb-3" id="url-upload-group">
                <Form.Control className="input-url" type="url" placeholder="Example URL" defaultValue={""} />
            </Form.Group>;

            // Show preview of template without media
            showPreview(selectedTemplate);

            if (selectedTemplate.interactions === '1') {
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
                setUrlInput(
                    <div className="url-input-div">
                        {url_input}
                    </div>
                );
            }
        } else {
            setUrlInput(null);
            props.setPreview(null);
            props.setPreviewLBanner(null);
        }
    }

    // Return URLs from input forms
    function loadMedia() {
        let media_urls = [];
        let url_input_elements = document.getElementsByClassName("input-url");

        for (let i = 0; i < url_input_elements.length; i++) {
            if (!(url_input_elements[i].value === '')) {
                media_urls.push(url_input_elements[i].value);
            }
        }
        return media_urls;
    }

    // Show a preview of the selected template and its first image
    function showMedia() {
        let select = document.getElementById("select-template");
        let selectedTemplate = getTemplateByName(select.value);

        if (showHidePreview) {
            let media_urls = loadMedia();

            if (media_urls.length === 0) {
                props.setColor('rgb(253, 192, 184)');
                props.setShow();
                props.setRespone('No URLs provided to preview.');
                return;
            } else {
                let frontImgURL = media_urls[0];
                props.setPreview(<img style={{
                    height: selectedTemplate.ad_height,
                    width: selectedTemplate.ad_width,
                    left: selectedTemplate.ad_x,
                    top: selectedTemplate.ad_y,
                    position: "absolute",
                    border: "1px solid black",
                    padding: 0,
                    zIndex: -1
                }} alt=' Wrong URL! Media could not be loaded.' src={frontImgURL}></img>);
                setShowHidePreview(false);
            }
        } else {
            // Show preview of template without media
            showPreview(selectedTemplate);
            setShowHidePreview(true);
        }
        return;
    }

    return (
        <div id="create-instance">
            <h1> Create<br/>Instance</h1>
            <Form id="instance-form">
                <Button variant="primary" id="get-templates-button" onClick={getTemplates}>Get Existing Templates</Button>
                <Form.Select id="select-template" onChange={showInputURL}>
                    <option value="">Choose Template</option>
                </Form.Select>
                <InputGroup className="mb-3">
                    <Form.Control id="duration" type="number" placeholder="Duration in Seconds" min="5" max="20" defaultValue={""}/>
                </InputGroup>
                {urlInput ? <Form.Label id="url-label">Media URL(s)</Form.Label> : null}
                {urlInput}
            </Form>
            {urlInput ? <Button variant="primary" id="show-preview-button" onClick={showMedia}>{showHidePreview ? "Show Preview" : "Hide Preview"}</Button> : null}
            <Button variant="primary" id="create-instance-button" onClick={submitInstance}>Submit Instance</Button>
        </div>
    )
};

export default CreateInstance;
