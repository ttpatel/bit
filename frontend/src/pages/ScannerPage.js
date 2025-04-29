import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import api from "../api.js";
import Button from "../components/Button.js";
import Loader from "../components/Loader.js";
import { Box, Typography } from "@mui/material";

const ScannerPage = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setError("");
  };

  const handleVerify = async () => {
    if (!capturedImage) {
      setError("Please capture an image before verifying.");
      return;
    }

    const blob = await fetch(capturedImage).then((res) => res.blob());
    const formData = new FormData();
    formData.append("palmImage", blob, "palm.jpg");

    setLoading(true);
    try {
      const res = await api.post("/verify-palm", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        navigate("/result", { state: res.data.data });
      } else {
        setError("Verification failed. Try again or Register.");
      }
    } catch (err) {
      console.error(err);
      setError("Verification error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", padding: 3 }}>
      <Typography variant="h4" mb={2}>
        Palm Vein Verification
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
          <Button text="Verify Palm" onClick={handleVerify} />
        </Box>
      )}

      <Box mt={3}>
        <a
          href="/register"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Register New User
        </a>
      </Box>

      {error && (
        <Typography variant="body2" color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ScannerPage;
