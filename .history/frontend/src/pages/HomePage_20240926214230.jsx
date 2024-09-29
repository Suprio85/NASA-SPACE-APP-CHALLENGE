import React from 'react';
import _bgImage from "../assets/bg_1.png";
import char1 from "../assets/SVG/char1.svg";
import planet1 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet2.svg";
import planet3 from "../assets/SVG/planet3.svg";

const Hero = () => {
    return (
        <div className="hero w-full h-screen  flex items-center overflow-hidden relative">
            <div className='pl-36'>
                <div className='text-white font-suse text-3xl '>Explore the Mysteries of Exoplanets!</div>
                <div className='text-slate-400 font-Saira text-xl  w-1/2'>
                Join us on a cosmic adventure to explore planets beyond the reach of human travel. Learn how these distant worlds are shaping our understanding of the universe.
                </div>
                <div>
                    <button className='btn btn-outline overflow-hidden relative'>
                        <div className='z-10 text-black font-Titiliuam text-xl'>Discover Now</div>
                        <img src={planet3} alt="planet3" className=" absolute w-72 -left-3 inline-block " />
                    </button>
                </div>
            </div>
            <div className='overflow-hidden'>
                <img src={planet1} alt="planet1" className="absolute top-20 w-1/3 -right-24" />
                <img src={planet2} alt="planet2" className="absolute bottom-20 w-1/5 right-80" />
            </div>
            
        </div>
    )
}
const HomePage = () => {
    return (
        <div className="login-page overflow-hidden">
            <img src={_bgImage} alt="bg" className="bg absolute top-0 -z-50" ></img>
        <div>
            <Hero />
            
        </div>
        </div>
    )
}
export default HomePage;