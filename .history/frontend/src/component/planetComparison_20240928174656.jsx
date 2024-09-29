import React from 'react';

const DivShowing = ({ mass}) => {
    return (
        <div>
            <div className='bg-black text-white'>{mass || "unkwon"}</div>
            
        </div>
    )

}
const PlanetComparison = ({ planetList }) => {
    if (planetList.length < 2) {
        return <div className="text-white text-center mt-4">Add more planets to compare.</div>;
    }

    return (
        <div className="bg-slate-950 bg-opacity-90  h-screen w-full flex justify-center items-center">
            <div className='bg-slate-950 w-1/2 h-full pt-10'>
                <h2 className="text-xl font-bold text-white font-Saira text-center mb-4">Planet Comparison</h2>
                <div className="flex justify-evenly gap-3 mx-3">
                    <divShowing mass={planetList[0].pl_masse} />
                    {planetList.map((planet, index) => (
                        <div key={index} className="bg-gray-900 p-3 rounded-lg">
                            <h3 className="font-semibold text-lg text-white">{planet.pl_name}</h3>
                            <DivShowing mass={planet.pl_masse} />
                            <DivShowing mass={planet.pl_rade} />
                            <DivShowing mass={planet.pl_orbper} />
                            <DivShowing mass={planet.pl_dens} />
                            <DivShowing mass={planet.pl_eqt} />

                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PlanetComparison;
