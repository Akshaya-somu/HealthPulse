import { HealthAlert } from "@/types/health";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AlertsTableProps {
  alerts: HealthAlert[];
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-12 text-center shadow-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-status-normal-bg">
          <AlertCircle className="h-8 w-8 text-status-normal" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">No Alerts</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          All your vitals are within normal range
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card shadow-md overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Time</TableHead>
            <TableHead className="font-semibold">Parameter</TableHead>
            <TableHead className="font-semibold">Value</TableHead>
            <TableHead className="font-semibold">Severity</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow 
              key={alert.id}
              className={cn(
                "transition-colors",
                alert.severity === 'critical' && "bg-status-alert-bg/50 hover:bg-status-alert-bg/70"
              )}
            >
              <TableCell className="text-sm">
                {new Date(alert.timestamp).toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell className="font-medium">{alert.parameter}</TableCell>
              <TableCell>
                <span className={cn(
                  "font-semibold",
                  alert.severity === 'critical' ? "text-status-alert" : "text-status-warning"
                )}>
                  {alert.value}
                </span>
              </TableCell>
              <TableCell>
                <span className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                  alert.severity === 'critical' 
                    ? "bg-status-alert-bg text-status-alert" 
                    : "bg-status-warning-bg text-status-warning"
                )}>
                  <AlertTriangle className="h-3 w-3" />
                  {alert.severity}
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground hidden sm:table-cell max-w-[200px] truncate">
                {alert.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
