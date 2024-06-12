import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PeriodoSelect = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined">
      <InputLabel id="select-periodo-label">Período</InputLabel>
      <Select
        labelId="select-periodo-label"
        value={value}
        onChange={onChange}
        label="Período"
      >
        <MenuItem value=""><em>Ninguno</em></MenuItem>
        <MenuItem value="Bimestre 1">Bimestre 1</MenuItem>
        <MenuItem value="Bimestre 2">Bimestre 2</MenuItem>
        <MenuItem value="Bimestre 3">Bimestre 3</MenuItem>
        <MenuItem value="Bimestre 4">Bimestre 4</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PeriodoSelect;
