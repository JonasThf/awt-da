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
        let selectedTemplate = null;

        for (let i = 0; i < parsedTemplates.length; i++) {
            if (parsedTemplates[i].name === document.getElementById('select-template').value) {
                selectedTemplate = parsedTemplates[i];
            }
        }

        // Set duration
        selectedTemplate.duration = formatSeconds((document.getElementById('duration').value));

        // Set media URLs
        selectedTemplate.media_urls = loadMedia();

        try {
            const response = await axios.post(
                "http://localhost:3001/createInstance",
                selectedTemplate,
                {
                    headers: { 'Content-Type': 'application/json' },
                    maxContentLength: 100000000,
                    maxBodyLength: 1000000000
                });
            if (response.data.includes('Instance could not be created.')) {
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

    // Make fields visible for URL inputs based on the template type. If no interaction -> show one URL input
    function showInputURL() {
        let select = document.getElementById("select-template");

        // Switch button if selected-template is switched and button is false
        if (!showHidePreview) {
            setShowHidePreview(true);
        }

        if (!(select.value === 'Choose Template')) {
            let selectedTemplate = getTemplateByName(select.value);
            let url_input = <Form.Group className="mb-3" id="url-upload-group">
                <Form.Control className="input-url" type="url" placeholder="Example URL" />
            </Form.Group>;

            // Show preview box based on selected template
            if (selectedTemplate.shape === 'l-banner') {
                props.setPreview(null);
                props.setPreviewLBanner(<div style={{
                    position: 'absolute',
                    display: "flex",
                    backgroundColor: '#0d6efd',
                    fontSize: '30px',
                    justifyContent: "center",
                    alignItems: "center",
                    color: '#FFFFFF',
                    left: selectedTemplate.broadcast_x,
                    top: selectedTemplate.broadcast_y,
                    width: selectedTemplate.broadcast_width,
                    height: selectedTemplate.broadcast_height,
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
                    height: selectedTemplate.ad_height,
                    width: selectedTemplate.ad_width,
                    left: selectedTemplate.ad_x,
                    top: selectedTemplate.ad_y,
                    border: "1px solid black"
                }}>Your ad!</div>);
            }

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
    function showPreview() {
        if (showHidePreview) {
            let select = document.getElementById("select-template");
            let selectedTemplate = getTemplateByName(select.value);

            let media_urls = loadMedia();

            if (media_urls[0]) {
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
                }} alt='preview' src={frontImgURL}></img>);
            }
        } else {
            props.setPreview(null);
        }
        return;
    }

    return (
        <div id="create-instance">
            <h1> Create<br/>Instance</h1>
            <Form id="instance-form">
                <Button variant="primary" id="get-templates-button" onClick={getTemplates}>Get Existing Templates</Button>
                <Form.Select id="select-template" onChange={() => {
                    showInputURL();
                }}>
                    <option>Choose Template</option>
                </Form.Select>
                <InputGroup className="mb-3">
                    <Form.Control id="duration" type="number" placeholder="Duration in Seconds" min="5" max="20" />
                </InputGroup>
                {urlInput ? <Form.Label id="url-label">Media URL(s)</Form.Label> : null}
                {urlInput}
            </Form>
            {urlInput ? <Button variant="primary" id="show-preview-button" onClick={() => {
                setShowHidePreview(!showHidePreview);
                showPreview();
            }}>{showHidePreview ? "Show Preview" : "Hide Preview"}
            </Button> : null}
            <Button variant="primary" id="create-instance-button" onClick={submitInstance}>Submit Instance</Button>
        </div>
    )
};

export default CreateInstance;
