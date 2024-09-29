import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/story_bg_1.png";
import char1 from "../assets/SVG/char1.svg";
import planet7 from "../assets/SVG/planet7.svg";

// Updated NASA Exoplanet Archive API URL with more columns
const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+top+100+pl_name,disc_year,pl_masse,pl_rade,pl_orbper,discoverymethod,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

// Helper function to get a random image from NASA search results
const getRandomExoplanetImage = async () => {
    try {
        const response = await fetch(`${NASA_IMAGE_API_URL}?q=exoplanet`);
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

const Chapter = ({ title, story, image, dir }) => {
    const renderStoryWithLineBreaks = (story) => {
        return story.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="mx-60 mt-60">
            <div>
                <div className="text-3xl text-white font-Saira font-bold">{title}</div>
                <div className={`flex items-center mt-10 ${dir === "ltr" ? "flex-row-reverse" : ""}`}>
                    <div className="flex items-center mt-10">
                        <img src={image} alt="Chapter Illustration" className="w-full mr-3" />
                    </div>
                    <div className="text-xl text-white font-Saira mt-2 w-3/4">
                        {renderStoryWithLineBreaks(story)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExoplanetPage = () => {
    const [exoplanets, setExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredPlanets, setFilteredPlanets] = useState([]);

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

    const handleSearch = (e) => {
        setSearch(e.target.value);

        const filtered = exoplanets.filter((planet) => {
            return planet.pl_name && planet.pl_name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredPlanets(filtered);
    };

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

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
            <h1 className="text-4xl font-bold text-center mb-8">NASA Exoplanet Explorer</h1>

            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for an exoplanet..."
                    className="px-4 py-2 rounded-lg w-1/2 text-black"
                />
            </div>

            <div className="w-auto mx-60">
                {filteredPlanets.map((planet, index) => (
                    <ExoplanetCard key={index} planet={planet} />
                ))}
            </div>
        </div>
    );
};

const ExoplanetCard = ({ planet }) => {
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
        <div className="bg-gray-800 overflow-hidden relative rounded-lg p-6 shadow-lg -z-10">
            <div className='absolute overflow-hidden -right-20 -top-20 -z-10'>
                <img src={planet7} alt="Planet" className="w-full object-cover rounded-lg mb-4" style={{ height: '500px' }} />
            </div>
            <div className=''>
                <h2 className="text-2xl font-bold mb-2 z-20">{planet.pl_name}</h2>
                <img src={imageUrl} alt={planet.pl_name} className=" z-20 w-full h-40 object-cover rounded-lg mb-4" />
                <p><strong>Mass:</strong> {planet.pl_masse || 'Unknown'} Earth masses</p>
                <p><strong>Radius:</strong> {planet.pl_rade || 'Unknown'} Earth radii</p>
                <p><strong>Orbital Period:</strong> {planet.pl_orbper || 'Unknown'} days</p>
                <p><strong>Discovery Year:</strong> {planet.disc_year || 'Unknown'}</p>
                <p><strong>Discovery Method:</strong> {planet.discoverymethod || 'Unknown'}</p>
                <p><strong>Host Star Temp:</strong> {planet.st_teff || 'Unknown'} K</p>
                <p><strong>Host Star Radius:</strong> {planet.st_rad || 'Unknown'} solar radii</p>
                <p><strong>Host Star Mass:</strong> {planet.st_mass || 'Unknown'} solar masses</p>
                <p><strong>Discovery Facility:</strong> {planet.disc_facility || 'Unknown'}</p>
            </div>
        </div>
    );
};

export default ExoplanetPage;
