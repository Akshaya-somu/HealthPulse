import { HealthData, HealthAlert, DailySummary } from '@/types/health';

// Generate mock health data for the last 24 hours
export const generateMockHealthData = (): HealthData[] => {
  const data: HealthData[] = [];
  const now = new Date();
  
  for (let i = 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const isNight = timestamp.getHours() >= 22 || timestamp.getHours() <= 6;
    
    const baseHeartRate = isNight ? 62 : 75;
    const heartRate = baseHeartRate + Math.floor(Math.random() * 20) - 5;
    const bloodOxygen = 95 + Math.floor(Math.random() * 5);
    const bodyTemp = 36.2 + Math.random() * 1.2;
    
    const hasRisk = Math.random() < 0.08;
    const hasAnomaly = Math.random() < 0.05;
    
    data.push({
      heart_rate: heartRate,
      blood_oxygen: bloodOxygen,
      body_temperature: parseFloat(bodyTemp.toFixed(1)),
      step_count: isNight ? 0 : Math.floor(Math.random() * 500),
      activity_status: isNight ? 'sleeping' : (['resting', 'walking', 'active'][Math.floor(Math.random() * 3)] as any),
      timestamp: timestamp.toISOString(),
      health_risk: hasRisk ? 1 : 0,
      anomaly: hasAnomaly ? 1 : 0,
    });
  }
  
  return data;
};

export const currentHealthData: HealthData = {
  heart_rate: 78,
  blood_oxygen: 98,
  body_temperature: 36.6,
  step_count: 4523,
  activity_status: 'active',
  timestamp: new Date().toISOString(),
  health_risk: 0,
  anomaly: 0,
};

export const mockAlerts: HealthAlert[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    parameter: 'Heart Rate',
    value: 112,
    severity: 'warning',
    message: 'Heart rate elevated above normal range',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    parameter: 'Blood Oxygen',
    value: 92,
    severity: 'critical',
    message: 'Blood oxygen dropped below safe threshold',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    parameter: 'Body Temperature',
    value: 37.8,
    severity: 'warning',
    message: 'Body temperature slightly elevated',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    parameter: 'Heart Rate',
    value: 125,
    severity: 'critical',
    message: 'Heart rate critically high during rest',
  },
];

export const dailySummary: DailySummary = {
  date: new Date().toISOString().split('T')[0],
  avg_heart_rate: 74,
  min_blood_oxygen: 96,
  max_temperature: 36.8,
  total_steps: 7842,
  risk_events: 2,
  overall_status: 'normal',
};
