// import React, { useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Button, Layout, Menu, Switch } from "antd";

// const { Header, Sider, Content } = Layout;
// const PageLayout = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [theme, setTheme] = useState("light");

//   const changeTheme = (value) => {
//     setTheme(value ? "dark" : "light");
//   };

//   return (
//     <Layout
//       className={`menu-lateral ${
//         theme === "dark" ? "dark-theme" : "light-theme"
//       }`}
//       style={{
//         minHeight: "100vh",
//       }}
//     >
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         className={theme === "dark" ? "dark-sider" : "light-sider"}
//         style={{
//           background: theme === "dark" ? "#001529" : "#fff",
//         }}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme={theme}
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={[
//             {
//               key: "1",
//               icon: <UserOutlined />,
//               label: "nav 1",
//             },
//             {
//               key: "2",
//               icon: <VideoCameraOutlined />,
//               label: "nav 2",
//             },
//             {
//               key: "3",
//               icon: <UploadOutlined />,
//               label: "nav 3",
//             },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: theme === "dark" ? "#001529" : "#fff",
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//               background: theme === "dark" ? "#001529" : "#fff",
//             }}
//           />
//           <Switch
//             checked={theme === "dark"}
//             onChange={changeTheme}
//             checkedChildren="Dark"
//             unCheckedChildren="Light"
//           />
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             background: theme === "dark" ? "#001529" : "#fff",
//             color: theme === "dark" ? "#fff" : "#000",
//           }}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default PageLayout;

import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import sidebarItems from "./data"; // Importa la data de items de tu data.js
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Función para alternar entre colapsar y expandir el menú
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
          items={sidebarItems} // Usar los items del menú importados
        >
          {sidebarItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.to ? (
                <Link to={item.to}>{item.label}</Link> // Utiliza Link para crear el enlace
              ) : (
                item.label
              )}
            </Menu.Item>
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
