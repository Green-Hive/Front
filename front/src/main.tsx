import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
// import EnergyInput from "./pages/energy.page";
// import Layout from "./pages/layout";
// import HomePage from "./pages/properties.page";
// import DwellingCertifsPage from "./pages/dwellingCertifs.page";
// import AccesPage from "./pages/access.page";
// import ConstructionPage from "./pages/construction.page";
// import AssurancePage from "./pages/assurance.page";
// import SuccessPage from "./pages/success.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
  </React.StrictMode>
);
