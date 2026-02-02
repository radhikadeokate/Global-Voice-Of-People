type TopBarProps = {
  user?: {
    name?: string;
    role?: string;
  };

  // UI-only props (you’ll wire later)
  searchValue?: string;
  daysValue?: number;
};

const TopBar: React.FC<TopBarProps> = ({
  user,
  searchValue = "",
  daysValue,
}) => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 gap-4">
      
      {/* Left: Search + Filter */}
      <div className="flex items-center gap-2 w-full max-w-xl">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search topic…"
          value={searchValue}
          readOnly
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-gray-200
                     placeholder:text-gray-400"
        />

        {/* Days Filter */}
        <select
          value={daysValue ?? ""}
          disabled
          className="px-2 py-1.5 text-sm border border-gray-300 rounded-md 
                     bg-white text-gray-600 focus:outline-none"
        >
          <option value="">Days</option>
          <option value="7">7d</option>
          <option value="14">14d</option>
          <option value="30">30d</option>
        </select>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center space-x-3 shrink-0">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-800">
            {user?.name || "—"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.role || ""}
          </p>
        </div>

        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
          {user?.name?.charAt(0) || "?"}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
