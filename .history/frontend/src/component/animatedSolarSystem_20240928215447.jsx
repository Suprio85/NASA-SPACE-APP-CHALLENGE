import React from 'react';


const SolarSystem = () => {
    const planets = [
        { name: "Mercury", orbitSize: "200px", speed: "10s", startDegree: 0 },
        { name: "Venus", orbitSize: "300px", speed: "20s", startDegree: 45 },
        { name: "Earth", orbitSize: "400px", speed: "30s", startDegree: 90 },
        { name: "Mars", orbitSize: "500px", speed: "40s", startDegree: 135 },
        // Add more planets with their specific properties
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="relative w-full h-full flex justify-center items-center">
                {/* Sun */}
                <div className="bg-yellow-500 rounded-full h-32 w-32 absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>

                {/* Planets */}
                {planets.map((planet, index) => (
                    <div key={index} className="absolute top-1/2 left-1/2" style={{
                        width: planet.orbitSize,
                        height: planet.orbitSize,
                        animation: `spin-${index} ${planet.speed} linear infinite`,
                        transform: `rotate(${planet.startDegree}deg) translateX(-50%)`
                    }}>
                        <style>
                            {`
                                @keyframes spin-${index} {
                                    from { transform: rotate(${planet.startDegree}deg); }
                                    to { transform: rotate(${planet.startDegree + 360}deg); }
                                }
                            `}
                        </style>
                        <div className="bg-blue-500 h-8 w-8 rounded-full" style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;
