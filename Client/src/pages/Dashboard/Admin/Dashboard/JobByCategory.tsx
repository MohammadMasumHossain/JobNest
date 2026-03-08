import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

import CustomDropDownMenu from "@/components/CustomDropDownMenu";
import { Filter } from "lucide-react";

type JobCategoryData = {
  name: string;
  value: number;
  year: number;
  color: string;
};

const data: JobCategoryData[] = [
  { name: "Engineering", year: 2024, value: 120, color: "#64748B" },
  { name: "Design", year: 2024, value: 80, color: "#0891B2" },
  { name: "Marketing", year: 2024, value: 60, color: "#059669" },
  { name: "Sales", year: 2024, value: 90, color: "#C07A5C" },
  { name: "HR", year: 2024, value: 40, color: "#64748B" },
  { name: "Product", year: 2024, value: 75, color: "#0891B2" },

  { name: "Engineering", year: 2025, value: 80, color: "#64748B" },
  { name: "Design", year: 2025, value: 75, color: "#0891B2" },
  { name: "Marketing", year: 2025, value: 70, color: "#059669" },
  { name: "Sales", year: 2025, value: 120, color: "#C07A5C" },
  { name: "HR", year: 2025, value: 140, color: "#64748B" },
  { name: "Product", year: 2025, value: 70, color: "#0891B2" },

  { name: "Engineering", year: 2026, value: 90, color: "#64748B" },
  { name: "Design", year: 2026, value: 85, color: "#0891B2" },
  { name: "Marketing", year: 2026, value: 75, color: "#059669" },
  { name: "Sales", year: 2026, value: 130, color: "#C07A5C" },
  { name: "HR", year: 2026, value: 150, color: "#64748B" },
  { name: "Product", year: 2026, value: 80, color: "#0891B2" },
];

const CustomTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 sm:p-3 rounded-md shadow-md border">
        <p className="text-base sm:text-lg font-medium text-gray-500">
          {payload[0].name}
        </p>
        <p className="text-lg sm:text-xl font-semibold text-indigo-500">
          {payload[0].value} Jobs
        </p>
      </div>
    );
  }
  return null;
};

const JobByCategory: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const filteredData = useMemo(
    () => data.filter((item) => item.year === selectedYear),
    [selectedYear],
  );

  const years = Array.from(new Set(data.map((item) => item.year)));

  const totalJobs = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.value, 0),
    [filteredData],
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center sm:text-left mb-2 sm:mb-0">
          Job Posts by Category
        </h2>

        <div className="flex justify-end w-full sm:w-48">
          <CustomDropDownMenu
            options={years.map(String)}
            selected={String(selectedYear)}
            onSelect={(val) => setSelectedYear(Number(val))}
            rotateIcon={false}
            icon={<Filter />}
          />
        </div>
      </div>

      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-112">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="name"
              outerRadius="75%"
              innerRadius="40%"
              paddingAngle={3}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}

              <Label
                position="center"
                value={`${totalJobs} Jobs`}
                style={{ fontSize: 16, fontWeight: 600, fill: "#4f46e5" }}
              />
            </Pie>
            <Tooltip content={<CustomTooltipContent />} />
            <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 14 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobByCategory;
