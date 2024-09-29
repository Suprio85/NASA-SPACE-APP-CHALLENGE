import React from 'react';
import _bgImage from "../assets/bg_1.png";
import char1 from "../assets/SVG/char1.svg";
const HomePage = () => {
    return (
        <div className="login-page">
            <img src={_bgImage} alt="bg" className="bg absolute top-0 -z-50" ></img>
        <div>
            <div className='font-Exo font-semibold'>WELCOME BACK</div>
        </div>
        </div>
    )
}
export default HomePage;