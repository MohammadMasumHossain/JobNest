import express from "express";
import { getCurrentUser, loginUser } from "../controllers/loginController";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", getCurrentUser);

export default router;
