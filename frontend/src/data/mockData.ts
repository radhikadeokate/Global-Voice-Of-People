// Mock data for GVOP - Ready for API integration

export interface SentimentData {
  date: string;
  people: number;
  media: number;
}

export interface OutletBias {
  name: string;
  bias: number;
  sentiment: number;
  topicSkew: string;
  articles: number;
  logo?: string;
}

export interface TrendingTopic {
  id: string;
  name: string;
  volume: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  change: number;
}

export interface RegionData {
  id: string;
  name: string;
  sentiment: number;
  topics: string[];
  bias: number;
}

export interface SentimentFeedItem {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  source: string;
  country: string;
  topic: string;
  timestamp: string;
}

// Global Sentiment Score
export const globalSentiment = {
  score: 62.4,
  change: 3.2,
  trend: 'up' as const,
  lastUpdated: new Date().toISOString(),
};

// Media Bias Index
export const mediaBiasIndex = {
  score: 34,
  maxScore: 100,
  label: 'Moderate Left',
};

// Sentiment over time
export const sentimentTimeline: SentimentData[] = [
  { date: 'Jan', people: 55, media: 48 },
  { date: 'Feb', people: 58, media: 45 },
  { date: 'Mar', people: 52, media: 50 },
  { date: 'Apr', people: 61, media: 42 },
  { date: 'May', people: 65, media: 38 },
  { date: 'Jun', people: 59, media: 44 },
  { date: 'Jul', people: 68, media: 41 },
  { date: 'Aug', people: 72, media: 35 },
  { date: 'Sep', people: 67, media: 40 },
  { date: 'Oct', people: 64, media: 43 },
  { date: 'Nov', people: 70, media: 37 },
  { date: 'Dec', people: 62, media: 46 },
];

// Media outlets
export const mediaOutlets: OutletBias[] = [
  { name: 'CNN', bias: -35, sentiment: 42, topicSkew: 'Politics', articles: 1247 },
  { name: 'Fox News', bias: 45, sentiment: 38, topicSkew: 'Politics', articles: 1156 },
  { name: 'BBC', bias: -8, sentiment: 55, topicSkew: 'World', articles: 982 },
  { name: 'Al Jazeera', bias: -12, sentiment: 48, topicSkew: 'Middle East', articles: 756 },
  { name: 'Reuters', bias: 2, sentiment: 62, topicSkew: 'Business', articles: 1543 },
  { name: 'NDTV', bias: -15, sentiment: 51, topicSkew: 'India', articles: 645 },
  { name: 'The Guardian', bias: -28, sentiment: 45, topicSkew: 'Social', articles: 892 },
  { name: 'NY Times', bias: -22, sentiment: 47, topicSkew: 'Politics', articles: 1089 },
  { name: 'Wall Street Journal', bias: 18, sentiment: 58, topicSkew: 'Business', articles: 978 },
  { name: 'AP News', bias: 0, sentiment: 65, topicSkew: 'General', articles: 1876 },
];

// Trending topics
export const trendingTopics: TrendingTopic[] = [
  { id: '1', name: 'Climate Policy', volume: 245000, sentiment: 'negative', change: 12.5 },
  { id: '2', name: 'AI Regulation', volume: 189000, sentiment: 'neutral', change: 45.2 },
  { id: '3', name: 'Global Economy', volume: 156000, sentiment: 'negative', change: -8.3 },
  { id: '4', name: 'Healthcare Reform', volume: 134000, sentiment: 'positive', change: 23.1 },
  { id: '5', name: 'Tech Innovation', volume: 128000, sentiment: 'positive', change: 67.8 },
  { id: '6', name: 'Election 2024', volume: 312000, sentiment: 'neutral', change: 89.4 },
  { id: '7', name: 'Renewable Energy', volume: 98000, sentiment: 'positive', change: 34.6 },
  { id: '8', name: 'Supply Chain', volume: 76000, sentiment: 'negative', change: -15.2 },
];

