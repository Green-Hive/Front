// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { apiClient } from "../services/api";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getLoginStatus: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>; // Add the register method
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    const response = await apiClient.login(email, password);
    setUser(response.data);
    setLoading(false);
  };

  const logout = async () => {
    await apiClient.logout();
    setUser(null);
    setLoading(true);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await apiClient.register(email, password, name);
    setUser(response.data.user);
    setLoading(true);
  };

  const getLoginStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getLoginStatus();
      if (response.data && response.data.userInfo) {
        setLoading(false);
        setUser(response.data.userInfo); // Set the user state with the userInfo data
      } else {
        setLoading(false);
        console.error("User data is undefined", response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching login status:", error);
    }
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, getLoginStatus, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
