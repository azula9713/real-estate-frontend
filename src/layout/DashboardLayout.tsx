import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Readonly<Props>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardSidebar
        isSidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="p-4 xl:ml-80">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
