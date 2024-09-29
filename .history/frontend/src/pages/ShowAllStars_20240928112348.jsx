import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/story_bg_1.png";
import char1 from "../assets/SVG/char1.svg";
import planet7 from "../assets/SVG/planet7.svg";
import planet8 from "../assets/SVG/planet8.svg";

// NASA Exoplanet Archive API URL for stars and planets
const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+pl_name,pl_orbper,pl_rade,pl_masse,disc_year,discoverymethod,st_name,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

// Helper function to get a random image from NASA search results
const getRandomExoplanetImage = async () => {
    try {
        const response = await fetch(`${NASA_IMAGE_API_URL}?q=exoplanet+illustrations`);
        const data = await response.json();
        const images = data.collection.items;

        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex].links[0].href;
        }
    } catch (err) {
        console.error('Error fetching random exoplanet image:', err);
    }
    return 'https://via.placeholder.com/150'; // Fallback if no images found or error occurs
};

// Main Page Component
const StarPlanetPage = () => {
    const [stars, setStars] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredStars, setFilteredStars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for pagination

    const starsPerPage = 5; // Show 5 stars per page

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

                // Group planets by star
                const starData = data.reduce((acc, planet) => {
                    const { st_name } = planet;
                    if (!acc[st_name]) {
                        acc[st_name] = {
                            starDetails: planet, // Store the star details
                            planets: []
                        };
                    }
                    acc[st_name].planets.push(planet); // Add planet to the star's planet list
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
            return star.starDetails.st_name && star.starDetails.st_name.toLowerCase().includes(e.target.value.toLowerCase());
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
                const starName = starDetails.st_name.split(/[\s-]/)[0];

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
        <div className="bg-gray-800 overflow-hidden relative rounded-lg p-6 shadow-lg mb-5">
            <h2 className="text-3xl font-bold font-Saira mb-2">{starDetails.st_name}</h2>
            <img src={starImageUrl} alt={starDetails.st_name} className="z-20 w-full h-40 object-cover rounded-lg mb-4" />

            <div className="grid grid-cols-3 gap-2 mr-6">
                <SmallBox label="Temperature" value={starDetails.st_teff || 'Unknown'} />
                <SmallBox label="Radius" value={starDetails.st_rad || 'Unknown'} />
                <SmallBox label="Mass" value={starDetails.st_mass || 'Unknown'} />
            </div>

            <h3 className="text-2xl font-bold font-Saira mt-4 mb-2">Planets</h3>
            {planets.map((planet, index) => (
                <ExoplanetCard key={index} planet={planet} />
            ))}
        </div>
    );
};

// Card for Each Exoplanet
const ExoplanetCard = ({ planet }) => {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        const fetchPlanetImage = async () => {
            try {
                const planetName = planet.pl_name.split(/[\s-]/)[0];

                const response = await fetch(`${NASA_IMAGE_API_URL}?q=${planetName}+exoplanet`);
                const data = await response.json();

                if (data.collection.items.length > 0) {
                    setImageUrl(data.collection.items[0].links[0].href);
                } else {
                    const randomImage = await getRandomExoplanetImage();
                    setImageUrl(randomImage);
                }
            } catch (err) {
                console.error('Error fetching planet image:', err);
                const randomImage = await getRandomExoplanetImage();
                setImageUrl(randomImage);
            }
        };

        fetchPlanetImage();
    }, [planet]);

    return (
        <div className="bg-gray-700 p-4 rounded-md mb-4">
            <h4 className="text-xl font-bold mb-2">{planet.pl_name}</h4>
            <img src={imageUrl} alt={planet.pl_name} className="w-full h-32 object-cover rounded-lg mb-4" />
            <p><strong>Mass:</strong> {planet.pl_masse || 'Unknown'} Earth masses</p>
            <p><strong>Orbital Period:</strong> {planet.pl_orbper || 'Unknown'} days</p>
            <p><strong>Discovery Year:</strong> {planet.disc_year || 'Unknown'}</p>
        </div>
    );
};

// SmallBox component for displaying label-value pairs
const SmallBox = ({ label, value }) => {
    return (
        <div className='my-2 h-20 flex justify-center items-center flex-col bg-slate-700 bg-opacity-50 rounded-md'>
            <div className=' h-2/3 w-full flex justify-center items-center text-xl font-Titiliuam'>{value}</div>
            <div className='font-semibold h-1/3 w-full flex justify-center items-center font-Titiliuam bg-slate-600 bg-opacity-50 rounded-bl-md rounded-br-md'>{label}</div>
        </div>
    );
};

export default StarPlanetPage;
