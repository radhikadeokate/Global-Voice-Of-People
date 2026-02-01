import { motion } from "framer-motion";

import { useDashboardData } from "@/hooks/useDashboardData";
import {
  useSentimentTimeline,
  useTrendingTopics,
  useOutletBiasBreakdown,
  useRegionData,
  useDashboardStats,
} from "@/hooks/useData";

import { SentimentScoreCard } from "@/components/dashboard/SentimentScoreCard";
import { BiasGaugeCard } from "@/components/dashboard/BiasGaugeCard";
import { SentimentComparisonChart } from "@/components/dashboard/SentimentComparisonChart";
import { TrendingTopicsCard } from "@/components/dashboard/TrendingTopicsCard";
import { OutletBiasPieChart } from "@/components/dashboard/OutletBiasPieChart";
import { RegionalHeatmap } from "@/components/dashboard/RegionalHeatmap";
import { StatsBar } from "@/components/dashboard/StatsBar";

export default function Dashboard() {
  /* -------- LIVE DASHBOARD DATA -------- */
  const { data: liveData, loading: loadingLive, error: errorLive } =
    useDashboardData();

  /* -------- TEMP MOCK HOOKS (PHASE 2) -- */
  const { data: timeline, isLoading: timelineLoading } = useSentimentTimeline();
  const { data: topics, isLoading: topicsLoading } = useTrendingTopics();
  const { data: biasBreakdown, isLoading: breakdownLoading } =
    useOutletBiasBreakdown();
  const { data: regions, isLoading: regionsLoading } = useRegionData();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  /* -------- LIVE SENTIMENT -------- */
  const positive = liveData?.summary?.sentiment?.positive ?? 0;
  const neutral = liveData?.summary?.sentiment?.neutral ?? 0;
  const negative = liveData?.summary?.sentiment?.negative ?? 0;

  const total = positive + neutral + negative;

  const sentimentScore =
    total === 0 ? 0 : Math.round(((positive - negative) / total) * 50 + 50);

  const sentimentTrend: "up" | "down" =
    positive >= negative ? "up" : "down";

  /* -------- LIVE BIAS (NEW) -------- */
  const biasSummary = liveData?.summary?.bias;

  const biasScore = biasSummary?.neutral ?? 0;
  const biasMaxScore = liveData?.count ?? 10;

  /* ---------------------------------- */

  return (
    <div className="space-y-6">
      {/* DEBUG / STATUS */}
      {loadingLive && <p>Loading live dashboard data...</p>}
      {errorLive && <p>Error: {errorLive}</p>}

      {liveData && (
        <div className="p-4 border rounded bg-muted text-sm">
          <p>
            <b>Live Topic:</b> {liveData.topic}
          </p>
          <p>
            <b>Total Articles:</b> {liveData.count}
          </p>
          <p>
            <b>Positive:</b> {positive}
          </p>
          <p>
            <b>Neutral:</b> {neutral}
          </p>
          <p>
            <b>Negative:</b> {negative}
          </p>
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">
            Global Intelligence Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time sentiment analysis across{" "}
            {stats?.countriesCovered ?? 0} countries
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
        {/* LIVE SENTIMENT */}
        <SentimentScoreCard
          score={sentimentScore}
          change={0}
          trend={sentimentTrend}
          isLoading={loadingLive}
        />

        {/* LIVE BIAS (AARCHI COMPONENT) */}
        <BiasGaugeCard
          score={biasScore}
          maxScore={biasMaxScore}
          label="Neutral Bias"
          isLoading={loadingLive}
        />

        {/* MOCK (PHASE 2) */}
        <SentimentComparisonChart
          data={timeline}
          isLoading={timelineLoading}
        />

        <TrendingTopicsCard topics={topics} isLoading={topicsLoading} />

        <OutletBiasPieChart
          data={biasBreakdown}
          isLoading={breakdownLoading}
        />

        <div className="lg:col-span-2">
          <RegionalHeatmap data={regions} isLoading={regionsLoading} />
        </div>

        <StatsBar {...stats} isLoading={statsLoading} />
      </div>
    </div>
  );
}
