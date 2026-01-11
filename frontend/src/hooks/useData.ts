import { useState, useEffect } from 'react';
import {
  globalSentiment,
  mediaBiasIndex,
  sentimentTimeline,
  mediaOutlets,
  trendingTopics,
  regionData,
  outletBiasBreakdown,
  sentimentFeed,
  dashboardStats,
  type SentimentData,
  type OutletBias,
  type TrendingTopic,
  type RegionData,
  type SentimentFeedItem,
} from '@/data/mockData';

// Simulates API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Hook for global sentiment
export function useGlobalSentiment() {
  const [data, setData] = useState(globalSentiment);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(500);
      setData(globalSentiment);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Hook for media bias index
export function useMediaBiasIndex() {
  const [data, setData] = useState(mediaBiasIndex);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(600);
      setData(mediaBiasIndex);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Hook for sentiment timeline
export function useSentimentTimeline() {
  const [data, setData] = useState<SentimentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(700);
      setData(sentimentTimeline);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Hook for media outlets
export function useMediaOutlets() {
  const [data, setData] = useState<OutletBias[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(800);
      setData(mediaOutlets);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Hook for trending topics
export function useTrendingTopics() {
  const [data, setData] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(550);
      setData(trendingTopics);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Hook for region data
export function useRegionData() {
  const [data, setData] = useState<RegionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(900);
      setData(regionData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Hook for outlet bias breakdown
export function useOutletBiasBreakdown() {
  const [data, setData] = useState(outletBiasBreakdown);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(650);
      setData(outletBiasBreakdown);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Hook for sentiment feed
export function useSentimentFeed(filters?: {
  country?: string;
  topic?: string;
  sentiment?: string;
}) {
  const [data, setData] = useState<SentimentFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(400);
      let filtered = [...sentimentFeed];
      
      if (filters?.country && filters.country !== 'all') {
        filtered = filtered.filter(item => item.country === filters.country);
      }
      if (filters?.topic && filters.topic !== 'all') {
        filtered = filtered.filter(item => item.topic === filters.topic);
      }
      if (filters?.sentiment && filters.sentiment !== 'all') {
        filtered = filtered.filter(item => item.sentiment === filters.sentiment);
      }
      
      setData(filtered);
      setIsLoading(false);
    };
    fetchData();
  }, [filters?.country, filters?.topic, filters?.sentiment]);

  return { data, isLoading };
}

// Hook for dashboard stats
export function useDashboardStats() {
  const [data, setData] = useState(dashboardStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(300);
      setData(dashboardStats);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}

// Real-time update simulation
export function useRealTimeUpdates<T>(initialData: T, updateInterval = 5000) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      // In production, this would fetch from WebSocket or polling API
      setData(prev => prev);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return data;
}
