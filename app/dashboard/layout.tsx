"use client"

import { Layout, Menu, Avatar, Dropdown, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { logout } from "@/redux/slices/authSlice"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import type { ReactNode } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"

const { Header, Sider, Content } = Layout

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    message.success("Đã đăng xuất!")
    router.push("/login")
  }

  const menuItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: <Link href="/dashboard">Trang chủ</Link>,
    },
    {
      key: "/dashboard/my-bookings",
      icon: <ShoppingCartOutlined />,
      label: <Link href="/dashboard/my-bookings">Đặt phòng của tôi</Link>,
    },
  ]

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Hồ sơ cá nhân",
      onClick: () => router.push("/dashboard/profile"),
    },
    {
      key: "change-password",
      label: "Đổi mật khẩu",
      onClick: () => router.push("/dashboard/change-password"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ]

  return (
    <ProtectedRoute>
      <Layout className="h-screen">
        <Header className="flex items-center justify-between bg-white shadow">
          <div className="text-xl font-bold text-blue-600">BookingApp</div>
          <div>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
            </Dropdown>
          </div>
        </Header>

        <Layout>
          <Sider width={200} theme="light" className="border-r">
            <Menu mode="inline" selectedKeys={[pathname]} items={menuItems} className="border-none" />
          </Sider>

          <Layout>
            <Content className="p-6 bg-gray-50">{children}</Content>
          </Layout>
        </Layout>
      </Layout>
    </ProtectedRoute>
  )
}
