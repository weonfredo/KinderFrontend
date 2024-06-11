import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import FondoLogin from "../../components/FondoLogin";
import axios from "axios";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        // "kinder.app.informaticapp.com:3055/auth/login",
        "localhost/:8080/auth/login",
        {
          username: values.username,
          password: values.password,
        }
      );

      if (response.data.token) {
        // Guardar el token en localStorage
        localStorage.setItem("token", response.data.token);
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
            // style={{
            //   maxWidth: 600,
            // }}
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

            <Form.Item
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {/* <Checkbox>Remember me</Checkbox> */}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={!clientReady}>
                Iniciar Sesion
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
