import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../../components/ComposicionPagina/Layout';
import mockAlumnos from './mockData'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function Caja() {
  const [alumnos, setAlumnos] = useState([]);
  const [showAperturaModal, setShowAperturaModal] = useState(false);
  const [showCierreModal, setShowCierreModal] = useState(false);
  const [cajaAbierta, setCajaAbierta] = useState(false); // Estado para controlar si la caja está abierta
  const [turnoCaja, setTurnoCaja] = useState({
    saldoInicial: '',
    saldoFinal: '',
    fechaHoraInicio: null,
    fechaHoraFin: null,
    cajaId: 1 // Suponiendo que es la caja 1
  });

  const usuario = "NombreUsuario"; // Suponiendo que tenemos el nombre del usuario
  const navigate = useNavigate(); // Utilizamos useNavigate para la navegación

  useEffect(() => {
    // Simulando una llamada a la API utilizando los datos de ejemplo
    setAlumnos(mockAlumnos);
  }, []);

  // Manejar apertura de caja
  const handleOpenAperturaModal = () => {
    if (cajaAbierta) {
      alert('La caja ya está abierta. Debe cerrarla antes de abrir una nueva.');
      return;
    }
    const now = new Date();
    setTurnoCaja({ ...turnoCaja, fechaHoraInicio: now });
    setShowAperturaModal(true);
  };

  // Manejar cierre de caja
  const handleOpenCierreModal = () => {
    if (!cajaAbierta) {
      alert('No hay ninguna caja abierta para cerrar.');
      return;
    }
    const now = new Date();
    setTurnoCaja({ ...turnoCaja, fechaHoraFin: now });
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
    console.log('Caja abierta:', turnoCaja);
    handleCloseTurnoModal();
  };

  // Manejar el envío del formulario de cierre de caja
  const handleCierreSubmit = (e) => {
    e.preventDefault();
    setCajaAbierta(false); // Marcar la caja como cerrada
    console.log('Caja cerrada:', turnoCaja);
    handleCloseTurnoModal();
  };

  const getTurnoNombre = (time) => {
    if (!time) {
      return "Hora no definida";
    }
  
    const hour = time.getHours();
    if (hour >= 7 && hour < 12) {
      return "Mañana";
    } else if (hour >= 12 && hour < 17) {
      return "Tarde";
    } else {
      return "Noche";
    }
  };

  // Manejar la navegación a la pantalla de pagos
  const handleNavigateToPagos = (alumno) => {
    navigate('/pagos', { state: { alumno } }); // Ajusta '/pagos' según tu configuración de rutas
  };

  return (
    <PageLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Gestión de Caja</h2>
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Hola, {usuario}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            onClick={handleOpenAperturaModal}
          >
            Apertura de Caja
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            onClick={handleOpenCierreModal}
          >
            Cierre de Caja
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">DNI</th>
                <th className="py-3 px-6 text-left">Nombres</th>
                <th className="py-3 px-6 text-left">Apellidos</th>
                <th className="py-3 px-6 text-left">Fecha Nacimiento</th>
                <th className="py-3 px-6 text-left">Sexo</th>
                <th className="py-3 px-6 text-left">Lugar Nacimiento</th>
                <th className="py-3 px-6 text-left">Dirección</th>
                <th className="py-3 px-6 text-left">Estado Financiero</th>
                <th className="py-3 px-6 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {alumnos.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-3 px-6 text-center">No hay alumnos registrados</td>
                </tr>
              ) : (
                alumnos.map((alumno, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${
                      alumno.estado_financiero === 'Deudor' ? 'bg-red-100' : ''
                    }`}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">{alumno.dni}</td>
                    <td className="py-3 px-6 text-left">{alumno.nombres}</td>
                    <td className="py-3 px-6 text-left">{alumno.apellidos}</td>
                    <td className="py-3 px-6 text-left">{new Date(alumno.fecha_nacimiento).toLocaleDateString()}</td>
                    <td className="py-3 px-6 text-left">{alumno.sexo}</td>
                    <td className="py-3 px-6 text-left">{alumno.lugar_nacimiento}</td>
                    <td className="py-3 px-6 text-left">{alumno.direccion}</td>
                    <td className="py-3 px-6 text-left">{alumno.estado_financiero}</td>
                    <td className="py-3 px-6 text-left">
                      <button
                        className={`px-2 py-1 text-white rounded-lg ${
                          alumno.estado_financiero === 'Deudor' ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        onClick={() => handleNavigateToPagos(alumno)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showAperturaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-semibold mb-4">Apertura de Caja</h3>
              <p><strong>Caja ID:</strong> {turnoCaja.cajaId}</p>
              <p><strong>Turno:</strong> {getTurnoNombre(turnoCaja.fechaHoraInicio)}</p>
              <form onSubmit={handleAperturaSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Saldo Inicial:</label>
                  <input
                    type="number"
                    name="saldoInicial"
                    value={turnoCaja.saldoInicial}
                    onChange={handleTurnoInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Hora de Inicio:</label>
                  <input
                    type="text"
                    name="fechaHoraInicio"
                    value={new Date(turnoCaja.fechaHoraInicio).toLocaleTimeString()}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={handleCloseTurnoModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Abrir Caja
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showCierreModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-semibold mb-4">Cierre de Caja</h3>
              <p><strong>Caja ID:</strong> {turnoCaja.cajaId}</p>
              <p><strong>Turno:</strong> {getTurnoNombre(turnoCaja.fechaHoraInicio)}</p>
              <form onSubmit={handleCierreSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Saldo Final:</label>
                  <input
                    type="number"
                    name="saldoFinal"
                    value={turnoCaja.saldoFinal}
                    onChange={handleTurnoInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Hora de Inicio:</label>
                  <input
                    type="text"
                    name="fechaHoraInicio"
                    value={new Date(turnoCaja.fechaHoraInicio).toLocaleTimeString()}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Hora de Fin:</label>
                  <input
                    type="text"
                    name="fechaHoraFin"
                    value={new Date(turnoCaja.fechaHoraFin).toLocaleTimeString()}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Saldo Inicial:</label>
                  <input
                    type="text"
                    name="saldoInicial"
                    value={turnoCaja.saldoInicial}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={handleCloseTurnoModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Cerrar Caja
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default Caja;
