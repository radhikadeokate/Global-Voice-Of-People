import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

interface BiasGaugeCardProps {
  score: number;
  maxScore: number;
  label: string;
  isLoading?: boolean;
}

export function BiasGaugeCard({ score, maxScore, label, isLoading }: BiasGaugeCardProps) {
  const percentage = (score / maxScore) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  return (
    <GlassCard delay={0.1} className="relative overflow-hidden">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Media Bias Index</h3>
      
      <div className="flex flex-col items-center">
        {/* Gauge */}
        <div className="relative w-48 h-24 overflow-hidden">
          {/* Background arc */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <defs>
                <linearGradient id="biasGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--chart-2))" />
                  <stop offset="50%" stopColor="hsl(var(--chart-3))" />
                  <stop offset="100%" stopColor="hsl(var(--chart-5))" />
                </linearGradient>
              </defs>
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <motion.path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="url(#biasGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage / 100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
          </div>

          {/* Needle */}
          <motion.div
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            className="absolute bottom-0 left-1/2 origin-bottom"
            style={{ marginLeft: '-2px' }}
          >
            <div className="w-1 h-16 bg-gradient-to-t from-foreground to-transparent rounded-full" />
          </motion.div>

          {/* Center dot */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground" />
        </div>

        {/* Labels */}
        <div className="w-full flex justify-between px-4 mt-2 text-xs text-muted-foreground">
          <span>Left</span>
          <span>Center</span>
          <span>Right</span>
        </div>

        {/* Score */}
        <div className="mt-4 text-center">
          {isLoading ? (
            <div className="h-8 w-24 bg-muted/50 rounded animate-pulse mx-auto" />
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold data-number text-primary"
              >
                {score}
              </motion.p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