// Regional data
export const regionData: RegionData[] = [
  { id: 'US', name: 'United States', sentiment: 58, topics: ['Election', 'Economy', 'AI'], bias: 15 },
  { id: 'GB', name: 'United Kingdom', sentiment: 52, topics: ['Brexit', 'NHS', 'Climate'], bias: -8 },
  { id: 'DE', name: 'Germany', sentiment: 61, topics: ['Energy', 'Ukraine', 'Industry'], bias: -5 },
  { id: 'FR', name: 'France', sentiment: 48, topics: ['Protests', 'EU', 'Immigration'], bias: -12 },
  { id: 'JP', name: 'Japan', sentiment: 65, topics: ['Technology', 'Trade', 'Demographics'], bias: 0 },
  { id: 'IN', name: 'India', sentiment: 72, topics: ['Tech', 'Economy', 'Politics'], bias: 8 },
  { id: 'BR', name: 'Brazil', sentiment: 45, topics: ['Environment', 'Economy', 'Politics'], bias: 5 },
  { id: 'AU', name: 'Australia', sentiment: 59, topics: ['Climate', 'China', 'Housing'], bias: 3 },
  { id: 'CN', name: 'China', sentiment: 68, topics: ['Economy', 'Tech', 'Trade'], bias: 25 },
  { id: 'RU', name: 'Russia', sentiment: 42, topics: ['Ukraine', 'Sanctions', 'Energy'], bias: 40 },
];

// Outlet bias breakdown for pie chart
export const outletBiasBreakdown = [
  { name: 'Left', value: 35, color: 'hsl(var(--chart-2))' },
  { name: 'Center-Left', value: 25, color: 'hsl(var(--chart-6))' },
  { name: 'Center', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'Center-Right', value: 15, color: 'hsl(var(--chart-4))' },
  { name: 'Right', value: 10, color: 'hsl(var(--chart-5))' },
];

// Sentiment feed
export const sentimentFeed: SentimentFeedItem[] = [
  {
    id: '1',
    text: 'New climate initiative shows promising results in reducing carbon emissions by 15%',
    sentiment: 'positive',
    source: 'Twitter',
    country: 'United States',
    topic: 'Climate',
    timestamp: '2 min ago',
  },
  {
    id: '2',
    text: 'Economic uncertainty continues as inflation rates remain stubbornly high',
    sentiment: 'negative',
    source: 'Reddit',
    country: 'United Kingdom',
    topic: 'Economy',
    timestamp: '5 min ago',
  },
  {
    id: '3',
    text: 'AI breakthrough in healthcare diagnostics could revolutionize early detection',
    sentiment: 'positive',
    source: 'News',
    country: 'Germany',
    topic: 'Technology',
    timestamp: '8 min ago',
  },
  {
    id: '4',
    text: 'Political tensions rise ahead of upcoming elections in key battleground states',
    sentiment: 'neutral',
    source: 'Twitter',
    country: 'United States',
    topic: 'Politics',
    timestamp: '12 min ago',
  },
  {
    id: '5',
    text: 'Supply chain disruptions continue to impact global manufacturing sectors',
    sentiment: 'negative',
    source: 'News',
    country: 'China',
    topic: 'Economy',
    timestamp: '15 min ago',
  },
  {
    id: '6',
    text: 'Renewable energy investments hit record high as countries accelerate green transition',
    sentiment: 'positive',
    source: 'Twitter',
    country: 'India',
    topic: 'Energy',
    timestamp: '18 min ago',
  },
  {
    id: '7',
    text: 'Housing affordability crisis deepens in major metropolitan areas',
    sentiment: 'negative',
    source: 'Reddit',
    country: 'Australia',
    topic: 'Housing',
    timestamp: '22 min ago',
  },
  {
    id: '8',
    text: 'International cooperation on cybersecurity framework gains momentum',
    sentiment: 'neutral',
    source: 'News',
    country: 'Japan',
    topic: 'Technology',
    timestamp: '25 min ago',
  },
];

// Stats for dashboard
export const dashboardStats = {
  totalArticles: 128456,
  sourcesTracked: 2847,
  countriesCovered: 195,
  languagesSupported: 42,
  dataPointsToday: 1.2,
  avgResponseTime: 0.3,
};
