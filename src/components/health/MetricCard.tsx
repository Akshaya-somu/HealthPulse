import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: 'heart' | 'oxygen' | 'temp' | 'steps' | 'activity';
  isAlert?: boolean;
  trend?: 'up' | 'down' | 'stable';
}

const colorClasses = {
  heart: 'bg-metric-heart/10 text-metric-heart',
  oxygen: 'bg-metric-oxygen/10 text-metric-oxygen',
  temp: 'bg-metric-temp/10 text-metric-temp',
  steps: 'bg-metric-steps/10 text-metric-steps',
  activity: 'bg-metric-activity/10 text-metric-activity',
};

const iconBgClasses = {
  heart: 'bg-metric-heart/15',
  oxygen: 'bg-metric-oxygen/15',
  temp: 'bg-metric-temp/15',
  steps: 'bg-metric-steps/15',
  activity: 'bg-metric-activity/15',
};

export function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  color, 
  isAlert = false,
}: MetricCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card p-5 shadow-md transition-all duration-300 hover:shadow-lg animate-fade-in",
        isAlert && "ring-2 ring-status-alert ring-offset-2 ring-offset-background"
      )}
    >
      {isAlert && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-2 right-[-20px] w-[60px] text-center text-[10px] font-semibold text-status-alert-bg bg-status-alert rotate-45 py-0.5">
            ALERT
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn(
              "text-3xl font-bold tracking-tight",
              isAlert ? "text-status-alert" : "text-foreground"
            )}>
              {value}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{unit}</span>
          </div>
        </div>
        
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          iconBgClasses[color]
        )}>
          <Icon className={cn("h-6 w-6", colorClasses[color].split(' ')[1])} />
        </div>
      </div>
    </div>
  );
}
