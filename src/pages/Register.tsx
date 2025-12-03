import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

export default function Register() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Navigate to="/login" replace />
}
