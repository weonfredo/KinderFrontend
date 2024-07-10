import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useHistory de react-router-dom
import { Typography, Table, Input, Button, Select, message } from "antd";
import PageLayout from "../../../components/ComposicionPagina/Layout";

const { Title } = Typography;
const { Option } = Select;

const ReportesPagos = () => {
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroGrado, setFiltroGrado] = useState("");
  const [filtroSeccion, setFiltroSeccion] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("");
  const [filtroSemestre, setFiltroSemestre] = useState("");
  const [dataFiltrada, setDataFiltrada] = useState([]);
  
  const history = useNavigate(); // Inicializa useHistory

  const data = [
    {
      key: "1",
      dni: "12345678",
      nombre: "Juan Pérez",
      grado: "6°",
      seccion: "A",
      turno: "Mañana",
      bimestre: "Primer",
    },
    {
      key: "2",
      dni: "87654321",
      nombre: "María García",
      grado: "5°",
      seccion: "B",
      turno: "Tarde",
      bimestre: "Primer",
    },
    // Agregar más datos según sea necesario
  ];

  const handleBuscarReporte = () => {
    // Filtrar los datos según los criterios de búsqueda
    const filtrado = data.filter((item) => {
      return (
        (filtroDni === "" || item.dni.includes(filtroDni)) &&
        (filtroGrado === "" || item.grado === filtroGrado) &&
        (filtroSeccion === "" || item.seccion === filtroSeccion) &&
        (filtroTurno === "" || item.turno === filtroTurno) &&
        (filtroSemestre === "" || item.bimestre === filtroSemestre)
      );
    });
    setDataFiltrada(filtrado);
  };

  const handleVerLibreta = (record) => {
    // Navegar al componente Libreta con los datos del estudiante
    history.push({
      pathname: "/libreta",
      state: { student: record }
    });
  };

  const columns = [
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
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
      title: "Turno",
      dataIndex: "turno",
      key: "turno",
    },
    {
      title: "Bimestre",
      dataIndex: "bimestre",
      key: "bimestre",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Button type="link" onClick={() => handleVerLibreta(record)}>
          Ver Libreta
        </Button>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Libreta de Notas</Title>
          <div className="flex flex-wrap gap-4 mb-4">
            <Input
              placeholder="DNI del alumno"
              style={{ width: 200 }}
              value={filtroDni}
              onChange={(e) => setFiltroDni(e.target.value)}
            />
            <Select
              placeholder="Grado"
              style={{ width: 120 }}
              value={filtroGrado}
              onChange={(value) => setFiltroGrado(value)}
            >
              <Option value="1°">5°</Option>
              <Option value="2°">6°</Option>
              <Option value="3°">7°</Option>
            </Select>
            <Select
              placeholder="Sección"
              style={{ width: 120 }}
              value={filtroSeccion}
              onChange={(value) => setFiltroSeccion(value)}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>
            <Select
              placeholder="Turno"
              style={{ width: 120 }}
              value={filtroTurno}
              onChange={(value) => setFiltroTurno(value)}
            >
              <Option value="Mañana">Mañana</Option>
              <Option value="Tarde">Tarde</Option>
            </Select>
            <Select
              placeholder="Semestre académico"
              style={{ width: 180 }}
              value={filtroSemestre}
              onChange={(value) => setFiltroSemestre(value)}
            >
              <Option value="1">Primer bimestre</Option>
              <Option value="2">Segundo bimestre</Option>
              <Option value="3">Tercer bimestre</Option>
              <Option value="4">Cuarto bimestre</Option>
            </Select>
            <Button type="primary" onClick={handleBuscarReporte}>
              Buscar
            </Button>
          </div>
          <Table columns={columns} dataSource={dataFiltrada.length > 0 ? dataFiltrada : data} pagination={false} />
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportesPagos;
