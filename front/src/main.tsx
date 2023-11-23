import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import SessionCheck from './components/SessionCheck'; // Import the new component
import Layout from "./pages/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./dashboard";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import NotificationsPage from "./pages/notifications";


// ROUTER //



//initialisation of the router, list of routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        index: true,
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        index: true,
        path: "/notifications",
        element: <NotificationsPage />,
      },
      {
        index: true,
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
]
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <SessionCheck />{" "}
      <RouterProvider router={router} />{" "}
    </AuthProvider>
  </React.StrictMode>
);
