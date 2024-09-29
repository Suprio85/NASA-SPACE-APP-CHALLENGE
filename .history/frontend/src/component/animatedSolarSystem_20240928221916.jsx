import React from 'react';

const SolarSystem = () => {
    const planets = [
        { name: "Mercury", planetIndex: 1, speed: "10s", offsetAngle: 0 },
        { name: "Venus", planetIndex: 2, speed: "20s", offsetAngle: 0 },
        { name: "Earth", planetIndex: 3, speed: "30s", offsetAngle: 0 },
        { name: "Mars", planetIndex: 4, speed: "40s", offsetAngle: 0 },
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative">
                {/* Sun */}
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Planets */}
                {planets.map((planet, index) => (
                    <div 
                        key={index} 
                        className="absolute" 
                        style={{
                            width: `${planet.planetIndex * 100}px`,
                            height: `${planet.planetIndex * 100}px`,
                        }}>
                        <div 
                            className="absolute bg-blue-500 h-8 w-8 rounded-full"
                            style={{
                                top: `-${(planet.planetIndex * 50) + 50}px`, // Offset above the sun, increasing for each planet
                                left: `calc(50% - 16px)` // Centered horizontally
                            }}
                        >{planet.planetIndex}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
