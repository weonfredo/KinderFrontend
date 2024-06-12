import React from 'react';
import PageLayout from '../../../components/ComposicionPagina/Layout';
import Example from '../components/buscador';
import Imputfecha from '../components/imputfecha';
import GradoSelect from  '../components/gradoselect';
import AulaSelect from '../components/aulaselect';
import TurnoSelect from '../components/turnoselect';

function ReportesAsistencia() {
  return (
    <PageLayout> 
      <div className='relative' > 
      <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'black', fontSize: '32px', fontWeight: 'bold' }}>
        REPORTES DE ASISTENCIA
      </h2>
      <GradoSelect/>
      <AulaSelect/>
      <TurnoSelect/>
      <Imputfecha/>
      <Example /></div>
    </PageLayout>
  );
}

export default ReportesAsistencia;