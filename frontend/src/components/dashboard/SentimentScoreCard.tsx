import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

interface SentimentScoreCardProps {
  score: number;
  change?: number;
}

export function SentimentScoreCard({
  score,
  change = 0,
}: SentimentScoreCardProps) {
  const safeScore = typeof score === "number" ? score : 0;

  return (
    <GlassCard>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-muted-foreground">Global Sentiment</h3>
          <span
            className={`text-xs font-medium ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
          </span>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold">{safeScore}</span>
          <span className="text-muted-foreground">/100</span>
        </div>

        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${safeScore}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
    </GlassCard>
  );
}
