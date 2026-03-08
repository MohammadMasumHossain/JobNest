import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm md:text-md font-medium uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-3xl opacity-75">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
