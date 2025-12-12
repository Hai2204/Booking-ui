import { Layout, Avatar, Dropdown } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "@/redux/slices/authSlice"
import type { RootState } from "@/redux/store"

const { Header } = Layout

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state :RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const menuItems : any = [
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

      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1a472a" }}>Booking Hainv</div>
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
