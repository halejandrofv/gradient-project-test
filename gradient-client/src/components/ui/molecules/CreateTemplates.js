import { useState } from "react";
import { addTemplate } from "../../../services";

export function CreateTemplates(props){
    const [name, setName] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const onSubmitTemplate = (e) => {
        e.preventDefault();
        console.log(e);
        if(name !== "" && createdBy !== ""){
            
            const arr = {
                name: name,
                created_by: createdBy,
                style: props.config
            }  
            
            addTemplate(arr).then((data) => {
                props.onUpdateTemplate(data);
                setName("");
                setCreatedBy("");
            });
            
        }else{
            alert("Incomplete Form.")
        }
    }
    return(
        <>

            <div className="sidebar__content">
                <p className='subtitle'> Create Template </p>
                <form onSubmit={ (e)=> onSubmitTemplate(e)}>
                    <input placeholder="Name" type='text' name='name' 
                        value={name}
                        onChange={ (e)=> setName(e.target.value)}/> <br/>
                    <input placeholder="Created By" type='text' name='createdBy' 
                        value={createdBy}
                        onChange={ (e)=> setCreatedBy(e.target.value)}/> <br/>
                
                    <button type="submit" value="Submit" className='btn'> Save </button>
                </form>
            </div>
        </>
    );
}