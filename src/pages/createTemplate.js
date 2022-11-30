import React from "react";
import './CreateTemplate.css';
  
  const CreateTemplate = () => {
    return (
     
    <div className = "createTemplate">
        <input type = "text" id = "name"></input>
        <label>Display ad type: </label>
        <select name ="da-type" id = "da-type" defaultValue={'DEFAULT'}>
            <option value = "half_screen">Half Screen Banner</option>
            <option value = "l-banner">L-Banner</option>
            <option value = "below_screen">Below Screen</option>
        </select>
        <input type = "checkbox" id = "image_resize" name = "image_resize" value ="image_reseize">
            <label>Image Resize</label>
            <label>Interactions:</label>
            <input type = "checkbox" id = "interaction1" name = "interaction1" value = "redirection">
                <label> Links to open</label>
                <input type = "checkbox" id = "interaction2" value = "differentTabs">
                    <label> Different Tabs</label>
                    <input type = "checkbox" id = "interaction3" value = "fill_in_forms">
                        <label> Fill in Forms</label>
                        <input type = "checkbox" id = "interaction4" value = "minigames">
                            <label>Minigames</label>
                        </input>
                    </input>
                </input>
            </input>
        </input>
    </div>);
    
  }
export default CreateTemplate;
        


