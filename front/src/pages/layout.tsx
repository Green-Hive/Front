import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User, HomeShield, HomeUser, Leaf } from "iconoir-react";
// import {
//   USER_ADDRESSES,
//   UserProvider,
//   useUserContext,
// } from "../context/user.context";

function Log() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setUserContext } = useUserContext();

  return (
    <div className="text-lg font-bold w-40 flex items-center justify-center">
      <div
        className="h-12 w-12 rounded-full bg-violet-400 flex items-center justify-center hover:cursor-pointer hover:bg-violet-500 mt-3 transition duration-400"
        onClick={() => setOpen(!open)}
      >
        <User className="text-white" strokeWidth={2} width={24} height={24} />
      </div>
      {open && (
        <div className="absolute top-[80px] right-[100px] w-60 z-50 ">
          <div className="w-full h-full rounded bg-slate-600 shadow-xl p-5">
            <div className="w-full flex flex-col items-center justify-center mb-6 gap-3">
              <div className="h-16 w-16 rounded-full bg-violet-400 flex items-center justify-center hover:cursor-pointer">
                <User className="text-white" />
              </div>
              <p>Authentificated Users</p>
              <div className="w-full h-[2px] bg-slate-800/20"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-5 hover:cursor-pointer hover:rounded hover:bg-slate-500 p-2"
                onClick={() => {
                  setUserContext({
                    userAddress: USER_ADDRESSES.ROOF_CONSTRUCT,
                  });
                  navigate("/certificate/roof-contruction"), setOpen(false);
                }}
              >
                <div className="h-10 w-10 rounded-full bg-violet-400 flex items-center justify-center">
                  <HomeUser className="text-white" width={20} height={20} />
                </div>
                <p className="text-base">Roof Construct</p>
              </div>
              <div
                className="flex items-center gap-5 hover:cursor-pointer hover:rounded hover:bg-slate-500 p-2"
                onClick={() => {
                  setUserContext({ userAddress: USER_ADDRESSES.ENERGYLUX });
                  navigate("/certificate/energy"), setOpen(false);
                }}
              >
                <div className="h-10 w-10 rounded-full bg-violet-400 flex items-center justify-center">
                  <Leaf className="text-white" width={20} height={20} />
                </div>
                <p className="text-base">EnergyLUX</p>
              </div>
              <div
                className="flex items-center gap-5 hover:cursor-pointer hover:rounded hover:bg-slate-500 p-2"
                onClick={() => {
                  setUserContext({ userAddress: USER_ADDRESSES.FOYER });
                  navigate("/certificate/insurance"), setOpen(false);
                }}
              >
                <div className="h-10 w-10 rounded-full bg-violet-400 flex items-center justify-center">
                  <HomeShield className="text-white" width={20} height={20} />
                </div>
                <p className="text-base">Foyer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("/");

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-16 w-full flex flex-col items-center mb-10 px-20">
      <div className="flex items-center justify-between h-full w-full">
        <div
          className="text-lg font-bold w-40 hover:cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img
            src="/logoV1.png"
            className="hover:scale-105 transition duration-800"
            width={50}
            height={50}
          />
          <p>LuxCertify</p>
        </div>
        <div className="h-full w-full flex items-center justify-center gap-10">
          <p
            className={`font-semibold hover:cursor-pointer hover:text-violet-400 ${
              (current === "/" || current.includes("/dwelling")) &&
              "text-violet-400"
            }`}
            onClick={() => navigate("/")}
          >
            Dwellings
          </p>
          {/* <p
            className={`font-semibold hover:cursor-pointer hover:text-violet-400 ${
              current === "/access" && "text-violet-400"
            }`}
            onClick={() => navigate("/access")}
          >
            Access
          </p> */}
        </div>
        <Log />
      </div>
      <div className="h-[2px] w-[50%] bg-gray-700"></div>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="w-full">
      {/* <UserProvider> */}
      <NavBar />
      <Outlet />
      {/* </UserProvider> */}
    </div>
  );
}
