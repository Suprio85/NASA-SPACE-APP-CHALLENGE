import React from 'react';

const DivShowing = ({ label, value }) => {
    return (
        <div className="bg-slate-800 bg-opacity-50 rounded m-2 flex justify-center items-center font-Saira h-16 text-white">
            {label}: {value || "Unknown"}
        </div>
    );
};

const PlanetComparison = ({ planetList }) => {
    if (planetList.length < 2) {
        return <div className="text-white text-center mt-4">Add more planets to compare.</div>;
    }

    return (
        <div className="bg-slate-950 bg-opacity-90 h-screen w-full flex justify-center items-center">
            <div className='bg-slate-950 w-2/3 h-full pt-10'>
                <h2 className="text-xl font-bold text-white font-Saira text-center mb-4">Planet Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1+planetList.length gap-3 mx-3">
                    <div className='flex flex-col'>
                        <DivShowing label="Mass" />
                        <DivShowing label="Radius" />
                        <DivShowing label="Orbital Period" />
                        <DivShowing label="Discovery Year" />
                        <DivShowing label="Discovery Method" />
                        <DivShowing label="Host Star Temperature" />
                        <DivShowing label="Host Star Radius" />
                        <DivShowing label="Host Star Mass" />
                        <DivShowing label="Discovery Facility" />
                    </div>                

                    {planetList.map((planet, index) => (
                        <div key={index} className="bg-gray-900 p-2 rounded-lg">
                            <h3 className="font-semibold text-lg text-white">{planet.pl_name}</h3>
                            <DivShowing label="Mass" value={planet.pl_masse} />
                            <DivShowing label="Radius" value={planet.pl_rade} />
                            <DivShowing label="Orbital Period" value={planet.pl_orbper} />
                            <DivShowing label="Discovery Year" value={planet.disc_year} />
                            <DivShowing label="Discovery Method" value={planet.discoverymethod} />
                            <DivShowing label="Host Star Temp" value={planet.st_teff} />
                            <DivShowing label="Host Star Radius" value={planet.st_rad} />
                            <DivShowing label="Host Star Mass" value={planet.st_mass} />
                            <DivShowing label="Discovery Facility" value={planet.disc_facility} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PlanetComparison;
