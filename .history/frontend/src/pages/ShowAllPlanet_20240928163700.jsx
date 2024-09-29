import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/story_bg_1.png";
import char1 from "../assets/SVG/char1.svg";
import char8 from "../assets/SVG/char8.svg";
import planet7 from "../assets/SVG/planet7.svg";
import planet8 from "../assets/SVG/planet8.svg";

import Chapter from '../component/Chapter';
import Button from '../component/button';
// Updated NASA Exoplanet Archive API URL with more columns
const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+top+500+pl_name,disc_year,pl_masse,pl_rade,pl_orbper,discoverymethod,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';


// Helper function to get a random image from NASA search results
const getRandomExoplanetImage = async () => {
    try {
        const response = await fetch(`${NASA_IMAGE_API_URL}?q=exoplanet+illustrations`);
        const data = await response.json();
        const images = data.collection.items;

        // Return a random image from the search results
        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex].links[0].href;
        }
    } catch (err) {
        console.error('Error fetching random exoplanet image:', err);
    }
    return 'https://via.placeholder.com/150'; // Fallback if no images found or error occurs
};





const ExoplanetPage = () => {
    const [exoplanets, setExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredPlanets, setFilteredPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for pagination

    const [planetList, setPlanetList] = useState([]);

    const planetsPerPage = 20; // Show 20 planets per page

    useEffect(() => {
        const fetchExoplanets = async () => {
            try {
                const response = await fetch(EXOPLANET_API_URL, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setExoplanets(data);
                setFilteredPlanets(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch exoplanets');
                setLoading(false);
            }
        };

        fetchExoplanets();
    }, []);

    const addToPlanetList = (planet) => {
        if (!planetList.some(p => p.pl_name === planet.pl_name)) {
            setPlanetList([...planetList, planet]);
        }
    };



    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to the first page when a new search is made

        const filtered = exoplanets.filter((planet) => {
            return planet.pl_name && planet.pl_name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredPlanets(filtered);
    };

    // Pagination logic: Slice the planets based on the current page
    const indexOfLastPlanet = currentPage * planetsPerPage;
    const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
    const currentPlanets = filteredPlanets.slice(indexOfFirstPlanet, indexOfLastPlanet);

    const totalPages = Math.ceil(filteredPlanets.length / planetsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return (
        <div className='flex flex-col justify-center items-center h-screen w-full absolute top-0'>
            <div className='flex justify-center items-center'>
                <div className="text-center text-white font-Saira text-2xl font-bold mr-2">Orbit is searching for new exoplanet </div>
                <span class="loading loading-dots loading-xl text-white w-12"></span>
            </div>
            <div className='mt-5'>
                <img src={char8} alt="char8" className="w-32" />
            </div>
        </div>
    )
    if (error) return (
        <div className='flex flex-col justify-center items-center h-screen w-full absolute top-0'>
            <div className='flex flex-col justify-center items-center'>
                <div className="text-center text-white font-Saira text-2xl font-bold mr-2">Orbit failed </div>
                <span className="loading-xl text-red-500 font-Saira ">{error}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen absolute top-0 text-white w-full">
            <div className="flex items-center w-full fixed -z-30">
                <img src={story_bg_1} alt="Chapter Illustration" className="w-full object-cover" />
            </div>
            <div>
                <Chapter
                    title="“The Search for New Worlds”"
                    story={`Orbit drifted through the starry expanse, his sensors glowing softly. "We’ve seen some amazing worlds so far," he said, "but the best part? There are still so many planets out there waiting to be discovered!"
                        
                        He paused, turning toward you. "Now it’s your turn to explore! Right here, you have access to a vast catalog of planets—some rocky, some giant gas worlds, each with its own mysteries."
                        
                        Orbit gestured toward the search bar below. "Go ahead! Type a name or a clue, and I’ll guide you to discover new worlds. The universe is big, so let’s see what we find together!"`}
                    image={char1}
                    dir={"rtl"}
                />
            </div>
            <h1 className="text-4xl font-bold text-center  font-Saira">NASA Exoplanet Explorer</h1>

            <div className="flex justify-center mb-32 w-full">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for an exoplanet..."
                    className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-1/2 mt-4 mb-2 text-2xl flex justify-center items-center pl-2'
                />
            </div>

            <div className="w-auto mx-60">
                {currentPlanets.map((planet, index) => (
                    <ExoplanetCard key={index} planet={planet} addToPlanetList={addToPlanetList} />
                ))}
            </div>


            {/* Pagination controls */}
            <div className="flex justify-center mt-6 overflow-hidden mb-10">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-600' : 'bg-gray-600'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className=' fixed  left-10 bottom-20'>
                {
                    planetList.map((planet, index) => (
                        <div key={index} className='flex'>
                            <div className='bg-slate-900 mt-1 pl-3 rounded w-10 mr-3'>
                                <h1 className='text-white font-Saira font-bold'>{index}</h1>
                            </div>
                            <div className='bg-slate-900 mt-1 pl-3 rounded w-44'>
                                <h1 className='text-white font-Saira font-bold'>{planet.pl_name}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

const ExoplanetCard = ({ planet, addToPlanetList }) => {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        const fetchPlanetImage = async () => {
            try {
                const planetName = planet.pl_name.split(/[\s-]/)[0];

                // Primary search query: exoplanet name + "exoplanet"
                const response = await fetch(`${NASA_IMAGE_API_URL}?q=${planetName}+exoplanet`);
                const data = await response.json();

                if (data.collection.items.length > 0) {
                    // Filter for relevant metadata (planet images)
                    const filteredItems = data.collection.items.filter(item =>
                        item.data.some(dataItem => dataItem.keywords && dataItem.keywords.includes("exoplanet"))
                    );

                    if (filteredItems.length > 0) {
                        setImageUrl(filteredItems[0].links[0].href);
                    } else {
                        // If no relevant images, use random exoplanet image
                        const randomImage = await getRandomExoplanetImage();
                        setImageUrl(randomImage);
                    }
                } else {
                    // If no images found, use random exoplanet image
                    const randomImage = await getRandomExoplanetImage();
                    setImageUrl(randomImage);
                }
            } catch (err) {
                console.error('Error fetching image:', err);
                const randomImage = await getRandomExoplanetImage();
                setImageUrl(randomImage); // Fallback on error
            }
        };

        fetchPlanetImage();
    }, [planet]);

    return (
        <div className="bg-gray-800 relative overflow-hidden rounded-lg p-6 shadow-lg mb-5 hover:ring">
            <div className='absolute overflow-hidden -right-32 -top-32 opacity-50'>
                <img src={planet7} alt="Decorative Planet Image" className="object-cover rounded-lg" style={{ height: '500px' }} />
            </div>
            <div className='absolute overflow-hidden -left-32 -bottom-32 opacity-50'>
                <img src={planet8} alt="Decorative Planet Image" className="object-cover rounded-lg" style={{ height: '500px' }} />
            </div>
            <div className='relative group '>
                <div className='flex items-center'>
                    <div className='w-1/2'>
                        <h2 className="text-3xl font-bold font-Saira mb-2">{planet.pl_name}</h2>
                        <div className='grid grid-cols-3 gap-2 mr-6'>
                            <SmallBox label="Mass" value={planet.pl_masse || 'Unknown'} />
                            <SmallBox label="Radius" value={planet.pl_rade || 'Unknown'} />
                            <SmallBox label="Orbital Period" value={planet.pl_orbper || 'Unknown'} />
                            <SmallBox label="Discovery Year" value={planet.disc_year || 'Unknown'} />
                            <SmallBox label="Discovery Method" value={planet.discoverymethod || 'Unknown'} />
                            <SmallBox label="Host Star Temp" value={planet.st_teff || 'Unknown'} />
                            <SmallBox label="Host Star Radius" value={planet.st_rad || 'Unknown'} />
                            <SmallBox label="Host Star Mass" value={planet.st_mass || 'Unknown'} />
                            <SmallBox label="Discovery Facility" value={planet.disc_facility || 'Unknown'} />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <img src={imageUrl} alt={planet.pl_name} className="w-full h-96 object-cover rounded-lg" />
                    </div>
                </div>
                <div className='absolute w-full -bottom-4  hidden group-hover:block'>
                    <div className='w-full flex justify-center'>
                        <div onClick={() => addToPlanetList(planet)}>
                            <Button text="Compare" />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

// SmallBox component for displaying label-value pairs
const SmallBox = ({ label, value }) => {
    return (
        <div className='my-2  h-20 flex justify-center items-center flex-col bg-slate-700 bg-opacity-50 rounded-md'>
            <div className=' h-2/3  w-full flex justify-center items-center text-xl font-Titiliuam'>{value}</div>
            <div className='font-semibold h-1/3 w-full flex justify-center items-center font-Titiliuam bg-slate-600 bg-opacity-50 rounded-bl-md rounded-br-md'>{label}</div>
        </div>
    );
};

export default ExoplanetPage;
