from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
from data import get_data
import joblib
import pandas as pd

# Select relevant features and target
features = ['distance','mass_multiplier', 'radius_multiplier', 'orbital_radius']
target = 'planet_type'
data = get_data()

# Handle categorical variables (detection_method)
data_encoded = data.copy()
le = LabelEncoder()

# Add all potential values of detection_method to ensure they're included in the LabelEncoder  # Ensure LabelEncoder sees all possible methods
  # Print the classes that the LabelEncoder has seen


# Split data into features and target
X = pd.DataFrame(data_encoded[features], columns=features)
# X = data_encoded[features]
y = data_encoded[target]


# Encode the target variable (planet_type)
y = le.fit_transform(y)  # Make sure to fit on planet_type

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=4200)

# Initialize the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=4200)

# Train the model
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')

# Save the model to disk
joblib.dump(model, 'random_forest_model.pkl')
joblib.dump(le, 'label_encoder.pkl')
joblib.dump(features, 'features.pkl')
