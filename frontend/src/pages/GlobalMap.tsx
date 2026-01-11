import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useRegionData } from '@/hooks/useData';
import { cn } from '@/lib/utils';

// Simple SVG world map paths (simplified)
const countryPaths: Record<string, { path: string; x: number; y: number }> = {
  US: { path: 'M 100 120 L 180 120 L 180 160 L 100 160 Z', x: 140, y: 140 },
  GB: { path: 'M 440 90 L 460 90 L 460 110 L 440 110 Z', x: 450, y: 100 },
  DE: { path: 'M 480 100 L 500 100 L 500 120 L 480 120 Z', x: 490, y: 110 },
  FR: { path: 'M 450 120 L 475 120 L 475 145 L 450 145 Z', x: 462, y: 132 },
  JP: { path: 'M 780 130 L 800 130 L 800 160 L 780 160 Z', x: 790, y: 145 },
  IN: { path: 'M 640 160 L 680 160 L 680 210 L 640 210 Z', x: 660, y: 185 },
  BR: { path: 'M 260 220 L 320 220 L 320 280 L 260 280 Z', x: 290, y: 250 },
  AU: { path: 'M 740 280 L 810 280 L 810 340 L 740 340 Z', x: 775, y: 310 },
  CN: { path: 'M 680 120 L 750 120 L 750 170 L 680 170 Z', x: 715, y: 145 },
  RU: { path: 'M 520 50 L 750 50 L 750 100 L 520 100 Z', x: 635, y: 75 },
};

function getSentimentColor(sentiment: number): string {
  if (sentiment >= 70) return 'fill-success';
  if (sentiment >= 55) return 'fill-primary';
  if (sentiment >= 45) return 'fill-warning';
  return 'fill-destructive';
}

export default function GlobalMap() {
  const { data: regions, isLoading } = useRegionData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const selectedData = regions.find((r) => r.id === selectedRegion);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Global Sentiment Map</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Click on a region to view detailed sentiment data
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <GlassCard className="lg:col-span-2">
          <div className="relative">
            <svg
              viewBox="0 0 900 400"
              className="w-full h-auto"
              style={{ minHeight: 300 }}
            >
              {/* Background */}
              <rect
                x="0"
                y="0"
                width="900"
                height="400"
                fill="transparent"
              />

              {/* Grid lines */}
              {[...Array(9)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 100 + 50}
                  y1="0"
                  x2={i * 100 + 50}
                  y2="400"
                  stroke="hsl(var(--border))"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                />
              ))}
              {[...Array(4)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 100 + 50}
                  x2="900"
                  y2={i * 100 + 50}
                  stroke="hsl(var(--border))"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Countries */}
              {regions.map((region) => {
                const country = countryPaths[region.id];
                if (!country) return null;

                const isSelected = selectedRegion === region.id;

                return (
                  <g key={region.id}>
                    <motion.path
                      d={country.path}
                      className={cn(
                        'cursor-pointer transition-all',
                        getSentimentColor(region.sentiment),
                        isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                      )}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: isSelected ? 1 : 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedRegion(region.id)}
                      style={{
                        filter: isSelected
                          ? 'drop-shadow(0 0 10px hsl(var(--primary)))'
                          : 'none',
                      }}
                    />
                    <text
                      x={country.x}
                      y={country.y}
                      textAnchor="middle"
                      className="text-[10px] fill-foreground font-bold pointer-events-none"
                    >
                      {region.id}
                    </text>
                  </g>
                );
              })}

              {/* Selected indicator */}
              {selectedData && countryPaths[selectedData.id] && (
                <motion.circle
                  cx={countryPaths[selectedData.id].x}
                  cy={countryPaths[selectedData.id].y - 30}
                  r="5"
                  className="fill-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 glass-card p-3">
              <p className="text-xs font-medium mb-2">Sentiment</p>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-destructive" />
                  <div className="w-3 h-3 rounded-sm bg-warning" />
                  <div className="w-3 h-3 rounded-sm bg-primary" />
                  <div className="w-3 h-3 rounded-sm bg-success" />
                </div>
                <span className="text-muted-foreground">Low → High</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Details Panel */}
        <GlassCard>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Region Details</h3>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-muted/50 rounded animate-pulse" />
              ))}
            </div>
          ) : selectedData ? (
            <motion.div
              key={selectedData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold">{selectedData.name}</h2>
                <p className="text-muted-foreground text-sm">Region ID: {selectedData.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <p className="text-xs text-muted-foreground">Sentiment Score</p>
                  <p className="text-3xl font-bold data-number text-primary">
                    {selectedData.sentiment}%
                  </p>
                </div>
                <div className="glass-card p-4">
                  <p className="text-xs text-muted-foreground">Bias Index</p>
                  <p className="text-3xl font-bold data-number">
                    {selectedData.bias > 0 ? '+' : ''}{selectedData.bias}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Top Topics</p>
                <div className="flex flex-wrap gap-2">
                  {selectedData.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Data aggregated from 50+ sources in this region
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <p>Select a region on the map</p>
              <p className="text-sm">to view detailed data</p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Region List */}
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">All Regions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {regions.map((region, index) => (
            <motion.button
              key={region.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedRegion(region.id)}
              className={cn(
                'p-3 rounded-lg text-left transition-all',
                selectedRegion === region.id
                  ? 'bg-primary/20 border border-primary'
                  : 'bg-muted/30 hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{region.name}</span>
                <span className="text-lg font-bold data-number text-primary">
                  {region.sentiment}%
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
