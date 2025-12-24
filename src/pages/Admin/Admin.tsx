import Navbar from '@/components/Navbar.tsx';
import { getPermissions } from '@/redux/slices/authSlice';
import * as Icons from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Content, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const adminMenus = useSelector(getPermissions);

  const MenuIcon = ({ icon }: { icon?: string }) => {
    if (!icon) return null;

    const AntdIcon = (Icons as any)[icon];
    return AntdIcon ? <AntdIcon /> : null;
  };
  /** TẠO MENU ITEMS */
  const menuItems: MenuProps['items'] = adminMenus.map((m, i) => {
    return {
      key: i.toString(),
      // Ensure the icon className is a string and uses proper FontAwesome syntax
      icon: <MenuIcon icon={m.icon} />,
      label: <Link to={m.url}>{m.name}</Link>,
    }
  });
  /** MAP PATH → KEY */
  const pathToKey = Object.fromEntries(adminMenus.map((m, i) => [m.url, i.toString()]));

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
