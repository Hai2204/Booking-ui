import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import React from "react"
import type { RootState } from "../redux/store"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
  isProtected?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  isProtected
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated && !!isProtected) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.roleName !== requiredRole) {//403
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
