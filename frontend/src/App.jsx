import { useState, useCallback, memo } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";


const App = memo(() => {
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useState(false);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => !prev);
  }, []);

  return (
    <div
      className={`${theme ? "light" : "dark"} min-h-screen flex transition-all duration-300`}
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <Sidebar setPage={handlePageChange} toggleTheme={toggleTheme} theme={theme} />

      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {page === "dashboard" && <Dashboard />}
        {page === "map" && <div className="card p-8 text-2xl">🌍 Interactive Global Map</div>}
        {page === "trends" && <div className="card p-8 text-2xl animate-pulse">📈 Live Trends</div>}
        {page === "compare" && <div className="card p-8 text-2xl">⚖ Side-by-Side Compare</div>}
        {page === "reports" && <div className="card p-8 text-2xl">📄 Detailed Reports</div>}
      </main>
    </div>
  );
});

export default App;
