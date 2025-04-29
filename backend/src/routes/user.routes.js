import { Router } from "express";
import { upload } from "../middlewares.js/multer.middleware.js";
import { verifyJWT } from "../middlewares.js/auth.middleware.js"; // Imported verifyJWT middleware
import {
  registerUser,
  loginUser,
  verifyToken,
  verifyPalm,
} from "../controllers/user.controller.js";

const router = Router();

// This route doesn't require authentication, so we don't use verifyJWT here
router.route("/register").post(
  upload.fields([
    { name: "palmImage", maxCount: 1 }, // Ensure only one palm image is uploaded
    { name: "corpCode", maxCount: 1 }, // Expect the corpCode to be a text field
  ]),
  registerUser
);

// This route doesn't require authentication either
router.route("/login").post(loginUser);

// This route requires authentication, so we use the verifyJWT middleware
router.route("/verify-token").get(verifyJWT, verifyToken);

// Example of a route where JWT verification would be useful (you can add more routes requiring authentication)
router.route("/protected-route").get(verifyJWT, (req, res) => {
  res.send("This is a protected route!");
});

// 🚀 Now simple and clean
router
  .route("/verify-palm")
  .post(upload.fields([{ name: "palmImage", maxCount: 1 }]), verifyPalm);

router.route("/").get((req, res) => {
  res.send("Hello");
});

export default router;
