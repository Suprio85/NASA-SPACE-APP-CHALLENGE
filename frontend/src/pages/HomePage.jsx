import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _bgImage from "../assets/bg_1.png";
import _bgImage2 from "../assets/bg_2.png";
import char1 from "../assets/SVG/char1.svg";
import planet1 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet3.svg";
import Button from '../component/button';
import OrbitName from '../component/orbitName';
import Title from '../component/title';
import rocket from "../assets/SVG/rocket.svg";
import sattelite from "../assets/SVG/sattelite.svg";
import axios from 'axios';
import Typist from 'react-typist';
import Index from '../component';
import groundTelescope from "../assets/SVG/groundTelescope.svg";
import AOS from 'aos';

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SolarSystemSim from '../component/SolarSytem';

// Hero Section
const Hero = () => {
    return (
        <div className="hero w-full h-screen flex items-center overflow-hidden relative ">
            <div className='pl-36 h-56 w-full relative' data-aos="fade-right">
                <div className='text-white font-suse text-3xl'>
                    <Typist avgTypingDelay={30} cursor={{ show: true, blink: true, element: '|', hideWhenDone: true }}>
                        <Typist.Delay ms={1000} />
                        Explore the Mysteries of Exoplanets!
                    </Typist>
                </div>
                <Typist.Delay ms={100} />
                <div className='text-slate-400 font-Saira text-xl w-1/2'>
                    <Typist avgTypingDelay={30} cursor={{ show: true, blink: true, element: '|', hideWhenDone: true }}>
                        Join us on a cosmic adventure to explore planets beyond the reach of human travel. Learn how these distant worlds are shaping our understanding of the universe.
                    </Typist>
                </div>
                <div className='absolute bottom-2 pt-2'>
                    <Link to="/login"><Button text='Join Us' /></Link>
                </div>
            </div >
            <div className='overflow-hidden'>

                <div className='absolute top-40 z-40 w-40 right-80 animate-rightShake ' data-aos="fade-left">
                    <div className=' animate-rotate relative w-20' style={{height:"450px"}}>
                        <img src={sattelite} alt="rocket" className="w-20 relative " style={{ transform: "rotate(45deg)" }} />
                    </div>
                    <div className='-top-96 -left-10 relative'>
                        <img src={groundTelescope} alt="rocket" className="w-20 relative top-10 -left-8 animate-mirror" style={{ transform: "rotate(-45deg)" }} />
                        <img src={planet1} alt="planet1 " className="" />
                    </div>
                </div>
                <div className='absolute bottom-20 left-96 h-full  flex justify-start w-2/3 ' style={{ rotate: "10deg" }}>
                    <SolarSystemSim />
                </div>
                {/* <img src={planet2} alt="planet2" className="absolute bottom-20 z-20 w-40 right-80 animate-spin-fast" /> */}
            </div>
            <div className='fixed -bottom-32 -left-32 animate-go45'>
                <img src={rocket} alt="rocket" className="w-10" style={{ transform: "rotate(45deg)" }} />
            </div>
        </div >
    );
}

// Storytelling Section
const Storytelling = () => {
    return (
        <div className='ml-60' data-aos="zoom-in-right">
            <div className='flex items-center'>
                <div className='font-Saira font-bold text-white text-5xl flex items-center'>
                    Hi, I’m <div className='w-28 mx-3'><OrbitName /></div>!
                </div>
                <img src={char1} alt="char1" className="w-1/6 pl-16 animate-shake" />
            </div>
            <div className='relative -top-10 h-48 w-96 font-Saira text-white text-2xl'>
                <Typist avgTypingDelay={30} cursor={{ show: true, blink: true, element: '|', hideWhenDone: true }}>
                    I’m here to guide you through the wonders of exoplanets. Together, we’ll explore distant worlds and discover the secrets of the universe. Let’s begin our cosmic journey!
                </Typist>
            </div>
            <div>
                <Link to="/journeywithOrbit"><Button text='Journey With Orbit' /></Link>
            </div>
        </div>
    );
}

// Exoplanet Introduction Section
const ExoPlanetIntroduction = ({ prompt }) => {
    return (
        <div className='' data-aos="zoom-in-right">
            <div className='mb-5'>
                <Title text={prompt.title} />
                <div className='w-full font-Saira text-slate-900 text-xl'>
                    {prompt.text}
                </div>
            </div>
            <div>
                <img src={prompt.image} alt="exoplanet" className="w-full h-96 object-cover" />
            </div>
        </div>
    );
}

