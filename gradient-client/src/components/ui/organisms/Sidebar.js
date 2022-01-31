import React,{useState, useEffect, useRef} from 'react';

//Services
import {getAllTemplates, addTemplate} from '../../../services'

import { 
    HeaderLogo, 
    Style,
    Direction,
    Colors,
    Output,
    GetterOutputs,
    TemplatesSelector,
    CreateTemplates
} from '../molecules';
import { allConfig } from '../../../config/gradient';
import { RgbToHex } from '../../../utils/rgbToHex';

export function Sidebar(){
    
    const [gradientType, setGradientType] = useState(allConfig.style.linear);
    const [direction, setDirection] = useState(allConfig.directionLinear.leftTop);
    const [directionType, setDirectionType] = useState('directionLinear');

    const [name, setName] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const [color1, setColor1] = useState({r:221,g:235,b:150,a:117});
    const [color2, setColor2] = useState({r:10,g:14,b:157,a:1});

    const [gradientStyle, setGradientStyle] = useState({
        backgroundImage: `${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${color1.r},${color1.g},${color1.b}), rgb(${color2.r},${color2.g},${color2.b}))`
    });
    const [ hexConf, setHexConf] = useState({active: false,color1:RgbToHex(color1),color2:RgbToHex(color2)});
    const [ rgbaConf, setRgbaConf] = useState({active: false,color1:color1,color2:color2});

    const [clipboardCss, setClipboardCss] = useState(`background: ${gradientStyle.backgroundImage}`);
    
    const [template, setTemplate] = useState({});

    const actualConfig = {
        gradientType:gradientType,
        directionType: directionType,
        direction: direction,
        color1: `rgb(${color1.r},${color1.g},${color1.b})`,
        color2: `rgb(${color2.r},${color2.g},${color2.b})`,
        hex: {
            active: false,
            color1: "",
            color2: ""
        },
        rgba:  {
            active: true,
            color1: color1,
            color2: color2,
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
        let background = "";
        
        if(value.hex.active){
            background = `background: ${gradientType}(${direction.length > 0 ? direction+',': ''} ${value.hex.color1},  ${value.hex.color2}))`
            actualConfig.hex = value.hex;
            setHexConf(value.hex);
            setClipboardCss(background);
        }
        if(value.rgba.active){
            background = `background: ${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${value.rgba.color1.r},${value.rgba.color1.g},${value.rgba.color1.b}), rgb(${value.rgba.color2.r},${value.rgba.color2.g},${value.rgba.color2.b}))`;
            actualConfig.rgba = value.rgba;
            setRgbaConf(value.rgba);
            setClipboardCss(background);
        }

    }

    const updateTemplates = (values)=>{
        console.log(values);

        setGradientStyle({
            backgroundImage: `${values.style.gradientType}(${values.style.direction.length > 0 ? values.style.direction+',': ''} ${values.style.color1},${values.style.color2})`
        }) 

        actualConfig.gradientType = values.style.gradientType;
        actualConfig.directionType = values.style.directionType;
        actualConfig.direction = values.style.direction;
        actualConfig.color1 = values.style.color1;
        actualConfig.color2 = values.style.color2;
        actualConfig.hex.color1 = values.style.hex.color1;
        actualConfig.hex.color2 = values.style.hex.color2;
        actualConfig.rgba.color1 = values.style.rgba.color1;
        actualConfig.rgba.color2 = values.style.rgba.color2;
        actualConfig.style = values.style.style;

        setGradientType(values.style.gradientType);
        setDirectionType(values.style.directionType);
        setDirection(values.style.direction)
        setColor1(values.style.rgba.color1);
        setColor2(values.style.rgba.color2);

    }

    const updateCreateTemplate = (value)=>{
        console.log(value);
        // actualizar el TemplatesSelector con un hook
        setTemplate(value.result[0]);
    }
    return (
    <>
        <div className="sidebar">

            <HeaderLogo title={'CSS Gradient Test'} />

            <Style onUpdateGradientType={updateGradientType}  />

            <Direction onUpdateDirection={updateDirection} directionType={directionType} />

            <Colors onUpdateColors={updateColors} color1={color1} color2={color2} />

            <Output onUpdateOutputFormat={updateOutputFormat} color1={color1} color2={color2} />

            <GetterOutputs clipboardCss={clipboardCss} />

            <TemplatesSelector onUpdateTemplates={updateTemplates} template={template}/>

            <CreateTemplates onUpdateTemplate={updateCreateTemplate} config={actualConfig}/>

            

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
