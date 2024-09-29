import React from 'react';

const SolarSystem = () => {
    const planets = [
        { name: "Mercury", orbitSize: 100, speed: "10s", offsetAngle: 0 },
        { name: "Venus", orbitSize: 150, speed: "20s", offsetAngle: 45 },
        { name: "Earth", orbitSize: 200, speed: "30s", offsetAngle: 90 },
        { name: "Mars", orbitSize: 250, speed: "40s", offsetAngle: 135 },
        { name: "Jupiter", orbitSize: 300, speed: "50s", offsetAngle: 180 },
        { name: "Saturn", orbitSize: 350, speed: "60s", offsetAngle: 225 },
        { name: "Uranus", orbitSize: 400, speed: "70s", offsetAngle: 270 },
        { name: "Neptune", orbitSize: 450, speed: "80s", offsetAngle: 315 }
    ];

    // Function to calculate position based on angle
    const calculatePosition = (angle, orbitSize) => {
        const radians = (angle * Math.PI) / 180;
        const x = Math.cos(radians) * orbitSize;
        const y = Math.sin(radians) * orbitSize;
        return { x, y };
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative">
                {/* Sun */}
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* Planets */}
                {planets.map((planet, index) => {
                    const position = calculatePosition(planet.offsetAngle, planet.orbitSize);

                    return (
                        <div 
                            key={index} 
                            className="absolute top-1/2 left-1/2" 
                            style={{
                                width: `${planet.orbitSize * 2}px`,
                                height: `${planet.orbitSize * 2}px`,
                                animation: `spin ${planet.speed} linear infinite`,
                                transformOrigin: 'center'
                            }}>
                            <div 
                                className="absolute bg-blue-500 h-8 w-8 rounded-full"
                                style={{
                                    top: `${position.y}px`,
                                    left: `${position.x}px`,
                                    transform: "translate(-50%, -50%)" // Ensure the planet stays on the orbit path
                                }}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SolarSystem;
