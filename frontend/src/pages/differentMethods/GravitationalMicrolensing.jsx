import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../component/button";
import transit from "../../assets/SVG/transit.svg";

import TransitMethod1 from "../../assets/Images/TransitMethod (1).webp";
import TransitMethod2 from "../../assets/Images/TransitMethod (2).webp";
import TransitSimulation from "../TransitSimulation";
import GravitationalMicroLensingSimulation from "../GravitationalMicrolensingSimulaton"
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
const GravitationalMicroLensing = () => {
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
                    <GravitationalMicroLensingSimulation show={show} setShow={setShow} />
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
                    <Title text="Gravitational Microlensing " />
                </div>
                <Text text="Gravitational Microlensing is a method used to discover exoplanets by observing the effects of a star's gravitational field on light passing by it. The method takes advantage of a phenomenon known as gravitational lensing, predicted by Einstein’s Theory of General Relativity. This technique is particularly effective for detecting distant planets, even in other parts of the galaxy, and can reveal planets that other methods often miss." />
                <div className="mt-10 " onClick={handleSimulation}><Button text="Simulate Gravitational Microlensing " /></div>
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="How Gravitational Microlensing Works:" /></div>

                <Para text1="Gravitational Lensing:" text2={`When a massive object, such as a star or planet, passes in front of a more distant background star from the observer's perspective, the gravitational field of the foreground object (called the lens star) bends and magnifies the light from the background star (called the source star). This is known as gravitational lensing.
    This bending of light causes the distant star to momentarily appear brighter as the alignment between the lens star and the source star changes.`} />

                <Para text1="Microlensing Events:" text2={`When the alignment between the observer, the lens star, and the source star is nearly perfect, the light from the source star is bent into a ring-like shape, called an Einstein Ring. 
    In most cases, however, the alignment is not perfect, and instead of a ring, observers see two distorted images of the background star, though they are too close together to resolve separately. What is observed is a brief, sharp increase in brightness, called a microlensing event.`} />

                <Para text1="Planetary Detection:" text2={`If the lens star has an orbiting planet, the planet’s gravity adds additional distortion to the lensing effect. This causes detectable anomalies in the light curve (the graph of brightness over time). These anomalies can be used to infer the presence of a planet orbiting the lens star.
    The anomaly produced by the planet lasts for a very short period (hours to days) compared to the overall lensing event (weeks to months).`} />

                <Para text1="No Need for Light from the Planet or Star:" text2={`One of the key aspects of the microlensing method is that it doesn’t require direct detection of light from the planet or even the lens star. It only depends on the gravitational effects on the light of a more distant background star.
    This makes microlensing particularly useful for detecting planets that are farther from their stars or are located in very distant systems, even in the center of the galaxy.`} />
            </div>

            <div>
                <ImgaeShow img={TransitMethod1} />
            </div>
            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="What is Detected During a Microlensing Event:" /></div>

                <Para text1="Light Curve:" text2={`The light curve is a graph of brightness versus time. As the lens star passes in front of the background star, the light curve shows a characteristic brightening and then dimming. If a planet is present, it creates a brief anomaly in the light curve, which appears as a sharp dip or spike.`} />

                <Para text1="Einstein Radius:" text2={`The Einstein Radius is the radius of the circular region in which the gravitational lensing effect is strongest. The size of the Einstein Radius depends on the mass of the lens star and its distance from both the observer and the background star.`} />
            </div>

            <div>
                <ImgaeShow img={TransitMethod2} />
            </div>
            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Strengths of Gravitational Microlensing:" /></div>

                <Para text1="Can Detect Planets in Distant Systems:" text2={`Microlensing is capable of detecting planets that are located much farther away from Earth than other detection methods. While radial velocity and transit methods are best suited for nearby stars, microlensing can detect planets thousands of light-years away, even near the center of our galaxy.`} />

                <Para text1="Sensitive to Wide-Orbit and Low-Mass Planets:" text2={`Gravitational microlensing is particularly effective for detecting planets that are located farther from their stars (with wide orbits), which are more difficult to detect using other methods. It can also detect relatively low-mass planets, such as Earth-sized planets, even if they are not close to their parent stars. 
    It is also sensitive to free-floating planets, which are planets not bound to any star and would be difficult to find by any other method.`} />

                <Para text1="No Bias Toward Stellar Type:" text2={`Since microlensing events rely on the gravitational effects of the lens star rather than its light, this method is not biased toward particular types of stars. It can detect planets around all types of stars, including stars that are too faint or distant to be observed by other methods.`} />

                <Para text1="Works Well for Planets at Various Distances:" text2={`The microlensing technique can detect planets at a variety of distances from their host stars, including planets in wide orbits similar to Jupiter or Saturn in our solar system. This gives it an edge over methods like the transit method, which is more effective for detecting planets that are very close to their stars.`} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Limitations of Gravitational Microlensing:" /></div>

                <Para text1="One-Time Events:" text2={`Microlensing events are one-time occurrences. Once the lens star and source star move out of alignment, the microlensing event is over and cannot be repeated. This means that microlensing detections are time-sensitive, and astronomers must catch the event as it happens.
    After the event, the planets detected cannot usually be observed again through microlensing. Follow-up observations using other methods are often not possible, especially for very distant systems.`} />

                <Para text1="Rare and Unpredictable:" text2={`Microlensing events are relatively rare because they depend on a chance alignment of a distant star and a lensing star. These events are difficult to predict, and astronomers must continuously monitor large fields of stars to catch a microlensing event in action.
    Surveys like OGLE (Optical Gravitational Lensing Experiment) and MOA (Microlensing Observations in Astrophysics) monitor millions of stars regularly to catch these rare events.`} />

                <Para text1="Limited Information About Planetary Systems:" text2={`While microlensing is great at detecting planets, it provides less information about the detected planet compared to other methods. For example, microlensing does not provide direct information about the planet’s size or atmospheric composition. It only provides an estimate of the planet’s mass and its distance from the host star.
    Additionally, since microlensing only detects the gravitational influence of a planet during a brief event, it can be difficult to confirm whether the detected planet is truly bound to the host star or if it is a free-floating planet.`} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Instruments and Projects Using Gravitational Microlensing:" /></div>

                <Para text1="OGLE (Optical Gravitational Lensing Experiment):" text2={`OGLE is one of the leading microlensing surveys. Operating since the early 1990s, OGLE monitors millions of stars in the dense regions of the Milky Way, particularly toward the galactic center. It has detected numerous microlensing events and contributed significantly to the discovery of exoplanets via microlensing.`} />

                <Para text1="MOA (Microlensing Observations in Astrophysics):" text2={`MOA is a collaboration between Japan and New Zealand and works in conjunction with OGLE. It focuses on observing microlensing events and discovering exoplanets. MOA has a special focus on free-floating planets and distant planetary systems.`} />

                <Para text1="KMTNet (Korea Microlensing Telescope Network):" text2={`KMTNet consists of three 1.6-meter telescopes located in Chile, South Africa, and Australia. It is designed to detect microlensing events by continuously monitoring the same fields in the sky, particularly towards the galactic center.`} />

                <Para text1="NASA’s Roman Space Telescope (formerly WFIRST):" text2={`The upcoming Nancy Grace Roman Space Telescope will play a significant role in microlensing searches. Scheduled for launch in the mid-2020s, this space telescope will use microlensing to discover exoplanets, especially those in the outer regions of planetary systems. It will also be able to detect free-floating planets.`} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Examples of Planets Discovered Using Microlensing:" /></div>

                <Para text1="OGLE-2005-BLG-390Lb:" text2={`This planet was discovered using the OGLE and MOA microlensing surveys. It is located around 21,500 light-years away, in the galactic bulge, and has a mass roughly five times that of Earth. It orbits its host star at a distance similar to that of the asteroid belt in our solar system, showing that microlensing can detect planets at wide separations.`} />

                <Para text1="OGLE-2016-BLG-1195Lb:" text2={`This planet is notable because it is located in the galactic bulge, around 13,000 light-years away. It is an Earth-mass planet, and its discovery demonstrates the ability of microlensing to detect low-mass planets in distant systems that would be hard to find using other methods.`} />

                <Para text1="MOA-2007-BLG-192Lb:" text2={`This is another example of a low-mass planet discovered through microlensing. It has a mass of around 3.3 Earth masses and is thought to orbit a low-mass star or brown dwarf. The discovery of such low-mass planets around faint objects shows the power of the microlensing method.`} />
            </div>




        </div >

    )
}
export default GravitationalMicroLensing;