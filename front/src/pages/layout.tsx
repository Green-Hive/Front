import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  User,
  HomeShield,
  HomeUser,
  Leaf,
  Home,
  Settings,
} from "iconoir-react";
import Logo from "../assets/GreenHive.png";

function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("/");

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex">
      <div className="w-52 h-screen bg-[#3C4C10] py-5 px-2">
        <div className="flex flex-col items-center justify-between h-full w-full">
          <div className="flex flex-col gap-10">
            <div
              className="text-lg font-bold w-40 hover:cursor-pointer flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Logo" className="w-40 h-14" />

              <p className="text-white">Greenhive</p>
            </div>
            <div className="w-full flex flex-col gap-5 self-start">
              <div className="flex gap-3 items-center text-white hover:underline hover:cursor-pointer">
                <Home />
                <p className="font-semibold text-lg">Dashboard</p>
              </div>
              <div className="flex gap-3 items-center text-white hover:underline hover:cursor-pointer">
                <User />
                <p className="font-semibold text-lg">Profile</p>
              </div>
              <div className="flex gap-3 items-center text-white hover:underline hover:cursor-pointer">
                <Settings />
                <p className="font-semibold text-lg">Settings</p>
              </div>
            </div>
          </div>
          <div
            className="w-full h-12 rounded-full bg-green-600 flex items-center justify-center hover:cursor-pointer hover:bg-green-700 transition duration-400"
            onClick={() => undefined}
          >
            <User
              className="text-white"
              strokeWidth={2}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="w-full">
      {/* <UserProvider> */}
      <NavBar />
      {/* </UserProvider> */}
    </div>
  );
}
