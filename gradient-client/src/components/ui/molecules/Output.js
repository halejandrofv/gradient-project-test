import { useState } from "react";

export function Output(props){
    
    const [btnHex, setBtnHex] = useState(false);
	const [btnRgba, setBtnRgba] = useState(true);

    const setHex = ()=>{
        props.onUpdateOutputFormat({
            hex: {
                active: true,
                color1: RgbToHex(props.color1.r, props.color1.g, props.color1.b),
                color2: RgbToHex(props.color2.r, props.color2.g, props.color2.b)
            },
            rgba: {
                active: false,
                color1: props.color1,
                color2: props.color2
            }
        })
        setBtnHex(true);
        setBtnRgba(false);
    }
    
    const setRgba = ()=>{
        props.onUpdateOutputFormat({
            hex: {
                active: false,
                color1: RgbToHex(props.color1.r, props.color1.g, props.color1.b),
                color2: RgbToHex(props.color2.r, props.color2.g, props.color2.b)
            },
            rgba: {
                active: true,
                color1: props.color1,
                color2: props.color2
            }
        })
        setBtnHex(false);
        setBtnRgba(true);
    }

    const RgbToHex = (r,g,b)=>{
        const hex = [r,g,b].map( (val)=> {
            val = parseInt(val).toString(16);     
            return (val.length === 1) ? "0"+val : val;
        })
        return `#${hex.join("")}`
    }
    
    return (
        <>
            <div className="sidebar__content">
                <p className='subtitle'> Output format </p>
                <button 
                    className={`btn ${btnHex?'selected':''}`} 
                    onClick={ ()=> setHex() }> Hex 
                </button>
                <button 
                    className={`btn m-l0 ${btnRgba?'selected':''}`} 
                    onClick={ ()=> setRgba() }> Rgba 
                </button> 
            </div>
        </>
    );
}