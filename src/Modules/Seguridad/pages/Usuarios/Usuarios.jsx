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

const Usuarios = () => {
  const [form] = Form.useForm();
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCrearUsuario = (values) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: values.nombre,
      email: values.email,
      perfil: values.perfil,
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    form.resetFields();
    setModalVisible(false);
    message.success("Usuario creado exitosamente");
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Perfil",
      dataIndex: "perfil",
      key: "perfil",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showPermisos(record.id)}>
            Ver Permisos
          </Button>
          <Button onClick={() => handleEliminarUsuario(record.id)} danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const showPermisos = (usuarioId) => {
    // Lógica para mostrar los permisos del usuario
    // Puedes implementar esto según tu estructura de datos y lógica de permisos
    // Aquí solo se simula la apertura de un modal para mostrar los permisos
    setModalVisible(true);
  };

  const handleEliminarUsuario = (usuarioId) => {
    const usuariosFiltrados = usuarios.filter(
      (usuario) => usuario.id !== usuarioId
    );
    setUsuarios(usuariosFiltrados);
    message.success("Usuario eliminado exitosamente");
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Crear Usuario</Title>
          <Form form={form} onFinish={handleCrearUsuario} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                { required: true, message: "Ingrese el nombre del usuario" },
              ]}
            >
              <Input placeholder="Ingrese el nombre del usuario" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Ingrese el email del usuario" },
              ]}
            >
              <Input placeholder="Ingrese el email del usuario" />
            </Form.Item>
            <Form.Item
              name="perfil"
              label="Perfil"
              rules={[
                { required: true, message: "Ingrese el perfil del usuario" },
              ]}
            >
              <Input placeholder="Ingrese el perfil del usuario" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Usuario
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <Title level={3}>Lista de Usuarios</Title>
          <Table
            dataSource={usuarios}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>

      <Modal
        title="Permisos del Usuario"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {/* Contenido del modal de permisos */}
        <p>Aquí se mostrarían los permisos del usuario seleccionado.</p>
      </Modal>
    </PageLayout>
  );
};

export default Usuarios;
