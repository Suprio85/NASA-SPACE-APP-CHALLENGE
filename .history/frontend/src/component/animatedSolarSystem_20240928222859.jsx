import React from 'react';

const SolarSystem = () => {
    const planets = [
        { name: "Mercury", planetIndex:1, speed: "10s", offsetAngle: 0 },
        { name: "Mercury", planetIndex:2, speed: "20s", offsetAngle: 0 },
        { name: "Mercury", planetIndex:3, speed: "20s", offsetAngle: 0 },
        { name: "Mercury", planetIndex:4, speed: "20s", offsetAngle: 0 },

    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative">
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                {planets.map((planet, index) => (
                    <div 
                        key={index} 
                        className="relative top-0 left-20" 
                        style={{
                            width: `${planet.planetIndex * 100}px`,
                            height: `${planet.planetIndex * 100}px`,
                            top: `calc(50% - ${planet.planetIndex * 50}px)`,
                            left: `calc(50% - ${planet.planetIndex * 50}px)`,
                            // animation: `spin ${planet.speed} linear infinite`,
                            // transform: `rotate(${planet.offsetAngle}deg)` 
                        }}>
                        <div 
                            className="absolute text-3xl h-8 w-8 rounded-full"
                        >{planet.planetIndex}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
