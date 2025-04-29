// src/components/Button.js
import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ text, onClick, disabled = false, sx = {} }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      sx={{ padding: "10px 20px", margin: "10px", ...sx }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
