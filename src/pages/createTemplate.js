import React from "react";
import './CreateTemplate.css';
  
  const CreateTemplate = () => {
    return (
        <div className = "createTemplate">
              <h1>Create Template</h1>
              <label>Template Name: </label>
              <input type = "text"></input><br/>
              <label> Image Resize</label>
              <input type = "checkbox"></input><br/>
              <label>Interactions: </label><br/>
              <label></label>
              <input type ="checkbox"></input>
              <label> Links to open</label><br/>
              <input type ="checkbox"></input>
              <label>Different Tabs</label><br/>
              <input type ="checkbox"></input>
              <label>Fill in Forms</label><br/>
              <input type ="checkbox"></input>
              <label> Mini Games</label>
               </div>
        
    );}
  export default CreateTemplate;
        


    // <div className = "createTemplate">
    //     <input type = "text" id = "name"></input>
    //     <label>Display ad type: </label>
    //     <select name ="da-type" id = "da-type" defaultValue={'DEFAULT'}>
    //         <option value = "half_screen">Half Screen Banner</option>
    //         <option value = "l-banner">L-Banner</option>
    //         <option value = "below_screen">Below Screen</option>
    //     </select>
    // </div>)
