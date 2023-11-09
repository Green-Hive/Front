// DASHBOARD PAGE //

import { StatsReport } from "iconoir-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "10h",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "11h",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "12h",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "13h",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "14h",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "15h",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "16h",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 w-full py-2 px-5 bg-[#3B3B3B] rounded">
        <StatsReport className="text-white" />
        <p className="text-white text-lg font-semibold">
          GreenHive - Hive #34U4Y
        </p>
      </div>
      <div className="mt-10 w-full grid grid-cols-2 gap-5">
        <div className="flex flex-col items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]">
          <p className="text-[#D6D6D6] font-semibold">Température interne</p>
          <AreaChart
            width={680}
            height={260}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#90AB45" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#90AB45" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#B1F81A"
              fillOpacity={0.6}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#90AB45"
              fillOpacity={0.3}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
        <div className="flex items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]"></div>
        <div className="flex items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]"></div>
        <div className="flex items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]"></div>
      </div>
    </div>
  );
}
