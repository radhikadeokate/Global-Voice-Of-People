import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';

interface BiasData {
  name: string;
  value: number;
  color: string;
}

interface OutletBiasPieChartProps {
  data: BiasData[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload[0]) return null;

  return (
    <div className="chart-tooltip">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: payload[0].payload.color }}
        />
        <span className="font-medium">{payload[0].name}</span>
      </div>
      <p className="text-lg font-bold data-number mt-1">{payload[0].value}%</p>
    </div>
  );
};

export function OutletBiasPieChart({ data, isLoading }: OutletBiasPieChartProps) {
  return (
    <GlassCard delay={0.4}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Outlet Bias Breakdown</h3>

      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-48"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-2 text-xs"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-medium data-number ml-auto">{item.value}%</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
