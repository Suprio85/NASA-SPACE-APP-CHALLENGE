import React from 'react';

const SolarSystem = () => {
    const planets = [
        { name: "Mercury", orbitSize: 100, speed: "10s", offsetAngle: 0 },

    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative">
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                {planets.map((planet, index) => (
                    <div 
                        key={index} 
                        className="absolute " 
                        style={{
                            width: `${planet.orbitSize * 2}px`,
                            height: `${planet.orbitSize * 2}px`,
                            animation: `spin ${planet.speed} linear infinite`,
                            transform: `rotate(${planet.offsetAngle}deg)` // Starting at a different angle
                        }}>
                        <div 
                            className="absolute bg-blue-500 h-8 w-8 rounded-full"
                            style={{
                                top: `-${planet.orbitSize}px`, // Distance from the center
                                left: `calc(50% - 16px)` // Centered planet within its orbit
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
