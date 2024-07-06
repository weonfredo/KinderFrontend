import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../../../../components/ComposicionPagina/Layout';

function Pagos() {
  const location = useLocation();
  const navigate = useNavigate();
  const alumno = location.state?.alumno;

  if (!alumno) {
    // Si no hay datos del alumno, redirigir a la página anterior o mostrar un mensaje de error
    return (
      <PageLayout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Error</h2>
          <p>No se encontraron los detalles del alumno. Por favor, vuelve a intentarlo.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </PageLayout>
    );
  }

  const handlePago = () => {
    // Aquí iría la lógica para procesar el pago
    console.log(`Procesando pago para el alumno: ${alumno.nombres} ${alumno.apellidos}`);
    // Una vez procesado el pago, puedes redirigir al usuario a otra página o mostrar un mensaje de confirmación
    navigate('/confirmacion-pago');
  };

  return (
    <PageLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Pago de Deuda</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Detalles del Alumno</h3>
          <p><strong>DNI:</strong> {alumno.dni}</p>
          <p><strong>Nombres:</strong> {alumno.nombres}</p>
          <p><strong>Apellidos:</strong> {alumno.apellidos}</p>
          <p><strong>Fecha de Nacimiento:</strong> {new Date(alumno.fecha_nacimiento).toLocaleDateString()}</p>
          <p><strong>Sexo:</strong> {alumno.sexo}</p>
          <p><strong>Lugar de Nacimiento:</strong> {alumno.lugar_nacimiento}</p>
          <p><strong>Dirección:</strong> {alumno.direccion}</p>
          <p><strong>Estado Financiero:</strong> {alumno.estado_financiero}</p>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={handlePago}
            >
              Realizar Pago
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Pagos;
