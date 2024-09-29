import React from 'react';

const DivShowing = ({ value ,bold}) => {
    return (
        <div className={`bg-slate-800 ${bold ==="y" ? "bg-opacity-100 font-bold":"bg-opacity-50"} rounded m-2 flex justify-center items-center font-Saira h-16 text-white`} >
            {value || "Unknown"}
        </div>
    );
};

const PlanetComparison = ({ planetList }) => {
    if (planetList.length < 2) {
        return <div className="text-white text-center absolute h-screen flex justify-normal items-center mt-24 ml-3 z-0 font-Saira font-bold">Add more planets to compare.</div>;
    }

    return (
        <div className="bg-slate-950 bg-opacity-90 h-screen w-full flex flex-col justify-center items-center">
            <div className='bg-slate-950 w-2/3  pt-10 flex flex-col ring m-4'>
            <div className="text-xl font-bold text-white font-Saira text-center mb-4">Planet Comparison</div>
                <div className="w-full flex  justify-center">
                    <div className='flex min-w-60 flex-col'>
                        <DivShowing value="Name" bold="y"/>
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
                        <div key={index} className="flex min-w-60 flex-col">
                            <DivShowing value={planet.pl_name} bold="y"/>
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
