import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

type MainLayoutProps = {
  children: React.ReactNode;
  user?: {
    name?: string;
    role?: string;
  };
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, user }) => {
  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TopBar */}
        <TopBar user={user} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
