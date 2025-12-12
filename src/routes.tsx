import AccessDenied from "@/pages/AccessDenied";
import Admin from "@/pages/Admin";
import AdminBookings from "@/pages/AdminBookings";
import AdminReports from "@/pages/AdminReports";
import AdminRooms from "@/pages/AdminRooms";
import Blogs from "@/pages/Blog";
import BlogItem from "@/pages/Blog/BlogId";
import MyBookings from "@/pages/Bookings/Bookings";
import ForgotPassword from "@/pages/ForgotPassword";
import HomePage from "@/pages/HomePage/HomePage";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import BookingDetail from "@/pages/RoomDetail";
import AdminUsers from "@/pages/UserManagement";

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export interface RouteItem {
  path?: string;
  element?: ReactNode;
  protected?: boolean;
  requiredRole?: string;
  children?: RouteItem[];
}

const routes: RouteItem[] = [
  // public
  { path: "/login", element: <Login />, protected: false },
  { path: "/register", element: <Register />, protected: false },
  { path: "/forgot-password", element: <ForgotPassword />, protected: false },
  { path: "/reset-password/:token", element: <ResetPassword />, protected: false },

  // customer routes
  { path: "/dashboard", element: <HomePage />, protected: false },
  { path: "/booking/:roomId", element: <BookingDetail />, protected: false },
  { path: "/bookings", element: <MyBookings />, protected: false },
  {
    path: "/my-bookings",
    element: <MyBookings />,
    protected: true,
    requiredRole: "ROLE_USER",
  },

  // blog
  { path: "/blogs", element: <Blogs />, protected: false },
  { path: "/blog/:blogId", element: <BlogItem />, protected: false },

  // ADMIN — NESTED ROUTE
  {
    path: "/admin",
    element: <Admin />, // layout bao ngoài
    protected: true,
    requiredRole: "ROLE_ADMIN",
    children: [
      { path: "", element: <Navigate to="/admin/users-management.html" replace /> },           // /admin
      { path: "users-management.html", element: <AdminUsers /> },           // /admin
      { path: "rooms.html", element: <AdminRooms /> },      // /admin/rooms
      { path: "bookings.html", element: <AdminBookings /> },// /admin/bookings
      { path: "reports.html", element: <AdminReports /> },  // /admin/reports
    ],
  },

  // error
  { path: "/403", element: <AccessDenied />, protected: false },
  { path: "*", element: <NotFound />, protected: false },
];

export default routes;
