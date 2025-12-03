"use client"

import { Layout, Menu, Button, Avatar, Dropdown, message, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { logout } from "@/redux/slices/authSlice"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  DashboardOutlined,
  HomeOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons"
import { type ReactNode, useState } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"

const { Header, Sider, Content } = Layout

export default function AdminLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.auth)
  const [drawerVisible, setDrawerVisible] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    message.success("Đã đăng xuất!")
    router.push("/login")
  }

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link href="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/rooms",
      icon: <HomeOutlined />,
      label: <Link href="/admin/rooms">Quản lý Phòng</Link>,
    },
    {
      key: "/admin/bookings",
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/bookings">Quản lý Đặt phòng</Link>,
    },
    {
      key: "/admin/reports",
      icon: <FileTextOutlined />,
      label: <Link href="/admin/reports">Báo cáo</Link>,
    },
  ]

  const userMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ]

  return (
    <ProtectedRoute requiredRole="admin">
      <Layout className="h-screen">
        <Header className="flex items-center justify-between bg-blue-600 text-white shadow">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={<MenuOutlined className="text-white" />}
              onClick={() => setDrawerVisible(true)}
              className="md:hidden"
            />
            <div className="text-xl font-bold">BookingApp Admin</div>
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer bg-blue-700" />
          </Dropdown>
        </Header>

        <Layout>
          <Sider width={200} theme="light" className="border-r hidden md:block" collapsible collapsedWidth={0}>
            <Menu mode="inline" selectedKeys={[pathname]} items={menuItems} className="border-none" />
          </Sider>

          <Drawer title="Menu" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible}>
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              items={menuItems}
              className="border-none"
              onClick={() => setDrawerVisible(false)}
            />
          </Drawer>

          <Layout>
            <Content className="p-6 bg-gray-50 overflow-auto">{children}</Content>
          </Layout>
        </Layout>
      </Layout>
    </ProtectedRoute>
  )
}
