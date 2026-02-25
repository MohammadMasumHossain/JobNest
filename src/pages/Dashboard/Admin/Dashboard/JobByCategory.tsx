import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";
import CustomDropDownMenu from "@/components/ui/CustomDropDownMenu";

type JobCategoryData = {
  name: string;
  value: number;
  year: number;
  color: string;
};

const data: JobCategoryData[] = [
  { name: "Engineering", year: 2024, value: 120, color: "#6366F1" },
  { name: "Design", year: 2024, value: 80, color: "#E879A7" },
  { name: "Marketing", year: 2024, value: 60, color: "#34B38A" },
  { name: "Sales", year: 2024, value: 90, color: "#F4A261" },
  { name: "HR", year: 2024, value: 40, color: "#E57373" },
  { name: "Product", year: 2024, value: 75, color: "#A78BFA" },
  { name: "Finance", year: 2024, value: 55, color: "#38BDF8" },
  { name: "Customer Support", year: 2024, value: 65, color: "#4ADE80" },
  { name: "Operations", year: 2024, value: 70, color: "#FB923C" },
  { name: "Legal", year: 2024, value: 35, color: "#64748B" },

  { name: "Engineering", year: 2025, value: 80, color: "#6366F1" },
  { name: "Design", year: 2025, value: 75, color: "#E879A7" },
  { name: "Marketing", year: 2025, value: 70, color: "#34B38A" },
  { name: "Sales", year: 2025, value: 120, color: "#F4A261" },
  { name: "HR", year: 2025, value: 140, color: "#E57373" },
  { name: "Product", year: 2025, value: 70, color: "#A78BFA" },
  { name: "Finance", year: 2025, value: 50, color: "#38BDF8" },
  { name: "Customer Support", year: 2025, value: 65, color: "#4ADE80" },
  { name: "Operations", year: 2025, value: 80, color: "#FB923C" },
  { name: "Legal", year: 2025, value: 45, color: "#64748B" },

  { name: "Engineering", year: 2026, value: 90, color: "#6366F1" },
  { name: "Design", year: 2026, value: 85, color: "#E879A7" },
  { name: "Marketing", year: 2026, value: 75, color: "#34B38A" },
  { name: "Sales", year: 2026, value: 130, color: "#F4A261" },
  { name: "HR", year: 2026, value: 150, color: "#E57373" },
  { name: "Product", year: 2026, value: 80, color: "#A78BFA" },
  { name: "Finance", year: 2026, value: 60, color: "#38BDF8" },
  { name: "Customer Support", year: 2026, value: 70, color: "#4ADE80" },
  { name: "Operations", year: 2026, value: 90, color: "#FB923C" },
  { name: "Legal", year: 2026, value: 50, color: "#64748B" },
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

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-xl  font-semibold text-gray-800 text-center sm:text-left mb-2 sm:mb-0">
          Job Posts by Category
        </h2>

        <div className="flex justify-end w-full sm:w-48">
          <CustomDropDownMenu
            options={years.map(String)}
            selected={String(selectedYear)}
            onSelect={(val) => setSelectedYear(Number(val))}
            icon={<FaChevronDown />}
          />
        </div>
      </div>

      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-100">
        <ResponsiveContainer>
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
