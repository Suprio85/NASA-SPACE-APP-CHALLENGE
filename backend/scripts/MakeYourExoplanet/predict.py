import joblib
import sys
import pandas as pd
import os

__dirname = os.path.dirname(os.path.abspath(__file__))
modelPath = os.path.join(__dirname, 'random_forest_model.pkl')
lePath = os.path.join(__dirname, 'label_encoder.pkl')
featuresPath = os.path.join(__dirname, 'features.pkl')



# Load the Random Forest model and LabelEncoder
model = joblib.load(modelPath)  # Updated model filename
le = joblib.load(lePath)  # Updated label encoder filename
features = joblib.load(featuresPath)  # Updated features filename


# Get the input parameters from the command line arguments
pl_orbper = float(sys.argv[1])          # Orbital Period
pl_orbsmax = float(sys.argv[2])         # Orbital Semi-Major Axis
pl_rade = float(sys.argv[3])            # Planet Radius (Earth units)
pl_bmasse = float(sys.argv[4])          # Planet Mass (Earth units)
pl_insol = float(sys.argv[5])           # Insolation Flux
sy_dist = float(sys.argv[6])            # Distance (parsecs)
pl_orbeccen = float(sys.argv[7])        # Orbital Eccentricity

# Define feature names matching the model input features
# features = [
#     'pl_orbper',      # Orbital Period
#     'pl_orbsmax',     # Orbital Semi-Major Axis
#     'pl_rade',        # Planet Radius (Earth units)
#     'pl_bmasse',      # Planet Mass (Earth units)
#     'pl_insol',       # Insolation Flux
#     'sy_dist',        # Distance (parsecs)
#     'pl_orbeccen'     # Orbital Eccentricity
# ]

# Create an input DataFrame for the model
input_data = pd.DataFrame([[pl_orbper, pl_orbsmax, pl_rade, pl_bmasse, pl_insol, sy_dist, pl_orbeccen]], columns=features)



# Make a prediction
prediction = model.predict(input_data)

# Decode the predicted label back to planet type
predicted_planet_type = le.inverse_transform([prediction[0]])

# Print the predicted planet type
print(predicted_planet_type[0])



