import React from 'react';
import planet1 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet2.svg";
import planet3 from "../assets/SVG/planet3.svg";
import planet4 from "../assets/SVG/planet4.svg";
import planet5 from "../assets/SVG/planet9.svg";
import planet6 from "../assets/SVG/planet6.svg";
import planet7 from "../assets/SVG/planet7.svg";
import planet8 from "../assets/SVG/planet8.svg";
import star1 from "../assets/SVG/star1.svg";
import bg from "../assets/bg_7.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const SolarSystem = ({ planets, showAnimation }) => {
    // const planets = [
    //     { name: "Mercury", planetIndex: 1, },
    //     { name: "Mercury", planetIndex: 2, },
    //     { name: "Mercury", planetIndex: 3, },
    //     { name: "Mercury", planetIndex: 4, },
    //     { name: "Mercury", planetIndex: 5, },
    //     { name: "Mercury", planetIndex: 6, },
    //     { name: "Mercury", planetIndex: 7, },

    // ]; 

    const planetImages = [planet1, planet2, planet3, planet4, planet5, planet6, planet7, planet8]; // Array of planet images

    return (
        <div className="flex fixed justify-center items-center h-screen   top-0 left-0 w-full z-40">
            <div className="relative">
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={star1}></img>
                </div>
                {planets.map((planet, index) => (
                    <div>
                        <div
                            key={index}
                            className="absolute "
                            style={{
                                width: `${(index + 2) * 100}px`,
                                height: `${(index + 2) * 100}px`,
                                top: `calc(50% - ${(index + 2) * 50}px)`,
                                left: `calc(50% - ${(index + 2) * 50}px)`,
                                animation: `spin ${(index + 1) * 10}s linear infinite`,
                                // transform: `rotate(${planet.offsetAngle}deg)` 
                            }}>
                            <div
                                className="absolute  text-3xl h-10 w-10 rounded-full"
                            ><img src={planetImages[index]}></img></div>
                        </div>
                        <div className=' bg-slate-500 bg-opacity-10  rounded-full absolute'
                            style={{
                                width: `${(index + 2) * 130}px`,
                                height: `${(index + 2) * 130}px`,
                                top: `calc(50% - ${(index + 2) * 65}px)`,
                                left: `calc(50% - ${(index + 2) * 65}px)`,
                            }}>
                        </div>
                    </div>
                ))}
            </div>
            <div className='fixed bottom-10 w-full  z-50'>
                <div className='w-full flex justify-center  items-center'>
                    <div className='rounded-full bg-slate-800 w-10 h-10 flex justify-center items-center'>
                        <button onClick={showAnimation}>
                            <FontAwesomeIcon icon={faXmark} className="text-slate-300 cursor-pointer " size='2xl' />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <img src={bg} alt="bg" className="bg absolute top-0 left-0 -z-40" ></img>
            </div>
        </div>
    );
};

export default SolarSystem;
