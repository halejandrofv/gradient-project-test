import { useState } from "react";

export function Output(props){
    
    const [btnHex, setBtnHex] = useState(false);
	const [btnRgba, setBtnRgba] = useState(true);

    const setHex = ()=>{
        const hexColor1 = [props.color1.r, props.color1.g, props.color1.b].map((val) =>{
            val = parseInt(val).toString(16);     
            return (val.length === 1) ? "0"+val : val;
        });
        const hexColor2 = [props.color2.r, props.color2.g, props.color2.b].map((val) =>{
            val = parseInt(val).toString(16);     
            return (val.length === 1) ? "0"+val : val;
        });
        props.onUpdateOutputFormat({
            hex: {
                active: true,
                color1: `#${hexColor1.join("")}`,
                color2: `#${hexColor2.join("")}`
            },
            rgba: {active: false}
        })
        setBtnHex(true);
        setBtnRgba(false);
    }

    const setRgba = ()=>{
        props.onUpdateOutputFormat({
            hex: {active: false},
            rgba: {
                active: true,
                color1: props.color1,
                color2: props.color2
            }
        })
        setBtnHex(false);
        setBtnRgba(true);
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