import React, { useState } from "react";
import { Button, Layout, Menu, Avatar, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import sidebarItems from "./data";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "Guest",
    avatar:
      "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
  });

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const transformMenuItems = (items) =>
    items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.to ? <Link to={item.to}>{item.label}</Link> : item.label,
      children: item.children ? transformMenuItems(item.children) : null,
    }));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        {user.name}
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#fff" }}
        width={200}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          defaultSelectedKeys={[""]}
          defaultOpenKeys={[""]}
          style={{ height: "100%" }}
          items={transformMenuItems(sidebarItems)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Avatar src={user.avatar} />
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4 p-4 bg-white ">{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Team programming ©{new Date().getFullYear()} Created by The
          chamaquitos EIRL
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
