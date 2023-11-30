import React, { useState } from 'react';
import { AuthProvider, useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { user } = useAuth();

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);

  };

  return (
    <div className="min-h-screen bg-main dark:bg-[#F5F5F5] flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-[70%] space-y-8 ">
        <div className="bg-light-gray dark:bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center">
            {/* Placeholder for avatar, replace with your image */}
            <div className="bg-greenOlive w-24 h-24 rounded-full mb-4"></div>
            <h1 className="text-2xl font-semibold text-white dark:text-black">{user.name}</h1>
            <p className="text-sm text-white dark:text-black mt-2">{user.email}</p>
          </div>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-300 pt-4">
            <h2 className="text-lg font-semibold text-white dark:text-black"> Notifcation settings</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-white dark:text-black">Enable Notifications</span>
              <button
                aria-pressed="false"
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  notificationsEnabled ? 'bg-greenOlive' : 'bg-gray-200'
                }`}
                onClick={toggleNotifications}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
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
