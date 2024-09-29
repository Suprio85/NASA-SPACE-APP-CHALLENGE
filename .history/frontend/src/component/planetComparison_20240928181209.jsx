import React from 'react';

const DivShowing = ({ value }) => {
    return (
        <div className="bg-slate-800 bg-opacity-50 rounded m-2 flex justify-center items-center font-Saira h-16 text-white">
            {value || "Unknown"}
        </div>
    );
};

const PlanetComparison = ({ planetList }) => {
    if (planetList.length < 2) {
        return <div className="text-white text-center mt-4">Add more planets to compare.</div>;
    }

    return (
        <div className="bg-slate-950 bg-opacity-90 h-screen w-full flex justify-center items-center">
            <div className="text-xl font-bold text-white font-Saira text-center mb-4">Planet Comparison</div>
            <div className='bg-slate-950 w-2/3 h-full pt-10 '>
                <div className="w-full  flex">
                    <div className='flex flex-col'>
                        <DivShowing value="Mass" />
                        <DivShowing value="Radius" />
                        <DivShowing value="Orbital Period" />
                        <DivShowing value="Discovery Year" />
                        <DivShowing value="Discovery Method" />
                        <DivShowing value="Host Star Temperature" />
                        <DivShowing value="Host Star Radius" />
                        <DivShowing value="Host Star Mass" />
                        <DivShowing value="Discovery Facility" />
                    </div>

                    {planetList.map((planet, index) => (
                        <div key={index} className=" rounded-lg">
                            <DivShowing value={planet.pl_name} />
                            <DivShowing value={planet.pl_masse} />
                            <DivShowing value={planet.pl_rade} />
                            <DivShowing value={planet.pl_orbper} />
                            <DivShowing value={planet.disc_year} />
                            <DivShowing value={planet.discoverymethod} />
                            <DivShowing value={planet.st_teff} />
                            <DivShowing value={planet.st_rad} />
                            <DivShowing value={planet.st_mass} />
                            <DivShowing value={planet.disc_facility} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PlanetComparison;
