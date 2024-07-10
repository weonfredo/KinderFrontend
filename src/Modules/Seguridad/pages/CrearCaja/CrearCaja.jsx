import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Space,
  Table,
  Modal,
  message,
} from "antd";
import PageLayout from "../../../../components/ComposicionPagina/Layout";
import tokenItem from "../../../../utils/TokenItem";

const { Title } = Typography;

const CrearCaja = () => {
  const [form] = Form.useForm();
  const [cajas, setCajas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCaja, setSelectedCaja] = useState(null);

  useEffect(() => {
    cargarCajas();
  }, []);

  const cargarCajas = async () => {
    try {
      const response = await tokenItem.get("/caja/todos");
      setCajas(response.data);
    } catch (error) {
      message.error("Error al cargar las cajas");
    }
  };

  const handleCrearCaja = async (values) => {
    try {
      // Remove 'estado' from values before sending
      const { nombre } = values;
      await tokenItem.post("/caja/registro", { nombre }); // Only send 'nombre'
      form.resetFields();
      cargarCajas();
      message.success("Caja creada exitosamente");
    } catch (error) {
      message.error("Error al crear la caja");
    }
  };

  const handleEliminarCaja = async (cajaId) => {
    try {
      await tokenItem.delete(`/caja/eliminar/${cajaId}`);
      cargarCajas();
      message.success("Caja eliminada exitosamente");
    } catch (error) {
      message.error("Error al eliminar la caja");
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetalles(record)}>
            Ver Detalles
          </Button>
          <Button onClick={() => handleEliminarCaja(record.id)} danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const showDetalles = (caja) => {
    setSelectedCaja(caja);
    setModalVisible(true);
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Crear Caja</Title>
          <Form form={form} onFinish={handleCrearCaja} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                { required: true, message: "Ingrese el nombre de la caja" },
              ]}
            >
              <Input placeholder="Ingrese el nombre de la caja" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Caja
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <Title level={3}>Lista de Cajas</Title>
          <Table
            dataSource={cajas}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>

      <Modal
        title="Detalles de la Caja"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedCaja && (
          <div>
            <p>
              <strong>Nombre:</strong> {selectedCaja.nombre}
            </p>
            <p>
              <strong>Estado:</strong> {selectedCaja.estado}
            </p>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
};

export default CrearCaja;
