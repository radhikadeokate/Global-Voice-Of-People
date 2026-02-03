import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";

export interface SentimentData {
  label: string;
  value: number;
}

interface SentimentComparisonChartProps {
  data: SentimentData[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg bg-black/80 px-3 py-2 text-xs text-white shadow">
      <p className="font-medium mb-1">{label}</p>
      <p>{payload[0].value}%</p>
    </div>
  );
};

export function SentimentComparisonChart({
  data,
  isLoading = false,
}: SentimentComparisonChartProps) {
  const safeData = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <GlassCard>
        <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">
          Loading sentiment comparison…
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">People vs Media Sentiment</h3>
          <p className="text-xs text-muted-foreground">
            Comparison over time
          </p>
        </div>

        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}
