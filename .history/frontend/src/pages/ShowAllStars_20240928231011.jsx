import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/bg_5.png";
import bg_6 from "../assets/bg_6.png";
import planet1 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet2.svg";
import planet3 from "../assets/SVG/planet3.svg";
import planet4 from "../assets/SVG/planet4.svg";
import planet5 from "../assets/SVG/planet9.svg";
import planet6 from "../assets/SVG/planet6.svg";
import planet7 from "../assets/SVG/planet7.svg";
import planet8 from "../assets/SVG/planet8.svg";
import star1 from "../assets/SVG/star1.svg";
import char1 from "../assets/SVG/char1.svg";
import Chapter from '../component/Chapter';


// NASA Exoplanet Archive API URL for stars and planets
const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+top+3000+pl_name,pl_orbper,pl_rade,pl_masse,disc_year,discoverymethod,hostname,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

const planetImages = [planet1, planet2, planet3, planet4, planet5, planet6, planet7, planet8]; // Array of planet images


// Main Page Component
const StarPlanetPage = () => {
    const [stars, setStars] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredStars, setFilteredStars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const starsPerPage = 50; 
    const [showAnimate, setShowAnimate] = useState(false);
    const toggleAnimate = () => {
        if (showAnimate) {
                setShowAnimate(false); 
                
            } else {
            setShowAnimate(!false); 
            setShowComparison(!showAnimate); 
        }
    };

    useEffect(() => {
        const fetchStarsAndPlanets = async () => {
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

                // Group planets by star and filter for distinct planets based on their names
                const starData = data.reduce((acc, planet) => {
                    const { hostname, pl_name } = planet;
                    if (!acc[hostname]) {
                        acc[hostname] = {
                            starDetails: planet,
                            planets: []
                        };
                    }

                    // Check if the planet already exists by name and only add unique planets
                    const planetExists = acc[hostname].planets.some(p => p.pl_name === pl_name);
                    if (!planetExists) {
                        acc[hostname].planets.push(planet);
                    }

                    return acc;
                }, {});

                setStars(starData);
                setFilteredStars(Object.values(starData));
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch stars and planets');
                setLoading(false);
            }
        };

        fetchStarsAndPlanets();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to the first page when a new search is made

        const filtered = Object.values(stars).filter((star) => {
            return star.starDetails.hostname && star.starDetails.hostname.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredStars(filtered);
    };

    // Pagination logic: Slice the stars based on the current page
    const indexOfLastStar = currentPage * starsPerPage;
    const indexOfFirstStar = indexOfLastStar - starsPerPage;
    const currentStars = filteredStars.slice(indexOfFirstStar, indexOfLastStar);

    const totalPages = Math.ceil(filteredStars.length / starsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return (
        <div className='flex flex-col justify-center items-center h-screen w-full absolute top-0'>
            <div className='flex justify-center items-center'>
                <div className="text-center text-white font-Saira text-2xl font-bold mr-2">Orbit is searching for stars  </div>
                <span className="loading loading-dots loading-xl text-white w-12"></span>
            </div>
        </div>
    );
    if (error) return (
        <div className='flex flex-col justify-center items-center h-screen w-full absolute top-0'>
            <div className='flex flex-col justify-center items-center'>
                <div className="text-center text-white font-Saira text-2xl font-bold mr-2">Orbit failed </div>
                <span className="loading-xl text-red-500 font-Saira ">{error}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen absolute top-0 text-white w-full ">
            <div className='bg-white h-screen w-full fixed top-0 -z-30' style={{ background: '#230119' }}></div>
            <div className="flex items-center w-full absolute -z-30 flex-col">
                <img src={story_bg_1} alt="Background" className="w-full sticky object-cover" />
            </div>
            <div className="flex items-center w-full absolute bottom-0 -z-30 flex-col">
                <img src={story_bg_1} alt="Background" className="w-full sticky object-cover" />
                <img src={story_bg_1} alt="Background" className="w-full sticky object-cover" />
                <img src={bg_6} alt="Background" className="w-full sticky object-cover" />
            </div>
            <div className=''>
                <Chapter
                    title="“Orbit’s Solar System Adventure”"
                    story="Orbit hovered in the quiet of space, his sensors lighting up as he pointed toward a distant star.

“Did you know there are countless solar systems out there, each with its own stars and planets?” he asked with a sparkle in his eye. “Some systems have multiple suns, while others have planets that could support life. Each one is different, and today, we’re going to explore a few of them!”

He gestured toward the vast universe around him.

“Ready to see what’s out there? Let’s dive into the stars and discover new solar systems—each with its own wonders waiting for you.”"
                    image={char1} 
                    dir="rtl" />
            </div>

            <h1 className="text-4xl font-bold text-center ">Star Explorer</h1>

            <div className="flex justify-center mb-32 w-full">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for a star..."
                    className='border-2 h-10 border-slate-700 bg-slate-700  bg-opacity-40 w-1/2 mt-4 mb-2 text-2xl flex justify-center items-center pl-2'
                />
            </div>

            <div className="w-auto mx-60">
                {currentStars.map((star, index) => (
                    <StarCard key={index} star={star} index={index} />
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
        </div>
    );
};

// Card for Each Star and Its Planets
const StarCard = ({ star, index }) => {
    const { starDetails, planets } = star;
    const [starImageUrl, setStarImageUrl] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        const fetchStarImage = async () => {
            try {
                const starName = starDetails.hostname.split(/[\s-]/)[0];

                const response = await fetch(`${NASA_IMAGE_API_URL}?q=${starName}+star`);
                const data = await response.json();

                if (data.collection.items.length > 0) {
                    setStarImageUrl(data.collection.items[0].links[0].href);
                } else {
                    setStarImageUrl('https://via.placeholder.com/150');
                }
            } catch (err) {
                console.error('Error fetching star image:', err);
                setStarImageUrl('https://via.placeholder.com/150');
            }
        };

        fetchStarImage();
    }, [starDetails]);

    return (
        <div className={`bg-gray-800 bg-opacity-0 overflow-hidden h-96 relative rounded-lg p-6 shadow-lg mb-5 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Star and its planets displayed differently based on index */}
            <div className='absolute flex justify-center items-center top-10'>
                <div className='rounded-full bg-white w-96 h-96 absolute -z-10 flex justify-center items-center'>
                    <div className="w-full h-full bg-yellow-500 rounded-full flex justify-center items-center ">
                        <img src={star1} alt={starDetails.hostname} className="w-full  h-full object-cover rounded-full" />
                    </div>
                </div>

                {/* Circular Orbit lines */}
                <div className='rounded-full border-white border-2  absolute opacity-20 -z-10' style={{ height: '540px ', width: '540px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-20 -z-10' style={{ height: '755px ', width: '755px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-20 -z-10' style={{ height: '965px ', width: '965px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-20 -z-10' style={{ height: '1175px ', width: '1175px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-20 -z-10' style={{ height: '1385px ', width: '1385px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-20 -z-10' style={{ height: '1595px ', width: '1595px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-20 -z-10' style={{ height: '1805px ', width: '1805px' }}></div>
            </div>
            <div className={`flex items-center absolute top-20 ${index % 2 === 0 ? 'right-10' : 'left-10'}`}>
                <h2 className="text-3xl font-bold ">{starDetails.hostname}</h2>
            </div>

            <div className={`flex ${index % 2 === 0 ? 'ml-40' : 'mr-48'}`}>
                {/* Planet Balls */}
                {planets.map((planet, planetIndex) => (
                    <div
                        key={planetIndex}
                        className='flex justify-center items-center flex-col font-Saira'
                        style={index % 2 === 0 ? { marginTop: `${planetIndex * 40}px` } : { marginBottom: `${planetIndex * 40}px` }}
                    >
                        <div className="mx-10 w-12 h-12 rounded-full hover:ring mr-4">
                            <img
                                src={planetImages[Math.floor(Math.random() * planetImages.length)]}
                                alt={planet.pl_name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        {planet.pl_name}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default StarPlanetPage;
