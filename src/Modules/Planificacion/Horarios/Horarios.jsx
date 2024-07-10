import React, { useState } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Table,
  Space,
  Typography,
  Row,
  Col,
} from "antd"; // Añadir Input a los imports
import PageLayout from "../../../components/ComposicionPagina/Layout";

const { Title } = Typography;
const { Option } = Select;

const Horarios = () => {
  const [form] = Form.useForm();
  const [horarios, setHorarios] = useState([]);

  const onFinish = (values) => {
    console.log("Formulario enviado:", values);
    // Lógica para enviar el formulario y guardar el horario
    // Puedes realizar una solicitud al backend aquí para guardar el horario
    // y luego actualizar la lista de horarios (setHorarios([...horarios, nuevoHorario]))
  };

  const columns = [
    {
      title: "Docente",
      dataIndex: "docente",
      key: "docente",
    },
    {
      title: "Estudiante",
      dataIndex: "estudiante",
      key: "estudiante",
    },
    {
      title: "Curso",
      dataIndex: "curso",
      key: "curso",
    },
    {
      title: "Día",
      dataIndex: "dia",
      key: "dia",
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
        </Space>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="site-layout-content">
        <Row gutter={24}>
          <Col span={12}>
            <Title level={2}>Crear Horario</Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="docente"
                label="Docente"
                rules={[{ required: true, message: "Seleccione un docente" }]}
              >
                <Select placeholder="Seleccione un docente">
                  <Option value="1">Nombre Docente 1</Option>
                  <Option value="2">Nombre Docente 2</Option>
                  <Option value="3">Nombre Docente 3</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="estudiante"
                label="Estudiante"
                rules={[
                  { required: true, message: "Seleccione un estudiante" },
                ]}
              >
                <Select placeholder="Seleccione un estudiante">
                  <Option value="1">Nombre Estudiante 1</Option>
                  <Option value="2">Nombre Estudiante 2</Option>
                  <Option value="3">Nombre Estudiante 3</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="curso"
                label="Curso"
                rules={[{ required: true, message: "Seleccione un curso" }]}
              >
                <Select placeholder="Seleccione un curso">
                  <Option value="1">Nombre Curso 1</Option>
                  <Option value="2">Nombre Curso 2</Option>
                  <Option value="3">Nombre Curso 3</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="dia"
                label="Día"
                rules={[{ required: true, message: "Ingrese el día" }]}
              >
                <Input placeholder="Ingrese el día" />{" "}
                {/* Añadir Input para el día */}
              </Form.Item>
              <Form.Item
                name="hora"
                label="Hora"
                rules={[{ required: true, message: "Ingrese la hora" }]}
              >
                <Input placeholder="Ingrese la hora" />{" "}
                {/* Añadir Input para la hora */}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Crear Horario
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Title level={2}>Horarios Asignados</Title>
            <Table
              dataSource={horarios}
              columns={columns}
              rowKey={(record) => record.id}
            />
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Horarios;
