import React from "react";
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
  jobs: number;
  color: string;
};
const Data: jobData[] = [
  { month: "Jan", jobs: 40, color: "#FF5733" },
  { month: "Feb", jobs: 65, color: "#33CFFF" },
  { month: "Mar", jobs: 80, color: "#33FF57" },
  { month: "Apr", jobs: 55, color: "#FF33C6" },
  { month: "May", jobs: 95, color: "#C633FF" },
  { month: "Jun", jobs: 70, color: "#FFC633" },
  { month: "Jul", jobs: 110, color: "#FF5733" },
  { month: "Aug", jobs: 90, color: "#33CFFF" },
  { month: "Sep", jobs: 120, color: "#33FF57" },
  { month: "Oct", jobs: 100, color: "#FF33C6" },
  { month: "Nov", jobs: 140, color: "#FFC633" },
  { month: "Dec", jobs: 160, color: "#33CFFF" },
];
const renderCustomBarLabel = ({ x, y, width, value }: any) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-6}
    >{` ${value}`}</text>
  );
};

function CustomTooltip({ payload, active }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="border border-red-500 rounded-md bg-white p-4 shadow-lg">
        <p className="text-sm ">{payload[0].payload.month}</p>
        <p className="text-lg font-semibold text-indigo-400">
          {payload[0].value} Jobs Posted
        </p>
      </div>
    );
  }

  return null;
}

const MontlyJobChart: React.FC = () => {
  return (
    <div className="bg-white pt-8 ">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center  text-gray-800">
          Job Post Per Month
        </h2>
      </div>
      <div className="w-full h-90 ">
        <ResponsiveContainer>
          <BarChart
            data={Data}
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
            <Bar dataKey="jobs" label={renderCustomBarLabel}>
              {Data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MontlyJobChart;
