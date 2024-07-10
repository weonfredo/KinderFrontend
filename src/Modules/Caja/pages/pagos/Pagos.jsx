import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import PageLayout from "../../../../components/ComposicionPagina/Layout";

const { Text } = Typography;

const Pagos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alumno = location.state?.alumno;

  const handlePago = () => {
    // Aquí iría la lógica para procesar el pago
    console.log(
      `Procesando pago para el alumno: ${alumno.nombres} ${alumno.apellidos}`
    );
    // Una vez procesado el pago, puedes redirigir al usuario a otra página o mostrar un mensaje de confirmación
    navigate("/confirmacion-pago");
  };

  if (!alumno) {
    // Si no hay datos del alumno, redirigir a la página anterior o mostrar un mensaje de error
    return (
      <PageLayout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <Typography.Title level={2} className="text-gray-700 mb-6">
            Error
          </Typography.Title>
          <Text>
            No se encontraron los detalles del alumno. Por favor, vuelve a
            intentarlo.
          </Text>
          <Button type="primary" className="mt-4" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <Typography.Title level={2} className="text-gray-700 mb-6">
          Pago de Deuda
        </Typography.Title>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Typography.Title level={3} className="mb-4">
            Detalles del Alumno
          </Typography.Title>
          <p>
            <strong>DNI:</strong> {alumno.dni}
          </p>
          <p>
            <strong>Nombres:</strong> {alumno.nombres}
          </p>
          <p>
            <strong>Apellidos:</strong> {alumno.apellidos}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {new Date(alumno.fecha_nacimiento).toLocaleDateString()}
          </p>
          <p>
            <strong>Sexo:</strong> {alumno.sexo}
          </p>
          <p>
            <strong>Lugar de Nacimiento:</strong> {alumno.lugar_nacimiento}
          </p>
          <p>
            <strong>Dirección:</strong> {alumno.direccion}
          </p>
          <p>
            <strong>Estado Financiero:</strong> {alumno.estado_financiero}
          </p>
          <div className="mt-4 flex justify-end space-x-4">
            <Button type="primary" className="rounded-lg" onClick={handlePago}>
              Realizar Pago
            </Button>
            <Button danger className="rounded-lg" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pagos;
