import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../../components/ComposicionPagina/Layout';
import mockAlumnos from './mockData'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function ControlEstudiantes() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombreTerm, setNombreTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de elementos por página
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);

  const usuario = "NombreUsuario"; // Suponiendo que tenemos el nombre del usuario
  const navigate = useNavigate(); // Utilizamos useNavigate para la navegación

  useEffect(() => {
    // Simulando una llamada a la API utilizando los datos de ejemplo
    setAlumnos(mockAlumnos);
  }, []);

  // Filtrado de alumnos basado en el término de búsqueda del nombre
  const filteredAlumnos = alumnos.filter(alumno =>
    alumno.nombres.toLowerCase().includes(nombreTerm.toLowerCase())
  );

  // Obtener los alumnos actuales para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlumnos = filteredAlumnos.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Manejar la apertura del modal y seleccionar alumno
  const handleOpenModal = (alumno) => {
    setSelectedAlumno(alumno);
    setShowModal(true);
  };

  // Manejar el cierre del modal
  const handleCloseModal = () => {
    setSelectedAlumno(null);
    setShowModal(false);
  };

  // Manejar la navegación a la pantalla de pagos
  const handleNavigateToPagos = (alumno) => {
    navigate('/pagos', { state: { alumno } }); // Ajusta '/pagos' según tu configuración de rutas
  };

  return (
    <PageLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Control de Estudiantes</h2>
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Hola, {usuario}</span>
        </div>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Filtrar por nombre"
            className="px-4 py-2 border rounded-lg"
            onChange={e => setNombreTerm(e.target.value)}
          />
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
              {currentAlumnos.map(alumno => (
                <tr
                  key={alumno.id}
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
                      onClick={() => handleOpenModal(alumno)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredAlumnos.length}
          >
            Siguiente
          </button>
        </div>
        
        {showModal && selectedAlumno && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-semibold mb-4">Detalles del Alumno</h3>
              <p><strong>DNI:</strong> {selectedAlumno.dni}</p>
              <p><strong>Nombres:</strong> {selectedAlumno.nombres}</p>
              <p><strong>Apellidos:</strong> {selectedAlumno.apellidos}</p>
              <p><strong>Fecha de Nacimiento:</strong> {new Date(selectedAlumno.fecha_nacimiento).toLocaleDateString()}</p>
              <p><strong>Sexo:</strong> {selectedAlumno.sexo}</p>
              <p><strong>Lugar de Nacimiento:</strong> {selectedAlumno.lugar_nacimiento}</p>
              <p><strong>Dirección:</strong> {selectedAlumno.direccion}</p>
              <p><strong>Estado Financiero:</strong> {selectedAlumno.estado_financiero}</p>
              <div className="mt-4 flex justify-end space-x-4">
                {selectedAlumno.estado_financiero === 'Deudor' && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => handleNavigateToPagos(selectedAlumno)}
                  >
                    Pagar
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default ControlEstudiantes;
