import React from "react";
import "./CreateTemplate.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateTemplate = (props) => {

  const [styleInput, setStyleInput] = React.useState(null);

  let template = {
    "name": "",
    "shape": "",
    "broadcast_resize": false,
    "interactions": "",
    "duration": "00:00:00",
    "media_urls": [],
    "ad_width": 0,
    "ad_height": 0,
    "ad_x": 0,
    "ad_y": 0,
    "broadcast_width": 0,
    "broadcast_height": 0,
    "broadcast_x": 0,
    "broadcast_y": 0,
    "position": "absolute"
  }

  // Store the selected banner into state
  function setBannerSelected() {
    let select = document.getElementById('select-shape');
    switch (select.value) {
      case "standard":
        setStyleInput(<Form.Group className="mb-3" id="style-input-group">
          <Form.Label className="style-input-label">Width (max 1280)</Form.Label>
          <Form.Control id="width-input" type="number" defaultValue={1280} min="126" max="1280" />
          <Form.Label className="style-input-label">Height (max 720)</Form.Label>
          <Form.Control id="height-input" type="number" defaultValue={720} min="67" max="720" />
          <Form.Label className="style-input-label">X</Form.Label>
          <Form.Control id="x-input" type="number" defaultValue={0} min="0" max="1279" />
          <Form.Label className="style-input-label">Y</Form.Label>
          <Form.Control id="y-input" type="number" defaultValue={0} min="0" max="719" />
        </Form.Group>);
        props.setBannerState("1");
        break;

      case "l-banner":
        setStyleInput(null);
        props.setBannerState("2");
        break;

      case "half-screen-top":
        setStyleInput(null);
        props.setBannerState("3");
        break;

      case "half-screen-bottom":
        setStyleInput(null);
        props.setBannerState("4");
        break;

      default:
        setStyleInput(null);
        props.setBannerState(null);
        break;
    }
  }

  // Handle userinput for standard banner style
  function changeStandardBanner() {
    let width = Number(document.getElementById('width-input').value);
    let height = Number(document.getElementById('height-input').value);
    let x = Number(document.getElementById('x-input').value);
    let y = Number(document.getElementById('y-input').value);
    if (width + x <= 1280 && height + y <= 720 && x >= 0 && y >= 0) {
      props.setStandardBanner({ width: width, height: height, x: x, y: y });
    } else {
      props.setColor('rgb(253, 192, 184)');
      props.setShow();
      props.setRespone('Your AD would cross the TV border. Please change position or size.');
    }
  }

  // Submit the template to the webserver
  async function submit() {

    template.name = document.getElementById("template-name").value;
    template.shape = document.getElementById("select-shape").value;
    template.interactions = document.getElementById("select-interaction").value;

    if (template.shape === 'standard') {
      template.ad_height = props.standardBanner.height + 'px';
      template.ad_width = props.standardBanner.width + 'px';
      template.ad_x = props.standardBanner.x;
      template.ad_y = props.standardBanner.y;
    }
    // If l-banner was selected, width and height need to be 100%
    if (template.shape === 'l-banner') {
      template.broadcast_resize = true;
      template.broadcast_height = props.LBanner.height + 'px';
      template.broadcast_width = props.LBanner.width + 'px';
      template.broadcast_x = props.LBanner.x;
      template.broadcast_y = props.LBanner.y;
      template.ad_height = '100%';
      template.ad_width = '100%';
      template.ad_x = 0;
      template.ad_y = 0;
    }
    if (template.shape === 'half-screen-top') {
      template.ad_height = "50%";
      template.ad_width = "100%";
      template.ad_x = 0;
      template.ad_y = 0;
    }
    if (template.shape === 'half-screen-bottom') {
      template.ad_height = "50%";
      template.ad_width = "100%";
      template.ad_x = 0;
      template.ad_y = 360;
    }

    try {
      const response = await axios.post("http://localhost:3001/createTemplate", template, { headers: { 'Content-Type': 'application/json' } });

      // If template was created, show green popup, else red
      if (response.status === 200) {
        props.setColor('rgb(198, 253, 184)');
        document.getElementById("formular").reset();
        props.setShow();
        props.setRespone(response.data);
        props.setBannerState('0');
      } else {
        props.setColor('rgb(253, 192, 184)');
        props.setShow();
        props.setRespone(response.data);
        props.setBannerState('0');
      }
    }
    catch (error) {
      props.setColor('rgb(253, 192, 184)');
      props.setShow();
      props.setRespone(error.response.data);
      props.setBannerState('0');
    }
  }

  return (
    <div id="create-template">
      <h1>Create<br/>Template</h1>
      <Form id="formular" >
        <Form.Group className="mb-3" id="template-name-group">
          <Form.Label htmlFor="template-name" id="template-name-label">Template Name</Form.Label>
          <Form.Control type="text" placeholder="Example Name" id="template-name" />
        </Form.Group>
        <Form.Select id="select-shape" onChange={setBannerSelected}>
          <option value="">Choose a Banner-Type</option>
          <option value="standard">Standard</option>
          <option value="l-banner">L-Banner</option>
          <option value="half-screen-top">Half Screen Top</option>
          <option value="half-screen-bottom">Half Screen Bottom</option>
        </Form.Select>
        <Form.Select id="select-interaction">
          <option value="">Choose Interaction</option>
          <option value="1">Change image when pressing color buttons</option>
          <option value="2">No Interaction</option>
        </Form.Select>
        {styleInput}
      </Form>
      {styleInput ? <Button variant="primary" id="set-style-button" onClick={changeStandardBanner}>Set Style</Button> : null}
      <Button variant="primary" id="submit-template-button" onClick={submit}>Submit Template</Button>
    </div>
  );
};

export default CreateTemplate;
