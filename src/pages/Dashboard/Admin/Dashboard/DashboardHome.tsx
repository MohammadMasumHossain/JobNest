import DashboardPage from "@/pages/Dashboard/Admin/Dashboard/DashboardPage";
import JobByCategory from "@/pages/Dashboard/Admin/Dashboard/JobByCategory";
import MonthlyJobsChart from "@/pages/Dashboard/Admin/Dashboard/MontlyJobChart";

const DashboardHome = () => (
  <div className="mt-16 sm:mt-14 md:mt-12 lg:mt-10 px-4 sm:px-6 md:px-8">
    <DashboardPage />

    <div className="mt-10 grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
      <div className="xl:col-span-8 w-full">
        <MonthlyJobsChart />
      </div>

      <div className="xl:col-span-4 w-full">
        <JobByCategory />
      </div>
    </div>
  </div>
);

export default DashboardHome;
