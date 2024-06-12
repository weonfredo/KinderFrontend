import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Select, Cascader, Button } from "antd";
import { initialFormValues } from "./Data";
import "./Alumno.css";

const Alumno = ({ form, onSubmit, values, disabled }) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={values || initialFormValues}
      onFinish={onSubmit}
      disabled={disabled}
    >
      <div className="general h-full first-letter:grid grid-cols-2 ">
        <h2 className="text-center text-2xl">Datos Estudiante</h2>
        <Form.Item
          label="Nombre"
          name="nombres"
          rules={[{ required: true, message: "Ingrese el nombre!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="apellidos"
          rules={[{ required: true, message: "Ingrese el apellido!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Sexo"
          name="sexo"
          rules={[{ required: true, message: "Seleccione el Sexo!" }]}
        >
          <Radio.Group>
            <Radio value="m"> Masculino </Radio>
            <Radio value="f"> Femenino </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Select"
          name="select"
          rules={[{ required: true, message: "Seleccione una opción!" }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Direccion"
          name="direccion"
          rules={[{ required: true, message: "Ingrese la Direccion!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="DNI"
          name="dni"
          rules={[{ required: true, message: "Ingrese el DNI!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Lugar Nacimiento"
          name="lugar_nacimiento"
          rules={[
            { required: true, message: "Seleccione el Lugar de nacimiento!" },
          ]}
        >
          <Cascader
            options={[
              {
                value: "San Martin",
                label: "SAN MARTIN",
                children: [
                  {
                    value: "San Martin",
                    label: "SAN MARTIN",
                    children: [
                      {
                        value: "tarapoto",
                        label: "TARAPOTO",
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        {!disabled && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default Alumno;
