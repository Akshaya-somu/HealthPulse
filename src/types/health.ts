export interface HealthData {
  heart_rate: number;
  blood_oxygen: number;
  body_temperature: number;
  step_count: number;
  activity_status: 'resting' | 'walking' | 'running' | 'sleeping' | 'active';
  timestamp: string;
  health_risk: 0 | 1;
  anomaly: 0 | 1;
}

export interface HealthAlert {
  id: string;
  timestamp: string;
  parameter: string;
  value: number;
  severity: 'warning' | 'critical';
  message: string;
}

export interface DailySummary {
  date: string;
  avg_heart_rate: number;
  min_blood_oxygen: number;
  max_temperature: number;
  total_steps: number;
  risk_events: number;
  overall_status: 'normal' | 'warning' | 'alert';
}

export type HealthStatus = 'normal' | 'warning' | 'alert';
