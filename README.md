# 💚 HealthPulse – Smart Wearable Health Monitoring System

HealthPulse is a smart, ML-powered health monitoring dashboard that analyzes real-time wearable data to track vital signs, detect anomalies, and generate health alerts.  
The system focuses on **early detection**, **continuous monitoring**, and **data-driven health insights**.
---

🌐 Live Demo
Frontend: https://health-pulse-five.vercel.app/

Backend API: https://healthpulse-backend-a5nr.onrender.com/

---

## 🧠 Why HealthPulse?

With the rise of wearable devices, massive health data is generated every second.  
HealthPulse transforms this data into **meaningful insights** that help users understand their health status and identify potential risks early.

---

## ✨ Key Features

- 📊 **Real-time Health Dashboard**

  - Heart Rate (BPM)
  - Blood Oxygen (SpO₂)
  - Body Temperature
  - Step Count & Activity Status

- 🚨 **Health Alerts**

  - Automatic alerts for abnormal vitals
  - Clear visual indicators for warning conditions

- 📈 **Trends & Insights**

  - Health trends over time
  - Easy-to-read visual analytics

- 🧠 **Overall Health Score**
  - Simple score-based health status
  - Updated dynamically

---

## 🧪 Machine Learning Highlights

- **Health Risk Classification**
  - Predicts Normal vs Alert state
- **Anomaly Detection**
  - Identifies unusual health patterns
- **Model Persistence**
  - Trained models saved using `.pkl` files

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts (Graphs & Charts)

### Backend

- Python
- Flask
- REST APIs
- Flask-CORS

### ML & Data

- Pandas, NumPy
- Scikit-learn
- Joblib

---

## 🔗 API Endpoints

| Endpoint              | Purpose                |
| --------------------- | ---------------------- |
| `/api/health/current` | Current health metrics |
| `/api/health/history` | Historical health data |
| `/api/health/summary` | Daily summary          |
| `/api/health/alerts`  | Health alerts          |

---

## 📁 Project Structure

```

health-harmony-hub-main/
│
├── backend
│   ├── requirements.txt
│   ├── app.py
│   ├── train_models.py
│   └── models/
│       ├── health_model.pkl
│       └── scaler.pkl
│
├── public/
├── src/
├── index.html
├── README.md
└── package.json
└── vercel.json

```

---

## ▶️ How to Run

### Backend

```bash
cd backend
python app.py
```

### Frontend

```bash
npm install
npm run dev
```

---

## 📈 Use Cases

- Continuous health monitoring
- Early risk detection
- Preventive healthcare
- Remote patient tracking

---

## 👩‍💻 Author

**Akshaya Somu**

---

## 📜 License

For academic and educational use only.
