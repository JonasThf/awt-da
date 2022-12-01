import React from "react";
import "./CreateTemplate.css";


const CreateTemplate = () => {
  function submit(){
    var title = document.getElementById("template name").value
    var resizing = document.getElementById("image").value
    var interactions = [document.getElementById("interaction1").value] 
    interactions[1] = document.getElementById("interaction2").value
    interactions[2] = document.getElementById("interaction3").value
    interactions[3] = document.getElementById("interaction4").value
    var da_type = document.getElementById("da-type").value
    console.log(da_type)
    for (var i = 0; i<interactions.length; i++){
      console.log(interactions[i])
    }
    
  }
  return (
    <div className="createTemplate">
      <div id="template_creation">
        <h1>Create Template</h1>
        <form>
          <label>Template Name: </label>
          <input type="text" id = "template name"></input>
          <br />
          <br />
          <label>Image Resize</label>
          <input type="checkbox" id = "image"></input>
          <br />
          <br />
          <label>Interactions: </label>
          <br/>
          <label></label>
          <input type="checkbox" id = "interaction1" value = "Links to open"></input>
          <label>Links to open</label>
          <br/>
          <input type="checkbox" id = "interaction2" value = "Different Tabs"></input>
          <label>Different Tabs</label>
          <br />
          <input type="checkbox" id = "interaction3" value = "Fill in Forms"></input>
          <label>Fill in Forms</label>
          <br/>
          <input type="checkbox" id = "interaction4" value = "Mini Games"></input>
          <label>Mini Games</label>
          <br/>
          <label>Choose Da-Type:</label>
                    <select name="da-type" id="da-type">
                        <option disabled selected value> -- select an option -- </option>
                        <option value="half-screen">Half screen banner</option>
                        <option value="l-banner">L-Banner</option>
                        <option value="below-screen">Below Sreeen</option>
                    </select><br></br>
        </form>
        <button onClick={submit}>Submit Template</button>
      </div>

    </div>
  );
};

export default CreateTemplate;
