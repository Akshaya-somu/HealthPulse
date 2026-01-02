import { cn } from "@/lib/utils";
import { HealthStatus } from "@/types/health";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

interface HealthStatusBadgeProps {
  status: HealthStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const statusConfig = {
  normal: {
    label: 'Normal',
    icon: CheckCircle2,
    className: 'bg-status-normal-bg text-status-normal border-status-normal/20',
  },
  warning: {
    label: 'Warning',
    icon: AlertTriangle,
    className: 'bg-status-warning-bg text-status-warning border-status-warning/20',
  },
  alert: {
    label: 'Alert',
    icon: AlertCircle,
    className: 'bg-status-alert-bg text-status-alert border-status-alert/20',
  },
};

const sizeClasses = {
  sm: 'px-2.5 py-1 text-xs gap-1',
  md: 'px-3 py-1.5 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2',
};

export function HealthStatusBadge({ 
  status, 
  size = 'md', 
  showIcon = true 
}: HealthStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <div className={cn(
      "inline-flex items-center font-semibold rounded-full border",
      config.className,
      sizeClasses[size]
    )}>
      {showIcon && <Icon className={cn(
        size === 'sm' && 'h-3 w-3',
        size === 'md' && 'h-4 w-4',
        size === 'lg' && 'h-5 w-5',
      )} />}
      <span>{config.label}</span>
    </div>
  );
}
