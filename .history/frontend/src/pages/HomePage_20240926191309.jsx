import React from 'react';
import _bgImage from "../assets/bg_1.png";
import char1 from "../assets/SVG/char1.svg";

const Hero = () => {
    return (
        <div className="hero">
            <div className='text-white font-Signika text-5xl'>Explore the Mysteries of Exoplanets!</div>
        </div>
    )
}
const HomePage = () => {
    return (
        <div className="login-page">
            <img src={_bgImage} alt="bg" className="bg absolute top-0 -z-50" ></img>
        <div>
            <Hero />
        </div>
        </div>
    )
}
export default HomePage;