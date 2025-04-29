// src/pages/TokenVerificationPage.js
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import api from "../api";
import CustomButton from "../components/Button";

const TokenVerificationPage = () => {
  const [tokenStatus, setTokenStatus] = useState("Token required");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTokenStatus("Token is missing");
      return;
    }

    api
      .get("/verify-token")
      .then(() => setTokenStatus("Token is valid"))
      .catch(() => setTokenStatus("Invalid token"));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Typography variant="h4">Token Verification</Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {tokenStatus}
      </Typography>
      <CustomButton
        text="Go to Start"
        onClick={() => (window.location.href = "/")}
        sx={{ marginTop: 3 }}
      />
    </Box>
  );
};

export default TokenVerificationPage;
