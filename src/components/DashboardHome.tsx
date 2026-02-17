import DashboardPage from "@/pages/Dashboard/Admin/Dashboard/DashboardPage";
import JobByCategory from "@/pages/Dashboard/Admin/Dashboard/JobByCategory";

import MonthlyJobsChart from "@/pages/Dashboard/Admin/Dashboard/MontlyJobChart";

const DashboardHome = () => (
  <div className="mt-16 md:mt-6 lg:mt-4 px-4 md:px-6 lg:px-8">
    <h1 className="font-bold text-2xl text-center items-center">
      Welcome to Dashboard Home
    </h1>
    <div>
      <DashboardPage />
    </div>
    <div className="mt-10 flex flex-col lg:flex-row gap-6 px-8">
      <div className="w-full lg:w-[65%]">
        <MonthlyJobsChart />
      </div>

      <div className="w-full lg:w-[35%]">
        <JobByCategory />
      </div>
    </div>
  </div>
);

export default DashboardHome;
