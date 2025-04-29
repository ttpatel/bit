import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root folder where all user data will be stored
const USERS_DIR = path.join(__dirname, "../../users");
const USERS_JSON = path.join(USERS_DIR, "users.json");

// Ensure directory exists
if (!fs.existsSync(USERS_DIR)) {
  fs.mkdirSync(USERS_DIR);
}

// Helper to read users.json
const loadUsers = () => {
  if (!fs.existsSync(USERS_JSON)) return [];
  const raw = fs.readFileSync(USERS_JSON);
  return JSON.parse(raw);
};

// Helper to write to users.json
const saveUsers = (users) => {
  fs.writeFileSync(USERS_JSON, JSON.stringify(users, null, 2));
};

//Register
const registerUser = asyncHandler(async (req, res) => {
  const { corpCode } = req.body; // Expect corpCode in the request body

  // Check if corpCode and palmImage are provided
  if (!corpCode || !req.files?.palmImage) {
    throw new ApiError(400, "Corp code and palm image are required");
  }

  // File handling for palm image
  const palmImage = req.files.palmImage[0]; // Access the uploaded file

  const fileName = `${corpCode}_${palmImage.originalname}`;
  const imageDestPath = path.join(USERS_DIR, fileName); // Destination path for saving the file

  // Save the image in the specified location
  fs.renameSync(palmImage.path, imageDestPath); // Move the uploaded file to the destination path

  // Simulate saving user information to a JSON file or database (You can change this logic to your actual database)
  const users = loadUsers();
  users.push({
    corpCode,
    imagePath: imageDestPath,
  });

  saveUsers(users);

  return res
    .status(201)
    .json(new ApiResponse(200, { corpCode }, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if ([username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "Username and password are required");
  }
  // Simulate user login logic
  if (username !== "admin" || password !== "admin") {
    throw new ApiError(401, "Invalid credentials");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { token: process.env.TOKEN }, "Login successful")
    );
});

const verifyToken = asyncHandler(async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Token is required");
  }

  // Simulate token verification logic
  if (token !== process.env.TOKEN) {
    throw new ApiError(401, "Invalid token");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Token is valid"));
});

// ✅ Dummy Verify Palm Controller
const verifyPalm = asyncHandler(async (req, res) => {
  const isMatch = true; // Dummy matching logic for now

  if (isMatch) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { username: "Demo User" },
          "Palm verified successfully"
        )
      );
  } else {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Palm not recognized"));
  }
});

export { registerUser, loginUser, verifyToken, verifyPalm };
