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
  Select,
} from "antd";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import tokenItem from "../../../utils/TokenItem";

const { Title } = Typography;
const { Option } = Select;

const Sucursal = () => {
  const [form] = Form.useForm();
  const [sucursales, setSucursales] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  useEffect(() => {
    cargarSucursales();
    cargarEmpresas();
  }, []);

  const cargarSucursales = async () => {
    try {
      const response = await tokenItem.get("/sucursal/todos");
      setSucursales(response.data);
    } catch (error) {
      message.error("Error al cargar las sucursales");
    }
  };

  const cargarEmpresas = async () => {
    try {
      const response = await tokenItem.get("/empresa/todos");
      setEmpresas(response.data);
    } catch (error) {
      message.error("Error al cargar las empresas");
    }
  };

  const handleCrearSucursal = async (values) => {
    try {
      await tokenItem.post("/sucursal/registro", values);
      cargarEmpresas();
      form.resetFields();
      message.success("Empresa creada exitosamente");
    } catch (error) {
      message.error("Error al crear la empresa");
    }
    console.log("datos enviados", values);
  };

  const handleEliminarSucursal = async (sucursalId) => {
    try {
      await tokenItem.delete(`/sucursal/eliminar/${sucursalId}`);
      cargarSucursales();
      message.success("Sucursal eliminada exitosamente");
    } catch (error) {
      message.error("Error al eliminar la sucursal");
    }
  };

  const showDetalles = (sucursal) => {
    setSelectedSucursal(sucursal);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
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
      title: "Horario",
      dataIndex: "horario",
      key: "horario",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetalles(record)}>
            Ver Detalles
          </Button>
          <Button onClick={() => handleEliminarSucursal(record.id)} danger>
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
          <Title level={2}>Crear Sucursal</Title>
          <Form form={form} onFinish={handleCrearSucursal} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                { required: true, message: "Ingrese el nombre de la sucursal" },
              ]}
            >
              <Input placeholder="Ingrese el nombre de la sucursal" />
            </Form.Item>
            <Form.Item
              name="codigo"
              label="Código"
              rules={[
                { required: true, message: "Ingrese el código de la sucursal" },
              ]}
            >
              <Input placeholder="Ingrese el código de la sucursal" />
            </Form.Item>
            <Form.Item
              name="direccion"
              label="Dirección"
              rules={[
                {
                  required: true,
                  message: "Ingrese la dirección de la sucursal",
                },
              ]}
            >
              <Input placeholder="Ingrese la dirección de la sucursal" />
            </Form.Item>
            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[
                {
                  required: true,
                  message: "Ingrese el teléfono de la sucursal",
                },
              ]}
            >
              <Input placeholder="Ingrese el teléfono de la sucursal" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Ingrese el email de la sucursal" },
              ]}
            >
              <Input placeholder="Ingrese el email de la sucursal" />
            </Form.Item>
            <Form.Item
              name="horario"
              label="Horario"
              rules={[
                {
                  required: true,
                  message: "Ingrese el horario de la sucursal",
                },
              ]}
            >
              <Input placeholder="Ingrese el horario de la sucursal" />
            </Form.Item>
            <Form.Item
              name="idEmpresa"
              label="Empresa"
              rules={[
                {
                  required: true,
                  message:
                    "Seleccione la empresa a la que pertenece la sucursal",
                },
              ]}
            >
              <Select placeholder="Seleccione la empresa">
                {empresas.map((empresa) => (
                  <Option key={empresa.id} value={empresa.id}>
                    {empresa.nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Sucursal
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={3}>Lista de Sucursales</Title>
          <Table
            dataSource={sucursales}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>

      <Modal
        title="Detalles de la Sucursal"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedSucursal && (
          <div>
            <p>
              <strong>Nombre:</strong> {selectedSucursal.nombre}
            </p>
            <p>
              <strong>Código:</strong> {selectedSucursal.codigo}
            </p>
            <p>
              <strong>Dirección:</strong> {selectedSucursal.direccion}
            </p>
            <p>
              <strong>Teléfono:</strong> {selectedSucursal.telefono}
            </p>
            <p>
              <strong>Email:</strong> {selectedSucursal.email}
            </p>
            <p>
              <strong>Horario:</strong> {selectedSucursal.horario}
            </p>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
};

export default Sucursal;
