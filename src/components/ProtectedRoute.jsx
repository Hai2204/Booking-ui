import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ProtectedRoute({ children, requiredRole, isProtected }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  if (!isAuthenticated && !!isProtected) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {//403
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
