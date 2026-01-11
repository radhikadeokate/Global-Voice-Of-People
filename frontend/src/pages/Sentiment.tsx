import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ThumbsUp, ThumbsDown, Minus, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSentimentFeed, useRegionData, useTrendingTopics } from '@/hooks/useData';
import { cn } from '@/lib/utils';

const sentimentConfig = {
  positive: {
    icon: ThumbsUp,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
  },
  negative: {
    icon: ThumbsDown,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/30',
  },
  neutral: {
    icon: Minus,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
    borderColor: 'border-border',
  },
};

export default function Sentiment() {
  const [filters, setFilters] = useState({
    country: 'all',
    topic: 'all',
    sentiment: 'all',
  });

  const { data: feed, isLoading: feedLoading } = useSentimentFeed(filters);
  const { data: regions } = useRegionData();
  const { data: topics } = useTrendingTopics();

  const countries = useMemo(() => ['all', ...regions.map((r) => r.name)], [regions]);
  const topicList = useMemo(() => ['all', ...topics.map((t) => t.name)], [topics]);

  const stats = useMemo(() => {
    const total = feed.length;
    const positive = feed.filter((f) => f.sentiment === 'positive').length;
    const negative = feed.filter((f) => f.sentiment === 'negative').length;
    const neutral = feed.filter((f) => f.sentiment === 'neutral').length;

    return { total, positive, negative, neutral };
  }, [feed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Sentiment Analysis</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time public opinion monitoring
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh Feed
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Total Opinions</p>
          <p className="text-2xl font-bold data-number">{stats.total}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-success">Positive</p>
          <p className="text-2xl font-bold data-number text-success">{stats.positive}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-destructive">Negative</p>
          <p className="text-2xl font-bold data-number text-destructive">{stats.negative}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Neutral</p>
          <p className="text-2xl font-bold data-number">{stats.neutral}</p>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filter by:</span>
          </div>

          <Select
            value={filters.country}
            onValueChange={(value) => setFilters({ ...filters, country: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === 'all' ? 'All Countries' : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.topic}
            onValueChange={(value) => setFilters({ ...filters, topic: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {topicList.map((t) => (
                <SelectItem key={t} value={t}>
                  {t === 'all' ? 'All Topics' : t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sentiment}
            onValueChange={(value) => setFilters({ ...filters, sentiment: value })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>

          {(filters.country !== 'all' ||
            filters.topic !== 'all' ||
            filters.sentiment !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters({ country: 'all', topic: 'all', sentiment: 'all' })}
            >
              Clear filters
            </Button>
          )}
        </div>
      </GlassCard>

      {/* Feed */}
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Live Opinion Feed</h3>

        {feedLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : feed.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No opinions match your filters</p>
            <p className="text-sm">Try adjusting the filters above</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {feed.map((item, index) => {
                const config = sentimentConfig[item.sentiment];
                const Icon = config.icon;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'p-4 rounded-lg border transition-all hover:bg-muted/30',
                      config.bgColor,
                      config.borderColor
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'p-2 rounded-full',
                          config.bgColor
                        )}
                      >
                        <Icon className={cn('w-4 h-4', config.color)} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">{item.text}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="px-2 py-0.5 rounded-full bg-muted">
                            {item.source}
                          </span>
                          <span>{item.country}</span>
                          <span className="text-primary">{item.topic}</span>
                          <span className="ml-auto">{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
