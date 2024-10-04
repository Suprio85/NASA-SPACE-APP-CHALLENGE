from data import get_data
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import re

def extract_prefix(planet_name):
    match = re.match(r'^[a-zA-Z]+', planet_name)
    return match.group(0) if match else planet_name

data = get_data()  

print(data.columns.tolist())

selected_columns = [
    'pl_orbper',
    'pl_orbsmax',
    'pl_rade',
    'pl_bmasse',
    'pl_insol',
    'sy_dist',
    'pl_orbeccen',
]

target = 'pl_name'

filtered_data = data[selected_columns + [target]]
cleaned_data = filtered_data.fillna(0)


X = cleaned_data[selected_columns]
y = cleaned_data[target].apply(extract_prefix)

print(X)
print(y);

# Encode the target variable (planet names)
le = LabelEncoder()
y = le.fit_transform(y)

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=4200)

# Initialize the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=422)

# Fit the model
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate the model performance from the test set
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')

# Save the model to disk
import joblib
joblib.dump(model, 'random_forest_model.pkl')
joblib.dump(le, 'label_encoder.pkl')
joblib.dump(selected_columns, 'features.pkl')


