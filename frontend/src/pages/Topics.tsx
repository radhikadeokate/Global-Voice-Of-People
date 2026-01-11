import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, BarChart2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { useTrendingTopics } from '@/hooks/useData';
import { cn } from '@/lib/utils';

const sentimentConfig = {
  positive: { color: 'text-success', bgColor: 'bg-success/10', icon: TrendingUp },
  negative: { color: 'text-destructive', bgColor: 'bg-destructive/10', icon: TrendingDown },
  neutral: { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: Minus },
};

function formatVolume(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="chart-tooltip">
      <p className="font-medium">{label}</p>
      <p className="text-lg font-bold data-number mt-1">
        {formatVolume(payload[0]?.value || 0)} mentions
      </p>
    </div>
  );
};

export default function Topics() {
  const { data: topics, isLoading } = useTrendingTopics();

  const chartData = topics.map((t) => ({
    name: t.name,
    volume: t.volume,
    sentiment: t.sentiment,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Trending Topics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Most discussed topics across all sources
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BarChart2 className="w-4 h-4" />
          <span>{topics.length} active topics</span>
        </div>
      </motion.div>

      {/* Volume Chart */}
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Topic Volume</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(v) => formatVolume(v)}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
              <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? [...Array(8)].map((_, i) => (
              <div key={i} className="glass-card p-4 h-32 animate-pulse" />
            ))
          : topics.map((topic, index) => {
              const config = sentimentConfig[topic.sentiment];
              const Icon = config.icon;

              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-4 cursor-pointer hover:neon-glow transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{topic.name}</h3>
                    <div className={cn('p-1.5 rounded-full', config.bgColor)}>
                      <Icon className={cn('w-3 h-3', config.color)} />
                    </div>
                  </div>

                  <p className="text-2xl font-bold data-number text-primary">
                    {formatVolume(topic.volume)}
                  </p>
                  <p className="text-xs text-muted-foreground">mentions</p>

                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span
                      className={cn(
                        'text-xs font-medium capitalize px-2 py-0.5 rounded-full',
                        config.bgColor,
                        config.color
                      )}
                    >
                      {topic.sentiment}
                    </span>
                    <span
                      className={cn(
                        'text-xs font-medium data-number',
                        topic.change > 0 ? 'text-success' : 'text-destructive'
                      )}
                    >
                      {topic.change > 0 ? '+' : ''}
                      {topic.change.toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
}
