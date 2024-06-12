import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CursoSelect = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined">
      <InputLabel id="select-curso-label">Curso</InputLabel>
      <Select
        labelId="select-curso-label"
        value={value}
        onChange={onChange}
        label="Curso"
      >
        <MenuItem value=""><em>Ninguno</em></MenuItem>
        <MenuItem value="Matemática">Matemática</MenuItem>
        <MenuItem value="Comunicación">Comunicación</MenuItem>
        <MenuItem value="Ciencias">Ciencias</MenuItem>
        <MenuItem value="Historia">Historia</MenuItem>
        <MenuItem value="Geografía">Geografía</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CursoSelect;
