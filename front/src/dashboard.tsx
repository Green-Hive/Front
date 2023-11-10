// DASHBOARD PAGE //

import { StatsReport } from "iconoir-react";
import {
  Area,
  AreaChart,
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

const data01 = [
  {
    x: 100,
    y: 200,
    z: 200,
  },
  {
    x: 120,
    y: 100,
    z: 260,
  },
  {
    x: 170,
    y: 300,
    z: 400,
  },
  {
    x: 140,
    y: 250,
    z: 280,
  },
  {
    x: 150,
    y: 400,
    z: 500,
  },
  {
    x: 110,
    y: 280,
    z: 200,
  },
];
const data02 = [
  {
    x: 200,
    y: 260,
    z: 240,
  },
  {
    x: 240,
    y: 290,
    z: 220,
  },
  {
    x: 190,
    y: 290,
    z: 250,
  },
  {
    x: 198,
    y: 250,
    z: 210,
  },
  {
    x: 180,
    y: 280,
    z: 260,
  },
  {
    x: 210,
    y: 220,
    z: 230,
  },
];

const data03 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data04 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

export default function Dashboard() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 w-full py-2 px-5  bg-Light-gray dark:bg-[#E5E5E5] rounded">
        <StatsReport className="text-white dark:text-black" />
        <p className="text-white dark:text-black text-lg font-normal">
          GreenHive - Hive 
        </p>
      </div>
      <div className="mt-10 w-full grid grid-cols-2 gap-5">
        <div className="flex flex-col items-center gap-2 w-full p-2 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929] font-semibold">Température interne</p>
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
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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
              stroke="#82ca9d"
              fillOpacity={0.3}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 w-full p-2 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929] font-semibold">Humidité externe</p>
          <ScatterChart
            width={680}
            height={255}
            margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 10,
            }}
          >
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <XAxis
              fontSize={12}
              dataKey="x"
              type="number"
              name="stature"
              unit="cm"
            />
            <YAxis
              fontSize={12}
              dataKey="y"
              type="number"
              name="weight"
              unit="kg"
            />
            <ZAxis
              dataKey="z"
              type="number"
              range={[64, 144]}
              name="score"
              unit="km"
            />
            <Tooltip cursor={{ strokeDasharray: "1 1" }} />
            <Scatter name="A school" data={data01} fill="#B1F81A" />
            <Scatter name="B school" data={data02} fill="#82ca9d" />
          </ScatterChart>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 w-full p-2 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929] font-semibold">Humidité externe</p>
          <ScatterChart
            width={680}
            height={255}
            margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 10,
            }}
          >
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <XAxis
              fontSize={12}
              dataKey="x"
              type="number"
              name="stature"
              unit="cm"
            />
            <YAxis
              fontSize={12}
              dataKey="y"
              type="number"
              name="weight"
              unit="kg"
            />
            <ZAxis
              dataKey="z"
              type="number"
              range={[64, 144]}
              name="score"
              unit="km"
            />
            <Tooltip cursor={{ strokeDasharray: "1 1" }} />
            <Scatter name="A school" data={data01} fill="#B1F81A" />
            <Scatter name="B school" data={data02} fill="#82ca9d" />
          </ScatterChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px]">
          <p className="text-title dark:text-[#292929] font-semibold">Température interne</p>
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
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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
              stroke="#82ca9d"
              fillOpacity={0.3}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
