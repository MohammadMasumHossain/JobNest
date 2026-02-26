import React from "react";
import { Users, Briefcase, FileText, Clock } from "lucide-react";
import StatCard from "./StatCard";

const DashboardPage: React.FC = () => {
  const dummyMetrics = [
    {
      title: "Total Users",
      value: 1500,
      icon: <Users />,
      color: "bg-cyan-600",
    },
    {
      title: "Total Employers",
      value: 250,
      icon: <Briefcase />,
      color: "bg-slate-500",
    },
    {
      title: "Total Jobs Posted",
      value: 5000,
      icon: <FileText />,
      color: "bg-teal-600",
    },
    {
      title: "Applications Pending",
      value: 120,
      icon: <Clock />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dummyMetrics.map((metric, index) => (
          <StatCard
            key={index}
            title={metric.title}
            value={metric.value.toLocaleString()}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
