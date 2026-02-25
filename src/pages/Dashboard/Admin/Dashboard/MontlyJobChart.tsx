import React, { useState, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FaChevronDown } from "react-icons/fa";
import CustomDropDownMenu from "@/components/ui/CustomDropDownMenu";

type JobData = { month: string; year: number; jobs: number; color: string };

const Data: JobData[] = [
  { month: "Jan", year: 2024, jobs: 30, color: "#5C6F91" },
  { month: "Feb", year: 2024, jobs: 45, color: "#5C6F91" },
  { month: "Mar", year: 2024, jobs: 50, color: "#5C6F91" },
  { month: "Apr", year: 2024, jobs: 40, color: "#5C6F91" },
  { month: "May", year: 2024, jobs: 60, color: "#6B8E7A" },
  { month: "Jun", year: 2024, jobs: 55, color: "#6B8E7A" },
  { month: "Jul", year: 2024, jobs: 70, color: "#6B8E7A" },
  { month: "Aug", year: 2024, jobs: 65, color: "#6B8E7A" },
  { month: "Sep", year: 2024, jobs: 80, color: "#C07A5C" },
  { month: "Oct", year: 2024, jobs: 75, color: "#C07A5C" },
  { month: "Nov", year: 2024, jobs: 90, color: "#C07A5C" },
  { month: "Dec", year: 2024, jobs: 100, color: "#C07A5C" },

  { month: "Jan", year: 2025, jobs: 40, color: "#5C6F91" },
  { month: "Feb", year: 2025, jobs: 65, color: "#5C6F91" },
  { month: "Mar", year: 2025, jobs: 80, color: "#5C6F91" },
  { month: "Apr", year: 2025, jobs: 55, color: "#5C6F91" },
  { month: "May", year: 2025, jobs: 95, color: "#6B8E7A" },
  { month: "Jun", year: 2025, jobs: 70, color: "#6B8E7A" },
  { month: "Jul", year: 2025, jobs: 110, color: "#6B8E7A" },
  { month: "Aug", year: 2025, jobs: 90, color: "#6B8E7A" },
  { month: "Sep", year: 2025, jobs: 120, color: "#C07A5C" },
  { month: "Oct", year: 2025, jobs: 100, color: "#C07A5C" },
  { month: "Nov", year: 2025, jobs: 140, color: "#C07A5C" },
  { month: "Dec", year: 2025, jobs: 160, color: "#C07A5C" },

  { month: "Jan", year: 2026, jobs: 50, color: "#5C6F91" },
  { month: "Feb", year: 2026, jobs: 70, color: "#5C6F91" },
  { month: "Mar", year: 2026, jobs: 85, color: "#5C6F91" },
  { month: "Apr", year: 2026, jobs: 60, color: "#6B8E7A" },
  { month: "May", year: 2026, jobs: 100, color: "#6B8E7A" },
  { month: "Jun", year: 2026, jobs: 80, color: "#6B8E7A" },
  { month: "Jul", year: 2026, jobs: 120, color: "#6B8E7A" },
  { month: "Aug", year: 2026, jobs: 95, color: "#6B8E7A" },
  { month: "Sep", year: 2026, jobs: 130, color: "#C07A5C" },
  { month: "Oct", year: 2026, jobs: 110, color: "#C07A5C" },
  { month: "Nov", year: 2026, jobs: 150, color: "#C07A5C" },
  { month: "Dec", year: 2026, jobs: 170, color: "#C07A5C" },
];

const renderCustomBarLabel = ({ x, y, width, value }: any) => (
  <text
    x={x + width / 2}
    y={y}
    fill="#666"
    textAnchor="middle"
    dy={-8}
    fontSize={14}
  >
    {value}
  </text>
);

function CustomTooltip({ payload, active }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="border rounded-md bg-white p-3 shadow-lg">
        <p className="text-base font-medium">{payload[0].payload.month}</p>
        <p className="text-lg sm:text-xl font-semibold text-indigo-500">
          {payload[0].value} Jobs Posted
        </p>
      </div>
    );
  }
  return null;
}

const MonthlyJobsChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [sortType, setSortType] = useState<"Default" | "Asc" | "Desc">(
    "Default",
  );

  const filteredData = useMemo(() => {
    let result = Data.filter((item) => item.year === selectedYear);
    if (sortType === "Asc")
      result = [...result].sort((a, b) => a.jobs - b.jobs);
    if (sortType === "Desc")
      result = [...result].sort((a, b) => b.jobs - a.jobs);
    return result;
  }, [selectedYear, sortType]);

  const years = Array.from(new Set(Data.map((item) => item.year)));
  const sortOptions = ["Default", "Asc", "Desc"];

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-3">
        <h2 className="text-xl  ml-6  font-semibold text-gray-800">
          Job Post Per Month
        </h2>

        <div className="flex gap-3 flex-wrap mr-3 sm:flex-nowrap">
          <div className="w-32">
            <CustomDropDownMenu
              options={years.map(String)}
              selected={String(selectedYear)}
              onSelect={(val) => setSelectedYear(Number(val))}
              icon={<FaChevronDown />}
            />
          </div>

          <div className="w-32">
            <CustomDropDownMenu
              options={sortOptions}
              selected={sortType}
              onSelect={(val) => setSortType(val as "Default" | "Asc" | "Desc")}
              icon={<FaChevronDown />}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-70 sm:h-80 md:h-90 lg:h-95 xl:h-100">
        <ResponsiveContainer>
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14 }} />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="jobs" label={renderCustomBarLabel}>
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyJobsChart;
