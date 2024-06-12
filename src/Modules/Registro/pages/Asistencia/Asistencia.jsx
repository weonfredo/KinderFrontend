import React from 'react'
import PageLayout from "../../../../components/ComposicionPagina";
import './Asistencia.css';

  
  const Asistencia = () => (

     <PageLayout>
      <div className="container">
      <div className='h1-container'>
            Registro de Asistencias
        </div>
        <div className="header">
          <div className="date-picker">
            <label htmlFor="date">Fecha</label>
            <input type="date" id="date" defaultValue="2021-03-31" />
          </div>
          <button className="save-btn">Guardar</button>
        </div>
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Buscar alumnos..."
            className="px-4 py-2 border rounded-lg w-full max-w-lg"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="controls">
          <button className="mark-all">Marcar todos</button>
          <button className="unmark-all">Desmarcar todos</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Aula</th>
              <th>Turno</th>
              <th>Asistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Leon Scott</td>
              <td>Kennedy</td>
              <td>A1</td>
              <td>Mañana</td>
              <td><input type="checkbox" defaultChecked /></td>
            </tr>
            <tr>
              <td>Doom</td>
              <td>Slayer</td>
              <td>A2</td>
              <td>Mañana</td>
              <td><input type="checkbox" defaultChecked /></td>
            </tr>
            <tr>
              <td>Hades</td>
              <td>Thor</td>
              <td>A3</td>
              <td>Tarde</td>
              <td><input type="checkbox" defaultChecked /></td>
            </tr>
            <tr>
              <td>Cuphead</td>
              <td>Maribel</td>
              <td>A4</td>
              <td>Mañana</td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td>Claire Redfield</td>
              <td>Tomasa</td>
              <td>A5</td>
              <td>Tarde</td>
              <td><input type="checkbox" defaultChecked /></td>
            </tr>
            <tr>
              <td>Link</td>
              <td>Failure</td>
              <td>A6</td>
              <td>Mañana</td>
              <td><input type="checkbox" defaultChecked /></td>
            </tr>
          </tbody>
        </table>
      </div>

    </PageLayout>
  );
  
  export default Asistencia;