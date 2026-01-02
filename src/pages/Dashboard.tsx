import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/health/MetricCard";
import { OverallHealthCard } from "@/components/health/OverallHealthCard";
import { AlertBanner } from "@/components/health/AlertBanner";
import { HealthStatus } from "@/types/health";
import {
  Heart,
  Droplets,
  Thermometer,
  Footprints,
  Activity,
} from "lucide-react";

const activityLabels = {
  resting: "Resting",
  walking: "Walking",
  running: "Running",
  sleeping: "Sleeping",
  active: "Active",
};

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/health/current")
      .then((res) => res.json())
      .then((apiData) => setData(apiData))
      .catch((err) => console.error("API error:", err));
  }, []);

  // ✅ SAFETY CHECK (VERY IMPORTANT)
  if (!data) {
    return (
      <DashboardLayout>
        <div className="p-6 text-muted-foreground">Loading health data...</div>
      </DashboardLayout>
    );
  }

  const hasAlert = data.health_risk === 1 || data.anomaly === 1;

  // Determine overall status
  const getOverallStatus = (): HealthStatus => {
    if (data.health_risk === 1) return "alert";
    if (data.anomaly === 1) return "warning";
    return "normal";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Health Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your vital signs in real-time
          </p>
        </div>

        {/* Alert Banner */}
        {hasAlert && (
          <AlertBanner message="Abnormal reading detected. Please check your vitals and consult a healthcare provider if symptoms persist." />
        )}

        {/* Overall Health Status */}
        <OverallHealthCard
          status={getOverallStatus()}
          lastUpdated={data.timestamp}
        />

        {/* Metric Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <MetricCard
            title="Heart Rate"
            value={data.heart_rate}
            unit="bpm"
            icon={Heart}
            color="heart"
            isAlert={data.heart_rate > 100 || data.heart_rate < 50}
          />

          <MetricCard
            title="Blood Oxygen"
            value={data.blood_oxygen}
            unit="SpO₂ %"
            icon={Droplets}
            color="oxygen"
            isAlert={data.blood_oxygen < 95}
          />

          <MetricCard
            title="Body Temperature"
            value={data.body_temperature}
            unit="°C"
            icon={Thermometer}
            color="temp"
            isAlert={data.body_temperature > 37.5 || data.body_temperature < 36}
          />

          <MetricCard
            title="Step Count"
            value={data.step_count.toLocaleString()}
            unit="steps"
            icon={Footprints}
            color="steps"
          />

          <MetricCard
            title="Activity Status"
            value={
              activityLabels[
                data.activity_status?.toLowerCase() as keyof typeof activityLabels
              ] || data.activity_status
            }
            unit=""
            icon={Activity}
            color="activity"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
