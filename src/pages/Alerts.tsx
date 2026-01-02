import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertsTable } from "@/components/health/AlertsTable";
import { Bell, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Alerts = () => {
  const [filter, setFilter] = useState<"all" | "warning" | "critical">("all");
  const [alerts, setAlerts] = useState<any[]>([]);

  // Fetch alerts from backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/health/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error("Alerts API error:", err));
  }, []);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    return alert.severity === filter;
  });

  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  const warningCount = alerts.filter((a) => a.severity === "warning").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Health Alerts
              </h1>
              <p className="text-muted-foreground">
                {alerts.length} alerts in the last 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-card p-5 shadow-md">
            <p className="text-sm font-medium text-muted-foreground">
              Total Alerts
            </p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {alerts.length}
            </p>
          </div>

          <div className="rounded-2xl bg-status-alert-bg p-5 shadow-md">
            <p className="text-sm font-medium text-status-alert">Critical</p>
            <p className="mt-1 text-3xl font-bold text-status-alert">
              {criticalCount}
            </p>
          </div>

          <div className="rounded-2xl bg-status-warning-bg p-5 shadow-md">
            <p className="text-sm font-medium text-status-warning">Warning</p>
            <p className="mt-1 text-3xl font-bold text-status-warning">
              {warningCount}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
            {(["all", "critical", "warning"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all",
                  filter === f
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Table / Empty State */}
        {filteredAlerts.length > 0 ? (
          <AlertsTable alerts={filteredAlerts} />
        ) : (
          <p className="text-muted-foreground">
            No alerts detected. All vitals are stable.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
