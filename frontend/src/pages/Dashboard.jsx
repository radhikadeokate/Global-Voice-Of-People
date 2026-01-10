import { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  A: [60, 65, 70, 75, 78, 80, 82],
  B: [50, 52, 55, 58, 60, 63, 65],
  C: [30, 32, 35, 38, 40, 41, 42],
};

const Dashboard = () => {
  const [current, setCurrent] = useState("A");
  const [range, setRange] = useState(7);
  const [search, setSearch] = useState("");

  const chartData = useMemo(() => {
    const labels = Array.from({ length: range }, (_, i) => `Day ${range - i}`);
    return {
      labels,
      datasets: [
        {
          label: "Global Mainstream",
          data: data.A.slice(-range),
          borderColor: "#4F83FF",
          backgroundColor: "rgba(79,131,255,0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "National Media",
          data: data.B.slice(-range),
          borderColor: "#89B4FF",
          backgroundColor: "rgba(137,180,255,0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Citizen Voices",
          data: data.C.slice(-range),
          borderColor: "#6AA3FF",
          backgroundColor: "rgba(106,163,255,0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [range]);

  const score = data[current].slice(-range).pop();

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        tooltip: { mode: "index", intersect: false },
      },
      scales: { y: { beginAtZero: true, max: 100 } },
      animation: { duration: 1000, easing: "easeInOutQuart" },
    }),
    []
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Hero Header */}
      <div
        className="border rounded-3xl p-8 flex flex-col lg:flex-row lg:items-center gap-6 shadow-2xl transition-all"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: "var(--accent)" }}>
            Global Intelligence Dashboard
          </h1>
          <p style={{ color: "var(--muted)" }}>Real-time bias analysis across media sources</p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search narratives, countries, conflicts..."
          className="px-6 py-4 rounded-2xl w-full lg:w-96"
          style={{ background: "var(--bg)", color: "var(--text)", border: `1px solid var(--border)` }}
        />
      </div>

      {/* Time Range */}
      <div className="flex p-2 rounded-2xl shadow-xl" style={{ background: "#0B1830" }}>
        {[1, 7, 30].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-6 py-3 rounded-xl transition ${range === r ? "scale-105" : ""}`}
            style={{
              background: range === r ? "var(--accent)" : "transparent",
              color: range === r ? "black" : "var(--muted)",
            }}
          >
            {r === 1 ? "24h" : `${r} Days`}
          </button>
        ))}
      </div>

      {/* Score */}
      <div className="p-8 rounded-3xl" style={{ background: "var(--card)" }}>
        <p style={{ color: "var(--muted)" }}>Brutal Bias Score</p>
        <div className="text-6xl font-black" style={{ color: "var(--danger)" }}>
          {score}
        </div>
        <div className="h-2 rounded mt-4" style={{ background: "var(--bg)" }}>
          <div className="h-2 rounded" style={{ width: `${score}%`, background: "var(--danger)" }} />
        </div>
      </div>

      {/* Chart */}
      <div className="p-8 rounded-3xl h-96" style={{ background: "var(--card)" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
