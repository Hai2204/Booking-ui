"use client"

import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/redux/store"
import { Spin } from "antd"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: "admin" | "customer"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (requiredRole && user?.role !== requiredRole) {
      router.push("/login")
    } else {
      setIsChecking(false)
    }
  }, [isAuthenticated, user, requiredRole, router])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return <>{children}</>
}
