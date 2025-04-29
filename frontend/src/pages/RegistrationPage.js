import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import api from "../api.js";
import InputField from "../components/InputField.js";
import Button from "../components/Button.js";
import Loader from "../components/Loader.js";
import { Box, Typography } from "@mui/material";

const RegisterPage = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [corpCode, setCorpCode] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setError(""); // Clear previous errors
  };

  const handleRegister = async () => {
    if (!corpCode) {
      setError("Corp Code is required.");
      return;
    }

    if (!capturedImage) {
      setError("Please capture an image before registering.");
      return;
    }

    // Convert the base64 image to a Blob
    const blob = await fetch(capturedImage).then((res) => res.blob());

    const formData = new FormData();
    formData.append("corpCode", corpCode); // Append corpCode to formData
    formData.append("palmImage", blob, "palmImage.jpg");

    setLoading(true);
    try {
      await api.post("http://localhost:8000/api/v1/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set content type to multipart/form-data
      });
      navigate("/scanner");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", padding: 3 }}>
      <Typography variant="h4" mb={2}>
        Register User
      </Typography>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        style={{ borderRadius: "10px" }}
      />

      {capturedImage && (
        <Box mt={2}>
          <Typography variant="subtitle1">Captured Image Preview:</Typography>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ marginTop: 10, width: 200, borderRadius: 10 }}
          />
        </Box>
      )}

      <Box mt={3}>
        <InputField
          label="Corp Code"
          value={corpCode}
          onChange={(e) => setCorpCode(e.target.value)}
        />
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
        >
          <Button text="Capture Image" onClick={handleCapture} />
          <Button text="Register User" onClick={handleRegister} />
        </Box>
      )}

      {error && (
        <Typography variant="body2" color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default RegisterPage;
