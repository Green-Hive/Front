import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "iconoir-react";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import { useSnackbarsContext } from "../context/snackbars.context";

const ProfilePage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { user } = useAuth();
  const { pushSnackbar } = useSnackbarsContext();
  const [theme, setTheme] = useState(() => {
    // Check for the theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleNotifications = async () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (user) {
      const data = await axios.patch(`${API_BASE_URL}/api/users/${user.id}`, {
        notified: !notificationsEnabled,
      });
      if (data) {
        pushSnackbar({
          type: "success",
          message: "Notifications settings successfully changed !",
        });
      }
    }
  };

  useEffect(() => {
    if (user) setNotificationsEnabled(user.notified);
  }, [user]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-main dark:bg-[#F5F5F5] flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-[70%] space-y-8 ">
        <div className=" bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center">
            <div className="bg-greenOlive w-24 h-24 rounded-full mb-4 flex items-center justify-center">
              <User width={40} height={40} className="text-gray-300" />
            </div>
            <h1 className="text-2xl font-semibold text-white dark:text-black">
              {user.name}
            </h1>
            <p className="text-sm text-white dark:text-black mt-2">
              {user.email}
            </p>
          </div>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-500 pt-4">
            <h2 className="text-lg font-semibold text-white dark:text-black">
              {" "}
              Notifications settings
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-white dark:text-black">
                Enable Notifications
              </span>
              <button
                aria-pressed="false"
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  notificationsEnabled ? "bg-greenOlive" : "bg-gray-200"
                }`}
                onClick={toggleNotifications}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    notificationsEnabled ? "translate-x-5" : "translate-x-0"
                  } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-300 pt-4">
            <h2 className="text-lg font-semibold text-white dark:text-black">
              {" "}
              Color Theme
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-white dark:text-black">
                Enable Dark theme
              </span>
              <button
                aria-pressed="false"
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  theme === "light" ? "bg-greenOlive" : "bg-gray-200"
                }`}
                onClick={() => handleThemeSwitch()}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    theme === "light" ? "translate-x-5" : "translate-x-0"
                  } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
