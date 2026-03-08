import Dashboard_sidebar from "@/components/Dashboard_sidebar";

import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen stickey top-0">
      <div className="shrink-0">
        <Dashboard_sidebar />
      </div>
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
