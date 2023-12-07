import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SessionCheck from "./components/SessionCheck"; // Import the new component
import Layout from "./pages/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./dashboard";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import NotificationsPage from "./pages/notifications";
import SnackbarsContext from "./context/snackbars.context";

// ROUTER //

function ProtectedRoute(props: { children: any }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate("/login");
  }, [user, loading]);

  if (loading || !user) return <Fragment></Fragment>;
  return <Fragment>{props.children}</Fragment>;
}

//initialisation of the router, list of routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SnackbarsContext>
      <AuthProvider>
        <SessionCheck /> <RouterProvider router={router} />{" "}
      </AuthProvider>
    </SnackbarsContext>
  </React.StrictMode>
);
