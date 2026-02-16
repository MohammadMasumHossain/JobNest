import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type JobCategoryData = {
  name: string;
  value: number;
  color: string;
};

const data: JobCategoryData[] = [
  { name: "Engineering", value: 120, color: "#4F46E5" },
  { name: "Design", value: 80, color: "#DB2777" },
  { name: "Marketing", value: 60, color: "#059669" },
  { name: "Sales", value: 90, color: "#D97706" },
  { name: "HR", value: 40, color: "#DC2626" },
  { name: "Product", value: 75, color: "#7C3AED" },
  { name: "Finance", value: 55, color: "#0891B2" },
  { name: "Customer Support", value: 65, color: "#16A34A" },
  { name: "Operations", value: 70, color: "#EA580C" },
  { name: "Legal", value: 35, color: "#475569" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-md shadow-md border">
        <p className="text-sm text-gray-500">{payload[0].name}</p>
        <p className="text-lg font-semibold text-indigo-500">
          {payload[0].value} Jobs
        </p>
      </div>
    );
  }
  return null;
};

const JobByCategory: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Job Posts by Category
      </h2>

      <div className="w-full h-87">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobByCategory;
