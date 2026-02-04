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

import { useDashboardData } from '@/hooks/useDashboardData';
import { cn } from '@/lib/utils';

/* ---------------------------------- */
/* Sentiment UI Config (UNCHANGED)    */
/* ---------------------------------- */

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

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

export default function Sentiment() {
  const { data, loading } = useDashboardData();

  const [filters, setFilters] = useState({
    country: 'all',
    topic: 'all',
    sentiment: 'all',
  });

  /* ---------------------------------- */
  /* Derived Live Data                  */
  /* ---------------------------------- */

  const sentimentSummary = data?.summary?.sentiment;

  const feed = useMemo(() => {
    if (!data?.articles) return [];

    return data.articles.map((a, idx) => ({
      id: `${a.source}-${idx}`,
      text: a.title,
      sentiment: a.sentiment || 'neutral',
      source: a.source,
      country: a.country || 'Global',
      topic: a.topic || 'General',
      timestamp: a.published_at,
    }));
  }, [data]);

  const filteredFeed = feed.filter((item) => {
    if (filters.sentiment !== 'all' && item.sentiment !== filters.sentiment)
      return false;
    if (filters.topic !== 'all' && item.topic !== filters.topic) return false;
    if (filters.country !== 'all' && item.country !== filters.country)
      return false;
    return true;
  });

  const stats = {
    total: feed.length,
    positive: sentimentSummary?.positive ?? 0,
    negative: sentimentSummary?.negative ?? 0,
    neutral: sentimentSummary?.neutral ?? 0,
  };

  /* ---------------------------------- */
  /* Empty State                       */
  /* ---------------------------------- */

  if (!loading && !data) {
    return (
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground">
          Sentiment Analysis
        </h3>
        <p className="mt-4 text-sm text-muted-foreground">
          Sentiment insights will appear once live data is available.
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
            Sentiment Analysis
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time public opinion monitoring
          </p>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh Feed
        </Button>
      </motion.div>

      {/* Stats (Dashboard-aligned) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Total Opinions</p>
          <p className="text-2xl font-bold data-number">{stats.total}</p>
        </GlassCard>

        <GlassCard className="p-4">
          <p className="text-xs text-success">Positive</p>
          <p className="text-2xl font-bold data-number text-success">
            {stats.positive}
          </p>
        </GlassCard>

        <GlassCard className="p-4">
          <p className="text-xs text-destructive">Negative</p>
          <p className="text-2xl font-bold data-number text-destructive">
            {stats.negative}
          </p>
        </GlassCard>

        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Neutral</p>
          <p className="text-2xl font-bold data-number">{stats.neutral}</p>
        </GlassCard>
      </div>

      {/* Filters (UI preserved, future-ready) */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filter by:</span>
          </div>

          {(['country', 'topic', 'sentiment'] as const).map((key) => (
            <Select
              key={key}
              value={filters[key]}
              onValueChange={(value) =>
                setFilters({ ...filters, [key]: value })
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder={key} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setFilters({ country: 'all', topic: 'all', sentiment: 'all' })
            }
          >
            Clear filters
          </Button>
        </div>
      </GlassCard>

      {/* Feed */}
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Live Opinion Feed
        </h3>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-muted/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredFeed.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No opinions match your filters</p>
            <p className="text-sm">Try adjusting the filters above</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredFeed.map((item, index) => {
                const config =
                  sentimentConfig[item.sentiment as keyof typeof sentimentConfig];
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
                      <div className={cn('p-2 rounded-full', config.bgColor)}>
                        <Icon className={cn('w-4 h-4', config.color)} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">
                          {item.text}
                        </p>
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
