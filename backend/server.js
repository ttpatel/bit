import express from "express";
import cors from "cors"; // Import cors

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); // Enable CORS for all routes

app.get("/api/v1/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
