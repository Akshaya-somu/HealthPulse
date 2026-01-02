import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TrendChart, TimeRangeFilter } from "@/components/health/TrendChart";
import { useState, useMemo, useEffect } from "react";

const Trends = () => {
  const [timeRange, setTimeRange] = useState<"hour" | "day">("day");

  const [allData, setAllData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/health/history")
      .then((res) => res.json())
      .then((data) => setAllData(data))
      .catch((err) => console.error("History API error:", err));
  }, []);

  const filteredData = useMemo(() => {
    if (timeRange === "hour") {
      return allData.slice(-2); // Last hour (2 data points at 30min intervals)
    }
    return allData;
  }, [allData, timeRange]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Health Trends
            </h1>
            <p className="text-muted-foreground">
              Track your vital signs over time
            </p>
          </div>

          <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
        </div>
        {allData.length === 0 && (
          <p className="text-muted-foreground">Loading trends data...</p>
        )}

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <TrendChart
            data={filteredData}
            metric="heart_rate"
            title="Heart Rate"
            unit="bpm"
            color="hsl(350, 80%, 55%)"
          />

          <TrendChart
            data={filteredData}
            metric="blood_oxygen"
            title="Blood Oxygen"
            unit="SpO₂ %"
            color="hsl(200, 80%, 50%)"
          />

          <TrendChart
            data={filteredData}
            metric="body_temperature"
            title="Body Temperature"
            unit="°C"
            color="hsl(25, 90%, 55%)"
          />
        </div>

        {/* Insights Card */}
        <div className="rounded-2xl bg-card p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Insights
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm font-medium text-muted-foreground">
                Heart Rate Range
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">
                58 - 92 bpm
              </p>
              <p className="mt-1 text-xs text-status-normal">
                Within normal range
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm font-medium text-muted-foreground">
                Blood Oxygen Avg
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">97.2%</p>
              <p className="mt-1 text-xs text-status-normal">Healthy level</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm font-medium text-muted-foreground">
                Temperature Stability
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">±0.3°C</p>
              <p className="mt-1 text-xs text-status-normal">Stable</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Trends;
