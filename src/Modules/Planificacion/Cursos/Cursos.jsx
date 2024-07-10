import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Typography } from "antd";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import tokenItem from "../../../utils/TokenItem";

const { Title } = Typography;

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = () => {
    tokenItem
      .get("/curso/todos")
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
      });
  };

  const onFinish = (values) => {
    tokenItem
      .post("/curso/registro", values)
      .then((response) => {
        fetchCursos(); // Actualiza la lista de cursos después de crear uno nuevo
        form.resetFields(); // Opcionalmente resetea los campos del formulario después de enviar exitosamente
      })
      .catch((error) => {
        console.error("Error al crear el curso:", error);
      });
  };

  const handleDelete = (record) => {
    tokenItem
      .delete(`/curso/eliminar/${record.id}`)
      .then(() => {
        fetchCursos(); // Actualiza la lista después de eliminar un curso
      })
      .catch((error) => {
        console.error("Error al eliminar el curso:", error);
      });
  };

  const columns = [
    {
      title: "Nombre del Curso",
      dataIndex: "curso",
      key: "curso",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDelete(record)}>
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Title level={2}>Crear Curso</Title>
          <Form
            form={form}
            name="crear_curso"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="curso"
              label="Nombre del Curso"
              rules={[
                { required: true, message: "Ingrese el nombre del curso" },
              ]}
            >
              <Input placeholder="Nombre del Curso" />
            </Form.Item>
            <Form.Item
              name="descripcion"
              label="Descripción"
              rules={[
                { required: true, message: "Ingrese la descripción del curso" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Descripción del Curso" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Curso
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <Title level={3}>Lista de Cursos Creados</Title>
          <Table
            dataSource={cursos}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Cursos;
