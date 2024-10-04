import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
const Btn = ({ text, show, secondText }) => {
    return (
        <div className="relative flex items-center my-5" data-aos="fade-down">
            {/* Button */}
            <div className="bg-slate-200 border-2 border-slate-800 w-96 text-slate-900 font-Saira text-3xl flex justify-center items-center p-1 py-5 rounded-md">
                <button>{text}</button>
            </div>

            {/* Conditional Rendering of Circle and Line */}
            {show && (
                <div className="flex items-center flex-grow justify-center ">
                    {/* Circle */}
                    <div className="bg-slate-200 border-2 absolute border-slate-900 h-5 w-5 rounded-full" style={{ left: "375px" }}></div>
                    {/* Horizontal Line */}
                    <div className="bg-slate-800 flex-grow right-full" style={{ height: '3px' }}></div>
                    <div className="font-semibold  font-Saira text-slate-900 px-3 text-xl " >{secondText}</div>
                    <div className="bg-slate-800 flex-grow right-full" style={{ height: '3px' }}></div>
                </div>
            )}
        </div>
    );
};


const Index = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // You can customize the animation duration here
            easing: 'ease-in-out', // Custom easing function
            once: true, // Whether animation should happen only once
        });
    }, []);
    return (
        <div className="relative mx-60 my-96">
            {/* Vertical line */}
            <div className="absolute right-0 top-0 h-full bg-slate-800 w-1"></div>
            <div className="">
                <div>
                    <Link to="/planet">
                        <Btn text="All Planets" show={1} secondText={"Every journey begins with a question…"} />
                    </Link>
                </div>
                <div>
                    <Link to="/stars">
                        <Btn text="Planetary Systems" show={1} secondText={"The Search for Other Solar Systems"} />
                    </Link>
                </div>
                <div>
                    <Link to="/howwefindexoplanets">
                        <Btn text="Discovery Methods" show={1} secondText={"How We Find Exoplanets"} />
                    </Link>
                    <div className="ml-20">
                        <Link to="/transitmethod">
                            <Btn text="Transit Method" />
                        </Link>
                        <Link to="/radialvelocitymethod">
                            <Btn text="Radial Velocity" />
                        </Link>
                        <Link to="/directimaging">
                            <Btn text="Direct Imaging" />
                        </Link>
                        <Link to="/GravitationalMicroLensing">
                            <Btn text="Gravitational Microlensing" />
                        </Link>
                    </div>
                </div>
                <div>
                    <Link to="/howwefindexoplanets">
                        <Btn text="Simulations" show={1} />
                    </Link>
                    <div className="ml-20">
                        <Link to="/transitsimulator">
                            <Btn text="Transit Method" />
                        </Link>
                        <Link to="/radialvelocity">
                            <Btn text="Radial Velocity" />
                        </Link>
                        <Link to="/directimagingdemo">
                            <Btn text="Direct Imaging" />
                        </Link>
                        <Link to="/GravitationalMicrolensingSimulation">
                            <Btn text="Gravitational Microlensing" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
