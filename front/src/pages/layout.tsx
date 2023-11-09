import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User, Home, Settings, BellNotification } from "iconoir-react";
import Logo from "../assets/GreenHive.png";
import { AnimatePresence, motion } from "framer-motion";

function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("/");

  useEffect(() => {
    //get the current path
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex">
      <div className="w-16 h-screen bg-[#131315] drop-shadow-lg shadow-xl ">
        <div className="flex flex-col items-center justify-between h-full w-full">
          <div className="flex flex-col gap-16 w-full items-center justify-center">
            <div
              className="text-lg font-bold hover:cursor-pointer self-center mt-3"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Logo" className="w-10 h-10" />
            </div>
            <div className="w-full flex flex-col gap-5 justify-center items-center">
              <div
                style={{
                  backgroundColor: current === "/" ? "#3C4C10" : undefined,
                }}
                className="w-full flex gap-3 items-center justify-center text-white hover:cursor-pointer py-2"
                onClick={() => navigate("/")}
              >
                <Home />
              </div>
              <div
                style={{
                  backgroundColor:
                    current === "/profile" ? "#3C4C10" : undefined,
                }}
                className="flex gap-3 justify-center w-full items-center text-white hover:cursor-pointer py-2"
                onClick={() => navigate("/profile")}
              >
                <User />
              </div>
              <div
                style={{
                  backgroundColor:
                    current === "/notifications" ? "#3C4C10" : undefined,
                }}
                className="flex gap-3 justify-center w-full items-center text-white hover:cursor-pointer py-2"
                onClick={() => navigate("/notifications")}
              >
                <BellNotification width={22} height={22} />
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: current === "/settings" ? "#771FED" : undefined,
            }}
            className="flex items-center justify-center text-white hover:cursor-pointer w-full py-2 mb-5"
            onClick={() => navigate("/settings")}
          >
            <Settings />
          </div>
        </div>
      </div>
      <div className="h-fit min-h-screen w-full bg-[#2C2C2C]">
        <Outlet />
      </div>
    </div>
  );
}

//Layout applied to all routes, to get the navbar etc displayed
export default function Layout() {
  return (
    <div className="w-full">
      <NavBar />
    </div>
  );
}
