// import React, { useEffect, useState } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input, message } from "antd";
// import FondoLogin from "../../components/FondoLogin";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./IniciarSesion.css";

// const IniciarSesion = () => {
//   const [form] = Form.useForm();
//   const [clientReady, setClientReady] = useState(false);

//   useEffect(() => {
//     setClientReady(true);
//   }, []);

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8080/auth/login", {
//         username: values.username,
//         password: values.password,
//       });

//       if (response.data.token) {
//         // Guardar el token en localStorage
//         localStorage.setItem("token", response.data.token);

//         // Redireccionar al usuario a la página de inicio
//         window.location.href = "/home";
//       } else {
//         // Autenticación fallida, mostrar mensaje de error
//         message.error("Credenciales incorrectas");
//       }
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//       message.error("Error al iniciar sesión");
//     }
//   };

//   return (
//     <div className="fondo px-40 ">
//       <div className="flex">
//         <div>
//           <FondoLogin />
//         </div>
//         <div>
//           <div className="px-40 py-48">
//             <h1>Kinder Garden</h1>
//             <Form
//               form={form}
//               name="horizontal_login"
//               layout="inline"
//               onFinish={onFinish}
//               className="grid gap-y-4"
//             >
//               <Form.Item
//                 name="username"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your username!",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined className="site-form-item-icon" />}
//                   placeholder="Username"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your password!",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<LockOutlined className="site-form-item-icon" />}
//                   type="password"
//                   placeholder="Password"
//                 />
//               </Form.Item>
//               <Form.Item shouldUpdate>
//                 {() => (
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     disabled={
//                       !clientReady ||
//                       !form.isFieldsTouched(true) ||
//                       !!form
//                         .getFieldsError()
//                         .filter(({ errors }) => errors.length).length
//                     }
//                   >
//                     Log in
//                   </Button>
//                 )}
//               </Form.Item>
//             </Form>
//             <Link to="/registrarse">
//               <p>register</p>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IniciarSesion;

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
      const response = await axios.post("http://127.0.0.1:8080/auth/login", {
        username: values.username,
        password: values.password,
      });

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
      <div className="contenido gap-9 px-4">
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
            style={{
              maxWidth: 600,
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

            <Form.Item
              name="remember"
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
