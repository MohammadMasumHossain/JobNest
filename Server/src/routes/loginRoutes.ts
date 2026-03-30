import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../controllers/loginController";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", getCurrentUser);
router.post("/logout", logoutUser);

export default router;
