import React, { useState } from "react";
import { Typography, Table, Input, Button, Select, message } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Title } = Typography;
const { Option } = Select;

const ReportesNotas = () => {
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroGrado, setFiltroGrado] = useState("");
  const [filtroSeccion, setFiltroSeccion] = useState("");
  const [filtroCurso, setFiltroCurso] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("");
 
  const [filtroBimestre, setFiltroBimestre] = useState("");
  const [dataFiltrada, setDataFiltrada] = useState([]);

  const data = [
    {
      key: "1",
      dni: "12345678",
      nombre: "Juan Pérez",
      grado: "1°",
      seccion: "A",
      curso: "Matemáticas",
      turno: "Mañana",
      bimestre: "1",
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
      bimestre: "2",
      promedio: 17.2,
    },
    // Agregar más datos según sea necesario
  ];

  const handleBuscarReporte = () => {
    // Filtrar los datos según los criterios de búsqueda
    const filtrado = data.filter((item) => {
      return (
        (filtroDni === "" || item.dni.includes(filtroDni)) &&
        (filtroNombre === "" || item.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) &&
        (filtroGrado === "" || item.grado === filtroGrado) &&
        (filtroSeccion === "" || item.seccion === filtroSeccion) &&
        (filtroCurso === "" || item.curso.toLowerCase().includes(filtroCurso.toLowerCase())) &&
        (filtroTurno === "" || item.turno === filtroTurno) &&
    
        (filtroBimestre === "" || item.bimestre === filtroBimestre)
      );
    });
    setDataFiltrada(filtrado);
  };

  const handleExportarPDF = () => {
    // Lógica para exportar a PDF
    message.info("Exportando a PDF...");

    const doc = new jsPDF();
    doc.text("Reporte de Notas", 20, 10);
    doc.autoTable({
      head: [
        [
          "DNI",
          "Nombre",
          "Apellido",
          "Grado",
          "Sección",
          "Curso",
          "Turno",
          "Bimestre",
          "Promedio",
        ],
      ],
      body: dataFiltrada.map((item) => [
        item.dni,
        item.nombre,
        item.apellido,
        item.grado,
        item.seccion,
        item.curso,
        item.turno,
        item.bimestre,
        item.promedio,
      ]),
    });
    doc.save("reporte_notas.pdf");
  };

  const handleExportarExcel = () => {
    // Lógica para exportar a Excel
    message.info("Exportando a Excel...");

    const worksheet = XLSX.utils.json_to_sheet(dataFiltrada);
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
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
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
      title: "Bimestre",
      dataIndex: "bimestre",
      key: "bimestre",
    },
    {
      title: "Promedio",
      dataIndex: "promedio",
      key: "promedio",
    },
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
            </Select>
        
            <Select
              placeholder="Bimestre"
              style={{ width: 120 }}
              value={filtroBimestre}
              onChange={(value) => setFiltroBimestre(value)}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
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
          <Table columns={columns} dataSource={dataFiltrada} pagination={false} />
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportesNotas;
