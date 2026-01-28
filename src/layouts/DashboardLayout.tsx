import Dashboard_sidebar from "@/components/Dashboard_sidebar";

import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="max-w-7xl ">
      <Dashboard_sidebar></Dashboard_sidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
