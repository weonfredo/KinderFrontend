import React, { useState } from "react";
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

const { Title } = Typography;

const Modulos = () => {
  const [form] = Form.useForm();
  const [modulos, setModulos] = useState([]);
  const [submodulos, setSubmodulos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCrearModulo = (values) => {
    const nuevoModulo = {
      id: modulos.length + 1,
      nombre: values.nombre,
      descripcion: values.descripcion,
      submodulos: [],
    };
    setModulos([...modulos, nuevoModulo]);
    form.resetFields();
    setModalVisible(false);
    message.success("Módulo creado exitosamente");
  };

  const handleCrearSubmodulo = (values) => {
    const { moduloId, nombre, descripcion } = values;
    const moduloActualizado = modulos.map((modulo) =>
      modulo.id === moduloId
        ? {
            ...modulo,
            submodulos: [
              ...modulo.submodulos,
              { id: modulo.submodulos.length + 1, nombre, descripcion },
            ],
          }
        : modulo
    );
    setModulos(moduloActualizado);
    form.resetFields();
    setModalVisible(false);
    message.success("Submódulo creado exitosamente");
  };

  const columns = [
    {
      title: "Nombre del Módulo",
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
        <Space size="middle">
          <Button type="primary" onClick={() => showSubmodulos(record.id)}>
            Ver Submódulos
          </Button>
          <Button onClick={() => handleEliminarModulo(record.id)} danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const showSubmodulos = (moduloId) => {
    const moduloSeleccionado = modulos.find((modulo) => modulo.id === moduloId);
    setSubmodulos(moduloSeleccionado.submodulos || []);
    setModalVisible(true);
  };

  const handleEliminarModulo = (moduloId) => {
    const modulosFiltrados = modulos.filter((modulo) => modulo.id !== moduloId);
    setModulos(modulosFiltrados);
    message.success("Módulo eliminado exitosamente");
  };

  const handleEliminarSubmodulo = (moduloId, submoduloId) => {
    const moduloActualizado = modulos.map((modulo) =>
      modulo.id === moduloId
        ? {
            ...modulo,
            submodulos: modulo.submodulos.filter(
              (submodulo) => submodulo.id !== submoduloId
            ),
          }
        : modulo
    );
    setModulos(moduloActualizado);
    message.success("Submódulo eliminado exitosamente");
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <Title level={2}>Crear Módulo</Title>
            <Form form={form} onFinish={handleCrearModulo} layout="vertical">
              <Form.Item
                name="nombre"
                label="Nombre del Módulo"
                rules={[
                  { required: true, message: "Ingrese el nombre del módulo" },
                ]}
              >
                <Input placeholder="Ingrese el nombre del módulo" />
              </Form.Item>
              <Form.Item
                name="descripcion"
                label="Descripción del Módulo"
                rules={[
                  {
                    required: true,
                    message: "Ingrese la descripción del módulo",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Ingrese la descripción del módulo"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Crear Módulo
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Title level={3}>Lista de Módulos</Title>
            <Table
              dataSource={modulos}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Submódulos"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
      >
        <ul>
          {submodulos.map((submodulo) => (
            <li key={submodulo.id}>
              <div>
                <strong>{submodulo.nombre}</strong>
                <p>{submodulo.descripcion}</p>
              </div>
              <Button onClick={() => handleEliminarSubmodulo(submodulo.id)}>
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      </Modal>
    </PageLayout>
  );
};

export default Modulos;
