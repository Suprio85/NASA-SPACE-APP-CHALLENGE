import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Modal from '../component/PlanetTypeGameComponent/Modal';
import InputPanel from '../component/PlanetTypeGameComponent/InputPlanet';
import PredictionResult from '../component/PlanetTypeGameComponent/Predictionresult';
import PlanetFacts from '../component/PlanetTypeGameComponent/PlanetFacts';

const exoplanetTypes = ['Super Earth', 'Neptune-like', 'Gas Giant', 'Terrestrial'];

// Dummy facts for exoplanets (replace with real data)
const planetFacts = {
  'Super Earth': 'Super Earths are planets with masses larger than Earth but smaller than ice giants like Uranus and Neptune.',
  'Neptune-like': 'Neptune-like planets are ice giants with thick atmospheres composed mostly of hydrogen, helium, and methane.',
  'Gas Giant': 'Gas giants like Jupiter and Saturn are planets with massive gaseous envelopes around them.',
  'Terrestrial': 'Terrestrial planets are rocky planets like Earth, Mercury, Venus, and Mars.',
};

const predictPlanetType = async (inputs) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/predict/predicttype', inputs);
    return response.data.prediction;
  } catch (error) {
    console.error('Error predicting planet type:', error);
    return 'Prediction failed';
  }
};

const Game = () => {
  const [inputs, setInputs] = useState({ radius: 25, mass: 5, orbital: 50, distance: 500 });
  const [attempts, setAttempts] = useState(5);
  const [predictedPlanetType, setPredictedPlanetType] = useState(null);
  const [targetPlanet, setTargetPlanet] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(true);
  const [isFactModalOpen, setIsFactModalOpen] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateTargetPlanet();
  }, []);

  const generateTargetPlanet = () => {
    const randomPlanet = exoplanetTypes[Math.floor(Math.random() * exoplanetTypes.length)];
    setTargetPlanet(randomPlanet);
  };

  const handleInputChange = (newInputs) => {
    setInputs(newInputs);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const prediction = await predictPlanetType(inputs);
      setPredictedPlanetType(prediction);
      setAttempts(prevAttempts => prevAttempts - 1);

      if (prediction === targetPlanet) {
        setGameResult('win');
        setIsFactModalOpen(true); // Open the fact modal on win
      } else if (attempts <= 1) {
        setGameResult('lose');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      setPredictedPlanetType('Prediction failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameReset = () => {
    generateTargetPlanet();
    setInputs({ radius: 25, mass: 5, orbital: 50, distance: 500 });
    setAttempts(5);
    setPredictedPlanetType(null);
    setGameResult('');
    setIsGameModalOpen(true);
    setIsFactModalOpen(false);
  };

  return (
    <div className="game-container p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      {/* Modal for Game Description */}
      {isGameModalOpen && (
        <Modal onClose={() => setIsGameModalOpen(false)}>
          <h2 className="text-3xl font-bold mb-4">Welcome to the Exoplanet Discovery Challenge!</h2>
          <p className="mb-4">You'll be shown an exoplanet type. Your task is to guess the correct input values that would result in that planet type.</p>
          <p className="mb-4">Adjust the values for radius, mass, orbital radius, and distance from Earth to match the given planet type. You have 5 attempts to get it right!</p>
          <p className="mb-4">Exoplanet types: Super Earth, Neptune-like, Gas Giant, and Terrestrial.</p>
        </Modal>
      )}

      {/* Game Content */}
      {targetPlanet && !gameResult && (
        <>
          <h2 className="text-2xl font-bold mb-4">Target Exoplanet: {targetPlanet}</h2>
          <p className="mb-4">Adjust the inputs to match this planet type!</p>
          <InputPanel inputs={inputs} onInputChange={handleInputChange} onPredict={handlePredict} />
        </>
      )}

      {/* Loading and Prediction Result */}
      {isLoading ? (
        <div className="mt-4">Predicting planet type...</div>
      ) : (
        predictedPlanetType && <PredictionResult planetType={predictedPlanetType} />
      )}

      {/* Attempts Left */}
      <div className="text-lg mt-4">
        Attempts left: <span className="font-bold">{attempts}</span>
      </div>

      {/* Win/Loss Result */}
      {gameResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          {gameResult === 'win' ? (
            <>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-3xl font-bold text-green-500 mb-4">
                  Congratulations! You correctly guessed the inputs for {targetPlanet}!
                </h3>
              </motion.div>

              {/* Button to Show Facts */}
              <button
                onClick={() => setIsFactModalOpen(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                View Planet Facts
              </button>
            </>
          ) : (
            <h3 className="text-3xl font-bold text-red-500">Game Over! You couldn't find the correct inputs for {targetPlanet}.</h3>
          )}
          <button
            onClick={handleGameReset}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </motion.div>
      )}

      {/* Modal for Planet Facts (on Win) */}
      {isFactModalOpen && (
        <Modal onClose={() => setIsFactModalOpen(false)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-800 text-white rounded-lg"
          >
           <PlanetFacts planetType={targetPlanet} />
          </motion.div>
        </Modal>
      )}
    </div>
  );
};

export default Game;
