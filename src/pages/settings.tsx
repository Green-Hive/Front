import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiEdit2 } from "react-icons/fi"; // Import an edit icon from 'react-icons'
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import { useSnackbarsContext } from "../context/snackbars.context";

const SettingsPage = () => {
  const { user } = useAuth();
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const { pushSnackbar } = useSnackbarsContext();

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSaveEmail = async () => {
    if (user) {
      const data = await axios.patch(`${API_BASE_URL}/api/users/${user.id}`, {
        email: email,
      });
      if (data) {
        pushSnackbar({
          type: "success",
          message: "User email successfully changed !",
        });
      }
    }
    setIsEditingEmail(false);
    // Update email in backend
  };

  const handleSavePassword = () => {
    setIsEditingPassword(false);
    // Update password in backend
  };

  return (
    <div className="min-h-screen bg-main dark:bg-[#F5F5F5] flex flex-col px-4 sm:px-6 lg:px-8 py-12 container mx-auto">
      <p className="text-white text-3xl mb-8">{"Settings"}</p>
      <div className="w-full space-y-8">
        <div className=" bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-6">
          {/* Account Email Section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white dark:text-black mb-6">
              Account Settings
            </h2>
            <div className="flex items-center justify-between">
              {isEditingEmail ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  />
                  <button
                    onClick={handleSaveEmail}
                    className="ml-2 bg-greenOlive px-3 py-1 rounded-md text-white"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-base text-white dark:text-black">
                    <span className="font-semibold text-sm">Email: </span>
                    {email}
                  </p>
                  <FiEdit2
                    onClick={handleEditEmail}
                    className="ml-2 text-white cursor-pointer dark:text-black"
                  />
                </>
              )}
            </div>
          </div>

          {/* Account Password Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {isEditingPassword ? (
                <>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  />
                  <button
                    onClick={handleSavePassword}
                    className="ml-2 bg-greenOlive px-3 py-1 rounded-md text-white"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-base text-white dark:text-black">
                    <span className="font-semibold text-sm">Password: </span>
                    ********
                  </p>
                  <FiEdit2
                    onClick={handleEditPassword}
                    className="ml-2 text-white cursor-pointer dark:text-black"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
