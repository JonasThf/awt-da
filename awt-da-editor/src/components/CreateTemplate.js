import React from "react";
import "./CreateTemplate.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


/* eslint-disable */
const CreateTemplate = (props) => {

  let template = {
    "name": "",
    "shape": "",
    "image_resize": false,
    "interactions": "",
    "duration": "00:00:00",
    "media_urls": [],
    "width": 0,
    "height": 0,
    "x": 0,
    "y": 0,
    "position": "absolute"
  }

  // Store the selected banner into state
  function setBannerSelected() {
    let select = document.getElementById('select-shape');
    switch (select.value) {
      case "standard":
        props.setBannerState("1");
        break;

      case "l-banner":
        props.setBannerState("2");
        break;

      case "half-screen":
        props.setBannerState("3");
        break;

      default:
        props.setBannerState(null);
        break;
    }
  }

  // Submit the template to the webserver
  async function submit() {

    template.name = document.getElementById("template-name").value;
    template.shape = document.getElementById("select-shape").value;
    template.interactions = document.getElementById("select-interaction").value;

    // If l-banner was selected, width and height need to be 100%
    if (template.shape === "l-banner") {
      template.image_resize = true;
      template.height = "100%";
      template.width = "100%";
      template.x = 0;
      template.y = 0;
    } else {
      template.height = props.resizer.height;
      template.width = props.resizer.width;
      template.x = props.resizer.x;
      template.y = props.resizer.y;
    }
    var templateAsString = JSON.stringify(template)
    console.log(templateAsString);

    try {
      const response = await axios.post("http://localhost:3001/createTemplate", template, { headers: { 'Content-Type': 'application/json' } });

      // If template was created, show green popup, else red
      if (response.data.includes('!') || response.data.includes('empty')) {
        props.setColor('rgb(253, 192, 184)');
      } else {
        props.setColor('rgb(198, 253, 184)');
        document.getElementById("formular").reset();
      }

      props.setShow();
      props.setRespone(response.data);
      props.setBannerState('0');
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <div id="create-template">
      <h1>Create Template</h1>
      <Form id="formular" >
        <Form.Group className="mb-3" id="template-name-group">
          <Form.Label htmlFor="template-name" id="template-name-label">Template Name</Form.Label>
          <Form.Control type="text" placeholder="Example Name" id="template-name" />
        </Form.Group>
        <Form.Select id="select-shape" onChange={setBannerSelected}>
          <option>Choose a Banner-Type</option>
          <option value="standard">Standard</option>
          <option value="l-banner">L-Banner</option>
          <option value="half-screen">Half Screen</option>
        </Form.Select>
        <Form.Select id="select-interaction">
          <option>Choose Interaction</option>
          <option value="1">Change image when pressing color buttons</option>
          <option value="2">No Interaction</option>
        </Form.Select>
      </Form>
      <Button variant="primary" id="submit-template-button" onClick={submit}>Submit Template</Button>
    </div>
  );
};

export default CreateTemplate;
