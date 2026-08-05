# 💚 HealthPulse – Smart Wearable Health Monitoring System

HealthPulse is an ML-powered wearable health monitoring dashboard that analyzes real-time health data to track vital signs, detect anomalies, and generate intelligent health alerts. The system combines a React frontend, Flask backend, and a Machine Learning model to provide continuous health monitoring and predictive insights.

---

## 🌐 Live Demo

**Frontend:** https://health-pulse-five.vercel.app/

**Backend API:** https://healthpulse-backend-a5nr.onrender.com/

---

## 🧠 Project Overview

HealthPulse simulates data collected from wearable health devices and uses a trained Random Forest Machine Learning model to classify health risk based on vital parameters.

The application provides:

- Real-time health monitoring
- Health risk prediction
- Trend visualization
- Alert generation
- Daily health summaries

---

## ✨ Features

### 📊 Real-Time Dashboard

- Heart Rate Monitoring (BPM)
- Blood Oxygen (SpO₂)
- Body Temperature
- Step Count
- Activity Status
- Overall Health Score

### 📈 Health Trends

- Historical Heart Rate Analysis
- Blood Oxygen Trends
- Temperature Trends
- Interactive Charts

### 🚨 Smart Alerts

- Automatic abnormal vital detection
- Warning & Critical health alerts
- Timestamped alert history

### 📋 Daily Summary

- Average Heart Rate
- Minimum Blood Oxygen
- Maximum Temperature
- Total Steps
- Overall Health Status
- Risk Event Count

---

## 🤖 Machine Learning

HealthPulse integrates a trained **Random Forest Classifier** to predict whether a user's health condition is normal or at risk.

### Model Features

- Heart Rate
- Blood Oxygen
- Body Temperature
- Step Count
- Blood Pressure (Systolic & Diastolic)

### ML Workflow

1. Simulated wearable data is generated.
2. Data is converted into a Pandas DataFrame.
3. The Random Forest model predicts health risk.
4. Results are returned through Flask APIs.
5. React displays the predictions in real time.

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts
- Lucide React

### Backend

- Python
- Flask
- Flask-CORS
- REST APIs

### Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Joblib

---

## 🔗 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/health/current` | Returns current wearable health metrics |
| `/api/health/history` | Returns historical health records |
| `/api/health/alerts` | Returns health alerts |
| `/api/health/summary` | Returns daily health summary |

---

## 📁 Project Structure

```text
HealthPulse/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── train_models.py
│   ├── wearable_sports_health_dataset.csv
│   └── rf_health_model.pkl
│
├── public/
├── src/
├── index.html
├── package.json
├── vercel.json
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Akshaya-somu/HealthPulse.git
cd HealthPulse
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:8080
```

---

## 📌 Applications

- Smart Health Monitoring
- Remote Patient Monitoring
- Wearable Device Analytics
- Preventive Healthcare
- Health Risk Prediction

---

## 📷 Screenshots

- Dashboard
- Trends
- Alerts
- Daily Summary

*(Add screenshots here after uploading them to the repository.)*

---

## 👩‍💻 Author

**Akshaya Somu**

GitHub: https://github.com/Akshaya-somu

---

## 📄 License

This project is developed for academic, educational, and portfolio purposes.
