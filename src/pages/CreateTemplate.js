import React from "react";
import "./CreateTemplate.css";


const CreateTemplate = () => {

  function submit(){
    
    var title = document.getElementById("templatename").value
    var resizing = document.getElementById("image").checked
    var interactions = [document.getElementById("interaction1").checked] 
    interactions[1] = document.getElementById("interaction2").checked
    interactions[2] = document.getElementById("interaction3").checked
    interactions[3] = document.getElementById("interaction4").checked
    var da_type = document.getElementById("da-type").value

    var  template = {
      name: title,
      resize: resizing,
      ineraction: interactions,
      daType: da_type,
      duration: 0, 
      media_ressource: ""
  }
  var templateAsString = JSON.stringify(template)
  console.log(templateAsString)

      
  }
  return (
    <div className="createTemplate">
      <div id="template_creation">
        <h1>Create Template</h1>
        <div class="TemplateForm">
        <form >
          {/* <fieldset class="TemplateFieldset"> */}
          <label id="TemplateNameLabel">Template Name</label>
          <input type="text" id = "templatename"></input>
          <br />
          <br />
          <div class="ImageResizeClass">
          <input type="checkbox" id = "image"></input>
          <label id="ImageResizeLabel">Image Resize</label>
          </div>
          <br />
          <div class="InteractionCheckboxes">
          <label id="InteractionsLabel">Interactions</label>
         
          <label></label>
          <input type="checkbox" id = "interaction1"></input>
          <label>Links to open</label>
          <br/>
          <input type="checkbox" id = "interaction2"></input>
          <label>Different Tabs</label>
          <br />
          <input type="checkbox" id = "interaction3"></input>
          <label>Fill in Forms</label>
          <br/>
          <input type="checkbox" id = "interaction4"></input>
          <label>Mini Games</label>
          </div>
          <br/>
          <label>Choose Da-Type:</label>
                    <select name="da-type" id="da-type">
                        <option disabled selected value> -- select an option -- </option>
                        <option value="half-screen">Half screen banner</option>
                        <option value="l-banner">L-Banner</option>
                        <option value="below-screen">Below Sreeen</option>
                    </select><br></br>
          {/* </fieldset>  */}
        </form>
        </div>
        <button onClick={submit}>Submit Template</button>
      </div>
    </div>
  );
};

export default CreateTemplate;
