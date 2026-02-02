import { useState, useEffect } from "react";
import { Search, Calendar, Sun, Moon, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TopBarProps {
  sidebarCollapsed: boolean;
}

export function TopBar({ sidebarCollapsed }: TopBarProps) {
  // Read initial theme from HTML
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Sync theme with HTML
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <motion.header
      initial={false}
      animate={{ marginLeft: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 left-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-40 flex items-center px-6"
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search topics, outlets, regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Date Range */}
        <Select defaultValue="7d">
          <SelectTrigger className="w-[140px] bg-muted/50 border-border/50">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
          <div className="pulse-live">
            <Radio className="w-3 h-3 text-success" />
          </div>
          <span className="text-xs font-medium text-success">LIVE</span>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="relative overflow-hidden"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Moon className="w-5 h-5" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        </Button>
      </div>
    </motion.header>
  );
}
