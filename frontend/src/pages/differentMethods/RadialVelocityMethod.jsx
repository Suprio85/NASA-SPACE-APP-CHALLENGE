import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../component/button";
import transit from "../../assets/SVG/transit.svg";

import TransitMethod1 from "../../assets/Images/TransitMethod (1).webp";
import TransitMethod2 from "../../assets/Images/TransitMethod (2).webp";
import WobbleMethodSimulation from "../RadialVelocity";

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
const RadialVelocityMethod = () => {
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
                    <div className="bg-black"><WobbleMethodSimulation show={show} setShow={setShow} /></div>
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
                    <Title text="Radial Velocity Method" />
                </div>
                <Text text="The Radial Velocity Method, also known as the Doppler Method, is one of the most important techniques for detecting exoplanets, especially those that are large and orbit close to their stars. It was the first method to successfully detect an exoplanet, and it continues to be a vital tool for astronomers." />
                <div className="mt-10 " onClick={handleSimulation}><Button text="Simulate Radial Velocity Method" /></div>
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="How the Radial Velocity (Doppler) Method Works:" /></div>
                <Para text1="Gravitational Influence of Planets:" text2={`A star and its planet both orbit a common center of mass. Though the star is far more massive than the planet, the planet still exerts a small gravitational pull on the star, causing the star to "wobble" slightly as it moves around the center of mass.
                    This wobbling motion is small and periodic, but it can be detected by monitoring the light from the star.` } />
                <Para text1="Doppler Effect:" text2={`As the star moves toward Earth (due to the gravitational influence of an orbiting planet), its light becomes slightly blue-shifted (wavelengths shorten). When the star moves away from Earth, its light becomes slightly red-shifted (wavelengths lengthen).
                    This change in wavelength of the star's light, known as the Doppler Effect, can be detected with very sensitive spectrographs. By measuring these shifts in the star’s spectral lines, scientists can infer the velocity of the star along the line of sight (this is known as the radial velocity of the star).` } />
                <Para text1="Periodic Velocity Changes:" text2={`If a planet is present, these shifts in wavelength will occur regularly as the star moves in response to the planet’s gravitational pull. By tracking this periodic motion, astronomers can determine important details about the planet, such as its mass and orbit.
                    A typical radial velocity signal shows the star moving toward and away from us in a smooth and regular pattern over time, indicating a companion planet in orbit around it.` } />
            </div>
            <div>
                <ImgaeShow img={TransitMethod1} />
            </div>
            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="How the Radial Velocity (Doppler) Method Works:" /></div>

                <Para text1="Planet’s Mass:" text2={`The amplitude of the radial velocity signal (the extent of the wavelength shifts) is related to the mass of the planet. A more massive planet will exert a stronger gravitational pull on the star, leading to a larger amplitude in the radial velocity signal.
                  However, the radial velocity method only provides a minimum mass of the planet, because it cannot directly measure the inclination of the planet’s orbit. If the orbit is not edge-on relative to Earth, the true mass of the planet could be higher than what is measured.`} />

                <Para text1="Planet’s Orbital Period:" text2={`The periodicity of the star’s motion (how often it moves toward and away from us) corresponds to the planet’s orbital period. This tells us how long it takes the planet to complete one orbit around the star.`} />

                <Para text1="Distance from the Star:" text2={`Using Kepler’s Third Law, the orbital period of the planet can be related to its semi-major axis (distance from the star). A longer orbital period means the planet is farther from the star.`} />

                <Para text1="Eccentricity of the Orbit:" text2={`By analyzing the shape of the radial velocity signal, astronomers can also determine whether the planet’s orbit is circular or eccentric (elongated).`} />
            </div>

            <div>
                <ImgaeShow img={TransitMethod2} />
            </div>
            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Strengths of the Radial Velocity Method:" /></div>

                <Para text1="Works Well for Large Planets:" text2={`The radial velocity method is particularly sensitive to large planets, like Jupiter-sized gas giants. These planets exert a stronger gravitational pull on their host stars, causing more significant and detectable shifts in the star’s velocity.`} />

                <Para text1="Detects Planets Close to Their Stars:" text2={`Planets that orbit close to their stars (like hot Jupiters) cause their stars to wobble more frequently. Since they have shorter orbital periods, they induce more regular radial velocity shifts, making them easier to detect.`} />

                <Para text1="Can Provide Planetary Mass Information:" text2={`Unlike some other methods (such as the transit method, which primarily gives information about planet size), the radial velocity method allows astronomers to estimate the planet’s mass, giving key information about its composition. When combined with the transit method, this allows astronomers to determine the planet’s density, and thus infer whether the planet is rocky, gaseous, or icy.`} />

                <Para text1="Effective for Multi-Planet Systems:" text2={`Radial velocity measurements can detect the gravitational effects of multiple planets orbiting the same star. This has led to the discovery of many multi-planet systems.`} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Limitations of the Radial Velocity Method:" /></div>

                <Para text1="Bias Toward Large, Close-in Planets:" text2={`Radial velocity is most sensitive to massive planets that are close to their stars because these planets exert a stronger gravitational influence, producing a larger wobble. Detecting small planets (like Earth-sized planets) or planets that are far from their stars is more challenging, as their gravitational effect on the star is much smaller.`} />

                <Para text1="No Information About Planet Size:" text2={`The radial velocity method provides the planet’s mass but not its size. A large gas giant and a small rocky planet could produce similar radial velocity signals if they have the same mass. However, combining radial velocity with other methods (like transits) can help provide a more complete picture.`} />

                <Para text1="Inclination Uncertainty:" text2={`The radial velocity method does not provide direct information about the inclination of the planet’s orbit. This means that the measured mass is only a minimum mass. If the orbit is inclined relative to our line of sight, the true mass could be higher than observed.`} />

                <Para text1="Challenges for Long-Period Planets:" text2={`Planets that are far from their stars (with long orbital periods) induce slower and smaller radial velocity shifts, making them harder to detect. Detecting these planets requires long-term monitoring over many years.`} />
            </div>

            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Instruments and Missions Using the Radial Velocity Method:" /></div>

                <Para text1="HARPS (High Accuracy Radial velocity Planet Searcher):" text2={`HARPS is one of the most well-known instruments using the radial velocity method. It is mounted on the 3.6-meter telescope at La Silla Observatory in Chile and is capable of detecting very small changes in a star’s velocity, down to a precision of about 1 meter per second. 
                HARPS has been responsible for the discovery of many exoplanets, particularly in multi-planet systems.`} />

                <Para text1="ESPRESSO (Echelle SPectrograph for Rocky Exoplanet and Stable Spectroscopic Observations):" text2={`ESPRESSO is a next-generation spectrograph that is even more precise than HARPS. Installed on the European Southern Observatory’s Very Large Telescope (VLT), ESPRESSO can measure velocity shifts down to about 10 centimeters per second, enabling it to detect smaller Earth-like planets.`} />

                <Para text1="Keck Observatory’s HIRES Spectrograph:" text2={`The HIRES spectrograph at the Keck Observatory in Hawaii has also been used for radial velocity planet searches. It was one of the early instruments that contributed to the discovery of exoplanets.`} />

                <Para text1="CARMENES (Calar Alto high-Resolution search for M dwarfs with Exoearths with Near-infrared and optical Echelle Spectrographs):" text2={`CARMENES is another radial velocity spectrograph designed to search for planets around M-dwarf stars, which are cooler and smaller than Sun-like stars. It operates in both optical and infrared wavelengths.`} />
            </div>
            <div className="border-2 mb-10 rounded-xl p-3 pt-10 border-opacity-10 border-gray-300 bg-gray-700 bg-opacity-30">
                <div className="pl-10"><StrongText text="Examples of Planets Discovered Using the Radial Velocity Method:" /></div>

                <Para text1="51 Pegasi b:" text2={`Discovered in 1995, 51 Pegasi b was the first exoplanet found orbiting a Sun-like star. It is a hot Jupiter located about 50 light-years away. The radial velocity method was used to detect its influence on the star 51 Pegasi.`} />

                <Para text1="Gliese 581 System:" text2={`The Gliese 581 system is home to several planets, including Gliese 581g, which lies in the habitable zone of its star. This system was discovered using the radial velocity method, with the planets exerting detectable wobbles on the host star.`} />

                <Para text1="HD 209458 b:" text2={`One of the first exoplanets detected through both the radial velocity and transit methods, HD 209458 b is a hot Jupiter that orbits very close to its star. Its mass and size were measured, making it a key planet in exoplanet research.`} />
            </div>


        </div >

    )
}
export default RadialVelocityMethod;