import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Home,
  Settings,
  BellNotification,
  HalfMoon,
  SunLight,
  LogOut,
} from "iconoir-react";
import Logo from "../assets/GreenHive.png";
import { AnimatePresence, motion } from "framer-motion";
import { set } from "react-hook-form";

function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("/");
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(() => {
    // Check for the theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to the login page after logging out
  };

  useEffect(() => {
    //get the current path
    setCurrent(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex">
      <div className="w-16 h-screen bg-navbar dark:bg-[#F5F5F5] drop-shadow-lg shadow-xl fixed">
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
                className="w-full flex gap-3 items-center justify-center text-white dark:text-black hover:cursor-pointer py-2"
                onClick={() => navigate("/")}
              >
                <Home />
              </div>
              <div
                style={{
                  backgroundColor:
                    current === "/profile" ? "#3C4C10" : undefined,
                }}
                className="flex gap-3 justify-center w-full items-center text-white dark:text-black hover:cursor-pointer py-2"
                onClick={() => navigate("/profile")}
              >
                <User />
              </div>
              <div
                style={{
                  backgroundColor:
                    current === "/notifications" ? "#3C4C10" : undefined,
                }}
                className="flex gap-3 justify-center w-full items-center text-white dark:text-black hover:cursor-pointer py-2"
                onClick={() => navigate("/notifications")}
              >
                <BellNotification width={22} height={22} />
              </div>
            </div>
          </div>
          <div className="flex-col ">
            <div
              className="flex items-center justify-center text-white dark:text-black hover:cursor-pointer w-full py-2 mb-5"
              onClick={() => handleThemeSwitch()}
            >
              {theme === "dark" ? <HalfMoon /> : <SunLight />}
            </div>
            <div
              style={{
                backgroundColor:
                  current === "/settings" ? "#771FED" : undefined,
              }}
              className="flex items-center justify-center text-white dark:text-black hover:cursor-pointer w-full py-2 mb-5"
              onClick={() => navigate("/settings")}
            >
              <Settings />
            </div>
            {user && (
              <div
                className="flex items-center justify-center text-white dark:text-black hover:cursor-pointer w-full py-2 mb-5"
                onClick={handleLogout}
              >
                <LogOut />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-fit min-h-screen w-full bg-main dark:bg-[#F0F0F0] font-custom ml-16">
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
