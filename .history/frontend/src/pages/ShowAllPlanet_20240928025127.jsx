import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/story_bg_1.png";
import char1 from "../assets/SVG/char1.svg";
// Updated NASA Exoplanet Archive API URL with more columns
const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+top+100+pl_name,disc_year,pl_masse,pl_rade,pl_orbper,discoverymethod,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';



const Chapter = ({ title, story, image, dir }) => {
    // Function to handle line breaks in the story content
    const renderStoryWithLineBreaks = (story) => {
        return story.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
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
            <div className="flex items-center w-full absolute -z-10">
                <img src={story_bg_1} alt="Chapter Illustration" className="w-full object-cover" />
            </div>
            <div>
                <Chapter
                    title=" The Search for New Worlds"
                    story="Orbit floated gently through the sparkling backdrop of deep space, his sensors picking up the faint glimmer of countless stars.\n\n“We’ve been on quite the journey so far, haven’t we?” he said with a warm glow. “We’ve seen strange worlds with two suns, gas giants with fierce storms, and planets so close to their stars they sizzle!”\n\nHe paused, turning to face the explorer.\n\n“But do you know what the most exciting part is?” he asked, a twinkle in his eye. “There are still so many more planets out there, waiting to be discovered. Hundreds, even thousands of them! And now, it’s your turn to explore.”\n\nOrbit gestured toward the starry expanse behind him.\n\n“Right here, you have access to a vast catalog of planets—planets of all shapes, sizes, and types, each with its own mysteries. Some might be rocky worlds like Earth, others giant balls of gas like Jupiter. But each one is special, and you can search for any of them!”\n\nHe floated down gently and pointed to a glowing field below.\n\n“See that? That’s where you can begin your search. Just type the name of a planet or a clue about what you’re looking for, and I’ll guide you through the stars to find it. Whether it’s a familiar planet or one that’s yet to be discovered, the adventure is yours to choose.”\n\nOrbit smiled, his lights flickering in anticipation.\n\n“The universe is big, and there’s no limit to what you can find. So, what are you waiting for? Start your search, and let’s discover new worlds together!”"
                    image={char1}
                    dir={"rtl"}
                />
            </div>
            <h1 className="text-4xl font-bold text-center mb-8">NASA Exoplanet Explorer</h1>

            {/* Search input */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for an exoplanet..."
                    className="px-4 py-2 rounded-lg w-1/2 text-black"
                />
            </div>

            {/* Display exoplanets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
r
                const planetName = planet.pl_name.split(/[\s-]/)[0];

                const response = await fetch(`${NASA_IMAGE_API_URL}?q=${planetName}`);
                const data = await response.json();

                if (data.collection.items.length > 0) {
                    setImageUrl(data.collection.items[0].links[0].href); 
                }
            } catch (err) {
                console.error('Error fetching image:', err);
            }
        };

        fetchPlanetImage();
    }, [planet]);

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{planet.pl_name}</h2>
            <img src={imageUrl} alt={planet.pl_name} className="w-full h-40 object-cover rounded-lg mb-4" />
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
    );
};

export default ExoplanetPage;
