import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface RegionData {
  id: string;
  name: string;
  sentiment: number;
  topics: string[];
  bias: number;
}

interface RegionalHeatmapProps {
  data: RegionData[];
  isLoading?: boolean;
}

function getSentimentColor(sentiment: number): string {
  if (sentiment >= 70) return 'bg-success';
  if (sentiment >= 55) return 'bg-primary';
  if (sentiment >= 45) return 'bg-warning';
  return 'bg-destructive';
}

function getSentimentOpacity(sentiment: number): number {
  return 0.3 + (sentiment / 100) * 0.7;
}

export function RegionalHeatmap({ data, isLoading }: RegionalHeatmapProps) {
  return (
    <GlassCard delay={0.5}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Regional Opinion Heatmap</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-destructive/30" />
            <div className="w-3 h-3 rounded-sm bg-warning/50" />
            <div className="w-3 h-3 rounded-sm bg-primary/70" />
            <div className="w-3 h-3 rounded-sm bg-success/90" />
          </div>
          <span>High</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-5 gap-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {data.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={cn(
                'relative p-3 rounded-lg cursor-pointer transition-all group',
                getSentimentColor(region.sentiment)
              )}
              style={{ opacity: getSentimentOpacity(region.sentiment) }}
            >
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 p-2 flex flex-col justify-center">
                <p className="text-xs font-medium truncate">{region.name}</p>
                <p className="text-lg font-bold data-number text-primary">{region.sentiment}%</p>
                <p className="text-[10px] text-muted-foreground truncate">{region.topics[0]}</p>
              </div>
              <p className="text-xs font-bold text-foreground/80">{region.id}</p>
            </motion.div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
