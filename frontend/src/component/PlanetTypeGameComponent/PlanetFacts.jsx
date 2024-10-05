
const planetFacts = {
  "Gas Giant": [
    "Gas giants are mostly composed of hydrogen and helium.",
    "Jupiter and Saturn are gas giants in our Solar System.",
    "They lack a well-defined solid surface."
  ],
  "Ice Giant": [
    "Ice giants contain larger amounts of water, ammonia, and methane than gas giants.",
    "Uranus and Neptune are the ice giants of our Solar System.",
    "Ice giants are thought to have solid cores surrounded by thick atmospheres."
  ],
  "Super Earth": [
    "Super-Earths are rocky exoplanets with a mass higher than Earth's but lower than Uranus and Neptune.",
    "They are thought to be more common than gas giants in the Universe.",
    "Super-Earths are being studied as potential candidates for habitable exoplanets."
  ],
  "Neptune-like": [
    "Neptune-like exoplanets are gas giants similar in size and composition to Neptune.",
    "They are typically found in the outer regions of star systems.",
    "Neptune-like exoplanets are often referred to as 'ice giants'."
  ],
  "Terrestrial": [
    "Terrestrial exoplanets are rocky planets with a solid surface similar to Earth.",
    "They are often found in the inner regions of star systems.",
    "Terrestrial exoplanets are prime candidates for habitable worlds."
  ]
};

const PlanetFacts = ({ planetType }) => {
  if (!planetType || !planetFacts[planetType]) {
    return null; // Don't show anything if planet type is not available
  }
  const randomFact = planetFacts[planetType][Math.floor(Math.random() * planetFacts[planetType].length)];

  return (
    <div className="planet-facts p-4 rounded-lg mt-4 shadow-md">
      <h3 className="text-lg font-bold mb-2">Fun Fact about {planetType}:</h3>
      <p>{randomFact}</p>
    </div>
  );
};

export default PlanetFacts;


