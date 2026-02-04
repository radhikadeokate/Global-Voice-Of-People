// frontend/src/lib/adapters/regionAdapter.ts

export interface RegionLiveData {
  id: string;
  name: string;
  sentiment: number;
  bias: number;
  topics: string[];
}

export function adaptRegionsFromArticles(
  articles: any[]
): RegionLiveData[] {
  const regionMap: Record<string, RegionLiveData> = {};

  articles.forEach((article) => {
    const region = article.country ?? "GLOBAL";

    if (!regionMap[region]) {
      regionMap[region] = {
        id: region,
        name: region,
        sentiment: 50,
        bias: 0,
        topics: [],
      };
    }

    if (article.topic) {
      regionMap[region].topics.push(article.topic);
    }
  });

  return Object.values(regionMap);
}
