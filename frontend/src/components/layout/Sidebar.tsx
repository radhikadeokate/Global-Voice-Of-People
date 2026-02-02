import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Analytics", path: "/analytics" },
  { label: "Reports", path: "/reports" },
  { label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
      <div className="px-6 py-4 text-xl font-semibold">
        Dashboard
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

