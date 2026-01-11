import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

const reports = [
  {
    id: '1',
    title: 'Weekly Global Sentiment Report',
    description: 'Comprehensive analysis of worldwide public opinion trends',
    date: 'Jan 8, 2026',
    pages: 24,
    type: 'PDF',
  },
  {
    id: '2',
    title: 'Media Bias Quarterly Review',
    description: 'In-depth comparison of outlet bias across Q4 2025',
    date: 'Jan 5, 2026',
    pages: 42,
    type: 'PDF',
  },
  {
    id: '3',
    title: 'US Election Sentiment Analysis',
    description: 'Special report on public opinion around 2024 election',
    date: 'Dec 28, 2025',
    pages: 56,
    type: 'PDF',
  },
  {
    id: '4',
    title: 'Climate Policy Public Response',
    description: 'How global citizens are reacting to climate initiatives',
    date: 'Dec 20, 2025',
    pages: 18,
    type: 'PDF',
  },
  {
    id: '5',
    title: 'AI Regulation Sentiment Tracker',
    description: 'Monthly tracking of opinions on AI governance',
    date: 'Dec 15, 2025',
    pages: 32,
    type: 'PDF',
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Download detailed analysis reports
          </p>
        </div>
        <Button className="gap-2">
          <FileText className="w-4 h-4" />
          Generate Custom Report
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Total Reports</p>
          <p className="text-2xl font-bold data-number">127</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">This Month</p>
          <p className="text-2xl font-bold data-number text-primary">12</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Downloads</p>
          <p className="text-2xl font-bold data-number">2.4K</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Scheduled</p>
          <p className="text-2xl font-bold data-number">3</p>
        </GlassCard>
      </div>

      {/* Reports List */}
      <GlassCard>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Reports</h3>

        <div className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium">{report.title}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {report.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {report.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {report.pages} pages
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                    {report.type}
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
