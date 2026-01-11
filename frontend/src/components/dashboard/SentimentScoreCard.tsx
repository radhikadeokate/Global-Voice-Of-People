import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface SentimentScoreCardProps {
  score: number;
  change: number;
  trend: 'up' | 'down';
  isLoading?: boolean;
}

export function SentimentScoreCard({ score, change, trend, isLoading }: SentimentScoreCardProps) {
  const isPositive = trend === 'up';

  return (
    <GlassCard glow className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Global Sentiment</h3>
          <div className="flex items-baseline gap-3">
            {isLoading ? (
              <div className="h-14 w-32 bg-muted/50 rounded animate-pulse" />
            ) : (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="text-5xl font-bold data-number neon-text"
              >
                {score.toFixed(1)}
              </motion.span>
            )}
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
        </div>

        <div
          className={cn(
            'flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium',
            isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          )}
        >
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="data-number">{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-cyan-300 rounded-full"
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
    </GlassCard>
  );
}
