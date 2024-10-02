import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../component/button";
import transit from "../../assets/SVG/directImaging.svg";

import DirectImaging1 from "../../assets/Images/drectImaging (1).webp";
import DirectImaging2 from "../../assets/Images/directImaging (2).jpg";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { set } from "mongoose";
import DirectImagingDemo from "../DirectImagingSimulation";
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
const DirectImaging = () => {
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
                    <DirectImagingDemo show={show} setShow={setShow} />
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
                    <Title text="Direct Imaging" />
                </div>
                <Text text="Direct Imaging is one of the most visually compelling methods for detecting and studying exoplanets because it involves capturing actual pictures of the planets themselves, rather than inferring their presence through indirect measurements. This method is technically challenging, as planets are much dimmer than the stars they orbit. The brightness of stars can outshine their planets by many orders of magnitude, making it difficult to distinguish the faint light from a planet." />
                <div className="mt-10 " onClick={handleSimulation}><Button text="Simulate Transit Method" /></div>
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="How Direct Imaging Works:" /></div>

                <Para text1="Planetary Reflection and Emission:" text2={`Exoplanets are visible either by reflecting light from their host stars or by emitting infrared light if they are young and hot. Since planets are much cooler than stars, they emit primarily in the infrared part of the spectrum, which is why many direct imaging efforts focus on capturing infrared light. The primary challenge is that planets are incredibly faint compared to their host stars. A typical star might be millions or even billions of times brighter than the planets orbiting it.`} />

                <Para text1="Blocking Starlight (Coronagraphy & Starshades):" text2={`Coronagraphs: To overcome the brightness of the star, telescopes are often equipped with coronagraphs—instruments designed to block out the star’s light while still allowing the faint light from the surrounding exoplanet to pass through. A coronagraph essentially creates an artificial eclipse inside the telescope, suppressing the star’s glare and making the planet more visible. Starshades: Another technology involves using starshades, large, flower-shaped spacecraft placed far from the telescope to block the star's light before it even enters the telescope. This allows the telescope to focus directly on the planets.`} />

                <Para text1="High-Contrast Imaging:" text2={`Adaptive Optics: To achieve the clarity needed for direct imaging, astronomers use adaptive optics to correct for the distortion caused by Earth's atmosphere. The atmosphere can blur and distort images, but adaptive optics systems use deformable mirrors that adjust in real-time to compensate for these distortions, producing sharper images. Extreme Adaptive Optics: In advanced systems like those used by the European Southern Observatory’s Very Large Telescope (VLT) or the Gemini Planet Imager, the correction is so precise that the star's light is suppressed even more, making the planet easier to detect.`} />

                <Para text1="Infrared Imaging:" text2={`Many exoplanets are easiest to detect in the infrared spectrum, especially if they are young and still radiating heat from their formation. Telescopes like the James Webb Space Telescope (JWST) will operate in the infrared, which is ideal for spotting faint planetary light, especially from young, giant exoplanets.`} />

                <Para text1="Large Separation Planets:" text2={`Direct imaging works best for planets that are far from their stars because they appear farther away from the bright star in the telescope’s field of view. The farther the planet is from the star, the less interference there is from the star’s brightness, making it easier to isolate the planet’s light.`} />
            </div>
            <div>
                <ImgaeShow img={DirectImaging1} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Strengths of Direct Imaging:" /></div>

                <Para text1="Direct Observation:" text2={`Unlike most other methods, direct imaging provides actual visual confirmation of an exoplanet. This is significant because it allows astronomers to study the planet directly rather than relying solely on indirect measurements.`} />

                <Para text1="Can Study Planetary Atmospheres:" text2={`Direct imaging can allow scientists to perform spectroscopy on the light coming from the planet itself, revealing details about the planet's atmosphere, such as its composition, temperature, and weather patterns. This can help detect molecules like water vapor, methane, and carbon dioxide, which could indicate the possibility of life.`} />

                <Para text1="Observes Large, Distant Planets:" text2={`Direct imaging is particularly effective at observing massive planets that are far from their host stars. These planets often have large orbits (comparable to or larger than Jupiter's orbit in our solar system), making them easier to distinguish from the star.`} />

                <Para text1="Understanding Planet Formation:" text2={`By directly observing young planets in distant systems, astronomers can gain valuable insights into planet formation and evolution. These observations can show planets in the early stages of their development, helping to refine theories about how planets form and evolve over time.`} />

                <Para text1="Long-Distance Exoplanet Discovery:" text2={`Direct imaging can discover exoplanets in far-off star systems that may be difficult to detect using other methods, especially when those systems are too far for radial velocity or transit methods to be effective.`} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Limitations of Direct Imaging:" /></div>

                <Para text1="Extremely Challenging and Expensive:" text2={`The primary limitation of direct imaging is its difficulty. It requires highly specialized and expensive equipment, like advanced adaptive optics systems and coronagraphs, which are available only on the largest and most advanced telescopes.`} />

                <Para text1="Limited to Large, Distant Planets:" text2={`Direct imaging is most effective at detecting large gas giants located far from their stars (similar to or larger than Jupiter). Smaller planets like Earth are much more difficult to detect because they are less bright and typically too close to their stars, making them hard to distinguish.`} />

                <Para text1="Rare Detection:" text2={`Only a small number of exoplanets have been detected via direct imaging because the method is highly specialized and applicable to a limited subset of exoplanets. Most exoplanets detected to date have been found using indirect methods like radial velocity and the transit method.`} />

                <Para text1="Young, Hot Planets are Easier to Find:" text2={`Direct imaging is most effective at detecting young planets that are still hot from their formation. As planets age, they cool down and emit less infrared light, making them harder to detect via direct imaging.`} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Instruments and Projects Using Direct Imaging:" /></div>

                <Para text1="Very Large Telescope (VLT):" text2={`The VLT is an array of four telescopes in Chile operated by the European Southern Observatory (ESO). It is equipped with advanced adaptive optics and coronagraphs that allow it to directly image exoplanets. It has captured some of the first-ever images of exoplanets, such as Beta Pictoris b. The VLT also uses the SPHERE (Spectro-Polarimetric High-contrast Exoplanet Research) instrument, specifically designed for direct imaging of exoplanets.`} />

                <Para text1="Gemini Planet Imager (GPI):" text2={`The GPI, located at the Gemini South Telescope in Chile, is an instrument designed specifically for direct imaging of exoplanets. It has an advanced adaptive optics system and coronagraph to block out the host star’s light and capture images of orbiting planets.`} />

                <Para text1="James Webb Space Telescope (JWST):" text2={`The JWST, set to be the most powerful infrared space telescope, will be capable of imaging exoplanets directly. Its primary mirror and infrared capabilities make it ideal for studying young, distant planets that are still glowing in the infrared from their formation.`} />

                <Para text1="Hubble Space Telescope:" text2={`While not optimized for direct imaging of exoplanets, the Hubble Space Telescope has successfully captured images of some exoplanets, such as Fomalhaut b. Its advanced optics and coronagraph make it capable of capturing some exoplanets under the right conditions.`} />

                <Para text1="WFIRST (Nancy Grace Roman Space Telescope):" text2={`Set to launch in the mid-2020s, WFIRST will be equipped with a coronagraph specifically designed for direct imaging. It will help in the detection of exoplanets by blocking the light of host stars and is expected to provide some of the clearest images of exoplanets ever captured.`} />
            </div>
            <div>
                <ImgaeShow img={DirectImaging2} />
            </div>
            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Examples of Planets Discovered via Direct Imaging:" /></div>

                <Para text1="Beta Pictoris b:" text2={`Beta Pictoris b is one of the first exoplanets to be directly imaged. It is a gas giant, about 13 times the mass of Jupiter, orbiting the star Beta Pictoris. It was imaged using the VLT in 2008.`} />

                <Para text1="HR 8799 System:" text2={`The HR 8799 system is a famous case of direct imaging where multiple exoplanets (HR 8799 b, c, d, and e) were directly imaged orbiting a star 130 light-years away. These are massive gas giants orbiting relatively far from their star.`} />

                <Para text1="Fomalhaut b:" text2={`Fomalhaut b was one of the first planets imaged directly by the Hubble Space Telescope. It orbits the star Fomalhaut, located about 25 light-years from Earth. This detection was significant as it provided one of the clearest images of an exoplanet.`} />
            </div>




        </div >

    )
}
export default DirectImaging;