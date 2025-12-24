import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import React from "react"
import type { RootState } from "../redux/store"
import { getAuthToken } from "@/services/tokenService"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
  isProtected?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, permissions } = useSelector((state: RootState) => state.auth);

  const token = getAuthToken();
  const location = useLocation();

  if (!token || !isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }
  const allowed = permissions?.some(p =>
    location.pathname.startsWith(p.url)
  );

  if (!allowed) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>
}

export default ProtectedRoute
