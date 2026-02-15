import DashboardPage from "@/pages/Dashboard/Admin/Dashboard/DashboardPage";
import MonthlyJobsChart from "@/pages/Dashboard/Admin/Dashboard/MontlyJobChart";

const DashboardHome = () => (
  <div>
    <h1 className="font-bold text-2xl text-center items-center">
      Welcome to Dashboard Home
    </h1>
    <div>
      <DashboardPage />
    </div>
    <div className="mt-10 p-8">
      <MonthlyJobsChart />
    </div>
  </div>
);

export default DashboardHome;
