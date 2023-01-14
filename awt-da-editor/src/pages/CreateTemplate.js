import React from "react";
import "./CreateTemplate.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


/* eslint-disable */
const CreateTemplate = () => {

async function submit () {
    
    var title = document.getElementById("templatename").value
    var resizing = document.getElementById("image").checked
    var interactions = document.getElementById("interaction").value
    var da_type = document.getElementById("da-type").value

    var  template = {
        "name": title,
        "daType": da_type,
        "image_resize": resizing,
        "interactions": interactions,
        "duration": 0, 
        "media_ressource": "",
        "width": "50%",
        "ad_text": "Text for advertisement",
        "font-size": "30px",
        "height": "70px", 


    }

    var templateAsString = JSON.stringify(template)
    console.log(templateAsString);

    try {
        const response = await axios.post("http://localhost:3001/createTemplate", template, {headers: {'Content-Type': 'application/json'}});
        document.getElementById("formular").reset();
        alert(response.data);
    }
    catch (error) {
        console.log(error);
    }
  }


  return (
<<<<<<< HEAD
    <div id="createTemplate">
      <h1>Create Template</h1>
        <Form id="formular" >
          <Form.Group className="mb-3" id="templatename">
            <Form.Label id="label">Template Name</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
        </Form>
        <Form.Select id="selectShape">
          <option>Choose a shape</option>
          <option value="1">Standard</option>
          <option value="2">L-Banner</option>
        </Form.Select>
        <Form.Select id="selectInteraction">
          <option>Choose Interaction</option>
          <option value="1">Change image when pressing color buttons</option>
          <option value="2">Something else</option>
        </Form.Select>
        <Form.Group id="checkboxGroup">
          <Form.Check id="checkbox" type="checkbox" label="Image Resizing" />
        </Form.Group>
      <br/>
      <br/>
      <Button variant="primary" id="submittemp" onClick={submit}>Submit Template</Button>
=======
    <div className="createTemplate">
      <div id="template_creation">
        <h1>Create Template</h1>
        <div id="TemplateForm">
        <form id="formular" >
          {/* <fieldset class="TemplateFieldset"> */}
          <label id="TemplateNameLabel">Template Name</label>
          <input type="text" id="templatename"></input>
          <br />
          <br />
          <div id="ImageResizeClass">
          <input type="checkbox" id="image"></input>
          <label id="ImageResizeLabel">Image Resize</label>
          </div>
          <br />
          <div id="ChooseDaType">
          <label>Choose Da-Type</label>
                    <select id="da-type">
                        <option disabled value="option"> -- select an option -- </option>
                        <option value="half-screen">Half screen banner</option>
                        <option value="l-banner">L-Banner</option>
                        <option value="below-screen">Below Sreeen</option>
                    </select><br></br>
          </div>
          <div id="InteractionCheckboxes">
          <label id="InteractionsLabel">Interactions</label>
            <select id = "interaction">
              <option value = "standard">Standard</option>
              <option value = "advanced">Advanced</option>
            </select>
          </div>
          <br/>
      
          {/* </fieldset>  */}
        </form>
        </div>
        <br/>
        <br/>
        <button id="submittemp" onClick={submit}>Submit Template</button>
      </div>
>>>>>>> e972391bd179f6e09db43b7b967d274a55ef7c20
    </div>
  );
};

export default CreateTemplate;
