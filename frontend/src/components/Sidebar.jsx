import {
  LayoutDashboard,
  Globe,
  TrendingUp,
  BarChart2,
  FileText,
  Settings
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ setPage, toggleTheme, theme }) => {
  const [active, setActive] = useState("dashboard");
  const [hovered, setHovered] = useState(null);

  const main = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "map", label: "Global Map", icon: Globe },
    { id: "trends", label: "Trends", icon: TrendingUp },
    { id: "compare", label: "Compare", icon: BarChart2 },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-[#0F1F3D] to-[#0B1830] border-r border-[#1E3570] p-6 flex flex-col shadow-2xl transition-all duration-300 hover:shadow-blue-500/25">
      
      <div className="mb-10 group">
        <h1 className="text-xl font-bold hover:scale-105 transition-transform" style={{ color: "var(--accent)" }}>
          GVOP
        </h1>
        <p className="text-xs group-hover:text-blue-400 transition-colors" style={{ color: "var(--muted)" }}>
          Global Voice of the People
        </p>
      </div>

      <p className="text-[10px] uppercase tracking-widest mb-4 animate-pulse" style={{ color: "var(--muted)" }}>
        Intelligence
      </p>

      <div className="flex flex-col gap-3 mb-auto">
        {main.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setPage(item.id);
            }}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className={`group flex items-center gap-4 px-5 py-3 rounded-2xl text-sm transition-all duration-200 relative overflow-hidden
              ${active === item.id
                ? "shadow-xl shadow-blue-500/50 scale-[1.02] rotate-1"
                : hovered === item.id
                ? "bg-[#1A3470] text-white scale-105 shadow-lg"
                : "bg-[#13264D] hover:bg-[#1A3470] hover:text-white hover:scale-105"
              }`}
            style={{
              background: active === item.id ? "var(--accent)" : "",
              color: active === item.id ? "black" : hovered === item.id ? "white" : "var(--muted)",
            }}
            title={`Navigate to ${item.label}`}
          >
            <item.icon size={18} className="group-hover:rotate-12 transition-transform" />
            <span>{item.label}</span>

            {hovered === item.id && (
              <div className="absolute right-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8 border-t border-[#1E3570]">
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#13264D] transition-all flex-1" style={{ color: "var(--muted)" }}>
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#13264D] hover:text-black transition-all ml-2"
            style={{ background: hovered ? "var(--accent)" : "#13264D" }}
            title="Toggle Theme"
          >
            {theme ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
