import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/story_bg_1.png";
import planet7 from "../assets/SVG/planet7.svg";
import planet8 from "../assets/SVG/planet8.svg";
import star1 from "../assets/SVG/star1.svg";

// NASA Exoplanet Archive API URL for stars and planets
const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+top+3000+pl_name,pl_orbper,pl_rade,pl_masse,disc_year,discoverymethod,hostname,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

// Main Page Component
const StarPlanetPage = () => {
    const [stars, setStars] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredStars, setFilteredStars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for pagination

    const starsPerPage = 70; // Show 5 stars per page

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
                <div className="text-center text-white font-Saira text-2xl font-bold mr-2">Orbit is searching for stars and planets </div>
                <span className="loading loading-dots loading-xl text-white w-12"></span>
            </div>
        </div>
    );
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen absolute top-0 text-white w-full">
            <div className="flex items-center w-full fixed -z-30">
                <img src={story_bg_1} alt="Background" className="w-full object-cover" />
            </div>

            <h1 className="text-4xl font-bold text-center mb-8">Star and Exoplanet Explorer</h1>

            <div className="flex justify-center mb-32 w-full">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for a star..."
                    className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-1/2 mt-4 mb-2 text-2xl flex justify-center items-center pl-2'
                />
            </div>

            <div className="w-auto mx-60">
                {currentStars.map((star, index) => (
                    <StarCard key={index} star={star} />
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
const StarCard = ({ star }) => {
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
        <div className="bg-gray-800 bg-opacity-0 overflow-hidden h-96 relative rounded-lg p-6 shadow-lg mb-5">
            <div className='absolute flex justify-center items-center top-10 left-10'>
                <div className='rounded-full bg-white w-96 h-96 absolute -z-10 flex justify-center items-center'>
                    <div className="w-full h-full bg-yellow-500 rounded-full flex justify-center items-center ">
                        <img src={star1} alt={starDetails.hostname} className="w-full  h-full object-cover rounded-full" />
                    </div>

                </div>
                <div className='rounded-full border-white border-2  absolute opacity-50 -z-10' style={{ height: '540px ', width: '540px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-50 -z-10' style={{ height: '740px ', width: '740px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-50 -z-10' style={{ height: '940px ', width: '940px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-50 -z-10' style={{ height: '1140px ', width: '1140px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-50 -z-10' style={{ height: '1340px ', width: '1340px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-50 -z-10' style={{ height: '1540px ', width: '1540px' }}></div>
                <div className='rounded-full border-white border-2  absolute opacity-50 -z-10' style={{ height: '1740px ', width: '1740px' }}></div>
            </div>
            <div className="flex items-center absolute right-10 h-full justify-start">
                <h2 className="text-3xl font-bold ml-6">{starDetails.hostname}</h2>
            </div>

            <div className="flex mt-4 ml-52">
                {/* Planet Balls */}
                {planets.map((planet, index) => (
                    <div className='flex justify-center items-center flex-col font-Saira'>
                        <div key={index} className="mx-10 w-12 h-12 bg-blue-500 rounded-full mr-4"></div>
                        {planet.pl_name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StarPlanetPage;
