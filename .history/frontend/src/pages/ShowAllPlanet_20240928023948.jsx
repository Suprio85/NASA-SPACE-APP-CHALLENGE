import React, { useState, useEffect } from 'react';
import story_bg_1 from "../assets/story_bg_1.png";
// Updated NASA Exoplanet Archive API URL with more columns
const EXOPLANET_API_URL = 'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+top+100+pl_name,disc_year,pl_masse,pl_rade,pl_orbper,discoverymethod,st_teff,st_rad,st_mass,disc_facility+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

const ExoplanetPage = () => {
    const [exoplanets, setExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredPlanets, setFilteredPlanets] = useState([]);

    // Fetch exoplanets from NASA API with more details (limit to 100 unique results)
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
                
                setExoplanets(data); // Fetch 100 unique exoplanets with more details
                setFilteredPlanets(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch exoplanets');
                setLoading(false);
            }
        };

        fetchExoplanets();
    }, []);

    // Handle search input
    const handleSearch = (e) => {
        setSearch(e.target.value);
        
        const filtered = exoplanets.filter((planet) => {
            return planet.pl_name && planet.pl_name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredPlanets(filtered);
    };

    // Display loading, error, or the list of planets
    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen  text-white p-10">
            <div className="flex items-center mt-10">
                        <img src={story_bg_1} alt="Chapter Illustration" className="w-full mr-3" />
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

// Card component to display each exoplanet with its image
const ExoplanetCard = ({ planet }) => {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150'); // Placeholder image

    useEffect(() => {
        const fetchPlanetImage = async () => {
            try {
                // Extract the first part of the planet's name before any space or special character
                const planetName = planet.pl_name.split(/[\s-]/)[0]; // Splits by space or hyphen and takes the first part

                const response = await fetch(`${NASA_IMAGE_API_URL}?q=${planetName}`);
                const data = await response.json();
                
                if (data.collection.items.length > 0) {
                    setImageUrl(data.collection.items[0].links[0].href); // Use the first image found
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
