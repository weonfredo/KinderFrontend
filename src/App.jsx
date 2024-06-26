import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IniciarSesion from "./Modules/Seguridad/pages/Iniciar Sesion/IniciarSesion";
import PaginaPrincipal from "./Modules/Seguridad/pages/Pagina Principal";
import Registrarse from "./Modules/Seguridad/pages/Registrarse/Registrarse";
import ReportesAsistencia from "./Modules/reportes/pages/ReportesAsistencia";
import ReportesNotas from "./Modules/reportes/pages/ReportesNotas"
import FormularioAlumno from "./Modules/Matricula/pages/RegistrarAlumno/FormularioAlumno";

import Caja from "./Modules/Caja/pages/caja";
import ControlEstudiante from "./Modules/Caja/pages/controlEstudiante";
import Pagos from "./Modules/Caja/pages/pagos"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/home" element={<PaginaPrincipal />} />
        <Route path="/register" element={<Registrarse />} />
        <Route path="/reportesasistencia" element={<ReportesAsistencia />} />
        <Route path="/reportesnotas" element={<ReportesNotas/>}/>
        <Route path="/notas" element={<ReportesNotas/>}/>
        <Route path="/inscribiralumno" element={<FormularioAlumno/>}/>
        <Route path="/caja" element={<Caja />} />
        <Route path="/controlestudiantes" element={<ControlEstudiante />} />
        <Route path="/pagos" element={<Pagos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
