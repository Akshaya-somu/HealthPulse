import { cn } from "@/lib/utils";
import { HealthStatus } from "@/types/health";
import { HealthStatusBadge } from "./HealthStatusBadge";
import { Activity, TrendingUp } from "lucide-react";

interface OverallHealthCardProps {
  status: HealthStatus;
  lastUpdated: string;
  healthScore?: number;
}

const statusGradients = {
  normal: 'from-status-normal/20 to-status-normal/5',
  warning: 'from-status-warning/20 to-status-warning/5',
  alert: 'from-status-alert/20 to-status-alert/5',
};

export function OverallHealthCard({ 
  status, 
  lastUpdated,
  healthScore = 92 
}: OverallHealthCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-card p-6 shadow-md animate-fade-in",
      "bg-gradient-to-br",
      statusGradients[status]
    )}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Overall Health Status</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <HealthStatusBadge status={status} size="lg" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-3xl font-bold text-foreground">
              {healthScore}
              <TrendingUp className="h-5 w-5 text-status-normal" />
            </div>
            <p className="text-sm text-muted-foreground">Health Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
