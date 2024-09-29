import React from 'react';
import planet1 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet2.svg";
import planet3 from "../assets/SVG/planet3.svg";
import planet4 from "../assets/SVG/planet4.svg";
import planet5 from "../assets/SVG/planet9.svg";
import planet6 from "../assets/SVG/planet6.svg";
import planet7 from "../assets/SVG/planet7.svg";
import planet8 from "../assets/SVG/planet8.svg";

const SolarSystem = () => {
    const planets = [
        { name: "Mercury", planetIndex:1,  },
        { name: "Mercury", planetIndex:2,  },
        { name: "Mercury", planetIndex:3,  },
        { name: "Mercury", planetIndex:4,  },
        { name: "Mercury", planetIndex:5,  },
        { name: "Mercury", planetIndex:6,  },
        { name: "Mercury", planetIndex:7,  },

    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black absolute top-0 left-0">
            <div className="relative">
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                {planets.map((planet, index) => (
                    <div 
                        key={index} 
                        className="absolute " 
                        style={{
                            width: `${(planet.planetIndex+1) * 100}px`,
                            height: `${(planet.planetIndex+1) * 100}px`,
                            top: `calc(50% - ${(planet.planetIndex+1) * 50}px)`,
                            left: `calc(50% - ${(planet.planetIndex+1) * 50}px)`,
                            animation: `spin ${10}s linear infinite`,
                            // transform: `rotate(${planet.offsetAngle}deg)` 
                        }}>
                        <div 
                            className="absolute bg-white text-3xl h-8 w-8 rounded-full"
                        >{planet.planetIndex}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
