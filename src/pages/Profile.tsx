import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HealthStatusBadge } from "@/components/health/HealthStatusBadge";
import {
  User,
  Heart,
  Droplets,
  Thermometer,
  Footprints,
  AlertTriangle,
  Bell,
  BellOff,
  Calendar,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailySummary, setDailySummary] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/health/summary")
      .then((res) => res.json())
      .then((data) => setDailySummary(data))
      .catch((err) => console.error("Summary API error:", err));
  }, []);

  if (!dailySummary) {
    return (
      <DashboardLayout>
        <div className="p-6 text-muted-foreground">
          Loading profile summary...
        </div>
      </DashboardLayout>
    );
  }

  const summaryItems = [
    {
      label: "Average Heart Rate",
      value: `${dailySummary.avg_heart_rate} bpm`,
      icon: Heart,
      color: "text-metric-heart bg-metric-heart/10",
    },
    {
      label: "Minimum SpO₂",
      value: `${dailySummary.min_blood_oxygen}%`,
      icon: Droplets,
      color: "text-metric-oxygen bg-metric-oxygen/10",
    },
    {
      label: "Maximum Temperature",
      value: `${dailySummary.max_temperature}°C`,
      icon: Thermometer,
      color: "text-metric-temp bg-metric-temp/10",
    },
    {
      label: "Total Steps",
      value: dailySummary.total_steps.toLocaleString(),
      icon: Footprints,
      color: "text-metric-steps bg-metric-steps/10",
    },
    {
      label: "Risk Events",
      value: dailySummary.risk_events,
      icon: AlertTriangle,
      color:
        dailySummary.risk_events > 0
          ? "text-status-warning bg-status-warning-bg"
          : "text-status-normal bg-status-normal-bg",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="rounded-2xl bg-card p-6 shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Health Profile
                </h1>
                <p className="text-muted-foreground">
                  Daily Summary & Settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(dailySummary.date).toLocaleDateString([], {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <div className="rounded-2xl bg-card p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Overall Health Status
              </h2>
              <p className="text-sm text-muted-foreground">
                Based on today's readings
              </p>
            </div>
            <HealthStatusBadge status={dailySummary.overall_status} size="lg" />
          </div>
        </div>

        {/* Daily Summary */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Daily Summary
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-card p-5 shadow-md"
              >
                <div
                  className={cn(
                    "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
                    item.color.split(" ")[1]
                  )}
                >
                  <item.icon
                    className={cn("h-5 w-5", item.color.split(" ")[0])}
                  />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-2xl bg-card p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Notification Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                {notificationsEnabled ? (
                  <Bell className="h-5 w-5 text-primary" />
                ) : (
                  <BellOff className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">Health Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for health anomalies
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
