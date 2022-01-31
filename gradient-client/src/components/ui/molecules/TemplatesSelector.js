import { useState,useEffect, useRef } from "react";
import { getAllTemplates } from "../../../services";

export function TemplatesSelector(props){

    const [template, setTemplate] = useState(props.template);
    const [templates, setTemplates] = useState([]);
    const allTemplates = useRef(templates);
    const actualTemplate = useRef(props.template);

    useEffect(()=>{
        getAllTemplates().then( (data)=>{
            allTemplates.current = data.result;
            actualTemplate.current = data.result[0];
            setTemplates(data.result);
            setTemplate(data.result[0]);
            
        })
    },[]);
    

    useEffect(()=>{
        // filter para saber si ya existe este template
        // si si existe, no hara push y solo asignara inforamcion
        // si no existe si hace push y lo selecciona
        const filterArr = allTemplates.current.filter( (val) => {
            return val.id === props.template.id
        });
        if(filterArr.length > 0){
            actualTemplate.current = props.template;
            setTemplate(actualTemplate.current);
        }else{
            allTemplates.current.push(props.template);
            actualTemplate.current = props.template;
            setTemplates(allTemplates.current);
            setTemplate(actualTemplate.current);
        }
        console.log(props.template);
        
        
    },[props.template]);
    
    

    const changeTemplateSelect = (e)=>{
        e.preventDefault();
        const filterArr = templates.filter( (item)=>{
            return item.id === e.target.value
        })
        console.log(filterArr);

        if(filterArr.length > 0){
            actualTemplate.current = filterArr[0];
            props.onUpdateTemplates(filterArr[0]);
            setTemplate(filterArr[0]);
        }
    }

    return (
        <>
            <div className="sidebar__content">
                <p className='subtitle'> Templates </p>
                <select 
                    className='select-input' value={template.id}  
                    onChange={ (e)=> changeTemplateSelect(e)}>
                    {
                    templates.map( 
                        (data)=> {
                        return(
                            <option key={data.id} value={data.id}> {data.name} - {data.created_by}</option>
                        )
                        }
                    )
                    }
                </select>
            </div>
        </>
    );
}