import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Loader from "../components/Loader.js";
import Button from "../components/Button.js";
import { Box, Typography } from "@mui/material";

const StartPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setLoading(true);
    try {
      const res = await api.get("/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        navigate("/scanner");
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ textAlign: "center", padding: 50 }}>
      <Typography variant="h2">Welcome to Palm Vein App</Typography>
      {loading ? <Loader /> : <Button text="Next" onClick={handleNext} />}
    </Box>
  );
};

export default StartPage;
