import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../component/button";
import transit from "../../assets/SVG/transit.svg";

import TransitMethod1 from "../../assets/Images/TransitMethod (1).webp";
import TransitMethod2 from "../../assets/Images/TransitMethod (2).webp";
import TransitSimulation from "../TransitSimulation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { set } from "mongoose";
const Title = ({ text }) => {
    return (
        <div className="font-bold text-5xl text-white mb-10">{text}</div>
    )
}
const Text = ({ text }) => {
    return (
        <div className="text-2xl text-slate-300">
            {text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </div>
    )
}
const StrongText = ({ text }) => {
    return (
        <div className="font-bold text-3xl text-white">{text}</div>
    )
}
const Para = ({ text1, text2 }) => {
    return (
        <div className="mx-10 mt-10 bg-gray-800  rounded-xl">
            <div className="bg-gray-900 p-3 rounded-t-xl text-2xl text-slate-100 ">{text1}</div>
            <br></br>
            <div className="p-3"><Text text={text2} /></div>
        </div>
    )
}

const ImgaeShow = ({ img }) => {
    return (
        <div className="w-full rounded-xl mb-10 border-2 border-gray-600">
            <img src={img} alt="" className="rounded-xl w-full" />
        </div>
    )
}
const TransitMethod = () => {
    const [show, setShow] = useState(false);
    const handleSimulation = () => {
        setShow(!show);
    }
    useEffect(() => {

    }, [show])

    return (
        <div className=" font-Saira absolute top-0 mx-60 mt-20">
            {show ?
                (<div className="w-full fixed top-0 left-0 z-50 flex justify-center">
                    <TransitSimulation show={show} setShow={setShow} />
                    <div className='fixed bottom-10  w-20 z-40 '>
                        <div className='w-full flex justify-center  items-center'>
                            <div className='rounded-full bg-slate-800 w-10 h-10 flex justify-center items-center'>
                                <button onClick={handleSimulation}>
                                    <FontAwesomeIcon icon={faXmark} className="text-slate-300 cursor-pointer " size='2xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>) : null
            }
            <div className="-z-10 absolute right-0  w-full h-96 overflow-hidden flex justify-end">
                <img src={transit} alt="transit" className="w-1/2 object-cover opacity-50" />
            </div>
            <div className="mb-20 h-96">
                <div className="flex justify-between">
                    <Title text="Transit Method" />
                </div>
                <Text text="The Transit Method is one of the most successful and widely used techniques for detecting exoplanets. It works by detecting the slight dimming of a star’s light when a planet passes in front of it (called a 'transit'), causing a temporary decrease in brightness. This periodic dimming indicates the presence of an exoplanet and provides valuable information about its characteristics." />
                <div className="mt-10 " onClick={handleSimulation}><Button text="Simulate Transit Method" /></div>
            </div>

            <div className="border-2 mb-10 rounded-xl p-3  border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <details className="collapse">
                    <summary className="pl-10 collapse-title"><StrongText text="How the Transit Method Works:" /></summary>
                    <Para text1="Planet Transiting the Star:" text2={`A planet orbiting a star occasionally passes between the star and the observer (on Earth or in space). This is known as a transit.
                    During the transit, the planet blocks a tiny fraction of the star’s light, causing the star to dim slightly. This decrease in brightness is typically small but detectable with sensitive instruments.` } />
                    <Para text1="Light Curve Analysis:" text2={`The brightness of the star is monitored continuously, and when a planet transits, the star’s light curve (a graph of the star's brightness over time) shows a characteristic dip. The light curve provides the timing and depth of the transit.
                    By observing repeated transits, astronomers can determine the planet’s orbital period (how long it takes to complete one orbit around the star).
                    The shape of the light curve dip, including how steeply it falls and rises, provides information about the size and orbit of the planet.` } />
                    <Para text1="Planetary Properties from the Light Curve:" text2={`Planet Size (Radius): The depth of the dip in the star’s brightness indicates the size of the planet relative to the star. A larger planet blocks more light, causing a deeper dip.
                    Orbital Period: By measuring the time between consecutive transits, astronomers can determine the planet’s orbital period.
                    Distance from the Star (Semi-major Axis): Using Kepler's Third Law, the orbital period of the planet can be related to the distance between the planet and its star. This helps estimate whether the planet is in the star’s habitable zone (the region where liquid water could exist).
                    Atmospheric Composition (for certain cases): For some planets, during the transit, light from the star passes through the planet’s atmosphere. By analyzing the spectrum of this light, scientists can infer the composition of the planet’s atmosphere.` } />
                </details>
            </div>
            <div className="w-full flex  gap-3">
                <ImgaeShow img={TransitMethod1} />
                <ImgaeShow img={TransitMethod2} />
            </div>
            <div className="border-2 mb-10 rounded-xl p-3  border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <details className="collapse">
                    <summary className="pl-10 collapse-title"><StrongText text="Conditions for Detection:" /></summary>
                    <Para text1="" text2={`The transit method works only when the planet’s orbit is aligned with the line of sight between Earth and the star. In other words, the planet must cross directly in front of the star from the observer’s point of view.
                    This alignment happens for a small percentage of planetary systems, meaning many planets won’t be detectable with this method.` } />
                </details>
            </div>
            <div className="border-2 mb-10 rounded-xl p-3  border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <details className="collapse">
                    <summary className="pl-10 collapse-title"><StrongText text="Strengths of the Transit Method:" /></summary>
                    <Para text1="Sensitive to Small Planets:" text2={`The transit method is capable of detecting relatively small planets, including Earth-sized planets, as long as the instrument is sensitive enough to measure very small dips in brightness.
                It works well for planets close to their stars because such planets transit more frequently, increasing the chances of detection.` } />
                    <Para text1="Provides Information About Planetary Atmospheres:" text2={`When a planet transits its star, some starlight passes through the planet’s atmosphere, which allows astronomers to study the atmospheric composition through transmission spectroscopy. Gases in the atmosphere absorb light at specific wavelengths, which can reveal the presence of compounds such as water vapor, carbon dioxide, or methane.`} />
                    <Para text1="High Success Rate:" text2={`The transit method has been extremely successful in detecting a large number of exoplanets, particularly with space-based telescopes like Kepler and TESS.
                It allows for the detection of multi-planet systems, as multiple planets can cause multiple dips in the light curve.`} />
                    <Para text1="Enables Measurement of Planetary Density (with Radial Velocity):" text2={`When combined with the Radial Velocity method, the transit method can provide the planet’s density. The transit method gives the planet’s size, while radial velocity provides the planet’s mass. Knowing both, astronomers can calculate density and make inferences about whether the planet is rocky, gaseous, or an ice giant.`} />
                </details>
            </div>
            <div>
            </div>
            <div className="border-2 mb-10 rounded-xl p-3  border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <details className="collapse">
                    <summary className="pl-10 collapse-title"><StrongText text="Limitations of the Transit Method:" /></summary>

                    <Para
                        text1="Geometric Constraints:"
                        text2={`A key limitation of the transit method is that it requires a specific geometric alignment. Only planetary systems where the planet’s orbit happens to be edge-on relative to Earth can be observed. This limits the percentage of stars for which transiting planets can be detected (estimated to be around 0.5% to 3% for Sun-like stars).`}
                    />

                    <Para
                        text1="Biased Towards Large, Close-in Planets:"
                        text2={`Larger planets, such as hot Jupiters (gas giants that orbit very close to their stars), are easier to detect because they block more light. These planets also have shorter orbital periods, meaning more frequent transits.
                            Small, Earth-like planets, especially those far from their stars, are harder to detect because the dimming they cause is minimal and transits occur less frequently.`}
                    />

                    <Para
                        text1="False Positives:"
                        text2={`The transit method is prone to false positives. For example, a binary star system might produce a dip in brightness that mimics the signal of a planet. Additional follow-up observations using radial velocity or other methods are often needed to confirm that the observed dimming is due to a planet and not another astronomical object.`}
                    />
                </details>
            </div>
            <div className="border-2 mb-10 rounded-xl p-3  border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <details className="collapse">
                    <summary className="pl-10 collapse-title"><StrongText text="Space Missions Using the Transit Method:" /></summary>

                    <Para
                        text1="Kepler Space Telescope:"
                        text2={`The Kepler mission, launched by NASA in 2009, is one of the most successful space telescopes that used the transit method. It observed over 150,000 stars in a small patch of the sky and discovered thousands of exoplanets.
                            It focused on finding Earth-sized planets in the habitable zone of stars where liquid water could exist.`}
                    />

                    <Para
                        text1="TESS (Transiting Exoplanet Survey Satellite):"
                        text2={`Launched in 2018, TESS is a follow-up to the Kepler mission and surveys the entire sky, focusing on the brightest stars near Earth. Its goal is to find exoplanets around nearby stars, which are easier to study in more detail.`}
                    />

                    <Para
                        text1="PLATO (PLAnetary Transits and Oscillations of stars):"
                        text2={`PLATO, a European Space Agency (ESA) mission planned for launch in 2026, will use the transit method to search for Earth-like planets and study the oscillations of stars to understand their interiors.`}
                    />

                    <Para
                        text1="James Webb Space Telescope (JWST):"
                        text2={`Although JWST is not a dedicated exoplanet hunter, it will be able to use the transit method to study the atmospheres of exoplanets by observing their transits and analyzing the starlight passing through their atmospheres.`}
                    />
                </details>
            </div>



        </div >

    )
}
export default TransitMethod;