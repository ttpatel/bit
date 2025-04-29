// src/components/InputField.js
import React from "react";
import { TextField } from "@mui/material";

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  sx = {},
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      fullWidth
      sx={{ marginBottom: 2, ...sx }}
    />
  );
};

export default InputField;
