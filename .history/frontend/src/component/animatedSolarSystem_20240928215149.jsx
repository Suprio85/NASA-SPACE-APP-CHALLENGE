import React from 'react';


const SolarSystem = () => {
    const planets = [
        { name: "Mercury", orbitSize: "w-[200px]", speed: "animate-spin-fast", startAngle: "rotate(0deg)" },
        { name: "Venus", orbitSize: "w-[300px]", speed: "animate-spin-medium", startAngle: "rotate(45deg)" },
        { name: "Earth", orbitSize: "w-[400px]", speed: "animate-spin-slow", startAngle: "rotate(90deg)" },
        { name: "Mars", orbitSize: "w-[500px]", speed: "animate-spin-slower", startAngle: "rotate(135deg)" },
        { name: "Jupiter", orbitSize: "w-[600px]", speed: "animate-spin-slowest", startAngle: "rotate(180deg)" },
        { name: "Saturn", orbitSize: "w-[700px]", speed: "animate-spin-slowest", startAngle: "rotate(225deg)" },
        { name: "Uranus", orbitSize: "w-[800px]", speed: "animate-spin-slowest", startAngle: "rotate(270deg)" },
        { name: "Neptune", orbitSize: "w-[900px]", speed: "animate-spin-slowest", startAngle: "rotate(315deg)" }
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative w-full h-full flex justify-center items-center">
                {/* Sun */}
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>

                {/* Planets */}
                {planets.map((planet, index) => (
                    <div key={index} className={`absolute top-1/2 left-1/2 ${planet.orbitSize} ${planet.speed} flex justify-center items-center`} style={{ transform: `${planet.startAngle} translateX(-50%)` }}>
                        {/* Planet positioning: offset from center based on radius */}
                        <div className="bg-blue-500 h-8 w-8 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;

