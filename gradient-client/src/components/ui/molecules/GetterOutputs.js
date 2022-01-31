export function GetterOutputs(props){

    const copyCssClipboard = ()=>{
        navigator.clipboard.writeText(props.clipboardCss);
        console.log(props.clipboardCss);
        alert("Copy to clipboard!");
    }

    return (
        <>
            <div className="sidebar__content">
                <p className='subtitle'>  </p>
                <button className='btn btn-lg' onClick={ ()=> copyCssClipboard() }> Get CSS </button>
            </div>
        </>
    );
}