import React, { useState } from "react";
import { Typography, Table, Input, Button, Select, message } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx"; // Usar * as XLSX para importar todas las funciones de XLSX
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Title } = Typography;
const { Option } = Select;

const ReportesAsistencia = () => {
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroGrado, setFiltroGrado] = useState("");
  const [filtroSeccion, setFiltroSeccion] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("");

  const handleBuscarReporte = () => {
    // Lógica para buscar reporte según filtros
    console.log(
      "Filtros aplicados:",
      filtroDni,
      filtroNombre,
      filtroGrado,
      filtroSeccion,
      filtroTurno,
    );
    // Implementar lógica para obtener y mostrar los datos del reporte
  };

  const handleExportarPDF = () => {
    // Lógica para exportar a PDF
    message.info("Exportando a PDF...");

    const doc = new jsPDF();
    doc.text("Reporte de Asistencias", 20, 20);
    doc.autoTable({
      startY: 30,
      head: [["DNI", "Nombre", "Apellidos", "Fecha", "Turno", "Asistencia"]],
      body: data.map((item) => [
        item.dni,
        item.nombre,
        item.apellidos,
        item.fecha,
        item.turno,
        item.asistencia,
      ]),
    });
    doc.save("reporte_asistencias.pdf");
  };

  const handleExportarExcel = () => {
    // Lógica para exportar a Excel
    message.info("Exportando a Excel...");

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Asistencias");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "reporte_asistencias.xlsx"
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
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Turno",
      dataIndex: "turno",
      key: "turno",
    },
    {
      title: "Asistencia",
      dataIndex: "asistencia",
      key: "asistencia",
    },
  ];

  const data = [
    {
      key: "1",
      dni: "12345678",
      nombre: "Juan",
      apellidos: "Pérez",
      fecha: "2024-07-10",
      turno: "Mañana",
      asistencia: "Presente",
    },
    {
      key: "2",
      dni: "87654321",
      nombre: "María",
      apellidos: "García",
      fecha: "2024-07-10",
      turno: "Tarde",
      asistencia: "Ausente",
    },
    // Agregar más datos según sea necesario
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Title level={2}>Reporte de Asistencias</Title>
          <div className="flex flex-wrap gap-4 mb-4">
            <Input
              placeholder="DNI del alumno"
              style={{ width: 200 }}
              value={filtroDni}
              onChange={(e) => setFiltroDni(e.target.value)}
            />
            <Input
              placeholder="Nombre del alumno"
              style={{ width: 200 }}
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
            <Select
              placeholder="Grado"
              style={{ width: 120 }}
              value={filtroGrado}
              onChange={(value) => setFiltroGrado(value)}
            >
              <Option value="1°">1°</Option>
              <Option value="2°">2°</Option>
              <Option value="3°">3°</Option>
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

export default ReportesAsistencia;
