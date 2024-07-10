import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Space,
  Modal,
  message,
  Typography,
} from "antd";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import tokenItem from "../../../utils/TokenItem";

const { Title } = Typography;

const Establecimiento = () => {
  const [form] = Form.useForm();
  const [empresas, setEmpresas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const cargarEmpresas = async () => {
    try {
      const response = await tokenItem.get("/empresa/todos");
      setEmpresas(response.data);
    } catch (error) {
      message.error("Error al cargar las empresas");
    }
  };

  const handleCrearEmpresa = async (values) => {
    try {
      await tokenItem.post("/empresa/registro", values);
      cargarEmpresas();
      form.resetFields();
      message.success("Empresa creada exitosamente");
    } catch (error) {
      message.error("Error al crear la empresa");
    }
  };

  const handleEliminarEmpresa = async (empresaId) => {
    try {
      await tokenItem.delete(`/empresa/eliminar/${empresaId}`);
      cargarEmpresas();
      message.success("Empresa eliminada exitosamente");
    } catch (error) {
      message.error("Error al eliminar la empresa");
    }
  };

  const showDetalles = (empresa) => {
    setSelectedEmpresa(empresa);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Información",
      dataIndex: "informacion",
      key: "informacion",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetalles(record)}>
            Ver Detalles
          </Button>
          <Button onClick={() => handleEliminarEmpresa(record.id)} danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Title level={2}>Crear Empresa</Title>
          <Form form={form} onFinish={handleCrearEmpresa} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                { required: true, message: "Ingrese el nombre de la empresa" },
              ]}
            >
              <Input placeholder="Ingrese el nombre de la empresa" />
            </Form.Item>
            <Form.Item
              name="informacion"
              label="Información"
              rules={[
                {
                  required: true,
                  message: "Ingrese la información de la empresa",
                },
              ]}
            >
              <Input placeholder="Ingrese la información de la empresa" />
            </Form.Item>
            <Form.Item
              name="direccion"
              label="Dirección"
              rules={[
                {
                  required: true,
                  message: "Ingrese la dirección de la empresa",
                },
              ]}
            >
              <Input placeholder="Ingrese la dirección de la empresa" />
            </Form.Item>
            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[
                {
                  required: true,
                  message: "Ingrese el teléfono de la empresa",
                },
              ]}
            >
              <Input placeholder="Ingrese el teléfono de la empresa" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Ingrese el email de la empresa" },
              ]}
            >
              <Input placeholder="Ingrese el email de la empresa" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Empresa
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={3}>Lista de Empresas</Title>
          <Table
            dataSource={empresas}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>

      <Modal
        title="Detalles de la Empresa"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedEmpresa && (
          <div>
            <p>
              <strong>Nombre:</strong> {selectedEmpresa.nombre}
            </p>
            <p>
              <strong>Información:</strong> {selectedEmpresa.informacion}
            </p>
            <p>
              <strong>Dirección:</strong> {selectedEmpresa.direccion}
            </p>
            <p>
              <strong>Teléfono:</strong> {selectedEmpresa.telefono}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmpresa.email}
            </p>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
};

export default Establecimiento;
