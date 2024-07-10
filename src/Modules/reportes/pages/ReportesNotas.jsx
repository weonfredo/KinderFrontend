// import React from "react";
// import PageLayout from '../../../components/ComposicionPagina/Layout';
// import Notas from '../components/buscadorasis';
// import GradoSelect from '../components/gradoselect';
// import AulaSelect from "../components/aulaselect";
// import TurnoSelect from "../components/turnoselect";
// import CursoSelect from "../components/cursosselect";
// import PeriodoSelect from "../components/periodoselect";

<<<<<<< HEAD
function ReportesNotas() {
    return (
       
      <PageLayout>
        <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'black', fontSize: '32px', fontWeight: 'bold' }}>
          NOTAS
        </h2> 
        <GradoSelect/>
        <AulaSelect/>
         <TurnoSelect/>
         <CursoSelect/>
        <PeriodoSelect/>
        <Notas /> 
      </PageLayout>
=======
// function ReportesNotas() {
//     return (

//       <PageLayout>
//         <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'black', fontSize: '32px', fontWeight: 'bold' }}>
//           REPORTES DE NOTAS
//         </h2>
//         <GradoSelect/>
//         <AulaSelect/>
//          <TurnoSelect/>
//          <CursoSelect/>
//         <PeriodoSelect/>
//         <Notas />
//       </PageLayout>
//     );
//   }
//   export default ReportesNotas;

import React, { useState } from "react";
import { Typography, Table, Input, Button, Select, message } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const { Title } = Typography;
const { Option } = Select;

const ReportesNotas = () => {
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroGrado, setFiltroGrado] = useState("");
  const [filtroSeccion, setFiltroSeccion] = useState("");
  const [filtroCurso, setFiltroCurso] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("");
  const [filtroSemestre, setFiltroSemestre] = useState("");

  const handleBuscarReporte = () => {
    // Lógica para buscar reporte según filtros
    console.log(
      "Filtros aplicados:",
      filtroDni,
      filtroGrado,
      filtroSeccion,
      filtroCurso,
      filtroTurno,
      filtroSemestre
>>>>>>> 3a8e8455969866297ae8d624001f66edb21478b5
    );
    // Implementar lógica para obtener y mostrar los datos del reporte
  };

  const handleExportarPDF = () => {
    // Lógica para exportar a PDF
    message.info("Exportando a PDF...");
    // Aquí deberías implementar la lógica real para exportar a PDF
  };

  const handleExportarExcel = () => {
    // Lógica para exportar a Excel
    message.info("Exportando a Excel...");

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Notas");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "reporte_notas.xlsx"
    );
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
      title: "Curso",
      dataIndex: "curso",
      key: "curso",
    },
    {
      title: "Turno",
      dataIndex: "turno",
      key: "turno",
    },
    {
      title: "Promedio",
      dataIndex: "promedio",
      key: "promedio",
    },
  ];

  const data = [
    {
      key: "1",
      dni: "12345678",
      nombre: "Juan Pérez",
      grado: "6°",
      seccion: "A",
      curso: "Matemáticas",
      turno: "Mañana",
      promedio: 15.5,
    },
    {
      key: "2",
      dni: "87654321",
      nombre: "María García",
      grado: "5°",
      seccion: "B",
      curso: "Ciencias",
      turno: "Tarde",
      promedio: 17.2,
    },
    // Agregar más datos según sea necesario
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Reporte de Notas</Title>
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
              <Option value="5°">5°</Option>
              <Option value="6°">6°</Option>
              <Option value="7°">7°</Option>
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
            <Input
              placeholder="Curso"
              style={{ width: 200 }}
              value={filtroCurso}
              onChange={(e) => setFiltroCurso(e.target.value)}
            />
            <Select
              placeholder="Turno"
              style={{ width: 120 }}
              value={filtroTurno}
              onChange={(value) => setFiltroTurno(value)}
            >
              <Option value="Mañana">Mañana</Option>
              <Option value="Tarde">Tarde</Option>
              <Option value="Noche">Noche</Option>
            </Select>
            <Select
              placeholder="Semestre académico"
              style={{ width: 180 }}
              value={filtroSemestre}
              onChange={(value) => setFiltroSemestre(value)}
            >
              <Option value="1">Primer semestre</Option>
              <Option value="2">Segundo semestre</Option>
            </Select>
            <Button type="primary" onClick={handleBuscarReporte}>
              Buscar
            </Button>
            <Button icon={<ExportOutlined />} onClick={handleExportarPDF}>
              Exportar PDF
            </Button>
            <Button icon={<ExportOutlined />} onClick={handleExportarExcel}>
              Exportar Excel
            </Button>
          </div>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportesNotas;
