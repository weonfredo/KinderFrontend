import React from "react";
import PageLayout from '../../../components/ComposicionPagina/Layout';
import Notas from '../components/buscadorasis';
import GradoSelect from '../components/gradoselect';
import AulaSelect from "../components/aulaselect";
import TurnoSelect from "../components/turnoselect";
import CursoSelect from "../components/cursosselect";
import PeriodoSelect from "../components/periodoselect";

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
    );
  }
  export default ReportesNotas;