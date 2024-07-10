import React, { useState } from "react";
import { Form, Input, Button, Typography, Table, Modal, message } from "antd";
import PageLayout from "../../../../components/ComposicionPagina/Layout";
const { Title } = Typography;

const Perfiles = () => {
  const [form] = Form.useForm();
  const [perfiles, setPerfiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCrearPerfil = (values) => {
    const nuevoPerfil = {
      id: perfiles.length + 1,
      nombre: values.nombre,
      descripcion: values.descripcion,
    };
    setPerfiles([...perfiles, nuevoPerfil]);
    form.resetFields();
    setModalVisible(false);
    message.success("Perfil creado exitosamente");
  };

  const columns = [
    {
      title: "Nombre del Perfil",
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
        <Button type="primary" onClick={() => handleEditarPerfil(record.id)}>
          Editar
        </Button>
      ),
    },
  ];

  const handleEditarPerfil = (perfilId) => {
    // Lógica para editar perfil
    // Esta función puede ser extendida para abrir un modal de edición de perfil
    // con los datos del perfil seleccionado
    message.info("Función de edición de perfil");
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Crear Perfil</Title>
          <Form form={form} onFinish={handleCrearPerfil} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre del Perfil"
              rules={[
                { required: true, message: "Ingrese el nombre del perfil" },
              ]}
            >
              <Input placeholder="Ingrese el nombre del perfil" />
            </Form.Item>
            <Form.Item
              name="descripcion"
              label="Descripción del Perfil"
              rules={[
                {
                  required: true,
                  message: "Ingrese la descripción del perfil",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Ingrese la descripción del perfil"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Perfil
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <Title level={3}>Lista de Perfiles</Title>
          <Table
            dataSource={perfiles}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>

      <Modal
        title="Editar Perfil"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {/* Contenido del modal de edición de perfil */}
        <p>
          Aquí se mostraría el formulario para editar el perfil seleccionado.
        </p>
      </Modal>
    </PageLayout>
  );
};

export default Perfiles;
