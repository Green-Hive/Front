// src/components/SessionCheck.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SessionCheck: React.FC = () => {
  const { getLoginStatus } = useAuth();

  useEffect(() => {
    console.log('Checking session status...');
    getLoginStatus()
      .then(() => {
        console.log('Session checked successfully');
      })
      .catch((error) => {
        console.error('Error checking session status:', error);
      });

    // This empty dependency array ensures this effect runs only once after the component mounts.
  }, [getLoginStatus]);

  return null;
};

export default SessionCheck;