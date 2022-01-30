import {useEffect, useState} from 'react';
import { RgbaColorPicker } from "react-colorful";

export function Colors(props){
	const [pickerOne, setPickerOne] = useState(false);
	const [pickerTwo, setPickerTwo] = useState(false);
	const [colorOne, setColorOne] = useState(props.color1);
	const [colorTwo, setColorTwo] = useState(props.color2);
	
	useEffect(()=>{
		document.addEventListener('click', onClickOutside, true);
		return( ()=> {
			document.removeEventListener('click', onClickOutside, true);
		});
	});

	const uploadColors = (value,ref)=>{
		switch(ref){
			case 'c1':
				props.onUpdateColors({color: value, ref: ref});
				setColorOne(value)
				break;
			case 'c2':
				props.onUpdateColors({color: value, ref: ref});
				setColorTwo(value)
				break;
			default:
				console.log('no existe la referencia al color picker');
		}
	}
	const onClickOutside = (e) => {
		setPickerOne(false);
		setPickerTwo(false);
	}

	const randomColors = ()=>{
        const randomNumber = ()=> Math.floor(Math.random() * (255 - 0 + 1) + 0);
        const color1 = {
            r: randomNumber(),
            g: randomNumber(),
            b: randomNumber(), 
            a:1
        }

        const color2 = {
            r: randomNumber(),
            g: randomNumber(),
            b: randomNumber(), 
            a:1
        }

        setColorOne(color1);
        setColorTwo(color2);

		props.onUpdateColors({color: color1,ref: 'c1'});
		props.onUpdateColors({color: color2,ref: 'c2'});
		
    }

    return(
        <>
            <div className="sidebar__content">
                <p className='subtitle'> Colors </p>

                <button className='btn-picker' 
					style={{background: `rgb(${colorOne.r},${colorOne.g},${colorOne.b})`, color: `rgb(${colorOne.r},${colorOne.g},${colorOne.b})`}} 
					onClick={()=> setPickerOne(true)}> color1
                </button>
                { 
                    pickerOne ? 
                    <RgbaColorPicker 
						color={colorOne} 
						onChange={(val)=> uploadColors(val,'c1')} 
						onBlur={ ()=> setPickerOne(false)} 
						className='color-picker'
					/> : ''
                }
                
                <button className='btn-picker m-l0' 
					style={{background: `rgb(${colorTwo.r},${colorTwo.g},${colorTwo.b})`, color: `rgb(${colorTwo.r},${colorTwo.g},${colorTwo.b})`}} 
					onClick={()=> setPickerTwo(true)}> color1
				</button> 
                { 
					pickerTwo ? 
					<RgbaColorPicker 
						color={colorTwo} 
						onChange={(val)=> uploadColors(val,'c2')} 
						onBlur={ ()=> setPickerTwo(false)}
						className='color-picker'
					/> :''
				}
                
                <button className='btn m-l0' onClick={ ()=> randomColors()}> Random </button> 
            </div>
        </>
    );
}