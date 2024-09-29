import React from 'react';

const DivShowing = ({ text}) => {
    return (
        <div>
            <div className='bg-slate-800 rounded m-2 flex justify-center h-16 text-white'>{text || "Unknown"}</div>
        </div>
    )

}
const PlanetComparison = ({ planetList }) => {
    if (planetList.length < 2) {
        return <div className="text-white text-center mt-4">Add more planets to compare.</div>;
    }

    return (
        <div className="bg-slate-950 bg-opacity-90  h-screen w-full flex justify-center items-center">
            <div className='bg-slate-950 w-2/3 h-full pt-10'>
                <h2 className="text-xl font-bold text-white font-Saira text-center mb-4">Planet Comparison</h2>
                <div className="flex justify-evenly gap-3 mx-3">
                    {planetList.map((planet, index) => (
                        <div key={index} className="bg-gray-900 p-3 rounded-lg">
                            <h3 className="font-semibold text-lg text-white">{planet.pl_name}</h3>
                            <DivShowing text={planet.pl_masse} />
                            <DivShowing text={planet.pl_rade} />
                            Radius: {planet.pl_rade || 'Unknown'}
                            Orbital Period: {planet.pl_orbper || 'Unknown'}
                            Discovery Year: {planet.disc_year || 'Unknown'}
                            Discovery Method: {planet.discoverymethod || 'Unknown'}
                            Host Star Temperature: {planet.st_teff || 'Unknown'}
                            Host Star Radius: {planet.st_rad || 'Unknown'}
                            Host Star Mass: {planet.st_mass || 'Unknown'}
                            Discovery Facility: {planet.disc_facility || 'Unknown'}

                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PlanetComparison;
