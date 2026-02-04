import { motion } from "framer-motion";

import { useDashboardData } from "@/hooks/useDashboardData";
import { useRegionData } from "@/hooks/useData";

import { SentimentScoreCard } from "@/components/dashboard/SentimentScoreCard";
import { BiasGaugeCard } from "@/components/dashboard/BiasGaugeCard";
import { SentimentComparisonChart } from "@/components/dashboard/SentimentComparisonChart";
import { TrendingTopicsCard } from "@/components/dashboard/TrendingTopicsCard";
import { OutletBiasPieChart } from "@/components/dashboard/OutletBiasPieChart";
import { RegionalHeatmap } from "@/components/dashboard/RegionalHeatmap";
import { StatsBar } from "@/components/dashboard/StatsBar";

/* ---------------- CONSTANTS ---------------- */

const BIAS_COLORS: Record<string, string> = {
  positive: "#22c55e",
  neutral: "#64748b",
  negative: "#ef4444",
};

export default function Dashboard() {
  /* -------- LIVE DASHBOARD DATA -------- */
  const {
    data: liveData,
    loading: loadingLive,
    error: errorLive,
  } = useDashboardData();

  /* -------- MOCK (INTENTIONAL) -------- */
  const { data: regions, isLoading: regionsLoading } = useRegionData();

  /* -------- SENTIMENT (LIVE) -------- */
  const positive = liveData?.summary?.sentiment?.positive ?? 0;
  const neutral = liveData?.summary?.sentiment?.neutral ?? 0;
  const negative = liveData?.summary?.sentiment?.negative ?? 0;

  const total = positive + neutral + negative;

  const sentimentScore =
    total === 0 ? 0 : Math.round(((positive - negative) / total) * 50 + 50);

  /* -------- SENTIMENT COMPARISON (LIVE) -------- */
  const sentimentComparisonData = liveData
    ? [
        {
          label: "People",
          value: Math.round(
            ((positive + neutral) / Math.max(total, 1)) * 100
          ),
        },
        {
          label: "Media",
          value: Math.round(
            ((neutral + negative) / Math.max(total, 1)) * 100
          ),
        },
      ]
    : [];

  /* -------- BIAS (LIVE) -------- */
  const biasSummary: Record<string, number> =
    (liveData?.summary?.bias as Record<string, number>) ?? {};

  const biasScore =
    typeof biasSummary.neutral === "number" ? biasSummary.neutral : 0;

  const biasMaxScore =
    typeof liveData?.count === "number" ? liveData.count : 10;

  const outletBiasData = Object.entries(biasSummary).map(
    ([name, value]) => ({
      name,
      value: Number(value),
      color: BIAS_COLORS[name] ?? "#8884d8",
    })
  );

  /* -------- TRENDING TOPICS (DERIVED LIVE) -------- */
  const trendingTopics =
    liveData?.articles?.slice(0, 8).map((article: any, index: number) => ({
      id: `${index}`,
      name: article.title.split(" ").slice(0, 3).join(" "),
      volume: 1,
      sentiment: article.sentiment ?? "neutral",
      change: 0,
    })) ?? [];

  /* -------- STATS (LIVE) -------- */
  const stats = {
    totalArticles: liveData?.count ?? 0,
    sourcesTracked: Object.keys(
      liveData?.publisher_insights ?? {}
    ).length,
    countriesCovered: 10, // static for now
    languagesSupported: 1,
    dataPointsToday: liveData?.count ?? 0,
    avgResponseTime: 2,
  };

  return (
    <div className="space-y-6">
      {/* STATUS */}
      {loadingLive && (
        <p className="text-sm text-muted-foreground">
          Loading live dashboard data…
        </p>
      )}
      {errorLive && (
        <p className="text-sm text-red-500">
          Error: {errorLive}
        </p>
      )}

      {/* HEADER */}
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

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* LIVE */}
        <SentimentScoreCard score={sentimentScore} change={0} />

        <BiasGaugeCard
          score={biasScore}
          maxScore={biasMaxScore}
          label="Neutral Bias"
          isLoading={loadingLive}
        />

        {/* LIVE */}
        <SentimentComparisonChart
          data={sentimentComparisonData}
          isLoading={loadingLive}
        />

        <TrendingTopicsCard
          topics={trendingTopics}
          isLoading={loadingLive}
        />

        <OutletBiasPieChart
          data={outletBiasData}
          isLoading={loadingLive}
        />

        {/* MOCK (INTENTIONAL) */}
        <div className="lg:col-span-2">
          <RegionalHeatmap
            data={regions}
            isLoading={regionsLoading}
          />
        </div>

        {/* LIVE */}
        <StatsBar {...stats} isLoading={loadingLive} />
      </div>
    </div>
  );
}
