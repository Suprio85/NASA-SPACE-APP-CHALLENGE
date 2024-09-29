import React from 'react';


const SolarSystem = () => {
    const planets = [
        { name: "Mercury", orbitSize: "ring-[20rem]", speed: "animate-[spin_10s_linear_infinite]" },
        { name: "Venus", orbitSize: "ring-[30rem]", speed: "animate-[spin_20s_linear_infinite]" },
        { name: "Earth", orbitSize: "ring-[40rem]", speed: "animate-[spin_30s_linear_infinite]" },
        { name: "Mars", orbitSize: "ring-[50rem]", speed: "animate-[spin_40s_linear_infinite]" },
        { name: "Jupiter", orbitSize: "ring-[60rem]", speed: "animate-[spin_50s_linear_infinite]" },
        { name: "Saturn", orbitSize: "ring-[70rem]", speed: "animate-[spin_60s_linear_infinite]" },
        { name: "Uranus", orbitSize: "ring-[80rem]", speed: "animate-[spin_70s_linear_infinite]" },
        { name: "Neptune", orbitSize: "ring-[90rem]", speed: "animate-[spin_80s_linear_infinite]" }
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative">
                {/* Sun */}
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                {/* Planets */}
                {planets.map((planet, index) => (
                    <div key={index} className={`absolute top-1/2 left-1/2 ${planet.orbitSize} ${planet.speed}`}>
                        <div className="bg-blue-100 h-8 w-8 rounded-full -ml-4 -mt-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
