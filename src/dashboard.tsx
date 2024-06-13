// DASHBOARD PAGE //

import {StatsReport} from "iconoir-react";
import {useEffect, useState} from "react";
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
import {apiClient} from "./services/api";
import {useAuth} from "./context/AuthContext";
import moment from "moment";
import Spinner from "./components/spinner";
import Hive3D from './components/Hive3D';

type Hive = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const [hives, setHives] = useState<Hive[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHive, setSelectedHive] = useState<string | null>(
    localStorage.getItem("hive")
  );
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
  const [globalData, setGlobalData] = useState<
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
    }[]
  >([]); // An array of Hive data [temperature, humidite, poids, pression
  const [time, setTime] = useState<string>("Today");
  const {user} = useAuth();

  // Baseline magnetic field values
  const baselineMagneticX = 700;
  const baselineMagneticY = -1505;
  const baselineMagneticZ = 1075;

  const getHives = async () => {
    if (user && user.id) {
      const res = await apiClient.getUserAccessibleHives(user.id);
      if (res && res.data && res.data.length) {
        if (!localStorage.getItem("hive")) {
          localStorage.setItem("hive", res.data[0].id);
          setSelectedHive(res.data[0] || null);
        } else setSelectedHive(localStorage.getItem("hive"));
        setHives(res.data);
      }
    }
  };

  const getAllHiveData = async () => {
    if (selectedHive) {
      const res = await apiClient.getAllHiveData(selectedHive);
      if (res) setLoading(false);
      if (res && res.data && res.data.length) {
        let data = res.data.map((d: any) => ({
          ...d,
          magnetic_x_dev: d.magnetic_x ? (d.magnetic_x - baselineMagneticX) : 0,
          magnetic_y_dev: d.magnetic_y ? (d.magnetic_y - baselineMagneticY) : 0,
          magnetic_z_dev: d.magnetic_z ? (d.magnetic_z - baselineMagneticZ) : 0,

          date: moment(d.createdAt).format(time !== "This week" ? "HH:mm" : 'DD/MM/YYYY')
        })).reverse();
        setGlobalData(data);
        if (time === "Real time")
          setHivesData(data.splice(data.length - 10, data.length));
      }
    }
  };

  useEffect(() => {
    if (time === "Real time") {
      setHivesData(
        globalData.splice(globalData.length - 10, globalData.length)
      );
    }
    if (time === "Today") {
      const data = globalData.filter((d: any) =>
        moment(d.createdAt).isSame(new Date(), "day")
      );
      setHivesData(data);
    }
    if (time === "This month") {
      const data = globalData.filter((d: any) =>
        moment(d.createdAt).isSame(new Date(), "month")
      );
      setHivesData(data);
    }
    if (time === "This year") {
      const data = globalData.filter((d: any) =>
        moment(d.createdAt).isSame(new Date(), "year")
      );
      setHivesData(data);
    }
  }, [time, selectedHive]);

  useEffect(() => {
    getAllHiveData();
    setGlobalData([]);
    setHivesData([]);
    setLoading(true);
    setTime("Today");
  }, [selectedHive]);

  useEffect(() => {
    getHives();
  }, [user]);

  useEffect(() => {
    if (time === "Real time") {
      const interval = setInterval(() => {
        getAllHiveData();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [time, selectedHive]);

  const onSelectHive = (id: string) => {
    const newHive = hives?.find((hive) => hive.id === id);
    if (newHive) {
      localStorage.setItem("hive", newHive.id);
      setSelectedHive(newHive.id);
    }
  };

  if (!hives)
    return (
      <div className="w-full flex items-center justify-center h-20">
        <Spinner/>
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
        <div
          className="flex items-center gap-2 w-full justify-between py-2 px-5 bg-Light-gray dark:bg-[#E5E5E5] rounded">
          <div className="flex gap-4 items-center">
            <StatsReport className="text-white dark:text-black"/>
            <select
              value={selectedHive ? selectedHive : ""}
              onChange={(e) => onSelectHive(e.target.value)}
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
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="w-full flex items-center justify-center h-20">
            <Spinner/>
          </div>
        ) : (
          <div className="mt-5 w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
            <div
              className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
              <p className="text-title dark:text-[#292929]">
                Température moyenne (°C)
              </p>
              <LineChart
                width={680}
                height={240}
                data={HivesData.map((data) => ({
                  date: moment(data.createdAt).format(
                    time == "Today" || time === "Real time" ? "HH:mm" : "DD/MM"
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
                margin={{top: 10, right: 30, left: 0, bottom: 0}}
              >
                <defs>
                  <linearGradient id="outside">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="inside">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" fontSize={12}/>
                <YAxis domain={[-10, 40]} fontSize={12}/>
                <CartesianGrid opacity={0.2} strokeDasharray="1 1"/>
                <Tooltip/>
                <Legend/>
                <Line
                  type="monotone"
                  dot={false}
                  dataKey="inside"
                  stroke="#B1F81A"
                  fillOpacity={0.6}
                  fill="url(#outside)"
                />
                <Line
                  type="monotone"
                  dot={false}
                  dataKey="outside"
                  stroke="#82ca9d"
                  fillOpacity={0.2}
                  fill="#82ca9d"
                />
              </LineChart>
            </div>

            <div
              className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
              <p className="text-title dark:text-[#292929]">
                Humidité moyenne (%)
              </p>
              <AreaChart
                width={680}
                height={240}
                data={HivesData.map((data) => ({
                  date: moment(data.createdAt).format(
                    time == "Today" || time === "Real time" ? "HH:mm" : "DD/MM"
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
                margin={{top: 10, right: 30, left: 0, bottom: 0}}
              >
                <defs>
                  <linearGradient id="outside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="inside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B1F81A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#B1F81A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" fontSize={12}/>
                <YAxis domain={[0, 100]} fontSize={12}/>
                <CartesianGrid opacity={0.2} strokeDasharray="1 1"/>
                <Tooltip/>
                <Legend/>
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

            <div
              className="flex flex-col items-center justify-between w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
              <p className="text-title dark:text-[#292929]">
                Poids de la ruche (gr)
              </p>
              <BarChart
                width={650}
                height={240}
                data={HivesData.map((data) => ({
                  weight: data.weight?.toFixed(2),
                  date: moment(data.createdAt).format(
                    time == "Today" || time === "Real time" ? "HH:mm" : "DD/MM"
                  ),
                }))}
              >
                <CartesianGrid opacity={0.2} strokeDasharray="1 1"/>
                <XAxis dataKey="date" fontSize={12}/>
                <YAxis domain={[200, 4000]} fontSize={12}/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="weight" fill="#B1F81A"/>
              </BarChart>
            </div>

            <div
              className="flex flex-col justify-between items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
              <p className="text-title dark:text-[#292929]">
                Pression atmosphérique (mmHg)
              </p>
              <LineChart
                width={650}
                height={240}
                data={HivesData.map((data) => ({
                  pressure: data.pressure?.toFixed(2),
                  date: moment(data.createdAt).format(
                    time == "Today" || time === "Real time" ? "HH:mm" : "DD/MM"
                  ),
                }))}
                margin={{top: 5, right: 30, left: 0, bottom: 5}}
              >
                <CartesianGrid opacity={0.2} strokeDasharray="1 1"/>
                <XAxis dataKey="date" fontSize={12}/>
                <YAxis fontSize={12} domain={[970, 1050]}/>
                <Tooltip/>
                <Legend/>
                <Line
                  type="monotone"
                  dot={false}
                  dataKey="pressure"
                  stroke="#B1F81A"
                  strokeWidth={3}
                />
              </LineChart>
            </div>
            <div
              className="flex flex-col items-center gap-2 w-full p-3 bg-Light-gray dark:bg-[#E5E5E5] rounded h-[300px] overflow-y-auto">
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
