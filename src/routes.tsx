import AccessDenied from "@/pages/AccessDenied";
import Admin from "@/pages/Admin/Admin";
import AdminBookings from "@/pages/Admin/BookingManagement";
import AdminReports from "@/pages/AdminReports";
import AdminRooms from "@/pages/Admin/RoomManagement";
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
import AdminUsers from "@/pages/Admin/UserManagement";
import Partner from "@/pages/Admin/Partner";

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
  { path: "/login", element: <Login />,  },
  { path: "/register", element: <Register />,  },
  { path: "/forgot-password", element: <ForgotPassword />,  },
  { path: "/reset-password/:token", element: <ResetPassword />,  },

  // customer routes
  { path: "/dashboard", element: <HomePage />,  },
  { path: "/booking/:roomId", element: <BookingDetail />,  },
  { path: "/bookings", element: <MyBookings />,  },
  {
    path: "/my-bookings",
    element: <MyBookings />,
    protected: true,
  },

  // blog
  { path: "/blogs", element: <Blogs />, protected: true, },
  { path: "/blog/:blogId", element: <BlogItem />,  protected: true,},

  // ADMIN — NESTED ROUTE
  {
    path: "/admin",
    element: <Admin />, // layout bao ngoài
    protected: true,
    children: [
      { path: "", element: <Navigate to="/admin/users-management.html" replace /> },        
      { path: "users-management.html", element: <AdminUsers /> },        
      { path: "rooms.html", element: <AdminRooms /> },   
      { path: "partners.html", element: <Partner /> },   
      { path: "bookings.html", element: <AdminBookings /> },
      { path: "reports.html", element: <AdminReports /> }, 
      { path: "blogs.html", element: <AdminReports /> },  
    ],
  },

  // error
  { path: "/403", element: <AccessDenied />,  },
  { path: "*", element: <NotFound />,  },
];

export default routes;
