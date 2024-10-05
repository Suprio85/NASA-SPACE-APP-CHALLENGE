import React from 'react';
import { motion } from 'framer-motion';

const map = {
  'Gas Giant': 'jupi.png',
  'Super Earth': 'sat.png',
  'Neptune-like': 'np.png',
  'Terrestrial': 'merc.png',
};

const PredictionResult = ({ planetType }) => {
  if (!planetType) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prediction-result mt-6 p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      {planetType ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Planet Type: {planetType}</h3>
          
          {/* Planet image with subtle animation */}
          <motion.img
            src={`icons/${map[planetType]}`}
            alt={planetType}
            className="w-32 h-32 mx-auto mb-4"
            initial={{ scale: 0.8, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          
          {/* Additional planet description */}
          <p className="text-lg">
            This is a <span className="font-semibold">{planetType}</span> exoplanet! Keep discovering more.
          </p>
        </div>
      ) : (
        <h3 className="text-xl">Waiting for Prediction...</h3>
      )}
    </motion.div>
  );
};

export default PredictionResult;