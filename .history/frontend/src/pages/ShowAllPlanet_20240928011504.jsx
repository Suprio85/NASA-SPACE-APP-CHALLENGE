import React, { useState, useEffect } from 'react';

const EXOPLANET_API_URL = 'https://api.le-systeme-solaire.net/rest/bodies/';
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace with your Unsplash API key

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
                const data = await response.json();
                setExoplanets(data.bodies);
                setFilteredPlanets(data.bodies);
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
            planet.englishName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredPlanets(filtered);
    };

    // Fetch images for a specific exoplanet using Unsplash
    const fetchPlanetImage = async (planetName) => {
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${planetName}&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return data.results[0].urls.small;
            }
            return 'https://via.placeholder.com/150'; // Default placeholder if no image found
        } catch (err) {
            console.error('Error fetching image:', err);
            return 'https://via.placeholder.com/150'; // Return placeholder on error
        }
    };

    // Display loading, error or the list of planets
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
                    <ExoplanetCard key={planet.id} planet={planet} fetchPlanetImage={fetchPlanetImage} />
                ))}
            </div>
        </div>
    );
};

// Card component to display each exoplanet with its image
const ExoplanetCard = ({ planet, fetchPlanetImage }) => {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        const fetchImage = async () => {
            const url = await fetchPlanetImage(planet.englishName);
            setImageUrl(url);
        };

        fetchImage();
    }, [planet, fetchPlanetImage]);

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{planet.englishName}</h2>
            <img src={imageUrl} alt={planet.englishName} className="w-full h-40 object-cover rounded-lg mb-4" />
            <p><strong>Gravity:</strong> {planet.gravity || 'Unknown'}</p>
            <p><strong>Discovery Date:</strong> {planet.discoveryDate || 'Unknown'}</p>
            <p><strong>Mass:</strong> {planet.mass?.massValue || 'Unknown'} kg</p>
        </div>
    );
};

export default ExoplanetPage;
