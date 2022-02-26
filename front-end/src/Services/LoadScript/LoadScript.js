
export default (src)=>{
    const script = document.createElement("script")
    script.async = true
    script.src = src
    // script.onload = () => scriptLoaded();
    document.body.appendChild(script)
}  