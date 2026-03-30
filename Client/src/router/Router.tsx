import DashboardHome from "@/pages/Dashboard/Admin/Dashboard/DashboardHome";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Auth/Login";
import LogOut from "@/pages/Auth/LogOut";
import Register from "@/pages/Auth/Register";

// import JobDetails from "@/pages/Dashboard/Admin/JobDetails";
import JobListing from "@/pages/Dashboard/Admin/JobListing";
import ManageUser from "@/pages/Dashboard/Admin/ManageUser";
import JobPost from "@/pages/Dashboard/Employer/JobPost";
import Profile from "@/pages/Dashboard/Employer/Profile";

import { createBrowserRouter } from "react-router";
import JobEditPage from "@/pages/Dashboard/Admin/JobEditPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorPage from "@/components/ErrorPage";
import { Component } from "lucide-react";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,

        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    // Component: DashboardLayout,
    children: [
      { index: true, element: <DashboardHome /> },
      {
        path: "jobpost",
        element: <JobPost />,
      },
      {
        path: "jobEditPage/:id",
        element: <JobEditPage />,
      },

      {
        path: "joblisting",
        element: <JobListing />,
      },

      // {
      //   path: "job/:id",
      //   Component: JobDetails,
      // },
      {
        path: "manageuser",
        // Component: ManageUser,
        element: (
          <ProtectedRoute role="Admin">
            <ManageUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Router;
