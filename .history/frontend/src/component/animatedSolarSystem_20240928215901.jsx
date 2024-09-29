import React from 'react';

const SolarSystem = () => {
    const planets = [
        { name: "Mercury", orbitSize: "200px", speed: "10s", offsetAngle: "0deg" },
        { name: "Venus", orbitSize: "300px", speed: "20s", offsetAngle: "45deg" },
        { name: "Earth", orbitSize: "400px", speed: "30s", offsetAngle: "90deg" },
        { name: "Mars", orbitSize: "500px", speed: "40s", offsetAngle: "135deg" },
        { name: "Jupiter", orbitSize: "600px", speed: "50s", offsetAngle: "180deg" },
        { name: "Saturn", orbitSize: "700px", speed: "60s", offsetAngle: "225deg" },
        { name: "Uranus", orbitSize: "800px", speed: "70s", offsetAngle: "270deg" },
        { name: "Neptune", orbitSize: "900px", speed: "80s", offsetAngle: "315deg" }
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative">
                {/* Sun */}
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* Planets */}
                {planets.map((planet, index) => (
                    <div key={index} className="absolute top-1/2 left-1/2" style={{
                        width: planet.orbitSize,
                        height: planet.orbitSize,
                        animation: `spin ${planet.speed} linear infinite`,
                        transform: `rotate(${planet.offsetAngle})`, // Set the starting angle
                        transformOrigin: `0 ${parseInt(planet.orbitSize) / 2}px` // Set orbit distance from Sun
                    }}>
                        <div className="bg-blue-500 h-8 w-8 rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
