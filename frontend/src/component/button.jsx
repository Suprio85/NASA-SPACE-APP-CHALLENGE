import React from "react";
import planet3 from "../assets/SVG/planet3.svg";

const Button = ({ text}) => {
    return <div>
        <button className='btn btn-outline overflow-hidden relative'>
            <div className='z-10 text-slate-900 font-Saira text-xl'  >{text}</div>
            <img src={planet3} alt="planet3" className="h-60 object-cover absolute " />
        </button>
    </div>
}
export default Button;