import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Input, Table } from "antd";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import PageLayout from "../../../../components/ComposicionPagina/Layout";
import mockAlumnos from "./mockData"; // Ajusta la ruta según tu estructura de archivos

function Caja() {
  const [alumnos, setAlumnos] = useState([]);
  const [showAperturaModal, setShowAperturaModal] = useState(false);
  const [showCierreModal, setShowCierreModal] = useState(false);
  const [cajaAbierta, setCajaAbierta] = useState(false); // Estado para controlar si la caja está abierta
  const [turnoCaja, setTurnoCaja] = useState({
    saldoInicial: "",
    saldoFinal: "",
    fechaHoraInicio: null,
    fechaHoraFin: null,
    cajaId: 1, // Suponiendo que es la caja 1
  });

  const usuario = "NombreUsuario"; // Suponiendo que tenemos el nombre del usuario
  const navigate = useNavigate(); // Utilizamos useNavigate para la navegación

  useEffect(() => {
    // Simulando una llamada a la API utilizando los datos de ejemplo
    setAlumnos(
      mockAlumnos.map((alumno) => ({
        ...alumno,
        tipoMovimiento: Math.random() > 0.5 ? "Ingreso" : "Egreso",
        monto: Math.random() * 1000,
      }))
    );
  }, []);

  // Manejar apertura de caja
  const handleOpenAperturaModal = () => {
    if (cajaAbierta) {
      Modal.error({
        title: "Caja ya abierta",
        content:
          "La caja ya está abierta. Debe cerrarla antes de abrir una nueva.",
      });
      return;
    }
    const now = new Date();
    setTurnoCaja({ ...turnoCaja, fechaHoraInicio: now });
    setShowAperturaModal(true);
  };

  // Manejar cierre de caja
  const handleOpenCierreModal = () => {
    if (!cajaAbierta) {
      Modal.error({
        title: "No hay caja abierta",
        content: "No hay ninguna caja abierta para cerrar.",
      });
      return;
    }
    // Calcular saldo final sumando saldo inicial, montos de ingreso y egreso
    const saldoFinal =
      parseFloat(turnoCaja.saldoInicial) +
      alumnos.reduce((total, alumno) => {
        if (alumno.tipoMovimiento === "Ingreso") {
          return total + alumno.monto;
        } else {
          return total - alumno.monto;
        }
      }, 0);
    setTurnoCaja({ ...turnoCaja, saldoFinal: saldoFinal.toFixed(2) });
    setShowCierreModal(true);
  };

  // Manejar el cierre del modal de apertura/cierre de caja
  const handleCloseTurnoModal = () => {
    setShowAperturaModal(false);
    setShowCierreModal(false);
  };

  // Manejar cambios en el formulario de apertura/cierre de caja
  const handleTurnoInputChange = (e) => {
    const { name, value } = e.target;
    setTurnoCaja({ ...turnoCaja, [name]: value });
  };

  // Manejar el envío del formulario de apertura de caja
  const handleAperturaSubmit = (e) => {
    e.preventDefault();
    setCajaAbierta(true); // Marcar la caja como abierta
    console.log("Caja abierta:", turnoCaja);
    handleCloseTurnoModal();
  };

  // Manejar el envío del formulario de cierre de caja
  const handleCierreSubmit = (e) => {
    e.preventDefault();
    setCajaAbierta(false); // Marcar la caja como cerrada
    console.log("Caja cerrada:", turnoCaja);
    handleCloseTurnoModal();

    // Exportar a Excel
    exportToExcel();
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    console.log("Exportando a Excel...");
    const dataExport = alumnos.map((alumno) => ({
      DNI: alumno.dni,
      Nombres: alumno.nombres,
      Apellidos: alumno.apellidos,
      "Fecha Nacimiento": alumno.fecha_nacimiento,
      Sexo: alumno.sexo,
      "Lugar Nacimiento": alumno.lugar_nacimiento,
      Dirección: alumno.direccion,
      "Estado Financiero": alumno.estado_financiero,
      "Tipo Movimiento": alumno.tipoMovimiento,
      Monto: alumno.monto.toFixed(2),
    }));

    const ws = XLSX.utils.json_to_sheet(dataExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "reporte_alumnos.xlsx");
  };

  return (
    <PageLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Gestión de Caja
        </h2>
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Hola, {usuario}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <Button type="primary" onClick={handleOpenAperturaModal}>
            Apertura de Caja
          </Button>
          <Button type="primary" onClick={handleOpenCierreModal}>
            Cierre de Caja
          </Button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <Table
            dataSource={alumnos}
            columns={[
              { title: "DNI", dataIndex: "dni", key: "dni" },
              { title: "Nombres", dataIndex: "nombres", key: "nombres" },
              { title: "Apellidos", dataIndex: "apellidos", key: "apellidos" },
              {
                title: "Fecha Nacimiento",
                dataIndex: "fecha_nacimiento",
                key: "fecha_nacimiento",
              },
              { title: "Sexo", dataIndex: "sexo", key: "sexo" },
              {
                title: "Lugar Nacimiento",
                dataIndex: "lugar_nacimiento",
                key: "lugar_nacimiento",
              },
              { title: "Dirección", dataIndex: "direccion", key: "direccion" },
              {
                title: "Estado Financiero",
                dataIndex: "estado_financiero",
                key: "estado_financiero",
              },
              {
                title: "Tipo Movimiento",
                dataIndex: "tipoMovimiento",
                key: "tipoMovimiento",
              },
              {
                title: "Monto",
                dataIndex: "monto",
                key: "monto",
                render: (_, record) => (
                  <span>
                    {record.tipoMovimiento === "Ingreso"
                      ? `$${record.monto.toFixed(2)}`
                      : `-$${record.monto.toFixed(2)}`}
                  </span>
                ),
              },
            ]}
          />
        </div>

        <Modal
          visible={showAperturaModal}
          title="Apertura de Caja"
          onCancel={handleCloseTurnoModal}
          footer={[
            <Button key="cancel" onClick={handleCloseTurnoModal}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={handleAperturaSubmit}>
              Aperturar
            </Button>,
          ]}
        >
          <form onSubmit={handleAperturaSubmit}>
            <div className="mb-4">
              <label
                htmlFor="saldoInicial"
                className="block text-sm font-medium text-gray-700"
              >
                Saldo Inicial
              </label>
              <Input
                id="saldoInicial"
                name="saldoInicial"
                type="number"
                step="0.01"
                value={turnoCaja.saldoInicial}
                onChange={handleTurnoInputChange}
                required
              />
            </div>
          </form>
        </Modal>

        <Modal
          visible={showCierreModal}
          title="Cierre de Caja"
          onCancel={handleCloseTurnoModal}
          footer={[
            <Button key="cancel" onClick={handleCloseTurnoModal}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={handleCierreSubmit}>
              Cerrar
            </Button>,
          ]}
        >
          <form onSubmit={handleCierreSubmit}>
            <div className="mb-4">
              <label
                htmlFor="saldoFinal"
                className="block text-sm font-medium text-gray-700"
              >
                Saldo Final
              </label>
              <Input
                id="saldoFinal"
                name="saldoFinal"
                type="number"
                step="0.01"
                value={turnoCaja.saldoFinal}
                disabled
              />
            </div>
          </form>
        </Modal>
      </div>
    </PageLayout>
  );
}

export default Caja;
