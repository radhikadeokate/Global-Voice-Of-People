// frontend/src/lib/adapters/mediaBiasAdapter.ts

export interface MediaOutlet {
  name: string;
  bias: number;
  sentiment: number;
  topicSkew: string;
  articles: number;
}

export function adaptPublisherInsights(
  publisherInsights: Record<string, Record<string, number>>
): MediaOutlet[] {
  return Object.entries(publisherInsights).map(([name, values]) => {
    const positive = values.positive ?? 0;
    const neutral = values.neutral ?? 0;
    const negative = values.negative ?? 0;

    const total = positive + neutral + negative;

    const sentiment =
      total === 0 ? 50 : Math.round(((positive - negative) / total) * 50 + 50);

    return {
      name,
      articles: total,
      sentiment,
      bias: 0,          // keep neutral for now
      topicSkew: "AI",  // default topic
    };
  });
}
