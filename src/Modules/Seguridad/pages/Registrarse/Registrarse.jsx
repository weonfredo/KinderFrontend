import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd"; // Removed unused Checkbox
import "../Iniciar Sesion/IniciarSesion.css";
import { Link } from "react-router-dom";
import tokenItem from "../../../../utils/TokenItem";

const Register = () => {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    try {
      // Sending registration data to the server
      const response = await tokenItem.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        // Storing token in localStorage and redirecting to home page
        localStorage.setItem("token", response.data.token);
        window.location.href = "/home";
        message.success("Inicio de sesión exitoso");
      } else {
        // Handling incorrect credentials
        console.error("Credenciales incorrectas");
        message.error("Credenciales incorrectas");
      }
    } catch (error) {
      // Handling errors during login
      console.error("Error al iniciar sesión:", error);
      message.error("Error al iniciar sesión");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="fondo px-80">
      <div className="contenido gap-9 p-5">
        <div>
          <div className="bg-white m-10 h-80 p-4 bg-opacity-75">
            <h2 className="text-2xl text-center">TOKEN DE AUTENTIFICACION:</h2>
          </div>
        </div>
        {/* <div className="p-10">token : {token}</div> */}
        <div className="grid items-center w-full p-4">
          <h1 className="text-white text-3xl pb-4">Register</h1>
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
            <h2 className="text-white">Email</h2>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email!",
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

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={!clientReady}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
