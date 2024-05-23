// DASHBOARD PAGE //

import { StatsReport } from "iconoir-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { API_BASE_URL, apiClient } from "./services/api";
import Spinner from "./components/spinner";
import axios from "axios";

export default function Dashboard() {
  const [hive, setHive] = useState<any>(undefined);

  const getHives = async () => {
    const res = await apiClient.getHives();
    if (res && res.data && res.data.length) {
      setHive(res.data[0]);
    }
  };

  const getHiveData = async () => {
    if (!hive) return;
    const data = await axios.get(`${API_BASE_URL}/api/hives/data/`);
    if (data && data.data) console.log(data.data);
  };

  useEffect(() => {
    if (hive) getHiveData();
  }, [hive]);

  useEffect(() => {
    getHives();
  }, []);

  if (!hive)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />;
      </div>
    );
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 w-full justify-between py-2 px-5 bg-Light-gray dark:bg-[#E5E5E5] rounded">
        <div className="flex gap-2 items-center">
          <StatsReport className="text-white dark:text-black" />
          <p className="text-white dark:text-black text-lg font-normal">
            {hive.name}
          </p>
        </div>
        <div className="pr-5">
          <select
            className="w-40 p-2 rounded bg-main dark:bg-white text-white dark:text-black"
            // onChange={(e) => setTime(e.target.value)}
          >
            <option>Weekly</option>
            <option>Daily</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="mt-5 w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
          <p className="text-title dark:text-[#292929]">
            Température moyenne (°C)
          </p>
          <AreaChart
            width={680}
            height={240}
            data={[]}
            // data={data.temperature}
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

        <div className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
          <p className="text-title dark:text-[#292929]">Humidité moyenne (%)</p>
          <AreaChart
            width={680}
            height={240}
            data={[]}
            // data={data.humidite}
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

        <div className="flex flex-col items-center justify-between w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
          <p className="text-title dark:text-[#292929]">
            Poids de la ruche (kg)
          </p>
          <BarChart
            width={650}
            height={240}
            data={[]}
            // data={data.poids}
          >
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis domain={[30, 36]} fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="morning" fill="#B1F81A" />
            <Bar dataKey="afternoon" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="flex flex-col justify-between items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
          <p className="text-title dark:text-[#292929]">
            Pression atmosphérique (mmHg)
          </p>
          <LineChart
            width={650}
            height={240}
            data={[]}
            // data={data.pression}
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
