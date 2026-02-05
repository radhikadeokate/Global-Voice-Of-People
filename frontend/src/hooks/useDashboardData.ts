import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useDashboardData() {
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic") || "ai";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:8000/dashboard/overview?topic=${encodeURIComponent(topic)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const json = await res.json();
        console.log("DASHBOARD API RESPONSE:", json);
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [topic]); // 🔑 refetch when topic changes

  return { data, loading, error };
}
