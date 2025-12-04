"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Provider } from "react-redux"
import { ConfigProvider } from "antd"
import viVN from "antd/locale/vi_VN"
import store from "../redux/store"
import { setUser } from "../redux/slices/authSlice"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

function LayoutContent({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    // Load user from localStorage on mount
    const userData = localStorage.getItem("user")
    const token = localStorage.getItem("auth_token")

    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch(setUser(user))
      } catch (e) {
        console.error("Failed to parse user:", e)
      }
    }
  }, [dispatch])

  return <>{children}</>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`}>
        <Provider store={store}>
          <ConfigProvider locale={viVN}>
            <LayoutContent>{children}</LayoutContent>
          </ConfigProvider>
        </Provider>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
