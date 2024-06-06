import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Inputs({ label, type, name, menssage }) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      rules={[
        {
          required: true,
          message: { menssage },
        },
      ]}
    >
      <TextField
        id="standard-basic"
        label={label}
        type={type}
        name={name}
        rules={[
          {
            required: true,
            message: { menssage },
          },
        ]}
      />
    </Box>
  );
}
