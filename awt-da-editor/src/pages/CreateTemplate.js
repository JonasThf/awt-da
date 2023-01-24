import React, { useRef } from "react";
import "./CreateTemplate.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


/* eslint-disable */
const CreateTemplate = (props) => {



  function setStandardBannerSelected() {
    let select = document.getElementById('select-shape');
    switch (select.value) {
      case "1":
        props.setBannerState("1");
        
        break;

      case "2":
        props.setBannerState("2");
        break;

      case "3":
        props.setBannerState("3");
        break;
      default:
        props.setBannerState(null);
      break;
    }
}

async function submit () {
    
    let title = document.getElementById("template-name").value;
    let resizing = document.getElementById("resize-checkbox").checked;
    let shape = document.getElementById("select-shape").value;
    let interactions = document.getElementById("select-interaction").value;
    let height = props.resizer.height;
    let width = props.resizer.width;
    let x = props.resizer.x;
    let y = props.resizer.y;

      let  template = {
          "name": title,
          "shape": shape,
          "image_resize": resizing,
          "interactions": interactions,
          "duration": 0, 
          "media_ressource_type": "",
          "number_of_images": 0,
          "width": width,
          "height": height,
          "x": x,
          "y": y
      }

      var templateAsString = JSON.stringify(template)
      console.log(templateAsString);

      try {
          const response = await axios.post("http://localhost:3001/createTemplate", template, {headers: {'Content-Type': 'application/json'}});
          document.getElementById("formular").reset();
          if(response.data.includes('!') || response.data.includes('empty')) {
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
    }


  return (
    <div id="createTemplate">
      <h1>Create Template</h1>
        <Form id="formular" >
          <Form.Group className="mb-3" id="template-name-group">
            <Form.Label htmlFor="template-name" id="label">Template Name</Form.Label>
            <Form.Control type="text" placeholder="Example Template Name" id="template-name"/>
          </Form.Group>
        </Form>
        <Form.Select id="select-shape" onChange={setStandardBannerSelected}>
          <option>Choose a Banner-Type</option>
          <option value="1">Standard</option>
          <option value="2">L-Banner</option>
          <option value="3">Half Screen</option>
        </Form.Select>
        <Form.Select id="select-interaction">
          <option>Choose Interaction</option>
          <option value="1">Change image when pressing color buttons</option>
          <option value="2">No Interaction</option>
        </Form.Select>
        <Form.Group id="checkboxGroup">
          <Form.Check id="resize-checkbox" type="checkbox" label="Image Resizing" />
        </Form.Group>
        <Button variant="primary" id="submit-template-button" onClick={() => {
        submit(); 
      }}>Submit Template</Button>
    </div>
  );
};

export default CreateTemplate;
