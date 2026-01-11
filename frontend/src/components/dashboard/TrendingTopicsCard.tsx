import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface TrendingTopic {
  id: string;
  name: string;
  volume: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  change: number;
}

interface TrendingTopicsCardProps {
  topics: TrendingTopic[];
  isLoading?: boolean;
}

const sentimentConfig = {
  positive: { color: 'bg-success/20 text-success border-success/30', icon: TrendingUp },
  negative: { color: 'bg-destructive/20 text-destructive border-destructive/30', icon: TrendingDown },
  neutral: { color: 'bg-muted text-muted-foreground border-border', icon: Minus },
};

function formatVolume(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

export function TrendingTopicsCard({ topics, isLoading }: TrendingTopicsCardProps) {
  return (
    <GlassCard delay={0.3}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Trending Topics</h3>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {topics.slice(0, 8).map((topic, index) => {
            const config = sentimentConfig[topic.sentiment];
            const Icon = config.icon;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm cursor-pointer transition-all hover:scale-105',
                  config.color
                )}
              >
                <Icon className="w-3 h-3" />
                <span className="font-medium">{topic.name}</span>
                <span className="text-xs opacity-70">{formatVolume(topic.volume)}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
