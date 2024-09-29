import React, { useEffect, useState } from 'react';
import _bgImage from "../assets/bg_1.png";
import _bgImage2 from "../assets/bg_2.png";
import char1 from "../assets/SVG/char1.svg";
import planet1 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet2.svg";
import Button from '../component/button';
import OrbitName from '../component/orbitName';
import Title from '../component/title';
import axios from 'axios';


const Hero = () => {
    return (
        <div className="hero w-full h-screen  flex items-center overflow-hidden relative ">
            <div className='pl-36'>
                <div className='text-white font-suse text-3xl '>Explore the Mysteries of Exoplanets!</div>
                <div className='text-slate-400 font-Saira text-xl  w-1/2'>
                    Join us on a cosmic adventure to explore planets beyond the reach of human travel. Learn how these distant worlds are shaping our understanding of the universe.
                </div>
                <div className='pt-2'>
                    <Button text='Join Us' />
                </div>

            </div>
            <div className='overflow-hidden'>
                <img src={planet1} alt="planet1" className="absolute top-20 z-40 w-1/3 -right-24" />
                <img src={planet2} alt="planet2" className="absolute bottom-20 z-20 w-1/5 right-80" />
            </div>

        </div>
    )
}

const Storytelling = () => {
    return (
        <div className='ml-60 '>
            <div className=' flex  items-center '>
                <div className='font-Saira font-bold text-white text-5xl flex items-center'>
                    Hi, I’m <div className='w-28 mx-3'><OrbitName /></div>!
                </div>
                <img src={char1} alt="char1" className="  w-1/6 pl-16 " />
            </div>
            <div className='relative -top-10  w-96 font-Saira text-white text-2xl '>
                I’m here to guide you through the wonders of exoplanets. Together, we’ll explore distant worlds and discover the secrets of the universe. Let’s begin our cosmic journey!
            </div>
            <div>
                <Button text='Journey With Orbit' />
            </div>
        </div>
    )
}

const ExoPlanetIntroduction = ({ prompt }) => {
    return (
        <div>
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

const ExoplanetImages = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const NASA_API_URL = 'https://images-api.nasa.gov/search?q=exoplanet+illustration&media_type=image';

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(NASA_API_URL);
                const imageItems = response.data.collection.items;
                setImages(imageItems);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError(err);
                setLoading(false);
            }
        };

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
                    text: "Exoplanets, or extrasolar planets, are planets that orbit stars beyond our solar system. Unlike the familiar planets around the Sun, exoplanets can be located light-years away, around distant stars. They come in a variety of sizes and types, including gas giants like Jupiter, rocky Earth-like planets, and even super-Earths that are larger than our home planet. Their discovery has revolutionized our understanding of the universe, raising fascinating questions about the potential for life elsewhere.",
                    image: images[0]?.links[0]?.href || ''
                }}
            />
            <ExoPlanetIntroduction
                prompt={{
                    title: "Why Are Exoplanets Important?",
                    text: "Exoplanets are important because they offer clues about how planetary systems form and evolve. Some exoplanets are found in the habitable zone of their stars, where conditions might support liquid water and possibly life. Studying them helps us explore the possibility of life beyond Earth and provides insight into the diversity of planets across the universe.",
                    image: images[1]?.links[0]?.href || ''
                }}
            />
            <ExoPlanetIntroduction
                prompt={{
                    title: "How Are Exoplanets Discovered?",
                    text: "Scientists discover exoplanets using advanced techniques like the transit method, where they observe a planet passing in front of its star, causing a temporary dip in the star's brightness. Another method, called the radial velocity technique, detects the tiny wobble in a star's movement caused by the gravitational pull of an orbiting planet. These methods, along with others, have helped astronomers identify thousands of exoplanets.",
                    image: images[2]?.links[0]?.href || ''
                }}
            />
        </div>
    );
};

const LatestDiscovery = () => {
    const [latestExoplanets, setLatestExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestExoplanets = async () => {
            try {
                console.log("Fetching data...");
                const response = await axios.get(
                    `https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+5+pl_name,hostname,disc_year,discoverymethod+from+ps&format=json`
                );
                console.log("Data fetched successfully", response.data);
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
                <img src={_bgImage2} alt="bg" className="absolute  -z-40" ></img>
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
const HomePage = () => {
    return (
        <div className="login-page overflow-hidden no-scrollbar">
            <img src={_bgImage} alt="bg" className="bg absolute top-0 -z-40" ></img>
            <div className=''>
                <div className='bg-white w-full h-screen fixed -z-40'></div>
                <Hero />
                <Storytelling />
                <ExoplanetImages />
                <LatestDiscovery />
            </div>
        </div>
    )
}
export default HomePage;