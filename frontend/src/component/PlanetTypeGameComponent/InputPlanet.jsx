import React from 'react';

const InputPanel = ({ inputs, onInputChange, onPredict }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange({ ...inputs, [name]: value });
  };

  return (
    <div className="input-panel p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className='text-2xl font-bold mb-4'>Discover a New Exoplanet</h2>

      {/* Slider for Radius */}
      <div className="mb-4">
        <label className="block mb-2">Radius: {inputs.radius}</label>
        <input
          type="range"
          name="radius"
          value={inputs.radius}
          min="0.2"
          max="30"
          step="0.5"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Slider for Mass Multiplier */}
      <div className="mb-4">
        <label className="block mb-2">Mass Multiplier: {inputs.mass}</label>
        <input
          type="range"
          name="mass"
          value={inputs.mass}
          min="0.1"
          max="10"
          step="0.1"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Slider for Orbital Radius */}
      <div className="mb-4">
        <label className="block mb-2">Orbital Radius: {inputs.orbital}</label>
        <input
          type="range"
          name="orbital"
          value={inputs.orbital}
          min="0.001"
          max="20"
          step="0.001"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Slider for Distance from Earth */}
      <div className="mb-4">
        <label className="block mb-2">Distance from Earth(Light Yaers): {inputs.distance}</label>
        <input
          type="range"
          name="distance"
          value={inputs.distance}
          min="1"
          max="1000"
          step="10"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Predict Button */}
      <button
        onClick={onPredict}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded border-b-4 border-blue-700"
      >
        Predict Planet Type
      </button>
    </div>
  );
};

export default InputPanel;
