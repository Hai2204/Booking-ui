import Login from "@/pages/Login/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import HomePage from "./pages/HomePage/HomePage"
import BookingDetail from "./pages/BookingDetail"
import MyBookings from "./pages/MyBookings"
import Admin from "./pages/Admin"
import AdminRooms from "./pages/AdminRooms"
import AdminBookings from "./pages/AdminBookings"
import AdminReports from "./pages/AdminReports"
import NotFound from "./pages/NotFound"
import AccessDenied from "./pages/AccessDenied"

// route list used by App.jsx — keeps routing centralized and easier to maintain
const routes = [
    // public routes
    { path: "/login", component: Login, protected: false },
    { path: "/register", component: Register, protected: false },
    { path: "/forgot-password", component: ForgotPassword, protected: false },
    { path: "/reset-password/:token", component: ResetPassword, protected: false },

    // customer-protected routes
    { path: "/dashboard", component: HomePage, protected: false },
    { path: "/booking/:roomId", component: BookingDetail, protected: true, requiredRole: "customer" },
    { path: "/my-bookings", component: MyBookings, protected: true, requiredRole: "customer" },

    // admin-protected routes
    { path: "/admin", component: Admin, protected: false, },
    { path: "/admin/rooms", component: AdminRooms, protected: true, requiredRole: "admin" },
    { path: "/admin/bookings", component: AdminBookings, protected: true, requiredRole: "admin" },
    { path: "/admin/reports", component: AdminReports, protected: true, requiredRole: "admin" },

    { path: "/403", component: AccessDenied, protected: false },
    { path: "/*", component: NotFound, protected: false }
]

export default routes
