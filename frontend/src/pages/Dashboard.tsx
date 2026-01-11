import { motion } from 'framer-motion';
import {
  useGlobalSentiment,
  useMediaBiasIndex,
  useSentimentTimeline,
  useTrendingTopics,
  useOutletBiasBreakdown,
  useRegionData,
  useDashboardStats,
} from '@/hooks/useData';
import { SentimentScoreCard } from '@/components/dashboard/SentimentScoreCard';
import { BiasGaugeCard } from '@/components/dashboard/BiasGaugeCard';
import { SentimentComparisonChart } from '@/components/dashboard/SentimentComparisonChart';
import { TrendingTopicsCard } from '@/components/dashboard/TrendingTopicsCard';
import { OutletBiasPieChart } from '@/components/dashboard/OutletBiasPieChart';
import { RegionalHeatmap } from '@/components/dashboard/RegionalHeatmap';
import { StatsBar } from '@/components/dashboard/StatsBar';

export default function Dashboard() {
  const { data: sentiment, isLoading: sentimentLoading } = useGlobalSentiment();
  const { data: biasIndex, isLoading: biasLoading } = useMediaBiasIndex();
  const { data: timeline, isLoading: timelineLoading } = useSentimentTimeline();
  const { data: topics, isLoading: topicsLoading } = useTrendingTopics();
  const { data: biasBreakdown, isLoading: breakdownLoading } = useOutletBiasBreakdown();
  const { data: regions, isLoading: regionsLoading } = useRegionData();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Global Intelligence Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time sentiment analysis across {stats.countriesCovered} countries
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Last updated</p>
          <p className="text-sm font-medium data-number">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Row 1: Score cards */}
        <SentimentScoreCard
          score={sentiment.score}
          change={sentiment.change}
          trend={sentiment.trend}
          isLoading={sentimentLoading}
        />
        <BiasGaugeCard
          score={biasIndex.score}
          maxScore={biasIndex.maxScore}
          label={biasIndex.label}
          isLoading={biasLoading}
        />

        {/* Row 1 continued: Bar chart spans 2 cols */}
        <SentimentComparisonChart
          data={timeline}
          isLoading={timelineLoading}
        />

        {/* Row 2 */}
        <TrendingTopicsCard
          topics={topics}
          isLoading={topicsLoading}
        />
        <OutletBiasPieChart
          data={biasBreakdown}
          isLoading={breakdownLoading}
        />
        <div className="lg:col-span-2">
          <RegionalHeatmap
            data={regions}
            isLoading={regionsLoading}
          />
        </div>

        {/* Stats Bar */}
        <StatsBar
          {...stats}
          isLoading={statsLoading}
        />
      </div>
    </div>
  );
}
