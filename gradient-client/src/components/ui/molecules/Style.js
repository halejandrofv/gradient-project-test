import { allConfig } from "../../../config/gradient";

export function Style(props) {

  const handleGradientType = (type) => {
    props.onUpdateGradientType(type);
  }

  return (
    <>
      <div className="sidebar__content">
        <p className="subtitle"> Style </p>
        <button
          onClick={ ()=> handleGradientType(allConfig.style.linear)}
          className={`btn `}
        >
          Linear
        </button>
        <button
          onClick={ ()=>handleGradientType(allConfig.style.radial)}
          className={`btn m-l0`}
        >
          Radial
        </button>
      </div>
    </>
  );
}
