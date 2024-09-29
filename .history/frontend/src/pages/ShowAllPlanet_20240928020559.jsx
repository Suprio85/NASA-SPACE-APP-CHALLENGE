import React, { useState, useEffect } from 'react';

// Correct NASA Exoplanet Archive API URL (TAP Protocol)
const EXOPLANET_API_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,disc_year,pl_masse,pl_rade+from+ps&format=json';
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

const ExoplanetPage = () => {
    const [exoplanets, setExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredPlanets, setFilteredPlanets] = useState([]);

    // Fetch exoplanets from NASA API
    useEffect(() => {
        const fetchExoplanets = async () => {
            try {
                const response = await fetch(EXOPLANET_API_URL);
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

    // Handle search input
    const handleSearch = (e) => {
        setSearch(e.target.value);
        const filtered = exoplanets.filter((planet) =>
            planet.pl_name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredPlanets(filtered);
    };

    // Display loading, error, or the list of planets
    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">
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
                {filteredPlanets.map((planet) => (
                    <ExoplanetCard key={planet.pl_name} planet={planet} />
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
                const response = await fetch(`${NASA_IMAGE_API_URL}?q=${planet.pl_name}`);
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
            <p><strong>Discovery Year:</strong> {planet.disc_year || 'Unknown'}</p>
        </div>
    );
};

export default ExoplanetPage;



https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,disc_year,pl_masse,pl_rade+from+ps&format=json
https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,disc_year,pl_masse,pl_rade+from+ps&format=json