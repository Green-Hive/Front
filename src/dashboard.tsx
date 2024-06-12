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
import { apiClient } from "./services/api";
import { useAuth } from "./context/AuthContext";
import moment from "moment";
import Spinner from "./components/spinner";
import Hive3D from './components/Hive3D';

type Hive = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const [hives, setHives] = useState<Hive[] | null>(null); // An array of Hive objects
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null); // Nullable Hive object
  const [HivesData, setHivesData] = useState<
    {
      createdAt: Date;
      tempBottomLeft: number | null;
      tempTopRight: number | null;
      tempOutside: number | null;
      pressure: number | null;
      humidityBottomLeft: number | null;
      humidityTopRight: number | null;
      humidityOutside: number | null;
      weight: number | null;
      magnetic_x: number | null;
      magnetic_y: number | null;
      magnetic_z: number | null;
      magnetic_x_dev?: number;  // Optional property to handle deviations
      magnetic_y_dev?: number;
      magnetic_z_dev?: number;
      date?: string;       
    }[]
  >([]); // An array of Hive data [temperature, humidite, poids, pression
  const [time, setTime] = useState<string>("Real time");
  const { user } = useAuth();

      // Baseline magnetic field values
  const baselineMagneticX = 700;
  const baselineMagneticY = -1505;
  const baselineMagneticZ = 1075;


  const getHives = async () => {
    if (user && user.id) {
      const res = await apiClient.getUserAccessibleHives(user.id);
      if (res && res.data && res.data.length) {
        setHives(res.data);
        setSelectedHive(res.data[0] || null); // Ensure there is a default hive or null
      }
    }
  };

  const getAllHiveData = async () => {
    if (selectedHive) {
      const res = await apiClient.getAllHiveData(selectedHive.id);
      if (res && res.data && res.data.length) {
        let data = res.data.map((d: any) => ({
          ...d,
          magnetic_x_dev: d.magnetic_x ? (d.magnetic_x - baselineMagneticX) : 0,
          magnetic_y_dev: d.magnetic_y ? (d.magnetic_y - baselineMagneticY) : 0,
          magnetic_z_dev: d.magnetic_z ? (d.magnetic_z - baselineMagneticZ) : 0,
          
          date: moment(d.createdAt).format(time !== "This week" ? "HH:mm" : 'DD/MM/YYYY')
        }));
  
        if (time === "Today") {
          data = data.filter((d: any) => moment(d.createdAt).isSame(new Date(), 'day'));
        } else if (time === "This week") {
          data = data.filter((d: any) => moment(d.createdAt).isSame(new Date(), 'week'));
        } else {
          data = data.splice(0, 10).reverse(); // Showing latest 10 entries
        }
  
        setHivesData(data);
      }
    }
  }
  

  useEffect(() => {
    getAllHiveData();
  }, [selectedHive]);

  useEffect(() => {
    getHives();
  }, [user]);

  useEffect(() => {
    if (time === "Real time") {
      const interval = setInterval(() => {
        getAllHiveData();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [time, selectedHive]);

  if (!hives)
    return (
      <div className="w-full flex items-center justify-center h-20">
        <Spinner />
      </div>
    );
  else if (!hives.length)
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No hive linked to your account.</p>
      </div>
    );
  else
    return (
      <div className="p-5">
        <div className="flex items-center gap-2 w-full justify-between py-2 px-5 bg-Light-gray dark:bg-[#E5E5E5] rounded">
          <div className="flex gap-4 items-center">
            <StatsReport className="text-white dark:text-black" />
            <select
              value={selectedHive ? selectedHive.id : ""} // Use an empty string when selectedHive is null
              onChange={(e) => {
                const newHive = hives.find(
                  (hive) => hive.id === e.target.value
                );
                setSelectedHive(newHive || null); // Safely handle the case where no hive is found
              }}
              className="w-40 p-2 rounded bg-main dark:bg-white text-white dark:text-black"
            >
              {hives.map((hive) => (
                <option key={hive.id} value={hive.id}>
                  {hive.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pr-5">
            <select
              className="w-40 p-2 rounded bg-main dark:bg-white text-white dark:text-black"
              onChange={(e) => setTime(e.target.value)}
            >
              <option>Real time</option>
              <option>Today</option>
              <option>This week</option>
            </select>
          </div>
        </div>
        {HivesData.length === 0 ? (
          <div className="mt-5 text-white/80 w-full flex items-center justify-center">
            <p>No data for this hive.</p>
          </div>
        ) : (
          <div className="mt-5 w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
              <p className="text-title dark:text-[#292929]">
                Température moyenne (°C)
              </p>
              <AreaChart
                width={680}
                height={240}
                data={HivesData.map((data) => ({
                  date: moment(data.createdAt).format(
                    time !== "This week" ? "HH:mm" : "DD/MM/YYYY"
                  ),
                  outside: data.tempOutside?.toFixed(2),
                  inside:
                    data.tempTopRight && data.tempBottomLeft
                      ? (
                          (data.tempTopRight + data.tempBottomLeft) /
                          2
                        )?.toFixed(2)
                      : 0,
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="outside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="inside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" fontSize={12} />
                <YAxis domain={[15, 28]} fontSize={12} />
                <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="inside"
                  stroke="#B1F81A"
                  fillOpacity={0.6}
                  fill="url(#outside)"
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
              <p className="text-title dark:text-[#292929]">
                Humidité moyenne (%)
              </p>
              <AreaChart
                width={680}
                height={240}
                data={HivesData.map((data) => ({
                  date: moment(data.createdAt).format(
                    time !== "This week" ? "HH:mm" : "DD/MM/YYYY"
                  ),
                  outside: data.humidityOutside?.toFixed(2),
                  inside:
                    data.humidityTopRight && data.humidityBottomLeft
                      ? (
                          (data.humidityBottomLeft + data.humidityTopRight) /
                          2
                        )?.toFixed(2)
                      : 0,
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="outside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="inside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="outside"
                  stroke="#B1F81A"
                  fillOpacity={0.6}
                  fill="url(#outside)"
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
                Poids de la ruche (gr)
              </p>
              <BarChart
                width={650}
                height={240}
                data={HivesData.map((data) => ({
                  weight: data.weight?.toFixed(2),
                  date: moment(data.createdAt).format(
                    time !== "This week" ? "HH:mm" : "DD/MM/YYYY"
                  ),
                }))}
              >
                <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis domain={[200, 800]} fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="weight" fill="#B1F81A" />
              </BarChart>
            </div>

            <div className="flex flex-col justify-between items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
              <p className="text-title dark:text-[#292929]">
                Pression atmosphérique (mmHg)
              </p>
              <LineChart
                width={650}
                height={240}
                data={HivesData.map((data) => ({
                  pressure: data.pressure?.toFixed(2),
                  date: moment(data.createdAt).format(
                    time !== "This week" ? "HH:mm" : "DD/MM/YYYY"
                  ),
                }))}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} domain={[800, 1100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#B1F81A"
                  strokeWidth={3}
                />
              </LineChart>
            </div>
            <div className="flex flex-col items-center w-full  bg-Light-gray dark:bg-[#E5E5E5] rounded h-[320px] overflow-y-auto">
              {HivesData.length > 0 ? (
                <Hive3D
                  magnetic_x={HivesData[0].magnetic_x_dev ?? 0}
                  magnetic_y={HivesData[0].magnetic_y_dev ?? 0}
                  magnetic_z={HivesData[0].magnetic_z_dev ?? 0}
                />
              ) : (
                <p>No magnetic data available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
}
