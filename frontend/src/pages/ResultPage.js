import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const user = location.state || {};

  return (
    <Box style={{ textAlign: "center", padding: 50 }}>
      <Typography variant="h3">Verification Successful</Typography>
      <Typography variant="h5">Welcome, {user.username || "User"}!</Typography>
    </Box>
  );
};

export default ResultPage;
