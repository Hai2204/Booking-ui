import { Layout, Avatar, Dropdown } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "@/redux/slices/authSlice"
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react"
import { RootState } from "@/redux/store"

const { Header } = Layout;

const texts = [
  "Quản lý khách hàng",
  "Quản lý phòng",
  "Booking"
];

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);


  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const menuItems: any = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Hồ sơ cá nhân",
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
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div className={"logo"}>
        <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="auto-text"
              style={{ fontWeight: "bold" }}
            >
              {texts[index]}
            </motion.h1>
          </AnimatePresence>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "20px", fontWeight: "bold", color: "#1a472a" }}>
        <span>{user?.fullName}</span>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Avatar size="large" icon={<UserOutlined />} style={{ background: "#1890ff", cursor: "pointer" }} />
        </Dropdown>
      </div>
    </Header>
  )
}
