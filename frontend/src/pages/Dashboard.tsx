import { motion } from "framer-motion";

import { useDashboardData } from "@/hooks/useDashboardData";
import { useSentimentTimeline, useRegionData } from "@/hooks/useData";

import { SentimentScoreCard } from "@/components/dashboard/SentimentScoreCard";
import { BiasGaugeCard } from "@/components/dashboard/BiasGaugeCard";
import { SentimentComparisonChart } from "@/components/dashboard/SentimentComparisonChart";
import { TrendingTopicsCard } from "@/components/dashboard/TrendingTopicsCard";
import { OutletBiasPieChart } from "@/components/dashboard/OutletBiasPieChart";
import { RegionalHeatmap } from "@/components/dashboard/RegionalHeatmap";
import { StatsBar } from "@/components/dashboard/StatsBar";

/* ---------------- UTILS ---------------- */

const BIAS_COLORS: Record<string, string> = {
  positive: "#22c55e",
  neutral: "#64748b",
  negative: "#ef4444",
};

export default function Dashboard() {
  /* -------- LIVE DASHBOARD DATA -------- */
  const { data: liveData, loading: loadingLive, error: errorLive } =
    useDashboardData();

  /* -------- TEMP MOCK (ONLY 2 LEFT) ---- */
  const { data: timeline, isLoading: timelineLoading } = useSentimentTimeline();
  const { data: regions, isLoading: regionsLoading } = useRegionData();

  /* -------- LIVE SENTIMENT -------- */
  const positive = liveData?.summary?.sentiment?.positive ?? 0;
  const neutral = liveData?.summary?.sentiment?.neutral ?? 0;
  const negative = liveData?.summary?.sentiment?.negative ?? 0;

  const total = positive + neutral + negative;

  const sentimentScore =
    total === 0 ? 0 : Math.round(((positive - negative) / total) * 50 + 50);

  const sentimentTrend: "up" | "down" =
    positive >= negative ? "up" : "down";

  /* -------- LIVE BIAS (GAUGE + PIE) -------- */
  const biasSummary: Record<string, number> =
    (liveData?.summary?.bias as Record<string, number>) ?? {};

  const biasScore: number =
    typeof biasSummary.neutral === "number" ? biasSummary.neutral : 0;

  const biasMaxScore: number =
    typeof liveData?.count === "number" ? liveData.count : 10;

  const outletBiasData: {
    name: string;
    value: number;
    color: string;
  }[] = Object.entries(biasSummary).map(([name, value]) => ({
    name,
    value: Number(value),
    color: BIAS_COLORS[name] ?? "#8884d8",
  }));

  /* -------- LIVE TRENDING TOPICS -------- */
  const trendingTopics =
    liveData?.articles?.slice(0, 8).map((article, index) => ({
      id: `${index}`,
      name: article.title.split(" ").slice(0, 3).join(" "),
      volume: 1,
      sentiment: article.sentiment ?? "neutral",
      change: 0,
    })) ?? [];

  /* -------- LIVE STATS -------- */
  const stats = {
    totalArticles: liveData?.count ?? 0,
    sourcesTracked: Object.keys(liveData?.publisher_insights ?? {}).length,
    countriesCovered: 10,
    languagesSupported: 1,
    dataPointsToday: liveData?.count ?? 0,
    avgResponseTime: 2,
  };

  return (
    <div className="space-y-6">
      {/* STATUS */}
      {loadingLive && <p>Loading live dashboard data...</p>}
      {errorLive && <p>Error: {errorLive}</p>}

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

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SentimentScoreCard
          score={sentimentScore}
          change={0}
          trend={sentimentTrend}
          isLoading={loadingLive}
        />

        <BiasGaugeCard
          score={biasScore}
          maxScore={biasMaxScore}
          label="Neutral Bias"
          isLoading={loadingLive}
        />

        <SentimentComparisonChart
          data={timeline}
          isLoading={timelineLoading}
        />

        <TrendingTopicsCard
          topics={trendingTopics}
          isLoading={loadingLive}
        />

        <OutletBiasPieChart
          data={outletBiasData}
          isLoading={loadingLive}
        />

        <div className="lg:col-span-2">
          <RegionalHeatmap
            data={regions}
            isLoading={regionsLoading}
          />
        </div>

        <StatsBar {...stats} isLoading={loadingLive} />
      </div>
    </div>
  );
}
