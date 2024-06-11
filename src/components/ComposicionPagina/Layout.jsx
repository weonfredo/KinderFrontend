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
          inlineCollapsed={collapsed} // Utiliza inlineCollapsed para controlar el colapso del menú
        >
          {sidebarItems.map((item) => (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((subItem) => (
                <Menu.Item key={subItem.key}>
                  <Link to={subItem.to}>{subItem.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu>
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
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            color: "#000",
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Team programming ©{new Date().getFullYear()} Created by The
          chamaquitos EIRL
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
