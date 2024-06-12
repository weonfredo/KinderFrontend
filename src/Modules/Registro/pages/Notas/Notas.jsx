import React from 'react'
import PageLayout from "../../../../components/ComposicionPagina";
import './Notas.css'

const Notas = () => (
    <PageLayout>

<div className="container">
    <header className="header flex justify-between items-center">
        <div>
            <h1>Registro de Notas</h1>
            <h2>Grupo Los Chamaquitos</h2>
        </div>
        <button className="students-list-btn">Lista de alumnos</button>
    </header>
    <div className="block-selection">
        <label htmlFor="block">Selecciona el <span className="highlight">bloque</span> que deseas gestionar</label>
        <div className="block-controls">
            <select id="block">
                <option>1 Bimestre</option>
                <option>2 Bimestre</option>
                <option>3 Bimestre</option>
            </select>
            <button className="load-block-btn">Cargar bloque</button>
        </div>
    </div>
    <div className="mb-4 flex justify-between items-center"> 
        <input
            type="text"
            placeholder="Buscar alumnos..."
            className="px-4 py-2 border rounded-lg w-full max-w-lg"
            onChange={e => setSearchTerm(e.target.value)}
        />
    </div>
        <table className="grades-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>C1</th>
              <th>C2</th>
              <th>C3</th>
              <th>C4</th>
              <th>C5</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ismael</td>
              <td>Perez</td>
              <td><input type="text" value="A" readOnly /></td>
              <td><input type="text" value="AD" readOnly /></td>
              <td><input type="text" value="B" readOnly /></td>
              <td><input type="text" value="C" readOnly /></td>
              <td><input type="text" value="C" readOnly /></td>
              
            </tr>
            <tr>
              <td>2</td>
              <td>Ricardo</td>
              <td>Bazan</td>
              <td><input type="text" value="A" readOnly /></td>
              <td><input type="text" value="A" readOnly /></td>
              <td><input type="text" value="A" readOnly /></td>
              <td><input type="text" value="B" readOnly /></td>
              <td><input type="text" value="C" readOnly /></td>
              
            </tr>
            <tr>
              <td>3</td>
              <td>Jonathan</td>
              <td>Sanchez</td>
              <td><input type="text" value="A" readOnly /></td>
              <td><input type="text" value="B" readOnly /></td>
              <td><input type="text" value="C" readOnly /></td>
              <td><input type="text" value="C" readOnly /></td>
              <td><input type="text" value="B" readOnly /></td>
              
            </tr>
            <tr>
              <td>4</td>
              <td>Ricardo</td>
              <td>Bazan</td>
              <td><input type="text" value="AD" readOnly /></td>
              <td><input type="text" value="AD" readOnly /></td>
              <td><input type="text" value="A" readOnly /></td>
              <td><input type="text" value="A" readOnly /></td>
              <td><input type="text" value="B" readOnly /></td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </PageLayout>    
);
export default Notas;