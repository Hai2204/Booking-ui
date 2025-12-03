"use client"

import { Layout, Menu, Button, Space, Drawer, Badge } from "antd"
import { MenuIcon, ShoppingCart, Bell } from "lucide-react"
import { useState } from "react"

const { Header } = Layout

export default function HotelHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { key: "home", label: "Trang chủ" },
    { key: "rooms", label: "Phòng" },
    { key: "services", label: "Dịch vụ" },
    { key: "dining", label: "Nhà hàng" },
    { key: "events", label: "Sự kiện" },
    { key: "blog", label: "Blog" },
  ]

  return (
    <Header className="sticky top-0 z-50 bg-white shadow-md px-4 md:px-8 lg:px-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <span className="font-bold text-xl hidden sm:inline">Luxury Hotel</span>
      </div>

      {/* Desktop Menu */}
      <Menu
        mode="horizontal"
        items={menuItems}
        className="hidden md:flex border-0 bg-transparent flex-1 justify-center"
      />

      {/* Desktop Actions */}
      <Space className="hidden md:flex">
        <Badge count={3}>
          <Button type="text" size="large" icon={<Bell size={20} />} />
        </Badge>
        <Button type="text" size="large" icon={<ShoppingCart size={20} />} />
        <Button type="primary">Đặt phòng</Button>
      </Space>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-2">
        <Badge count={3}>
          <Button type="text" size="large" icon={<Bell size={20} />} />
        </Badge>
        <Button type="text" size="large" icon={<MenuIcon size={20} />} onClick={() => setMobileMenuOpen(true)} />
      </div>

      <Drawer title="Menu" onClose={() => setMobileMenuOpen(false)} open={mobileMenuOpen} placement="right">
        <Menu items={menuItems} mode="vertical" onClick={() => setMobileMenuOpen(false)} />
        <Button type="primary" block className="mt-4">
          Đặt phòng
        </Button>
      </Drawer>
    </Header>
  )
}
