import React, { useState } from "react";
import { Typography, Table, Button, Modal, Form, Input, Select } from "antd";
import PageLayout from "../../../components/ComposicionPagina/Layout";

const { Title } = Typography;
const { Option } = Select;

const Asistencias = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleGuardarAsistencia = (values) => {
    console.log("Formulario de asistencia enviado:", values);
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Estudiante",
      dataIndex: "estudiante",
      key: "estudiante",
    },
    {
      title: "Grado",
      dataIndex: "grado",
      key: "grado",
    },
    {
      title: "Sección",
      dataIndex: "seccion",
      key: "seccion",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: () => (
        <Button type="link" onClick={() => setModalVisible(true)}>
          Registrar Asistencia
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      estudiante: "Juan Pérez",
      grado: "6°",
      seccion: "A",
    },
    {
      key: "2",
      estudiante: "María García",
      grado: "5°",
      seccion: "B",
    },
    // Agregar más datos según sea necesario
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Registro de Asistencias</Title>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>

      <Modal
        title="Registrar Asistencia"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          name="asistenciaForm"
          onFinish={handleGuardarAsistencia}
          initialValues={{ grado: "", seccion: "" }}
        >
          <Form.Item
            name="grado"
            label="Grado"
            rules={[{ required: true, message: "Seleccione el grado" }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="5°">5°</Option>
              <Option value="6°">6°</Option>
              <Option value="7°">7°</Option>
              {/* Agregar más opciones según sea necesario */}
            </Select>
          </Form.Item>
          <Form.Item
            name="seccion"
            label="Sección"
            rules={[{ required: true, message: "Seleccione la sección" }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              {/* Agregar más opciones según sea necesario */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar Asistencia
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  );
};

export default Asistencias;
