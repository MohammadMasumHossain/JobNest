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

type jobData = {
  month: string;
  year: number;
  jobs: number;
  color: string;
};

const Data: jobData[] = [
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

const renderCustomBarLabel = ({ x, y, width, value }: any) => {
  return (
    <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

function CustomTooltip({ payload, active }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="border border-red-500 rounded-md bg-white p-4 shadow-lg">
        <p className="text-sm">{payload[0].payload.month}</p>
        <p className="text-lg font-semibold text-indigo-400">
          {payload[0].value} Jobs Posted
        </p>
      </div>
    );
  }
  return null;
}

const MonthlyJobChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [sortType, setSortType] = useState<"default" | "asc" | "desc">(
    "default",
  );

  const filteredData = useMemo(() => {
    let result = Data.filter((item) => item.year === selectedYear);

    if (sortType === "asc") {
      result = [...result].sort((a, b) => a.jobs - b.jobs);
    } else if (sortType === "desc") {
      result = [...result].sort((a, b) => b.jobs - a.jobs);
    }

    return result;
  }, [selectedYear, sortType]);

  const years = Array.from(new Set(Data.map((item) => item.year)));

  return (
    <div className="bg-white pt-8 pb-2 rounded-lg shadow-md w-full mx-auto">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Job Post Per Month
        </h2>
      </div>

      <div className="flex justify-end  mr-8 gap-4 mb-2">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 shadow-sm rounded"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={sortType}
          onChange={(e) =>
            setSortType(e.target.value as "default" | "asc" | "desc")
          }
          className="border p-2 rounded"
        >
          <option value="default">Default</option>
          <option value="asc">Sort by Jobs (Low → High)</option>
          <option value="desc">Sort by Jobs (High → Low)</option>
        </select>
      </div>

      <div className="w-full h-90">
        <ResponsiveContainer>
          <BarChart
            key={selectedYear}
            data={filteredData}
            margin={{ top: 30, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              label={{
                position: "insideTopLeft",
                value: "Total Jobs",
                angle: -90,
                dy: 180,
              }}
            />
            <Tooltip content={CustomTooltip} />
            <Bar
              dataKey="jobs"
              label={renderCustomBarLabel}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-in-out"
            >
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

export default MonthlyJobChart;
