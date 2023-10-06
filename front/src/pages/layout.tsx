import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User, Home, Settings } from "iconoir-react";
import Logo from "../assets/GreenHive.png";
import { AnimatePresence, motion } from "framer-motion";

function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("/");

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-52 h-screen bg-[#3C4C10] drop-shadow-lg shadow-xl "
      >
        <div className="flex flex-col items-start justify-between h-full w-full">
          <div className="flex flex-col gap-10 w-full">
            <div
              className="text-lg font-bold w-40 hover:cursor-pointer flex items-center gap-2 self-center mt-3"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Logo" className="w-40 h-12" />

              <p className="text-white text-xl">Greenhive</p>
            </div>
            <div className="w-full flex flex-col justify-center">
              <div
                style={{
                  backgroundColor: current === "/" ? "#438A12" : undefined,
                }}
                className="flex gap-3 items-center text-white pl-5 hover:cursor-pointer py-2"
                onClick={() => navigate("/")}
              >
                <Home />
                <p className="font-semibold text-lg">Dashboard</p>
              </div>
              <div
                style={{
                  backgroundColor:
                    current === "/profile" ? "#438A12" : undefined,
                }}
                className="flex gap-3 items-center text-white hover:cursor-pointer pl-5 py-2"
                onClick={() => navigate("/profile")}
              >
                <User />
                <p className="font-semibold text-lg">Profile</p>
              </div>
              <div
                style={{
                  backgroundColor:
                    current === "/settings" ? "#438A12" : undefined,
                }}
                className="flex gap-3 items-center text-white hover:cursor-pointer pl-5 py-2"
                onClick={() => navigate("/settings")}
              >
                <Settings />
                <p className="font-semibold text-lg">Settings</p>
              </div>
            </div>
          </div>
          <div
            className="w-[80%] self-center h-12 rounded-full bg-green-600 my-5 flex items-center justify-center hover:cursor-pointer hover:bg-green-700 transition duration-400"
            onClick={() => navigate("/login")}
          >
            <User
              className="text-white"
              strokeWidth={2}
              width={24}
              height={24}
            />
          </div>
        </div>
      </motion.div>
      <div className="h-full">
        <Outlet />
      </div>
    </AnimatePresence>
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
