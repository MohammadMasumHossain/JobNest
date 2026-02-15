import React from "react";

import { Users, Briefcase, FileText, Clock } from "lucide-react";
import StatCard from "./StatCard";

const DashboardPage: React.FC = () => {
  const metrics = {
    totalUsers: 1500,
    totalEmployers: 250,
    totalJobsPosted: 5000,
    applicationsPending: 120,
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Analytics Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={metrics.totalUsers.toLocaleString()}
          icon={<Users />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Employers"
          value={metrics.totalEmployers.toLocaleString()}
          icon={<Briefcase />}
          color="bg-green-500"
        />
        <StatCard
          title="Total Jobs Posted"
          value={metrics.totalJobsPosted.toLocaleString()}
          icon={<FileText />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Applications Pending"
          value={metrics.applicationsPending.toLocaleString()}
          icon={<Clock />}
          color="bg-red-500"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
