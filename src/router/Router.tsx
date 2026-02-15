import DashboardHome from "@/components/DashboardHome";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import CreateUser from "@/pages/Dashboard/Admin/CreateUser";
import JobListing from "@/pages/Dashboard/Admin/JobListing";
import ManageUser from "@/pages/Dashboard/Admin/ManageUser";
import JobPost from "@/pages/Dashboard/Employer/JobPost";
import Profile from "@/pages/Dashboard/Employer/Profile";

import { createBrowserRouter } from "react-router";

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
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      {
        path: "jobpost",
        Component: JobPost,
      },
      {
        path: "joblisting",
        Component: JobListing,
      },
      {
        path: "manageuser",
        Component: ManageUser,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "createuser",
        Component: CreateUser,
      },
    ],
  },
]);

export default Router;
