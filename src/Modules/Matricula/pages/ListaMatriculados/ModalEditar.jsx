import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import tokenItem from "../../../../utils/TokenItem";

const { Option } = Select;

const ModalEditar = ({ visible, onCancel, alumno }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Realizar la solicitud PUT para modificar el alumno
      const response = await tokenItem.put(
        `/alumno/modificar/${alumno.id}`,
        values
      );

      console.log("Alumno modificado:", response.data);

      setLoading(false);
      onCancel(); // Cerrar el modal después de modificar
    } catch (error) {
      console.error("Error al modificar alumno:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alumno) {
      form.setFieldsValue({
        ...alumno,
        fecha_nacimiento: moment(alumno.fecha_nacimiento),
        grado: alumno.grado.id,
        seccion: alumno.seccion.id,
        aula: alumno.aula.id,
      });
    }
  }, [alumno, form]);

  return (
    <Modal
      visible={visible}
      title="Editar Alumno"
      okText="Guardar"
      cancelText="Cancelar"
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <div className="grid grid-flow-col-dense gap-4">
          <div>
            <Form.Item
              name="dni"
              label="DNI"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el DNI del alumno",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="apellidos"
              label="Apellidos"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese los apellidos del alumno",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lugar_nacimiento"
              label="Lugar de Nacimiento"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor ingrese el lugar de nacimiento del alumno",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="nombres"
              label="Nombres"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese los nombres del alumno",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="sexo"
              label="Sexo"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el sexo del alumno",
                },
              ]}
            >
              <Select>
                <Option value="M">Masculino</Option>
                <Option value="F">Femenino</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="direccion"
              label="Dirección"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la dirección del alumno",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <Form.Item
            name="fecha_nacimiento"
            label="Fecha de Nacimiento"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la fecha de nacimiento del alumno",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="estado"
            label="Estado"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el estado del alumno",
              },
            ]}
          >
            <Select>
              <Option value={1}>Activo</Option>
              <Option value={0}>Inactivo</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="estado_financiero"
            label="Estado Financiero"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el estado financiero del alumno",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="grid grid-flow-col-dense gap-1">
          <Form.Item
            name="grado"
            label="Grado"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el grado del alumno",
              },
            ]}
          >
            <Select>
              <Option value={alumno.grado.id}>{alumno.grado.nombre}</Option>
              {/* Agrega más opciones según tus grados disponibles */}
            </Select>
          </Form.Item>
          <Form.Item
            name="seccion"
            label="Sección"
            rules={[
              {
                required: true,
                message: "Por favor seleccione la sección del alumno",
              },
            ]}
          >
            <Select>
              <Option value={alumno.seccion.id}>{alumno.seccion.nombre}</Option>
              {/* Agrega más opciones según tus secciones disponibles */}
            </Select>
          </Form.Item>
          <Form.Item
            name="aula"
            label="Aula"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el aula del alumno",
              },
            ]}
          >
            <Select>
              <Option value={alumno.aula.id}>{alumno.aula.nombre}</Option>
              {/* Agrega más opciones según tus aulas disponibles */}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalEditar;
