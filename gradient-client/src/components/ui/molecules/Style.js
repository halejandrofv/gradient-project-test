import { useRef, useState } from "react";
import { allConfig } from "../../../config/gradient";

export function Style(props) {

  const mapBtn = {
    linear: {selected: false},
    radial: {selected: false}
  };

  const actualButton = useRef({});
  const [allButtons, setAllButtons] = useState(props.styleMap);

  const handleGradientType = (btnRef,type) => {
	
    switch(btnRef){
		case 'linear':
			actualButton.current = {...mapBtn, ...{linear: {selected: true}} };
			setAllButtons(actualButton.current);
			break;
		case 'radial':
			actualButton.current = {...mapBtn, ...{radial: {selected: true}} };
			setAllButtons(actualButton.current);
			break;
		default:
			console.log('error direction');
	}
	
    props.onUpdateGradientType(type, actualButton.current);
	//console.log(type, btnRef);
  }

  return (
    <>
      <div className="sidebar__content">
        <p className="subtitle"> Style </p>
        <button
          onClick={ ()=> handleGradientType('linear',allConfig.style.linear)}
          className={`btn ${allButtons.linear.selected?'selected':''}`}
        >
          Linear
        </button>
        <button
          onClick={ ()=>handleGradientType('radial',allConfig.style.radial)}
          className={`btn m-l0 ${allButtons.radial.selected?'selected':''}`}
        >
          Radial
        </button>
      </div>
    </>
  );
}
