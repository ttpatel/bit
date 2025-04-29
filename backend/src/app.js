import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Set up CORS to allow requests from your frontend
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN, // Allow requests from the frontend URL
//     credentials: true, // Allow credentials like cookies and tokens
//   })
// );
app.use(
  cors({
    origin: "*", // <-- for local testing only; tighten later for production
    credentials: true,
  })
);

// Set up body parsers for JSON and URL-encoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies in incoming requests
app.use(cookieParser());

// Import and use the user routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/", userRouter);

// Error Handling Middleware (optional)
import { ApiResponse } from "./utils/ApiResponse.js"; // Your ApiResponse class for structured responses
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, null, message));
});

export { app };
