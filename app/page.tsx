"use client"

import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/redux/store"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div>Đang chuyển hướng...</div>
    </div>
  )
}
