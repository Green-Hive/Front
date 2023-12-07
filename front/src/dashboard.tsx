// DASHBOARD PAGE //

import { StatsReport } from "iconoir-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const data = [
  {
    name: "Monday",
    inside: 20,
    outside: 17,
    amt: 2400,
  },
  {
    name: "Tuesday",
    inside: 22,
    outside: 19,
    amt: 2210,
  },
  {
    name: "Wednesday",
    inside: 22,
    outside: 17,
    amt: 2290,
  },
  {
    name: "Thursday",
    inside: 20,
    outside: 13,
    amt: 2000,
  },
  {
    name: "Friday",
    inside: 21,
    outside: 16,
    amt: 2181,
  },
  {
    name: "Saturday",
    inside: 23,
    outside: 18,
    amt: 2500,
  },
  {
    name: "Sunday",
    inside: 21,
    outside: 17,
    amt: 2100,
  },
];

const data2 = [
  {
    name: "Monday",
    inside: 40,
    outside: 70,
    amt: 2400,
  },
  {
    name: "Tuesday",
    inside: 32,
    outside: 80,
    amt: 2210,
  },
  {
    name: "Wednesday",
    inside: 35,
    outside: 85,
    amt: 2290,
  },
  {
    name: "Thursday",
    inside: 23,
    outside: 63,
    amt: 2000,
  },
  {
    name: "Friday",
    inside: 35,
    outside: 78,
    amt: 2181,
  },
  {
    name: "Saturday",
    inside: 27,
    outside: 67,
    amt: 2500,
  },
  {
    name: "Sunday",
    inside: 19,
    outside: 57,
    amt: 2100,
  },
];

const data3 = [
  {
    name: "Monday",
    morning: 32.5,
    afternoon: 34.3,
    amt: 2400,
  },
  {
    name: "Tuesday",
    morning: 32.9,
    afternoon: 33.8,
    amt: 2210,
  },
  {
    name: "Wednesday",
    morning: 33.1,
    afternoon: 34.3,
    amt: 2290,
  },
  {
    name: "Thursday",
    morning: 32.2,
    afternoon: 32.9,
    amt: 2000,
  },
  {
    name: "Friday",
    morning: 33.3,
    afternoon: 35.0,
    amt: 2181,
  },
  {
    name: "Saturday",
    morning: 33.4,
    afternoon: 34.9,
    amt: 2500,
  },
  {
    name: "Sunday",
    morning: 32.6,
    afternoon: 33.8,
    amt: 2100,
  },
];

const data4 = [
  {
    name: "Monday",
    pression: 740,
    amt: 2400,
  },
  {
    name: "Tuesday",
    pression: 755,
    amt: 2210,
  },
  {
    name: "Wednesday",
    pression: 765,
    amt: 2290,
  },
  {
    name: "Thursday",
    pression: 754,
    amt: 2000,
  },
  {
    name: "Friday",
    pression: 720,
    amt: 2181,
  },
  {
    name: "Saturday",
    pression: 722,
    amt: 2500,
  },
  {
    name: "Sunday",
    pression: 735,
    amt: 2100,
  },
];

export default function Dashboard() {
  const [time, setTime] = useState<string>("Daily");
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 w-full justify-between py-2 px-5 bg-Light-gray dark:bg-[#E5E5E5] rounded">
        <div className="flex gap-2 items-center">
          <StatsReport className="text-white dark:text-black" />
          <p className="text-white dark:text-black text-lg font-normal">
            GreenHive - Hive
          </p>
        </div>
        <div className="pr-5">
          <select
            className="w-40 p-2 rounded bg-main text-white"
            onChange={(e) => setTime(e.target.value)}
          >
            <option>Weekly</option>
            <option>Daily</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="mt-5 w-full grid grid-cols-2 gap-5">
        <div className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929]">
            Température moyenne (°C)
          </p>
          <AreaChart
            width={680}
            height={240}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis domain={[10, 28]} fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="inside"
              stroke="#B1F81A"
              fillOpacity={0.6}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="outside"
              stroke="#82ca9d"
              fillOpacity={0.2}
              fill="#82ca9d"
            />
          </AreaChart>
        </div>

        <div className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929]">Humidité moyenne (%)</p>
          <AreaChart
            width={680}
            height={240}
            data={data2}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="outside"
              stroke="#B1F81A"
              fillOpacity={0.6}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="inside"
              stroke="#82ca9d"
              fillOpacity={0.2}
              fill="#82ca9d"
            />
          </AreaChart>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929]">
            Poids de la ruche (kg)
          </p>
          <BarChart width={650} height={240} data={data3}>
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis domain={[30, 36]} fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="morning" fill="#B1F81A" />
            <Bar dataKey="afternoon" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="flex flex-col justify-between items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929]">
            Pression atmosphérique (mmHg)
          </p>
          <LineChart
            width={700}
            height={250}
            data={data4}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} domain={[650, 800]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pression"
              stroke="#B1F81A"
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
