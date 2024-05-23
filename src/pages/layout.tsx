import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Home,
  Settings,
  BellNotification,
  LogOut,
  UserStar,
  OpenSelectHandGesture,
} from "iconoir-react";
import Logo from "../assets/GreenHive.png";

function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("/");
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to the login page after logging out
  };

  useEffect(() => {
    //get the current path
    setCurrent(location.pathname);
  }, [location.pathname]);

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
            <div className="w-full flex flex-col gap-5 justify-center items-center px-1">
            {user.role !== "ADMIN" && <div
                style={{
                  backgroundColor: current === "/" ? "#3C4C10" : undefined,
                  color: current === "/" ? "#FFFFFF" : undefined,
                }}
                className="w-full flex gap-3 items-center justify-center text-white dark:text-black  hover:cursor-pointer py-2 rounded-lg"
                onClick={() => navigate("/")}
              >
                <Home />
              </div>  }
              {user.role !== "ADMIN" && <div
                style={{
                  backgroundColor:
                    current === "/notifications" ? "#3C4C10" : undefined,
                  color: current === "/notifications" ? "#FFFFFF" : undefined,
                }}
                className="flex gap-3 justify-center w-full items-center text-white dark:text-black  hover:cursor-pointer py-2 rounded-lg"
                onClick={() => navigate("/notifications")}
              >
                <BellNotification width={22} height={22} />
              </div> }
              <div
                style={{
                  backgroundColor:
                    current === "/profile" ? "#3C4C10" : undefined,
                  color: current === "/profile" ? "#FFFFFF" : undefined,
                }}
                className="flex gap-3 justify-center w-full items-center text-white  dark:text-black hover:cursor-pointer py-2 rounded-lg"
                onClick={() => navigate("/profile")}
              >
                <User />
              </div>
             
              <div
                style={{
                  backgroundColor:
                    current === "/settings" ? "#3C4C10" : undefined,
                  color: current === "/settings" ? "#FFFFFF" : undefined,
                }}
                className="flex items-center justify-center text-white dark:text-black  hover:cursor-pointer w-full py-2 rounded-lg"
                onClick={() => navigate("/settings")}
              >
                <Settings />
              </div>
              {user.role === "ADMIN" && <div
                style={{
                  backgroundColor:
                    current === "/admin" ? "#3C4C10" : undefined,
                  color: current === "/admin" ? "#FFFFFF" : undefined,
                }}
                className={`flex items-center justify-center text-white dark:text-black  hover:cursor-pointer w-full py-2 ${user.role !== "ADMIN" && "mt-5"} rounded-lg`}
                onClick={() => navigate("/admin")}
              >
                <OpenSelectHandGesture />
              </div> }
            </div>
          </div>
          <div className="flex-col ">
            {user && (
              <div
                className="flex items-center justify-center text-white dark:text-black  hover:cursor-pointer w-full py-2 mb-5"
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
