import React,{useEffect, useRef, useState} from 'react';

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
import { getAllTemplates } from '../../../services';

export function Sidebar(){
    
    const actualConfig = useRef({
        gradientType:"",
        directionType: "",
        direction: "",
        color1: "",
        color2: "",
        hex: {active: false,color1:"",color2:""},
        rgba: {active: true,color1:{},color2:{}},
        style: {backgroundImage: ""},
        btnMap: {
            style: {
                linear: {selected: true},
                radial: {selected: false}
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
    })

    

    const [gradientType, setGradientType] = useState(allConfig.style.linear);
    const [direction, setDirection] = useState(allConfig.directionLinear.leftTop);
    const [directionType, setDirectionType] = useState('directionLinear');

    const [color1, setColor1] = useState({r:221,g:235,b:150,a:117});
    const [color2, setColor2] = useState({r:10,g:14,b:157,a:1});
    const [gradientStyle, setGradientStyle] = useState({
        backgroundImage: `${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${color1.r},${color1.g},${color1.b}), rgb(${color2.r},${color2.g},${color2.b}))`
    });
    const [ hexConf, setHexConf] = useState({active: false,color1:RgbToHex(color1),color2:RgbToHex(color2)});
    const [ rgbaConf, setRgbaConf] = useState({active: true,color1:color1,color2:color2});
    const [clipboardCss, setClipboardCss] = useState(`background: ${gradientStyle.backgroundImage}`);
    const [template, setTemplate] = useState({});

    const [directionMap, setDirectionMap] = useState({
        leftTop: {selected: true},
        centerTop: {selected: false},
        rightTop: {selected: false},
        leftMiddle: {selected: false},
        centerMiddle: {selected: false},
        rightMiddle: {selected: false},
        leftBottom: {selected: false},
        centerBottom: {selected: false},
        rightBottom: {selected: false},
    });
    const [styleMap, setStyleMap] = useState({
        linear: {selected: true},
        radial: {selected: false}
    });

    const [rtConfig, setRtConfig] = useState(actualConfig.current);
    
    /*
    const actualConfig = useRef({
        gradientType:gradientType,
        directionType: directionType,
        direction: direction,
        color1: `rgb(${color1.r},${color1.g},${color1.b})`,
        color2: `rgb(${color2.r},${color2.g},${color2.b})`,
        hex: hexConf,
        rgba: rgbaConf,
        style: {
            backgroundImage: `${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${color1.r},${color1.g},${color1.b}),rgb(${color2.r},${color2.g},${color2.b}))`
        },
        btnMap: {
            style: styleMap,
            directions: directionMap,
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
    })
    */
    useEffect(()=>{
        getAllTemplates().then( (data)=>{
            console.log(data);
            actualConfig.current = data.result[0].style;
            setTemplate(data.result[0]);
            setStyleMap( actualConfig.current.btnMap.style);
            setDirectionMap(actualConfig.current.btnMap.directions);
            setColor1(actualConfig.current.rgba.color1);
            setColor1(actualConfig.current.rgba.color2);
            setClipboardCss(`background: ${actualConfig.current.style.backgroundImage}`);
            
            setRtConfig(actualConfig.current);
        })
    },[]);
    

    const updateGradientType = (type, btnMap) => {

        if(gradientType !== type){
            
            if(type === allConfig.style.linear ){
                actualConfig.current.directionType = 'directionLinear';
            }else{
                actualConfig.current.directionType = 'directionRadial';
            }

            actualConfig.current.direction = allConfig[actualConfig.current.directionType].centerTop;
            actualConfig.current.gradientType = type;
            actualConfig.current.btnMap.style = btnMap;
            
            actualConfig.current.style = {
                backgroundImage: `${actualConfig.current.gradientType}(${actualConfig.current.direction.length > 0 ? actualConfig.current.direction+',': ''} ${actualConfig.current.color1},${actualConfig.current.color2})`
            }

            setGradientType(type);
            setDirection(actualConfig.current.direction);
            setDirectionType(actualConfig.current.directionType);
            setStyleMap(btnMap);
            setGradientStyle(actualConfig.current.style);  
            setRtConfig(actualConfig.current);    
        }
        

    } 

    const updateDirection = (value, btnMap) => {
        actualConfig.current.direction = value;
        actualConfig.current.style = {
            backgroundImage: `${actualConfig.current.gradientType}(${actualConfig.current.direction.length > 0 ? actualConfig.current.direction+',': ''} ${actualConfig.current.color1},${actualConfig.current.color2})`
        }
        actualConfig.current.btnMap.directions = btnMap;

        setGradientStyle(actualConfig.current.style);
        setDirection(value);
        setDirectionMap(btnMap);
        setRtConfig(actualConfig.current);
    }
    const updateColors = (value) => {
        console.log(value); 
        switch(value.ref){
			case 'c1':
				actualConfig.current.color1 = `rgb(${value.color.r},${value.color.g},${value.color.b} )`;
                actualConfig.current.rgba.color1 = value.color;
                
                setColor1(value.color);
                break;
			case 'c2':
				actualConfig.current.color2 = `rgb(${value.color.r},${value.color.g},${value.color.b} )`;
				actualConfig.current.rgba.color2 = value.color;
                
                setColor2(value.color);
                break;
			default:
				console.log('no existe la referencia al color picker');
		}
        
        setGradientStyle({
            backgroundImage: `${actualConfig.current.gradientType}(${actualConfig.current.direction.length > 0 ? actualConfig.current.direction+',': ''} ${actualConfig.current.color1},${actualConfig.current.color2})`
        });
        setRtConfig(actualConfig.current);
    }

    const updateOutputFormat = (value)=>{
        console.log(value);
        let background = "";
        
        if(value.hex.active){
            background = `background: ${gradientType}(${direction.length > 0 ? direction+',': ''} ${value.hex.color1},  ${value.hex.color2}))`
            actualConfig.current.hex = value.hex;
            setHexConf(value.hex);
            setClipboardCss(background);
        }
        if(value.rgba.active){
            background = `background: ${gradientType}(${direction.length > 0 ? direction+',': ''} rgb(${value.rgba.color1.r},${value.rgba.color1.g},${value.rgba.color1.b}), rgb(${value.rgba.color2.r},${value.rgba.color2.g},${value.rgba.color2.b}))`;
            actualConfig.current.rgba = value.rgba;
            setRgbaConf(value.rgba);
            setClipboardCss(background);
        }
        setRtConfig(actualConfig.current);

    }

    const updateTemplates = (values)=>{
        console.log(values);

        actualConfig.current = values.style;
  
        setGradientStyle(actualConfig.current.style);
        setGradientType(actualConfig.current.gradientType);
        setDirectionType(actualConfig.current.directionType);
        setDirection(actualConfig.current.direction)
        setColor1(actualConfig.current.color1);
        setColor2(actualConfig.current.color2);
        setRtConfig(actualConfig.current);
    }

    const updateCreateTemplate = (value)=>{
        console.log(value);
        setTemplate(value.result[0]);
    }
    return (
        <>
            <div className="sidebar">

                <HeaderLogo title={'CSS Gradient Test'} />

                <Style onUpdateGradientType={updateGradientType} styleMap={styleMap} />

                <Direction onUpdateDirection={updateDirection} directionType={directionType} directionMap={directionMap} />

                <Colors onUpdateColors={updateColors} color1={color1} color2={color2} />

                <Output onUpdateOutputFormat={updateOutputFormat} color1={color1} color2={color2} />

                <GetterOutputs clipboardCss={clipboardCss} />

                <TemplatesSelector onUpdateTemplates={updateTemplates} template={template}/>

                <CreateTemplates onUpdateTemplate={updateCreateTemplate} config={rtConfig}/>

                

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
