import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import sidebarItems from "./data";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

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
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
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
