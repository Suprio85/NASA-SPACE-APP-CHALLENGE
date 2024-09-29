import React from "react";

const Button = ({ text, function}) => {
    return <div>
        <button className='btn btn-outline overflow-hidden relative'>
            <div className='z-10 text-slate-900 font-Saira text-xl'  >Discover Now</div>
            <img src={planet3} alt="planet3" className="h-48 object-cover absolute " />
        </button>
    </div>
}