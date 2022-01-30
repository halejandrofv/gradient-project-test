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

  const changeDirection = (type) => {
    props.onUpdateDirection(type);
  }

  return (
    <>
      <div className="sidebar__content">
        <p className='subtitle'> Direction </p>
        <div className='button-box'>
            <button 
            className='btn' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].leftTop)}> 
                <FontAwesomeIcon icon={faArrowUp} className='rot--45' />
            </button>
            <button 
            className='btn m-l0' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].centerTop)}> 
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button 
            className='btn m-l0' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].rightTop)}> 
                <FontAwesomeIcon icon={faArrowUp} className='rot-45' /> 
            </button>
        </div>

        <div className='button-box'>
            <button 
            className='btn' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].leftMiddle)}> 
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button 
            className='btn m-l0' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].centerMiddle)}> 
                <FontAwesomeIcon icon={faCircle} />
            </button>
            <button 
            className='btn m-l0' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].rightMiddle)}> 
                <FontAwesomeIcon icon={faArrowRight}/> 
            </button>
        </div>

        <div className='button-box'>
            <button 
            className='btn '
            onClick={ ()=> changeDirection(allConfig[props.directionType].leftBottom)}>  
                <FontAwesomeIcon icon={faArrowDown} className='rot-45' />
            </button>
            <button 
            className='btn m-l0' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].centerBottom)}> 
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <button 
            className='btn m-l0' 
            onClick={ ()=> changeDirection(allConfig[props.directionType].rightBottom)}> 
                <FontAwesomeIcon icon={faArrowDown} className='rot--45' />
            </button>
        </div>
    
    </div>
    </>
  );
}
