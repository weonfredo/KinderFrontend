import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Space,
  Table,
  Modal,
  Select,
  message,
} from "antd";
import PageLayout from "../../../../components/ComposicionPagina/Layout";
import tokenItem from "../../../../utils/TokenItem";

const { Title } = Typography;
const { Option } = Select;

const Usuarios = () => {
  const [form] = Form.useForm();
  const [usuarios, setUsuarios] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    cargarUsuarios();
    cargarPerfiles();
    cargarSucursales();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await tokenItem.get("/usuario/todos");
      setUsuarios(response.data);
    } catch (error) {
      message.error("Error al cargar los usuarios");
    }
  };

  const cargarPerfiles = async () => {
    try {
      const response = await tokenItem.get("/perfil/todos");
      setPerfiles(response.data);
    } catch (error) {
      message.error("Error al cargar los perfiles");
    }
  };

  const cargarSucursales = async () => {
    try {
      const response = await tokenItem.get("/sucursal/todos");
      setSucursales(response.data);
    } catch (error) {
      message.error("Error al cargar las sucursales");
    }
  };

  const handleCrearUsuario = async (values) => {
    try {
      await tokenItem.post("/usuario/registro", values);
      cargarUsuarios();
      form.resetFields();
      message.success("Usuario creado exitosamente");
    } catch (error) {
      message.error("Error al crear el usuario");
    }
  };

  const handleEliminarUsuario = async (usuarioId) => {
    try {
      await tokenItem.delete(`/usuario/eliminar/${usuarioId}`);
      cargarUsuarios();
      message.success("Usuario eliminado exitosamente");
    } catch (error) {
      message.error("Error al eliminar el usuario");
    }
  };

  const showPermisos = (usuario) => {
    setSelectedUsuario(usuario);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
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
          <Button type="primary" onClick={() => showPermisos(record)}>
            Ver Permisos
          </Button>
          <Button onClick={() => handleEliminarUsuario(record.id)} danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-4 grid grid-flow-col-dense">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Crear Usuario</Title>
          <Form form={form} onFinish={handleCrearUsuario} layout="vertical">
            <Form.Item
              name="username"
              label="Nombre de usuario"
              rules={[
                { required: true, message: "Ingrese el nombre del usuario" },
              ]}
            >
              <Input placeholder="Ingrese el nombre del usuario" />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Apellido"
              rules={[
                { required: true, message: "Ingrese el apellido del usuario" },
              ]}
            >
              <Input placeholder="Ingrese el apellido del usuario" />
            </Form.Item>
            <Form.Item
              name="firstname"
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
              name="address"
              label="Dirección"
              rules={[
                { required: true, message: "Ingrese la dirección del usuario" },
              ]}
            >
              <Input placeholder="Ingrese la dirección del usuario" />
            </Form.Item>
            <Form.Item
              name="numberphone"
              label="Teléfono"
              rules={[
                { required: true, message: "Ingrese el teléfono del usuario" },
              ]}
            >
              <Input placeholder="Ingrese el teléfono del usuario" />
            </Form.Item>
            <Form.Item
              name="perfil"
              label="Perfil"
              rules={[
                { required: true, message: "Seleccione el perfil del usuario" },
              ]}
            >
              <Select placeholder="Seleccione el perfil del usuario">
                {perfiles.map((perfil) => (
                  <Option key={perfil.id} value={perfil.id}>
                    {perfil.perfil}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="sucursal"
              label="Sucursal"
              rules={[
                {
                  required: true,
                  message: "Seleccione la sucursal del usuario",
                },
              ]}
            >
              <Select placeholder="Seleccione la sucursal del usuario">
                {sucursales.map((sucursal) => (
                  <Option key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </Option>
                ))}
              </Select>
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
        title="Detalles del Usuario"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedUsuario && (
          <div>
            <p>
              <strong>Nombre de Usuario:</strong> {selectedUsuario.username}
            </p>
            <p>
              <strong>Apellido:</strong> {selectedUsuario.lastname}
            </p>
            <p>
              <strong>Nombre:</strong> {selectedUsuario.firstname}
            </p>
            <p>
              <strong>Email:</strong> {selectedUsuario.email}
            </p>
            <p>
              <strong>Dirección:</strong> {selectedUsuario.address}
            </p>
            <p>
              <strong>Teléfono:</strong> {selectedUsuario.numberphone}
            </p>
            <p>
              <strong>Perfil:</strong>{" "}
              {selectedUsuario.perfil ? selectedUsuario.perfil.perfil : "N/A"}
            </p>
            <p>
              <strong>Sucursal:</strong>{" "}
              {selectedUsuario.sucursal
                ? selectedUsuario.sucursal.nombre
                : "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
};

export default Usuarios;
