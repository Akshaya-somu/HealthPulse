import { cn } from "@/lib/utils";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface AlertBannerProps {
  message?: string;
  onDismiss?: () => void;
}

export function AlertBanner({ 
  message = "Health anomaly detected. Please review your vitals.",
  onDismiss 
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };
  
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-status-alert p-4 text-status-alert-bg shadow-lg animate-fade-in",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
      "before:animate-pulse-soft"
    )}>
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
          <AlertTriangle className="h-5 w-5" />
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-semibold">⚠ Health Alert</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        
        <button 
          onClick={handleDismiss}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
