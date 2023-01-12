import React from "react";
import "./CreateTemplate.css";
import axios from "axios";


/* eslint-disable */
const CreateTemplate = () => {

async function submit () {
    
    var title = document.getElementById("templatename").value
    var resizing = document.getElementById("image").checked
    var interactions = []
    if (document.getElementById("links_to_open").checked == true) interactions.push("links")
    if (document.getElementById("different_tabs").checked == true) interactions.push("tabs")
    if (document.getElementById("fill_in_form").checked == true) interactions.push("form")
    if (document.getElementById("mini_game").checked == true) interactions.push("game")
    var da_type = document.getElementById("da-type").value

    var  template = {
        name: title,
        resize: resizing,
        interactions: interactions,
        daType: da_type,
        duration: 0, 
        media_ressource: ""
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
          <div id="InteractionCheckboxes">
          <label id="InteractionsLabel">Interactions</label>
         
          <label></label>
          <input type="checkbox" id="links_to_open"></input>
          <label>Links to open</label>
          <br/>
          <input type="checkbox" id="different_tabs"></input>
          <label>Different Tabs</label>
          <br />
          <input type="checkbox" id="fill_in_form"></input>
          <label>Fill in Form</label>
          <br/>
          <input type="checkbox" id="mini_game"></input>
          <label>Mini Game</label>
          </div>
          <br/>
      
          <div id="ChooseDaType">
          <label>Choose Da-Type</label>
                    <select id="da-type">
                        <option disabled value="option"> -- select an option -- </option>
                        <option value="half-screen">Half screen banner</option>
                        <option value="l-banner">L-Banner</option>
                        <option value="below-screen">Below Sreeen</option>
                    </select><br></br>
          </div>
          {/* </fieldset>  */}
        </form>
        </div>
        <br/>
        <br/>
        <button id="submittemp" onClick={submit}>Submit Template</button>
      </div>
    </div>
  );
};

export default CreateTemplate;
