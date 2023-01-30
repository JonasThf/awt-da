import React, { useRef } from "react";
import "./CreateTemplate.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


/* eslint-disable */
const CreateTemplate = (props) => {

  let  template = {
    "name":"",
    "shape": "",
    "image_resize": false,
    "interactions": "",
    "duration": 0, 
    "media_urls": [],
    "width": 0,
    "height": 0,
    "x": 0,
    "y": 0
}


  function setBannerSelected() {
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
    
    template.name= document.getElementById("template-name").value;
    template.shape = document.getElementById("select-shape").value;
    template.interactions = document.getElementById("select-interaction").value;

    if(template.shape === "2") {
      template.image_resize = true;
      template.height = "100%";
      template.width = "100%";
      template.x = 0;
      template.y = 0;
    } else {
      template.height= props.resizer.height;
      template.width = props.resizer.width;
      template.x = props.resizer.x;
      template.y = props.resizer.y;
    }
      var templateAsString = JSON.stringify(template)
      console.log(templateAsString);

      try {
          const response = await axios.post("http://localhost:3001/createTemplate", template, {headers: {'Content-Type': 'application/json'}});
          
          if(response.data.includes('!') || response.data.includes('empty')) {
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
            <Form.Label htmlFor="template-name" id="label">Template Name</Form.Label>
            <Form.Control type="text" placeholder="Example Name" id="template-name"/>
          </Form.Group>
          <Form.Select id="select-shape" onChange={setBannerSelected}>
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
          <Button variant="primary" id="submit-template-button" onClick={submit}>Submit Template</Button>
        </Form>
    </div>
  );
};

export default CreateTemplate;
