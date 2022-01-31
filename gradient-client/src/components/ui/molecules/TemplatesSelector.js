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
        console.log(props.template);
        allTemplates.current.push(props.template);
        actualTemplate.current = props.template;
        console.log(allTemplates);
        console.log(actualTemplate);
        setTemplates(allTemplates.current);
        setTemplate(actualTemplate.current);
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