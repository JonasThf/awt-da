import React from "react";
import './CreateInstance.css'
import axios from "axios";



const CreateInstance = () => {
    
    async function getTemplates() {
        try {
            const response = await axios.get("http://localhost:3001/getTemplates");
            let templateStrings = response.data;
            let parsedTemplates = [];
            for (let i = 0; i < templateStrings.length; i++) {
                let parsedTemplate = JSON.parse(templateStrings[i]);
                parsedTemplates.push(parsedTemplate);
            }
            //setTemplates(parsedTemplates);
            showTemplates(parsedTemplates);
        }
        catch (error) {
            console.log(error);
        }
    }
    
     function showTemplates(parsedTemplates) {
        
        var select = document.getElementById("selectTemplate");

        for (let i = 0; i < parsedTemplates.length; i++) {
            console.log(parsedTemplates[i]);
            var el = document.createElement("option");
            el.textContent = parsedTemplates[i].name;
            el.value = parsedTemplates[i].name;
            select.appendChild(el);
         }
         
     }
     

    //const [templates, setTemplates] = React.useState ([]);

    return (
        <div className="createInstance">
             <div id="instance_creation">
                <h1> Create Instance</h1>
                <form>
                <label id="ChooseTemplate">Choose Template:</label><br></br>
                <button onClick={getTemplates}>Get Existing Templates</button><br></br>
                <select id="selectTemplate">
                    <option>Choose a Template</option>
                </select>
                    <label id="DurationInSec">Duration in seconds:</label>
                    <input type="number" id="duration" name="duration" min="1" max="20"></input><br></br><br></br>
                    <label id="AddMedia">Add Media Ressource URL</label>
                    <input type="url" id="URL" name="URL"></input><br/> <br/>
                </form>
                <button>Create Instance</button>
            </div>
        </div>
    )
};

export default CreateInstance;
