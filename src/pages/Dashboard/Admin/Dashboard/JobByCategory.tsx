// import React, { useMemo, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// type JobCategoryData = {
//   name: string;
//   value: number;
//   year: number;
//   color: string;
// };

// const data: JobCategoryData[] = [
//   { name: "Engineering", year: 2024, value: 120, color: "#4F46E5" },
//   { name: "Design", year: 2024, value: 80, color: "#DB2777" },
//   { name: "Marketing", year: 2024, value: 60, color: "#059669" },
//   { name: "Sales", year: 2024, value: 90, color: "#D97706" },
//   { name: "HR", year: 2024, value: 40, color: "#DC2626" },
//   { name: "Product", year: 2024, value: 75, color: "#7C3AED" },
//   { name: "Finance", year: 2024, value: 55, color: "#0891B2" },
//   { name: "Customer Support", year: 2024, value: 65, color: "#16A34A" },
//   { name: "Operations", year: 2024, value: 70, color: "#EA580C" },
//   { name: "Legal", year: 2024, value: 35, color: "#475569" },

//   { name: "Engineering", year: 2025, value: 80, color: "#DB2777" },
//   { name: "Marketing", year: 2025, value: 70, color: "#059669" },
//   { name: "Sales", year: 2025, value: 120, color: "#D97706" },
//   { name: "HR", year: 2025, value: 140, color: "#DC2626" },
//   { name: "Product", year: 2025, value: 70, color: "#7C3AED" },
//   { name: "Finance", year: 2025, value: 50, color: "#0891B2" },
//   { name: "Customer Support", year: 2025, value: 65, color: "#16A34A" },
//   { name: "Operations", year: 2025, value: 80, color: "#EA580C" },
//   { name: "Legal", year: 2025, value: 45, color: "#475569" },
// ];

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-3 rounded-md shadow-md border">
//         <p className="text-sm text-gray-500">{payload[0].name}</p>
//         <p className="text-lg font-semibold text-indigo-500">
//           {payload[0].value} Jobs
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// const JobByCategory: React.FC = () => {
//   const [selectedYear, setSelectedYear] = useState<number>(2025);

//   const filteredData = useMemo(() => {
//     let result = data.filter((item) => item.year === selectedYear);
//     return result;
//   }, [selectedYear]);

//   const years = Array.from(new Set(data.map((item) => item.year)));

//   return (
//     <div className="bg-white p-6   rounded-lg shadow-md w-full max-w-md mx-auto">
//       <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-2">
//         Job Posts by Category
//       </h2>

//       <div className="flex justify-end  mr-8 gap-4 mb-2">
//         <select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(Number(e.target.value))}
//           className="border p-2 rounded"
//         >
//           {years.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="w-full h-100">
//         <ResponsiveContainer>
//           <PieChart
//             key={selectedYear}
//             data={filteredData}
//             margin={{ top: 30, right: 20, left: 10, bottom: 5 }}
//           >
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               outerRadius="80%"
//               innerRadius="40%"
//               paddingAngle={3}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>

//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default JobByCategory;
import React, { useMemo, useState } from "react";
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
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const filteredData = useMemo(() => {
    return data.filter((item) => item.year === selectedYear);
  }, [selectedYear]);

  const years = Array.from(new Set(data.map((item) => item.year)));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-4">
        Job Posts by Category
      </h2>

      <div className="flex justify-end gap-4 ">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded-lg bg-white shadow-sm hover:border-indigo-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-85 mb-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              innerRadius="40%"
              paddingAngle={3}
              isAnimationActive={true}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobByCategory;
