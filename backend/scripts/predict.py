import joblib
import sys
import numpy as np
import os
import pandas as pd

# Load the Random Forest model, LabelEncoder, and feature names
__dirname = os.path.dirname(os.path.abspath(__file__))
modelPath = os.path.join(__dirname, 'random_forest_model.pkl')
lePath = os.path.join(__dirname, 'label_encoder.pkl')
featuresPath = os.path.join(__dirname, 'features.pkl')
model = joblib.load(modelPath)
le = joblib.load(lePath)
features = joblib.load(featuresPath)

# Get the input parameters from the command line arguments
distance = float(sys.argv[1])
mass_multiplier = float(sys.argv[2])
radius_multiplier = float(sys.argv[3])
orbital_radius = float(sys.argv[4])

# Print the raw inputs
print("Inputs received:",distance, mass_multiplier, radius_multiplier, orbital_radius)

# Create an input DataFrame for the model
input_data = pd.DataFrame([[distance,mass_multiplier, radius_multiplier, orbital_radius]], columns=features)
print(f'Input DataFrame for the model:\n{input_data}')

# Make a prediction
prediction = model.predict(input_data)

# Decode the predicted label back to planet type
predicted_planet_type = le.inverse_transform([prediction[0]])

# Print the predicted planet type
print(f'Predicted planet type: {predicted_planet_type[0]}')