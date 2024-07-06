import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const GradoSelect = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" className='w-28 '>
      <InputLabel id="select-grado-label">Grado</InputLabel>
      <Select
        labelId="select-grado-label"
        value={value}
        onChange={onChange}
        label="Grado"
      >
        <MenuItem value=""><em>Ninguno</em></MenuItem>
        <MenuItem value="Primero">Primero</MenuItem>
        <MenuItem value="Segundo">Segundo</MenuItem>
        <MenuItem value="Tercero">Tercero</MenuItem>
        <MenuItem value="Cuarto">Cuarto</MenuItem>
        <MenuItem value="Quinto">Quinto</MenuItem>
      </Select>
    </FormControl>
  );
};

export default GradoSelect;