import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { FiEdit2 } from 'react-icons/fi'; // Import an edit icon from 'react-icons'

const SettingsPage = () => {
  const { user } = useAuth();
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

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

  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    // Update email in backend
  };

  const handleSavePassword = () => {
    setIsEditingPassword(false);
    // Update password in backend
  };

  return (
    <div className="min-h-screen bg-main dark:bg-[#F5F5F5] flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[900px] space-y-8">
        <div className="bg-light-gray dark:bg-white rounded-lg shadow-lg p-6">
          {/* Account Email Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white dark:text-black mb-4">Account Settings</h2>
            <div className="flex items-center justify-between">
              {isEditingEmail ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  />
                  <button onClick={handleSaveEmail} className="ml-2 bg-greenOlive px-3 py-1 rounded-md text-white">Save</button>
                </>
              ) : (
                <>
                  <p className="text-sm text-white dark:text-black">{email}</p>
                  <FiEdit2 onClick={handleEditEmail} className="ml-2 text-white cursor-pointer dark:text-black" />
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
                  <button onClick={handleSavePassword} className="ml-2 bg-greenOlive px-3 py-1 rounded-md text-white">Save</button>
                </>
              ) : (
                <>
                  <p className="text-sm text-white dark:text-black">********</p>
                  <FiEdit2 onClick={handleEditPassword} className="ml-2 text-white cursor-pointer dark:text-black" />
                </>
              )}
            </div>
          </div>

          {/* Additional Settings Suggestions */}
          {/* You could add settings like notification preferences, account deletion, 
               language selection, etc. depending on the functionality of your app. */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
