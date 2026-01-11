import { motion } from 'framer-motion';
import { Newspaper, Database, Globe, Languages, Activity, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface StatsProps {
  totalArticles: number;
  sourcesTracked: number;
  countriesCovered: number;
  languagesSupported: number;
  dataPointsToday: number;
  avgResponseTime: number;
  isLoading?: boolean;
}

const statItems = [
  { key: 'totalArticles', label: 'Articles Analyzed', icon: Newspaper, format: (v: number) => v.toLocaleString() },
  { key: 'sourcesTracked', label: 'Sources Tracked', icon: Database, format: (v: number) => v.toLocaleString() },
  { key: 'countriesCovered', label: 'Countries', icon: Globe, format: (v: number) => v.toString() },
  { key: 'languagesSupported', label: 'Languages', icon: Languages, format: (v: number) => v.toString() },
  { key: 'dataPointsToday', label: 'Data Points Today', icon: Activity, format: (v: number) => `${v}M+` },
  { key: 'avgResponseTime', label: 'Avg Response', icon: Clock, format: (v: number) => `${v}s` },
];

export function StatsBar({ isLoading, ...stats }: StatsProps) {
  return (
    <GlassCard delay={0.6} className="col-span-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          const value = stats[item.key as keyof StatsProps];

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                {isLoading ? (
                  <div className="h-5 w-16 bg-muted/50 rounded animate-pulse" />
                ) : (
                  <p className="text-lg font-bold data-number">{item.format(value as number)}</p>
                )}
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
