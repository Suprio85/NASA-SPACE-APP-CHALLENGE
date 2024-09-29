import React from 'react';

const PlanetComparison = ({ planetList }) => {
    if (planetList.length < 2) {
        return <div className="text-white text-center mt-4">Add more planets to compare.</div>;
    }

    return (
        <div className="bg-gray-800 p-4 rounded-lg m-4 h-full w-full">
            <h2 className="text-xl font-bold text-white text-center mb-4">Planet Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {planetList.map((planet, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                        <h3 className="font-semibold text-lg text-white">{planet.pl_name}</h3>
                        <ul className="text-sm text-white">
                            <li><strong>Mass:</strong> {planet.pl_masse || 'Unknown'}</li>
                            <li><strong>Radius:</strong> {planet.pl_rade || 'Unknown'}</li>
                            <li><strong>Orbital Period:</strong> {planet.pl_orbper || 'Unknown'}</li>
                            <li><strong>Discovery Year:</strong> {planet.disc_year || 'Unknown'}</li>
                            <li><strong>Discovery Method:</strong> {planet.discoverymethod || 'Unknown'}</li>
                            <li><strong>Host Star Temperature:</strong> {planet.st_teff || 'Unknown'}</li>
                            <li><strong>Host Star Radius:</strong> {planet.st_rad || 'Unknown'}</li>
                            <li><strong>Host Star Mass:</strong> {planet.st_mass || 'Unknown'}</li>
                            <li><strong>Discovery Facility:</strong> {planet.disc_facility || 'Unknown'}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        
    );
};

export default PlanetComparison;
