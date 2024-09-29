import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/story_bg_1.png";
import char1 from "../assets/SVG/char1.svg";
import char8 from "../assets/SVG/char8.svg";
import planet7 from "../assets/SVG/planet7.svg";
import planet8 from "../assets/SVG/planet8.svg";
import Chapter from '../component/Chapter';
import Button from '../component/button';

const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+top+500+pl_name,disc_year,pl_masse,pl_rade,pl_orbper,discoverymethod,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

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
    return 'https://via.placeholder.com/150'; // Fallback image URL
};

const ExoplanetPage = () => {
    const [exoplanets, setExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredPlanets, setFilteredPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [planetList, setPlanetList] = useState([]);
    const planetsPerPage = 20;

    useEffect(() => {
        const fetchExoplanets = async () => {
            try {
                const response = await fetch(EXOPLANET_API_URL, { headers: { 'Accept': 'application/json' } });
                if (!response.ok) throw new Error('Network response was not ok');
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

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
        const filtered = exoplanets.filter(planet => planet.pl_name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredPlanets(filtered);
    };

    const addToPlanetList = (planet) => {
        if (!planetList.some(p => p.pl_name === planet.pl_name)) {
            setPlanetList([...planetList, planet]);
        }
    };

    const indexOfLastPlanet = currentPage * planetsPerPage;
    const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
    const currentPlanets = filteredPlanets.slice(indexOfFirstPlanet, indexOfLastPlanet);
    const totalPages = Math.ceil(filteredPlanets.length / planetsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) return (
        <div className='flex flex-col justify-center items-center h-screen w-full absolute top-0'>
            <div className='flex justify-center items-center'>
                <div className="text-center text-white font-Saira text-2xl font-bold mr-2">Orbit is searching for new exoplanet</div>
                <span className="loading loading-dots loading-xl text-white w-12"></span>
            </div>
            <img src={char8} alt="char8" className="w-32 mt-5" />
        </div>
    );

    if (error) return (
        <div className='flex flex-col justify-center items-center h-screen w-full absolute top-0'>
            <div className="text-center text-white font-Saira text-2xl font-bold mr-2">Orbit failed</div>
            <span className="loading-xl text-red-500 font-Saira">{error}</span>
        </div>
    );

    return (
        <div className="min-h-screen absolute top-0 text-white w-full">
            <div className="flex items-center w-full fixed -z-30">
                <img src={story_bg_1} alt="Chapter Illustration" className="w-full object-cover" />
            </div>
            <Chapter
                title="“The Search for New Worlds”"
                story={`Orbit drifted through the starry expanse, his sensors glowing softly. "We’ve seen some amazing worlds so far," he said, "but the best part? There are still so many planets out there waiting to be discovered!"
                        
                        He paused, turning toward you. "Now it’s your turn to explore! Right here, you have access to a vast catalog of planets—some rocky, some giant gas worlds, each with its own mysteries."
                        
                        Orbit gestured toward the search bar below. "Go ahead! Type a name or a clue, and I’ll guide you to discover new worlds. The universe is big, so let’s see what we find together!"`}
                image={char1}
                dir={"rtl"}
            />
            <h1 className="text-4xl font-bold text-center font-Saira">NASA Exoplanet Explorer</h1>
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
            <div className='bg-black fixed w-20 h-20 left-20 bottom-20'>
                {planetList.map((planet, index) => (
                    <div key={index}>
                        <h1 className='text-white'>{planet.pl_name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExoplanetPage;
