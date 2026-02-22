// import React from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// type jobData = {
//   month: string;
//   jobs: number;
//   year:number;
//   color: string;
// };
// const Data: jobData[] = [
//   { month: "Jan",year:2024, jobs: 40, color: "#FFC633" },
//   { month: "Feb",year:2024, jobs: 65, color: "#FFC633" },
//   { month: "Mar", year:2025, jobs: 80, color: "#FFC633" },
//   { month: "Apr",year:2025 jobs: 55, color: "#FFC633" },
//   { month: "May", jobs: 95, color: "#33CFFF" },
//   { month: "Jun", jobs: 70, color: "#33CFFF" },
//   { month: "Jul", jobs: 110, color: "#33CFFF" },
//   { month: "Aug", jobs: 90, color: "#33CFFF" },
//   { month: "Sep", jobs: 120, color: "#FF33C6" },
//   { month: "Oct", jobs: 100, color: "#FF33C6" },
//   { month: "Nov", jobs: 140, color: "#FF33C6" },
//   { month: "Dec", jobs: 160, color: "#FF33C6" },
// ];
// const renderCustomBarLabel = ({ x, y, width, value }: any) => {
//   return (
//     <text
//       x={x + width / 2}
//       y={y}
//       fill="#666"
//       textAnchor="middle"
//       dy={-6}
//     >{` ${value}`}</text>
//   );
// };

// function CustomTooltip({ payload, active }: any) {
//   if (active && payload && payload.length) {
//     return (
//       <div className="border border-red-500 rounded-md bg-white p-4 shadow-lg">
//         <p className="text-sm ">{payload[0].payload.month}</p>
//         <p className="text-lg font-semibold text-indigo-400">
//           {payload[0].value} Jobs Posted
//         </p>
//       </div>
//     );
//   }

//   return null;
// }

// const MontlyJobChart: React.FC = () => {
//   return (
//     <div className="bg-white pt-8 ">
//       <div>
//         <h2 className="text-xl font-semibold mb-4 text-center  text-gray-800">
//           Job Post Per Month
//         </h2>
//       </div>
//       <div className="w-full h-90 ">
//         <ResponsiveContainer>
//           <BarChart
//             data={Data}
//             margin={{ top: 30, right: 20, left: 10, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" axisLine={false} tickLine={false} />

//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               label={{
//                 position: "insideTopLeft",
//                 value: "Total Jobs",
//                 angle: -90,
//                 dy: 180,
//               }}
//             />
//             <Tooltip content={CustomTooltip} />
//             <Bar
//               dataKey="jobs"
//               label={renderCustomBarLabel}
//               isAnimationActive={true}
//               animationBegin={100}
//               animationDuration={600}
//               animationEasing="ease-out"
//             >
//               {Data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default MontlyJobChart;
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
  { month: "Jan", year: 2024, jobs: 30, color: "#FFC633" },
  { month: "Feb", year: 2024, jobs: 45, color: "#FFC633" },

  { month: "Jan", year: 2025, jobs: 40, color: "#FFC633" },
  { month: "Feb", year: 2025, jobs: 65, color: "#FFC633" },
  { month: "Mar", year: 2025, jobs: 80, color: "#FFC633" },
  { month: "Apr", year: 2025, jobs: 55, color: "#FFC633" },
  { month: "May", year: 2025, jobs: 95, color: "#33CFFF" },
  { month: "Jun", year: 2025, jobs: 70, color: "#33CFFF" },
  { month: "Jul", year: 2025, jobs: 110, color: "#33CFFF" },
  { month: "Aug", year: 2025, jobs: 90, color: "#33CFFF" },
  { month: "Sep", year: 2025, jobs: 120, color: "#FF33C6" },
  { month: "Oct", year: 2025, jobs: 100, color: "#FF33C6" },
  { month: "Nov", year: 2025, jobs: 140, color: "#FF33C6" },
  { month: "Dec", year: 2025, jobs: 160, color: "#FF33C6" },
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
    <div className="bg-white pt-8 pb-2">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Job Post Per Month
        </h2>
      </div>

      <div className="flex justify-end mr-8 gap-4 mb-2">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded"
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
