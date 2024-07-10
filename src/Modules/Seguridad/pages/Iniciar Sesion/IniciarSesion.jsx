import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import FondoLogin from "../../components/FondoLogin";

import tokenItem from "../../../../utils/TokenItem";

const IniciarSesion = () => {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await tokenItem.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data.token) {
        // Guardar el token y el nombre de usuario en localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", values.username);

        // Redireccionar al usuario a la página de inicio
        window.location.href = "/home";

        // Mensaje de éxito
        message.success("Inicio de sesión exitoso");
      } else {
        // Autenticación fallida, mostrar mensaje de error
        console.error("Credenciales incorrectas");
        message.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      message.error("Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    // Limpiar el token y cualquier otro dato del usuario en localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = "/login";
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="fondo px-80">
      <div className="contenido gap-9 ">
        <div className="grid items-center">
          <FondoLogin />
        </div>
        <div className=" grid items-center w-full">
          <h1 className="text-white text-3xl pb-4">SIGN IN</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h2 className="text-white">Username</h2>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <h2 className="text-white">Password</h2>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Link to="/register">
              <p className="text-white inline-block relative hover:text-blue-300 py-3 ">
                Registrarse
              </p>
            </Link>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={!clientReady}>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
