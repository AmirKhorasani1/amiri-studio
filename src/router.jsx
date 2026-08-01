import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./components/Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "tools",
        element: <ToolsPage />,
      },
    ],
  },
  {
    path: "/dashboard/login",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);