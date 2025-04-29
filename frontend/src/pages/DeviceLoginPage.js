import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import InputField from "../components/InputField.js";
import Button from "../components/Button.js";
import Loader from "../components/Loader.js";
import { Box, Typography } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.data.token);
      navigate("/scanner");
    } catch (err) {
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ textAlign: "center", padding: 50 }}>
      <Typography variant="h3">Device Login</Typography>
      <InputField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      {loading ? <Loader /> : <Button text="Login" onClick={handleLogin} />}
      {error && <Typography style={{ color: "red" }}>{error}</Typography>}
    </Box>
  );
};

export default LoginPage;
