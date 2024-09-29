import React from 'react';

const PlanetComparison = ({ planetList }) => {
    if (planetList.length < 2) {
        return <div className="text-white text-center mt-4">Add more planets to compare.</div>;
    }

    return (
        <div className="bg-slate-950 bg-opacity-90  h-screen w-full flex justify-center items-center">
            <div className='bg-slate-950 w-1/2 h-full pt-10'>
                <h2 className="text-xl font-bold text-white font-Saira text-center mb-4">Planet Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {planetList.map((planet, index) => (
                        <div key={index} className="bg-gray-900 p-3 rounded-lg">
                            <h3 className="font-semibold text-lg text-white">{planet.pl_name}</h3>

                                Mass: {planet.pl_masse || 'Unknown'}
                                Radius: {planet.pl_rade || 'Unknown'}
                                Orbital Period: {planet.pl_orbper || 'Unknown'}
                                Discovery Year: {planet.disc_year || 'Unknown'}
                                Discovery Method: {planet.discoverymethod || 'Unknown'}
                                Host Star Temperature: {planet.st_teff || 'Unknown'}
                                Host Star Radius: {planet.st_rad || 'Unknown'}
                                Host Star Mass: {planet.st_mass || 'Unknown'}
                                Discovery Facility: {planet.disc_facility || 'Unknown'}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PlanetComparison;
