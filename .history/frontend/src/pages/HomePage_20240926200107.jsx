import React from 'react';
import _bgImage from "../assets/bg_1.png";
import char1 from "../assets/SVG/char1.svg";
import planet1 from "../assets/SVG/planet1.svg";

const Hero = () => {
    return (
        <div className="hero w-full h-screen pl-36">
            <div className='text-white font-Opensans text-3xl pt-48'>Explore the Mysteries of Exoplanets!</div>
            <div>
                <img src={planet1} alt="planet1" className="w-1/6 h-1/6" />
            </div>
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