import React from "react";
import './CreateInstance.css'
import axios from "axios";



const CreateInstance = () => {
    
    
    async function getTemplates() {
        try {
            const response = await axios.get("http://localhost:3001/getTemplates");
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    


    return (
        <div className="createInstance">
             <div id="instance_creation">
                <h1> Create Instance</h1>
                <form>
                <label id="ChooseTemplate">Choose Template:</label><br></br>
                <button onClick={getTemplates()}>Get Existing Templates</button>
                    <select name="chosen_template" id="chosen_template">
                        <option disabled value> -- select an option -- </option>
                        <option value="template1">hier müssen dann erstellte templates gelistet werden</option>
                        <option value="template2">s.o</option>
                        <option value="template3">evtl noch ne funktion wegen anzahl an tepmlates und wenn leer was dann?</option>
                    </select><br></br><br></br>
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
