// frontend/src/lib/api.ts

const BASE_URL = "http://localhost:8000";

/* -------------------- TYPES -------------------- */

export interface DashboardSentiment {
  positive?: number;
  neutral?: number;
  negative?: number;
}

export interface DashboardSummary {
  sentiment: DashboardSentiment;
  bias: Record<string, number>;
}

export interface DashboardMeta {
  news_provider?: string;
  analysis_provider?: string;
  analysis_failures: number;
  version?: string;
  status?: string | null;
}

export interface DashboardResponse {
  topic: string;
  language: string;
  count: number;
  summary: DashboardSummary;
  publisher_insights: Record<string, Record<string, number>>;
  articles: any[];
  meta: DashboardMeta;
}

/* -------------------- API CALL -------------------- */

export async function fetchDashboardOverview(
  topic: string
): Promise<DashboardResponse> {
  const response = await fetch(
    `${BASE_URL}/dashboard/overview?topic=${encodeURIComponent(topic)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard overview");
  }

  return response.json();
}
