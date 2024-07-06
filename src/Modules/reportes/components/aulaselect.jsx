import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AulaSelect = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" className='w-28'>
      <InputLabel id="select-aula-label">Aula</InputLabel>
      <Select
        labelId="select-aula-label"
        value={value}
        onChange={onChange}
        label="Aula"
      >
        <MenuItem value=""><em>Ninguna</em></MenuItem>
        <MenuItem value="Aula 1">Aula 1</MenuItem>
        <MenuItem value="Aula 2">Aula 2</MenuItem>
        <MenuItem value="Aula 3">Aula 3</MenuItem>
        <MenuItem value="Aula 4">Aula 4</MenuItem>
        <MenuItem value="Aula 5">Aula 5</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AulaSelect;
