import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Typography } from "antd";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import tokenItem from "../../../utils/TokenItem";

const { Title } = Typography;

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = () => {
    tokenItem
      .get("/aula/todos")
      .then((response) => {
        setAulas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las aulas:", error);
      });
  };

  const onFinish = (values) => {
    tokenItem
      .post("/aula/registro", values)
      .then((response) => {
        setAulas([...aulas, response.data]);
        form.resetFields(); // Optionally reset form fields after successful submission
      })
      .catch((error) => {
        console.error("Error al crear el aula:", error);
      });
  };

  const handleDelete = (record) => {
    tokenItem
      .delete(`/aula/eliminar/${record.id}`)
      .then(() => {
        fetchAulas();
      })
      .catch((error) => {
        console.error("Error al eliminar el aula:", error);
      });
  };

  const columns = [
    {
      title: "Nombre del Aula",
      dataIndex: "nombre",
      key: "nombre",
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
          <Title level={2}>Crear Aula</Title>
          <Form
            form={form}
            name="crear_aula"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="nombre"
              label="Nombre del Aula"
              rules={[
                { required: true, message: "Ingrese el nombre del aula" },
              ]}
            >
              <Input placeholder="Nombre del Aula" />
            </Form.Item>
            <Form.Item
              name="descripcion"
              label="Descripción"
              rules={[
                { required: true, message: "Ingrese la descripción del aula" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Descripción del Aula" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Aula
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <Title level={3}>Lista de Aulas Creadas</Title>
          <Table
            dataSource={aulas}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Aulas;
