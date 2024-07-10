import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Button, Modal, Space } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import PageLayout from "../../../../components/ComposicionPagina/Layout";
import mockAlumnos from "./mockData"; // Ajusta la ruta según tu estructura de archivos

const ControlEstudiantes = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [nombreTerm, setNombreTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de elementos por página
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const usuario = "NombreUsuario"; // Suponiendo que tenemos el nombre del usuario
  const navigate = useNavigate(); // Utilizamos useNavigate para la navegación

  useEffect(() => {
    // Simulando una llamada a la API utilizando los datos de ejemplo
    setAlumnos(mockAlumnos);
  }, []);

  // Filtrado de alumnos basado en el término de búsqueda del nombre
  const filteredAlumnos = alumnos.filter((alumno) =>
    alumno.nombres.toLowerCase().includes(nombreTerm.toLowerCase())
  );

  // Obtener los alumnos actuales para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlumnos = filteredAlumnos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Cambiar de página
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Abrir modal y seleccionar alumno
  const handleOpenModal = (alumno) => {
    setSelectedAlumno(alumno);
    setVisibleModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  // Navegar a la pantalla de pagos
  const handleNavigateToPagos = (alumno) => {
    navigate("/pagos", { state: { alumno } }); // Ajusta '/pagos' según tu configuración de rutas
  };

  const modalContent = (
    <>
      <p>
        <UserOutlined /> <strong>DNI:</strong> {selectedAlumno?.dni}
      </p>
      <p>
        <UserOutlined /> <strong>Nombres:</strong> {selectedAlumno?.nombres}
      </p>
      <p>
        <UserOutlined /> <strong>Apellidos:</strong> {selectedAlumno?.apellidos}
      </p>
      <p>
        <CalendarOutlined /> <strong>Fecha de Nacimiento:</strong>{" "}
        {selectedAlumno &&
          new Date(selectedAlumno.fecha_nacimiento).toLocaleDateString()}
      </p>
      <p>
        <UserOutlined /> <strong>Sexo:</strong> {selectedAlumno?.sexo}
      </p>
      <p>
        <EnvironmentOutlined /> <strong>Lugar de Nacimiento:</strong>{" "}
        {selectedAlumno?.lugar_nacimiento}
      </p>
      <p>
        <EnvironmentOutlined /> <strong>Dirección:</strong>{" "}
        {selectedAlumno?.direccion}
      </p>
      <p>
        <DollarOutlined /> <strong>Estado Financiero:</strong>{" "}
        {selectedAlumno?.estado_financiero}
      </p>
    </>
  );

  return (
    <PageLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Control de Estudiantes
        </h2>
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Hola, {usuario}</span>
        </div>
        <div className="mb-4">
          <Input
            placeholder="Filtrar por nombre"
            className="w-72"
            onChange={(e) => setNombreTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <Table
            columns={[
              {
                title: "DNI",
                dataIndex: "dni",
                key: "dni",
              },
              {
                title: "Nombres",
                dataIndex: "nombres",
                key: "nombres",
              },
              {
                title: "Apellidos",
                dataIndex: "apellidos",
                key: "apellidos",
              },
              {
                title: "Fecha Nacimiento",
                dataIndex: "fecha_nacimiento",
                key: "fecha_nacimiento",
                render: (fecha) => new Date(fecha).toLocaleDateString(),
              },
              {
                title: "Sexo",
                dataIndex: "sexo",
                key: "sexo",
              },
              {
                title: "Lugar Nacimiento",
                dataIndex: "lugar_nacimiento",
                key: "lugar_nacimiento",
              },
              {
                title: "Dirección",
                dataIndex: "direccion",
                key: "direccion",
              },
              {
                title: "Estado Financiero",
                dataIndex: "estado_financiero",
                key: "estado_financiero",
              },
              {
                title: "Acciones",
                key: "acciones",
                render: (text, record) => (
                  <Space>
                    <Button
                      type={
                        record.estado_financiero === "Deudor"
                          ? "danger"
                          : "primary"
                      }
                      onClick={() => handleOpenModal(record)}
                    >
                      Ver Detalles
                    </Button>
                  </Space>
                ),
              },
            ]}
            dataSource={currentAlumnos}
            pagination={{
              pageSize: itemsPerPage,
              current: currentPage,
              onChange: handlePagination,
              total: filteredAlumnos.length,
              showSizeChanger: false,
            }}
          />
        </div>
        <Modal
          visible={visibleModal}
          title="Detalles del Alumno"
          onCancel={handleCloseModal}
          footer={[
            <Button key="cancel" onClick={handleCloseModal}>
              Cerrar
            </Button>,
            selectedAlumno && selectedAlumno.estado_financiero === "Deudor" && (
              <Button
                key="pagar"
                type="primary"
                onClick={() => handleNavigateToPagos(selectedAlumno)}
              >
                Pagar
              </Button>
            ),
          ]}
        >
          {modalContent}
        </Modal>
      </div>
    </PageLayout>
  );
};

export default ControlEstudiantes;
