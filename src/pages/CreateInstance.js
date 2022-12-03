import React from "react";
import './CreateInstance.css'


function CreateInstance() {
    function createJson(obj){
        
    }
    return (
        <div className="createInstance">
             <div id="instance_creation">
                <h1> Create Instance</h1>
                <form>
                <label id="ChooseTemplate">Choose Template:</label>
                    <select name="chosen_template" id="chosen_template">
                        <option disabled selected value> -- select an option -- </option>
                        <option value="template1">hier müssen dann erstellte templates gelistet werden</option>
                        <option value="template2">s.o</option>
                        <option value="template3">evtl noch ne funktion wegen anzahl an tepmlates und wenn leer was dann?</option>
                    </select><br></br><br></br>
                    <label id="DurationInSec">Duration in seconds:</label>
                    <input type="number" id="duration" name="duration" min="1" max="20"></input><br></br><br></br>
                    <label id="AddMedia">Add Media Ressource URL</label>
                    <input type="url" id="URL" name="URL" required></input><br/> <br/>
                </form>
                <button onClick={createJson()}>Create Instance</button>
            </div>
        </div>
    )
};

export default CreateInstance;
