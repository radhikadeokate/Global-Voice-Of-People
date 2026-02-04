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
  ReferenceLine,
  Cell,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus, Filter } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useDashboardData } from '@/hooks/useDashboardData';
import { adaptPublisherInsights } from '@/lib/adapters/mediaBiasAdapter';

/* ---------------------------------- */
/* Helpers                            */
/* ---------------------------------- */

function getBiasLabel(bias: number): { label: string; color: string } {
  if (bias <= -30) return { label: 'Left', color: 'text-secondary' };
  if (bias <= -10) return { label: 'Center-Left', color: 'text-chart-6' };
  if (bias <= 10) return { label: 'Center', color: 'text-success' };
  if (bias <= 30) return { label: 'Center-Right', color: 'text-warning' };
  return { label: 'Right', color: 'text-destructive' };
}

function getBiasBarColor(bias: number) {
  if (bias <= -30) return 'hsl(var(--chart-6))';
  if (bias <= -10) return 'hsl(var(--chart-4))';
  if (bias <= 10) return 'hsl(var(--success))';
  if (bias <= 30) return 'hsl(var(--chart-3))';
  return 'hsl(var(--destructive))';
}

const formatOutletName = (name: string) =>
  name.length > 24 ? name.slice(0, 24) + '…' : name;

/* ---------------------------------- */
/* Tooltip                            */
/* ---------------------------------- */

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="chart-tooltip">
      <p className="font-medium text-lg">{label}</p>
      <div className="space-y-1 mt-2">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Bias Score:</span>
          <span className="font-medium data-number">{data.bias}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Sentiment:</span>
          <span className="font-medium data-number">{data.sentiment}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Topic Focus:</span>
          <span className="font-medium">{data.topicSkew}</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

export default function MediaBias() {
  const { data: liveData, loading } = useDashboardData();
  const [sortBy, setSortBy] = useState<'name' | 'bias' | 'sentiment'>('bias');

  const outlets = liveData?.publisher_insights
    ? adaptPublisherInsights(liveData.publisher_insights)
    : [];

  const sortedOutlets = [...outlets].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'bias') return a.bias - b.bias;
    return b.sentiment - a.sentiment;
  });

  /* ---------------------------------- */
  /* Empty State                        */
  /* ---------------------------------- */

  if (!loading && sortedOutlets.length === 0) {
    return (
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground">
          Media Bias Analysis
        </h3>
        <p className="mt-4 text-sm text-muted-foreground">
          Publisher-level bias insights will appear once sufficient data becomes
          available.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">
            Media Bias Analysis
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tracking bias and sentiment across {sortedOutlets.length} major
            outlets
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

      {/* Bias Spectrum Chart (SAME UI, FIXED SPACING) */}
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Bias Spectrum
        </h3>

        <div style={{ height: Math.max(320, sortedOutlets.length * 42) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedOutlets}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 160, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={false}
              />
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
                width={150}
                tickFormatter={formatOutletName}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              />

              <ReferenceLine
                x={0}
                stroke="hsl(var(--muted-foreground))"
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
              />

              <Bar dataKey="bias" radius={[0, 4, 4, 0]}>
                {sortedOutlets.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={getBiasBarColor(entry.bias)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mt-4 px-20">
          <span>← Left Leaning</span>
          <span>Center</span>
          <span>Right Leaning →</span>
        </div>
      </GlassCard>

      {/* Outlet Cards (UNCHANGED UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-4 h-32 animate-pulse" />
            ))
          : sortedOutlets.map((outlet, index) => {
              const biasInfo = getBiasLabel(outlet.bias);
              const sentimentTrend =
                outlet.sentiment > 50
                  ? 'up'
                  : outlet.sentiment < 45
                  ? 'down'
                  : 'neutral';

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
                      <h3 className="font-semibold text-lg">
                        {outlet.name}
                      </h3>
                      <span
                        className={cn(
                          'text-xs font-medium',
                          biasInfo.color
                        )}
                      >
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
                        <span className="text-xs text-muted-foreground">
                          Sentiment
                        </span>
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
