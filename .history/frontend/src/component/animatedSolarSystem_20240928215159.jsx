import React from 'react';


const SolarSystem = () => {
    const planets = [
        { name: "Mercury", orbitSize: "w-[200px]", speed: "animate-spin-fast" },
        { name: "Venus", orbitSize: "w-[300px]", speed: "animate-spin-medium" },
        { name: "Earth", orbitSize: "w-[400px]", speed: "animate-spin-medium" },
        { name: "Mars", orbitSize: "w-[500px]", speed: "animate-spin-medium" },
        { name: "Jupiter", orbitSize: "w-[600px]", speed: "animate-spin-slow" },
        { name: "Saturn", orbitSize: "w-[700px]", speed: "animate-spin-slow" },
        { name: "Uranus", orbitSize: "w-[800px]", speed: "animate-spin-slow" },
        { name: "Neptune", orbitSize: "w-[900px]", speed: "animate-spin-slow" }
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative">
                {/* Sun */}
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>

                {/* Planets */}
                {planets.map((planet, index) => (
                    <div key={index} className={`absolute top-1/2 left-1/2 ${planet.orbitSize} ${planet.speed}`}>
                        <div className="bg-white h-8 w-8 rounded-full -ml-4 -mt-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