// Exoplanet Images Section
const ExoplanetImages = () => {
    const [images, setImages] = useState([

    ]);  // Initially set to local images
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const NASA_API_URL = 'https://images-api.nasa.gov/search?q=exoplanet+illustration&media_type=image';

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });

        const fetchImages = async () => {
            setLoading(true);
            try {
                const response = await axios.get(NASA_API_URL);
                const imageItems = response.data.collection.items;
                setImages(imageItems.map(item => item.links[0].href)); // Update images with fetched data
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError(err);
                setLoading(false);
            }
        };

        // Fetch the images asynchronously after local images are rendered
        fetchImages();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching images. Please try again later.</div>;
    }

    return (
        <div className="mt-96 mx-60">
            <ExoPlanetIntroduction
                prompt={{
                    title: "What Is Exoplanet?",
                    text: "Exoplanets, or extrasolar planets, are planets that orbit stars beyond our solar system. Unlike the familiar planets around the Sun, exoplanets can be located light-years away, around distant stars. They come in a variety of sizes and types, including gas giants like Jupiter, rocky Earth-like planets, and even super-Earths that are larger than our home planet.",
                    image: images[0]
                }}
            />
            <ExoPlanetIntroduction
                prompt={{
                    title: "Why Are Exoplanets Important?",
                    text: "Exoplanets offer clues about how planetary systems form and evolve. Some exoplanets are found in the habitable zone of their stars, where conditions might support liquid water and possibly life.",
                    image: images[1]
                }}
            />
            <ExoPlanetIntroduction
                prompt={{
                    title: "How Are Exoplanets Discovered?",
                    text: "Scientists discover exoplanets using advanced techniques like the transit method, where they observe a planet passing in front of its star, causing a temporary dip in the star's brightness.",
                    image: images[2]
                }}
            />
        </div>
    );
};

// Latest Discovery Section
const LatestDiscovery = () => {
    const [latestExoplanets, setLatestExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestExoplanets = async () => {
            try {
                const response = await axios.get(
                    `https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+5+pl_name,hostname,disc_year,discoverymethod+from+ps&format=json`
                );
                setLatestExoplanets(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching latest exoplanet data", error);
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            }
        };

        fetchLatestExoplanets();
    }, []);

    if (loading) {
        return <div className="text-slate-100">Loading latest discoveries...</div>;
    }

    return (
        <div className="pt-96 relative -top-96">
            <div>
                <img src={_bgImage2} alt="bg" className="absolute -z-40" />
            </div>
            <div className='py-20 px-60 pt-72'>
                <div className="font-suse font-bold text-slate-100 text-3xl">Latest Discoveries</div>
                <div className="w-full font-Saira text-slate-100 text-xl mt-4">
                    Check out the latest discoveries in the field of exoplanets:
                </div>
                <div className="mt-6 grid grid-cols-3 gap-6">
                    {latestExoplanets.length > 0 ? (
                        latestExoplanets.map((planet, index) => (
                            <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg text-slate-100">
                                <img
                                    src={`https://via.placeholder.com/300x200?text=${planet.pl_name}`}
                                    alt={planet.pl_name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <div className="text-xl font-bold">{planet.pl_name}</div>
                                <div className="mt-2">
                                    <strong>Host Star:</strong> {planet.hostname}
                                </div>
                                <div className="mt-2">
                                    <strong>Discovery Year:</strong> {planet.disc_year}
                                </div>
                                <div className="mt-2">
                                    <strong>Discovery Method:</strong> {planet.discoverymethod}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-slate-100">No recent discoveries found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

// HomePage Component
const HomePage = () => {
    return (
        <div className="login-page overflow-hidden no-scrollbar absolute top-0">
            <img src={_bgImage} alt="bg" className="bg absolute top-0 -z-40" />
            <div className=''>
                <div className='bg-white w-full h-screen top-0 fixed -z-50'></div>
                <Hero />
                <Storytelling />
                <ExoplanetImages />
                <Index />
                <LatestDiscovery />
            </div>
        </div>
    );
}

export default HomePage;
