export const RgbToHex = (r,g,b)=>{
    const hex = [r,g,b].map( (val)=> {
        val = parseInt(val).toString(16);     
        return (val.length === 1) ? "0"+val : val;
    })
    return `#${hex.join("")}`
}