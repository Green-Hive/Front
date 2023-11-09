// DASHBOARD PAGE //

import { ReportColumns, StatsReport } from "iconoir-react";

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
        <div className="flex items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]"></div>
        <div className="flex items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]"></div>
        <div className="flex items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]"></div>
        <div className="flex items-center gap-2 w-full p-2 bg-[#3B3B3B] rounded h-[300px]"></div>
      </div>
    </div>
  );
}
