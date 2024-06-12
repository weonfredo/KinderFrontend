import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IniciarSesion from "./Modules/Seguridad/pages/Iniciar Sesion/IniciarSesion";
import PaginaPrincipal from "./Modules/Seguridad/pages/Pagina Principal";
import Registrarse from "./Modules/Seguridad/pages/Registrarse/Registrarse";
import Asistencia from "./Modules/Registro/pages/Asistencia/Asistencia";
import Notas from "./Modules/Registro/pages/Notas/Notas";
import SeleccionNota from "./Modules/Registro/pages/SeleccionNota/SeleccionNota";
import SeleccionAsistencia from "./Modules/Registro/pages/SeleccionAsistencia/SeleccionAsistencia";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/home" element={<PaginaPrincipal />} />
        <Route path="/register" element={<Registrarse />} />
        <Route path="/seleccionasistencia" element={<SeleccionAsistencia />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/seleccionnota" element={<SeleccionNota />} />
        <Route path="/notas" element={<Notas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
