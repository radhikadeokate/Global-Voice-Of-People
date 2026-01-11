import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus, Filter } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useMediaOutlets } from '@/hooks/useData';
import { cn } from '@/lib/utils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="chart-tooltip">
      <p className="font-medium text-lg">{label}</p>
      <div className="space-y-1 mt-2">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Bias Score:</span>
          <span className="font-medium data-number">{payload[0]?.payload.bias}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Sentiment:</span>
          <span className="font-medium data-number">{payload[0]?.payload.sentiment}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Topic Focus:</span>
          <span className="font-medium">{payload[0]?.payload.topicSkew}</span>
        </div>
      </div>
    </div>
  );
};

function getBiasLabel(bias: number): { label: string; color: string } {
  if (bias <= -30) return { label: 'Left', color: 'text-secondary' };
  if (bias <= -10) return { label: 'Center-Left', color: 'text-chart-6' };
  if (bias <= 10) return { label: 'Center', color: 'text-success' };
  if (bias <= 30) return { label: 'Center-Right', color: 'text-warning' };
  return { label: 'Right', color: 'text-destructive' };
}

export default function MediaBias() {
  const { data: outlets, isLoading } = useMediaOutlets();
  const [sortBy, setSortBy] = useState<'name' | 'bias' | 'sentiment'>('bias');

  const sortedOutlets = [...outlets].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'bias') return a.bias - b.bias;
    return b.sentiment - a.sentiment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Media Bias Analysis</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tracking bias and sentiment across {outlets.length} major outlets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-1">
            {(['name', 'bias', 'sentiment'] as const).map((option) => (
              <Button
                key={option}
                variant={sortBy === option ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy(option)}
                className="capitalize"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bias Scale Chart */}
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Bias Spectrum</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedOutlets}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 80, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis
                type="number"
                domain={[-50, 50]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
              <Bar
                dataKey="bias"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-4 px-20">
          <span>← Left Leaning</span>
          <span>Center</span>
          <span>Right Leaning →</span>
        </div>
      </GlassCard>

      {/* Outlet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-4 h-32 animate-pulse" />
            ))
          : sortedOutlets.map((outlet, index) => {
              const biasInfo = getBiasLabel(outlet.bias);
              const sentimentTrend =
                outlet.sentiment > 50 ? 'up' : outlet.sentiment < 45 ? 'down' : 'neutral';

              return (
                <motion.div
                  key={outlet.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-4 hover:neon-glow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{outlet.name}</h3>
                      <span className={cn('text-xs font-medium', biasInfo.color)}>
                        {biasInfo.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold data-number text-primary">
                        {outlet.sentiment}%
                      </span>
                      <div className="flex items-center justify-end gap-1">
                        {sentimentTrend === 'up' && (
                          <ArrowUpRight className="w-3 h-3 text-success" />
                        )}
                        {sentimentTrend === 'down' && (
                          <ArrowDownRight className="w-3 h-3 text-destructive" />
                        )}
                        {sentimentTrend === 'neutral' && (
                          <Minus className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className="text-xs text-muted-foreground">Sentiment</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Focus:</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                        {outlet.topicSkew}
                      </span>
                    </div>
                    <span className="text-muted-foreground data-number">
                      {outlet.articles.toLocaleString()} articles
                    </span>
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
}
