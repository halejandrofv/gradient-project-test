import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faCircle
  } from '@fortawesome/free-solid-svg-icons'

import { allConfig } from "../../../config/gradient";


export function Direction(props) {
    const mapBtn = {
        leftTop: {selected: false},
        centerTop: {selected: false},
        rightTop: {selected: false},
        leftMiddle: {selected: false},
        centerMiddle: {selected: false},
        rightMiddle: {selected: false},
        leftBottom: {selected: false},
        centerBottom: {selected: false},
        rightBottom: {selected: false},
    };
    const actualButton = useRef({});
    const [allButtons, setAllButtons] = useState(props.directionMap);

    const changeDirection = (btnRef, type) => {
        switch(btnRef){
			case 'leftTop':
                actualButton.current = {...mapBtn, ...{leftTop: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'centerTop':
                actualButton.current = {...mapBtn, ...{centerTop: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'rightTop':
                actualButton.current = {...mapBtn, ...{rightTop: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'leftMiddle':
                actualButton.current = {...mapBtn, ...{leftMiddle: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'centerMiddle':
                actualButton.current = {...mapBtn, ...{centerMiddle: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'rightMiddle':
                actualButton.current = {...mapBtn, ...{rightMiddle: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'leftBottom':
                actualButton.current = {...mapBtn, ...{leftBottom: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'centerBottom':
                actualButton.current = {...mapBtn, ...{centerBottom: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
            case 'rightBottom':
                actualButton.current = {...mapBtn, ...{rightBottom: {selected: true}} };
                setAllButtons(actualButton.current);
				break;
			default:
				console.log('error direction');
		}

        props.onUpdateDirection(type, actualButton.current);

    }

    return (
        <>
            <div className="sidebar__content">
                <p className='subtitle'> Direction </p>
                <div className='button-box'>
                    <button 
                    className={`btn ${allButtons.leftTop.selected?'selected':''}`}
                    onClick={ ()=> changeDirection('leftTop',allConfig[props.directionType].leftTop)}> 
                        <FontAwesomeIcon icon={faArrowUp} className='rot--45' />
                    </button>
                    <button 
                    className={`btn m-l0 ${allButtons.centerTop.selected?'selected':''}`}
                    onClick={ ()=> changeDirection('centerTop',allConfig[props.directionType].centerTop)}> 
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button 
                    className={`btn m-l0 ${allButtons.rightTop.selected?'selected':''}`}
                    onClick={ ()=> changeDirection('rightTop',allConfig[props.directionType].rightTop)}> 
                        <FontAwesomeIcon icon={faArrowUp} className='rot-45' /> 
                    </button>
                </div>

                <div className='button-box'>
                    <button 
                    className={`btn ${allButtons.leftMiddle.selected?'selected':''}`} 
                    onClick={ ()=> changeDirection('leftMiddle',allConfig[props.directionType].leftMiddle)}> 
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button 
                    className={`btn m-l0 ${allButtons.centerMiddle.selected?'selected':''}`}
                    onClick={ ()=> changeDirection('centerMiddle',allConfig[props.directionType].centerMiddle)}> 
                        <FontAwesomeIcon icon={faCircle} />
                    </button>
                    <button 
                    className={`btn m-l0 ${allButtons.rightMiddle.selected?'selected':''}`}
                    onClick={ ()=> changeDirection('rightMiddle',allConfig[props.directionType].rightMiddle)}> 
                        <FontAwesomeIcon icon={faArrowRight}/> 
                    </button>
                </div>

                <div className='button-box'>
                    <button 
                    className={`btn ${allButtons.leftBottom.selected?'selected':''}`} 
                    onClick={ ()=> changeDirection('leftBottom',allConfig[props.directionType].leftBottom)}>  
                        <FontAwesomeIcon icon={faArrowDown} className='rot-45' />
                    </button>
                    <button 
                    className={`btn m-l0 ${allButtons.centerBottom.selected?'selected':''}`}
                    onClick={ ()=> changeDirection('centerBottom',allConfig[props.directionType].centerBottom)}> 
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                    <button 
                    className={`btn m-l0 ${allButtons.rightBottom.selected?'selected':''}`} 
                    onClick={ ()=> changeDirection('rightBottom',allConfig[props.directionType].rightBottom)}> 
                        <FontAwesomeIcon icon={faArrowDown} className='rot--45' />
                    </button>
                </div>
            
            </div>
        </>
    );
}
