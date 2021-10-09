import "./dSwitch.css";
import { useState } from "react";

const DSwitch = ({params, setParams,filterName, title}) => {
    
    const [isOn, setIsOn] = useState(false);

    const turnOn = () => {

        const paramsTemplate = {...params};
        paramsTemplate[filterName] = 1;
        paramsTemplate.changed = true;
        paramsTemplate.page = 1;
        setParams(paramsTemplate); 
        setIsOn(true); 
    }

    const turnOff = () =>{
        
        const paramsTemplate = {...params};
        delete paramsTemplate[filterName];
        paramsTemplate.changed = true;
        paramsTemplate.page = 1;
        setParams(paramsTemplate); 
        setIsOn(false) ;
    }


    return ( 
        <div className="switchBox">
            <label className="switch" >
                <input type="checkbox" onClick={isOn ? turnOff : turnOn}/>
                <span className="child round"></span>
            </label>
            <h5>{title}</h5>
        </div>
     );
}
 
export default DSwitch;