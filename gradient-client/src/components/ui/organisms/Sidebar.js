import React,{useState, useEffect, useRef} from 'react';

//Services
import {getAllTemplates, addTemplate} from '../../../services'

import { 
    HeaderLogo, 
    Style,
    Direction,
    Colors,
    Output
} from '../molecules';
import { allConfig } from '../../../config/gradient';

export function Sidebar(){
    
    const allTemplatesData = useRef([]);
    const [gradientType, setGradientType] = useState(allConfig.style.linear);
    const [direction, setDirection] = useState(allConfig.directionLinear.leftTop);
    const [directionType, setDirectionType] = useState('directionLinear');
    const [hexConfig, setHexConfig] = useState({hex:})
    const [color1, setColor1] = useState({r:221,g:235,b:150,a:117});
    

    useEffect( ()=>{
        actualConfig.rgba.color1 = color1;
        getHex();
    });

    const [color2, setColor2] = useState({r:10,g:14,b:157,a:1});
    useEffect( ()=>{
        actualConfig.rgba.color2 = color2;
        getHex();
    } );

    
    const actualConfig = {
        gradientType:gradientType,
        directionType: directionType,
        direction: direction,
        color1: `rgb(${color1.r},${color1.g},${color1.b})`,
        color2: `rgb(${color2.r},${color2.g},${color2.b})`,
        hex: {
            color1: "",
            color2: ""
        },
        rgba:  {
            color1: {r:0,g:0,b:0,a:0},
            color2: {r:0,g:0,b:0,a:0},
        },
        style: {
            backgroundImage: `${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${color1.r},${color1.g},${color1.b}),rgb(${color2.r},${color2.g},${color2.b}))`
        },
        btnMap: {
            style: {
                linear:{selected: true},
                radial:{selected: false}
            },
            directions: {
                leftTop: {selected: true},
                centerTop: {selected: false},
                rightTop: {selected: false},
                leftMiddle: {selected: false},
                centerMiddle: {selected: false},
                rightMiddle: {selected: false},
                leftBottom: {selected: false},
                centerBottom: {selected: false},
                rightBottom: {selected: false},
            },
            colors: {
                color1: {active: false,selected: false},
                color2: {active: false,selected: false},
                random: {selected:false}
            },
            output: {
                hex: {selected:false},
                rgba: {selected:true}
            }
        
        }
    }

    const [btnMap, setBtnMap] = useState(actualConfig.btnMap);

    const [templates, setTemplates] = useState([]);
    useEffect(()=>{
        getAllTemplates().then( (data)=>{
            allTemplatesData.current = data.result;
            setTemplates(allTemplatesData.current);
            setTemplate(allTemplatesData.current[0]);
        })
    },[]);

    const [template, setTemplate] = useState({});
    const [name, setName] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [gradientStyle, setGradientStyle] = useState({
        backgroundImage: `${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${color1.r},${color1.g},${color1.b}), rgb(${color2.r},${color2.g},${color2.b}))`
    });
  
   
    const getHex = ()=>{
        let hexColor1 = actualConfig.color1.split("rgb(")[1].split(")")[0].split(",");
        let hexColor2 = actualConfig.color2.split("rgb(")[1].split(")")[0].split(",");

        
        hexColor1 = hexColor1.map((val) =>{
            val = parseInt(val).toString(16);     
            return (val.length === 1) ? "0"+val : val;
        });
        hexColor2 = hexColor2.map((val) =>{
            val = parseInt(val).toString(16);     
            return (val.length === 1) ? "0"+val : val;
        });
        
        actualConfig.hex.color1 = `#${hexColor1.join("")}`;
        actualConfig.hex.color2 = `#${hexColor2.join("")}`;

        //console.log(actualConfig);

    }
    const getRgba = ()=>{
        actualConfig.rgba.color1 = color1;
        actualConfig.rgba.color2 = color2;  

        console.log(actualConfig);
    }

    const copyCssClipboard = ()=>{
        const css = `background: ${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${color1.r},${color1.g},${color1.b}),rgb(${color2.r},${color2.g},${color2.b}));`
        navigator.clipboard.writeText(css);
        console.log(css);
        alert("Copy to clipboard!");
    }

    const changeTemplateSelect = (e)=>{
        e.preventDefault();
        console.log(e.target.value);
        setTemplate(e.target.value);
        const filterArr = allTemplatesData.current.filter( (item)=>{
            return item.id === e.target.value
        })

        if(filterArr.length > 0){
            console.log(filterArr[0]);
            const style = filterArr[0].style;

            actualConfig.gradientType = style.gradientType;
            actualConfig.directionType = style.directionType;
            actualConfig.direction = style.direction;
            actualConfig.color1 = style.color1;
            actualConfig.color2 = style.color2;
            actualConfig.hex.color1 = style.hex.color1;
            actualConfig.hex.color2 = style.hex.color2;
            actualConfig.rgba.color1 = style.rgba.color1;
            actualConfig.rgba.color2 = style.rgba.color2;
            actualConfig.style = style.style;

            setGradientType(style.gradientType);
            setDirectionType(style.directionType);
            setDirection(style.direction)
            setColor1(style.rgba.color1);
            setColor2(style.rgba.color2);
        }

    }

    const changeInput = (e, type)=>{
        if(type === 'name'){
            setName(e.target.value);
        }
        if(type === 'createdBy'){
            setCreatedBy(e.target.value)
        }
    }

    const onSubmitTemplate = (e) => {
        e.preventDefault();
        if(name !== "" && createdBy !== ""){
            
            const arr = {
            name: name,
            created_by: createdBy,
            style: actualConfig
            }  

            addTemplate(arr).then((data) => {
            allTemplatesData.current.push(data.result[0]);
            setTemplates(allTemplatesData.current);
            setTemplate(data.result[0]);
            setName("");
            setCreatedBy("");
            });
        }else{
            alert("Fill form correctly.")
        }
    }
    const updateGradientType = (type) => {
        actualConfig.gradientType = type;
        if(gradientType !== type){
            setGradientType(type);
            if(type === allConfig.style.linear ){
                setDirection(allConfig.directionLinear.centerTop);
                setDirectionType('directionLinear');
                actualConfig.directionType = 'directionLinear';
                actualConfig.direction = allConfig.directionLinear.centerTop;

                actualConfig.btnMap.style.linear.selected = true;
                actualConfig.btnMap.style.radial.selected = false;

                //setBtnMap([...btnMap]);
            }else{
                setDirection(allConfig.directionRadial.centerTop);
                setDirectionType('directionRadial');
                actualConfig.directionType = 'directionRadial';
                actualConfig.direction = allConfig.directionRadial.centerTop;
                actualConfig.btnMap.style.linear.selected = false;
                actualConfig.btnMap.style.radial.selected = true;
            }
                
            actualConfig.style = {
                backgroundImage: `${actualConfig.gradientType}(${actualConfig.direction.length > 0 ? actualConfig.direction+',': ''} ${actualConfig.color1},${actualConfig.color2})`
            }
            setGradientStyle(actualConfig.style)
        }

    } 
    const updateDirection = (value) => {
        actualConfig.direction = value;
        actualConfig.style = {
            backgroundImage: `${actualConfig.gradientType}(${actualConfig.direction.length > 0 ? actualConfig.direction+',': ''} ${actualConfig.color1},${actualConfig.color2})`
        }
        setDirection(value);
    }
    const updateColors = (value) => {
        console.log(value); 
        switch(value.ref){
			case 'c1':
				actualConfig.color1 = `rgb(${value.color.r},${value.color.g},${value.color.b} )`;
                setColor1(value.color);
                break;
			case 'c2':
				actualConfig.color2 = `rgb(${value.color.r},${value.color.g},${value.color.b} )`;
				setColor2(value.color);
                break;
			default:
				console.log('no existe la referencia al color picker');
		}
        
        setGradientStyle({
            backgroundImage: `${actualConfig.gradientType}(${actualConfig.direction.length > 0 ? actualConfig.direction+',': ''} ${actualConfig.color1},${actualConfig.color2})`
        }) 
        //getHex();
        //getRgba();
    }

    const updateOutputFormat = (value)=>{
        console.log(value);
    }

    return (
    <>
        <div className="sidebar">

            <HeaderLogo title={'CSS Gradient Test'} />

            <Style onUpdateGradientType={updateGradientType}  />

            <Direction onUpdateDirection={updateDirection} directionType={directionType} />

            <Colors onUpdateColors={updateColors} color1={color1} color2={color2} />

            <Output onUpdateOutputFormat={updateOutputFormat} color1={color1} color2={color2} />

            <div className="sidebar__content">
                
                <p className='subtitle'>  </p>
                <button className='btn btn-lg' onClick={ ()=> copyCssClipboard() }> Get CSS </button>
            </div>

            <div className="sidebar__content">
                <p className='subtitle'> Templates </p>
                <select className='select-input' value={template.id}  onChange={ (e)=> changeTemplateSelect(e)}>
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
            
            <div className="sidebar__content">
                <p className='subtitle'> Create Template </p>
                <form onSubmit={ (e)=> onSubmitTemplate(e)}>
                    <input placeholder="Name" type='text' name='name' value={name} onChange={ (e)=> changeInput(e,'name')}/> <br/>
                    <input placeholder="Created By" type='text' name='createdBy' value={createdBy} onChange={ (e)=> changeInput(e,'createdBy')}/> <br/>
                
                    <button type="submit" value="Submit" className='btn'> Save </button>
                </form>
            </div>

        </div>

        <div className='content'>
            <div 
                style={gradientStyle} 
                className="gradient">
            </div>
        </div>
    </>
    );
}
