import React from "react";
import './CreateInstance.css'


function CreateInstance() {
    return (
        <div className="createInstance">
             <div id="instance_creation">
                <form>
                <label>Choose Template:</label>
                    <select name="chosen_template" id="chosen_template">
                        <option disabled selected value> -- select an option -- </option>
                        <option value="template1">hier müssen dann erstellte templates gelistet werden</option>
                        <option value="template2">s.o</option>
                        <option value="template3">evtl noch ne funktion wegen anzahl an tepmlates und wenn leer was dann?</option>
                    </select><br></br>
                    <label>Duration in seconds:</label><br></br>
                    <input type="number" id="duration" name="duration" min="1" max="20"></input><br></br>
                    <label>Add Media Ressource</label><br></br>
                    <input type="url" id="URL" name="URL"></input><br></br>
                </form>
            </div>
        </div>
    )
};

export default CreateInstance;