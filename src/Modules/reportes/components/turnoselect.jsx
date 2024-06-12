import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const TurnoSelect = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" className='w-28 '>
      <InputLabel id="select-turno-label">Turno</InputLabel>
      <Select
        labelId="select-turno-label"
        value={value}
        onChange={onChange}
        label="Turno"
      >
        <MenuItem value=""><em>Ninguno</em></MenuItem>
        <MenuItem value="Mañana">Mañana</MenuItem>
        <MenuItem value="Tarde">Tarde</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TurnoSelect;
