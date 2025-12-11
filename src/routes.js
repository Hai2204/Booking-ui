import Login from "@/pages/Login/Login"
import AccessDenied from "@/pages/AccessDenied"
import Admin from "@/pages/Admin"
import AdminBookings from "@/pages/AdminBookings"
import AdminReports from "@/pages/AdminReports"
import AdminRooms from "@/pages/AdminRooms"
import BookingDetail from "@/pages/RoomDetail"
import ForgotPassword from "@/pages/ForgotPassword"
import HomePage from "@/pages/HomePage/HomePage"
import MyBookings from "@/pages/Bookings/Bookings"
import NotFound from "@/pages/NotFound"
import Register from "@/pages/Register"
import ResetPassword from "@/pages/ResetPassword"
import Blogs from "@/pages/Blog"
import BlogItem from "@/pages/Blog/BlogId"

// route list used by App.jsx — keeps routing centralized and easier to maintain
const routes = [
    // public routes
    { path: "/login", component: Login, protected: false },
    { path: "/register", component: Register, protected: false },
    { path: "/forgot-password", component: ForgotPassword, protected: false },
    { path: "/reset-password/:token", component: ResetPassword, protected: false },

    // customer-protected routes
    { path: "/dashboard", component: HomePage, protected: false },
    { path: "/booking/:roomId", component: BookingDetail, protected: false },
    { path: "/bookings", component: MyBookings, protected: false },
    { path: "/my-bookings", component: MyBookings, protected: true, requiredRole: "ROLE_USER" },

    // customer-protected routes
    { path: "/blogs", component: Blogs, protected: false },
    { path: "/blog/:blogId", component: BlogItem, protected: false },
    // admin-protected routes
    { path: "/admin", component: Admin, protected: true, requiredRole: "ROLE_ADMIN" },
    { path: "/admin/rooms", component: AdminRooms, protected: true, requiredRole: "ROLE_ADMIN" },
    { path: "/admin/bookings", component: AdminBookings, protected: true, requiredRole: "ROLE_ADMIN" },
    { path: "/admin/reports", component: AdminReports, protected: true, requiredRole: "ROLE_ADMIN" },

    { path: "/403", component: AccessDenied, protected: false },
    { path: "/*", component: NotFound, protected: false }
]

export default routes
