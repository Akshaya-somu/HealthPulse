from flask import Flask, jsonify
from datetime import datetime
import random
import joblib
import os
import pandas as pd
from flask_cors import CORS

activities = ["Walking", "Running", "Resting", "Cycling"]


app = Flask(__name__)
CORS(app)
# -------------------------------------------------
# Load trained ML model
# -------------------------------------------------
model = joblib.load("rf_health_model.pkl")

@app.route("/api/health/current")
def current_health():
    # Simulated incoming wearable data
    heart_rate = random.randint(65, 130)
    blood_oxygen = random.randint(90, 99)
    body_temperature = round(random.uniform(36.5, 38.5), 1)
    step_count = random.randint(1000, 6000)

    # Prepare input for ML model
    input_df = pd.DataFrame([{
        "Heart_Rate": heart_rate,
        "Body_Temperature": body_temperature,
        "Blood_Oxygen": blood_oxygen,
        "Step_Count": step_count,
        "BP_Systolic": 120,
        "BP_Diastolic": 80
    }])

    # ML prediction
    health_risk = int(model.predict(input_df)[0])

    return jsonify({
        "heart_rate": heart_rate,
        "blood_oxygen": blood_oxygen,
        "body_temperature": body_temperature,
        "step_count": step_count,
        "activity_status": random.choice(activities),
        "timestamp": datetime.now().isoformat(),
        "health_risk": health_risk,
        "anomaly": 0,
        "alert_status": "⚠ Health Alert" if health_risk else "Normal"
    })

@app.route("/api/health/history")
def health_history():
    history = []

    for i in range(10):  # last 10 readings
        heart_rate = random.randint(65, 130)
        blood_oxygen = random.randint(90, 99)
        body_temperature = round(random.uniform(36.5, 38.5), 1)
        step_count = random.randint(1000, 6000)

        input_df = pd.DataFrame([{
            "Heart_Rate": heart_rate,
            "Body_Temperature": body_temperature,
            "Blood_Oxygen": blood_oxygen,
            "Step_Count": step_count,
            "BP_Systolic": 120,
            "BP_Diastolic": 80
        }])

        health_risk = int(model.predict(input_df)[0])

        history.append({
            "timestamp": datetime.now().isoformat(),
            "heart_rate": heart_rate,
            "blood_oxygen": blood_oxygen,
            "body_temperature": body_temperature,
            "health_risk": health_risk
        })

    return jsonify(history)
@app.route("/api/health/alerts")
def health_alerts():
    alerts = []

    for i in range(5):
        heart_rate = random.randint(65, 130)
        blood_oxygen = random.randint(90, 99)
        body_temperature = round(random.uniform(36.5, 38.5), 1)

        severity = None
        message = ""

        if blood_oxygen < 94:
            severity = "critical"
            message = "Low blood oxygen detected"
        elif heart_rate > 120 or body_temperature > 38:
            severity = "warning"
            message = "Abnormal vital signs detected"

        if severity:
            alerts.append({
                "id": i + 1,
                "timestamp": datetime.now().isoformat(),
                "message": message,
                "severity": severity
            })

    return jsonify(alerts)
@app.route("/api/health/summary")
def daily_summary():
    heart_rates = [random.randint(60, 120) for _ in range(10)]
    oxygen_levels = [random.randint(94, 99) for _ in range(10)]
    temperatures = [round(random.uniform(36.5, 38.5), 1) for _ in range(10)]
    steps = [random.randint(500, 6000) for _ in range(10)]

    risk_events = sum(
        1 for hr, ox, temp in zip(heart_rates, oxygen_levels, temperatures)
        if hr > 120 or ox < 94 or temp > 38
    )

    overall_status = "normal"
    if risk_events > 3:
        overall_status = "alert"
    elif risk_events > 0:
        overall_status = "warning"

    return jsonify({
        "date": datetime.now().isoformat(),
        "avg_heart_rate": sum(heart_rates) // len(heart_rates),
        "min_blood_oxygen": min(oxygen_levels),
        "max_temperature": max(temperatures),
        "total_steps": sum(steps),
        "risk_events": risk_events,
        "overall_status": overall_status
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
