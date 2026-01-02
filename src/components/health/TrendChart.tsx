import { useMemo, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { HealthData } from "@/types/health";
import { cn } from "@/lib/utils";

interface TrendChartProps {
  data: HealthData[];
  metric: 'heart_rate' | 'blood_oxygen' | 'body_temperature';
  title: string;
  unit: string;
  color: string;
}

export function TrendChart({ data, metric, title, unit, color }: TrendChartProps) {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: d[metric],
      timestamp: d.timestamp,
    }));
  }, [data, metric]);

  return (
    <div className="rounded-2xl bg-card p-5 shadow-md animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: color, stroke: 'hsl(var(--card))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface TimeRangeFilterProps {
  value: 'hour' | 'day';
  onChange: (value: 'hour' | 'day') => void;
}

export function TimeRangeFilter({ value, onChange }: TimeRangeFilterProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
      {(['hour', 'day'] as const).map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            value === range
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {range === 'hour' ? 'Last Hour' : 'Last 24 Hours'}
        </button>
      ))}
    </div>
  );
}
