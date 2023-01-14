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
    <div id="createTemplate">
      <h1>Create Template</h1>
        <Form id="formular" >
          <Form.Group className="mb-3" id="templatename">
            <Form.Label htmlFor="labeltext" id="label">Template Name</Form.Label>
            <Form.Control type="text" placeholder="Example Template Name" id="labeltext"/>
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
          <option value="2">No Interaction</option>
        </Form.Select>
        <Form.Group id="checkboxGroup">
          <Form.Check id="checkbox" type="checkbox" label="Image Resizing" />
        </Form.Group>
      <br/>
      <br/>
      <Button variant="primary" id="submittemp" onClick={submit}>Submit Template</Button>
    </div>
  );
};

export default CreateTemplate;
