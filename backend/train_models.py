import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# -----------------------------
# STEP 1: Load dataset
# -----------------------------
df = pd.read_csv("wearable_sports_health_dataset.csv")

# Convert timestamp
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Split Blood Pressure
bp_split = df['Blood_Pressure'].str.split('/', expand=True)
df['BP_Systolic'] = bp_split[0].astype(int)
df['BP_Diastolic'] = bp_split[1].astype(int)
df.drop(columns=['Blood_Pressure'], inplace=True)

# Encode Activity Status
df = pd.get_dummies(df, columns=['Activity_Status'])

# Drop non-ML columns
df.drop(columns=['Record_ID', 'Athlete_ID', 'Latitude', 'Longitude'], inplace=True)

# -----------------------------
# STEP 2: Create Health Risk label  👈 THIS IS "WHERE"
# -----------------------------
df['Health_Risk'] = (
    (df['Heart_Rate'] < 50) |
    (df['Heart_Rate'] > 120) |
    (df['Blood_Oxygen'] < 94) |
    (df['Body_Temperature'] > 38)
).astype(int)

print("Health Risk Distribution:")
print(df['Health_Risk'].value_counts())

# -----------------------------
# STEP 3: Train Random Forest  👈 THIS IS "WHERE"
# -----------------------------
features = [
    'Heart_Rate',
    'Body_Temperature',
    'Blood_Oxygen',
    'Step_Count',
    'BP_Systolic',
    'BP_Diastolic'
]

X = df[features]
y = df['Health_Risk']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

print("\nModel Evaluation:")
print(classification_report(y_test, rf_model.predict(X_test)))

# -----------------------------
# STEP 4: Save model
# -----------------------------
joblib.dump(rf_model, "rf_health_model.pkl")

print("\n✅ Model saved as rf_health_model.pkl")
