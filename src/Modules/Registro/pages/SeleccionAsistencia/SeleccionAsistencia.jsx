import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../../components/ComposicionPagina';
import { FaBook, FaChalkboardTeacher, FaGraduationCap, FaSchool } from 'react-icons/fa';
import './SeleccionAsistencia.css';

const SeleccionAsistencia = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedSeccion, setSelectedSeccion] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('');
  const [selectedAula, setSelectedAula] = useState('');

  const navigate = useNavigate();

  const handleSelect = (option, setOption) => {
    setSelectedOption(option);
    setOption('');
  };

  const handleEnter = () => {
    navigate('/asistencia');
  };

  return (
    <PageLayout>
      <div className="container">
        <h1>Elija el curso al cual evaluará</h1>
        <div className="cards">
          <div className="card" onClick={() => handleSelect('curso', setSelectedCurso)}>
            <FaBook size={50} />
            <h2>Curso</h2>
          </div>
          {selectedOption === 'curso' && (
            <div className="dropdown">
              <select value={selectedCurso} onChange={(e) => setSelectedCurso(e.target.value)}>
                <option value="">Seleccione un curso</option>
                <option value="curso1">Curso 1</option>
                <option value="curso2">Curso 2</option>
              </select>
            </div>
          )}

          <div className="card" onClick={() => handleSelect('seccion', setSelectedSeccion)}>
            <FaSchool size={50} />
            <h2>Sección</h2>
          </div>
          {selectedOption === 'seccion' && (
            <div className="dropdown">
              <select value={selectedSeccion} onChange={(e) => setSelectedSeccion(e.target.value)}>
                <option value="">Seleccione una sección</option>
                <option value="seccion1">Sección 1</option>
                <option value="seccion2">Sección 2</option>
              </select>
            </div>
          )}

          <div className="card" onClick={() => handleSelect('grado', setSelectedGrado)}>
            <FaGraduationCap size={50} />
            <h2>Grado</h2>
          </div>
          {selectedOption === 'grado' && (
            <div className="dropdown">
              <select value={selectedGrado} onChange={(e) => setSelectedGrado(e.target.value)}>
                <option value="">Seleccione un grado</option>
                <option value="grado1">Grado 1</option>
                <option value="grado2">Grado 2</option>
              </select>
            </div>
          )}

          <div className="card" onClick={() => handleSelect('aula', setSelectedAula)}>
            <FaChalkboardTeacher size={50} />
            <h2>Aula</h2>
          </div>
          {selectedOption === 'aula' && (
            <div className="dropdown">
              <select value={selectedAula} onChange={(e) => setSelectedAula(e.target.value)}>
                <option value="">Seleccione un aula</option>
                <option value="aula1">Aula 1</option>
                <option value="aula2">Aula 2</option>
              </select>
            </div>
          )}
        </div>
        <div className="enter-button">
          <button className="btn-enter" onClick={handleEnter}>Entrar</button>
        </div>
      </div>
    </PageLayout>
  );
};

export default SeleccionAsistencia;
