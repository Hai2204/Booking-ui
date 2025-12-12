import Navbar from '@/components/Navbar.tsx';
import { AccountBookOutlined, HomeOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Content, Sider } = Layout;

/** CẤU HÌNH MENU DUY NHẤT */
const adminMenus = [
  {
    key: "1",
    path: "/admin/users-management.html",
    label: "User Management",
    icon: <UserOutlined />
  },
  {
    key: "2",
    path: "/admin/rooms.html",
    label: "Room Management",
    icon: <HomeOutlined />
  },
  {
    key: "3",
    path: "/admin/bookings.html",
    label: "Booking Management",
    icon: <AccountBookOutlined />
  },
  {
    key: "4",
    path: "/admin/reports.html",
    label: "Blog Management",
    icon: <ScheduleOutlined />
  }
];

/** TẠO MENU ITEMS */
const menuItems: MenuProps['items'] = adminMenus.map(m => ({
  key: m.key,
  icon: m.icon,
  label: <Link to={m.path}>{m.label}</Link>
}));

/** MAP PATH → KEY */
const pathToKey = Object.fromEntries(adminMenus.map(m => [m.path, m.key]));


const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const activeKey = pathToKey[location.pathname] || "1";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Navbar />
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>

        {/* SIDEBAR */}
        <Sider
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Menu
            style={{ padding: 10 }}
            theme="dark"
            mode="inline"
            selectedKeys={[activeKey]}
            items={menuItems}
          />
        </Sider>

        {/* CONTENT */}
        <Layout style={{ padding: '0 20px 24px' }}>
          <Breadcrumb
            items={[]}
            style={{ margin: '16px 0', color: "#b89968", fontWeight: "bold" }}
          />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
