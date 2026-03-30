import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  patchUser,
  putUser,
} from "../controllers/userController";
import { getMe } from "../controllers/getMe";
import { authMiddleware } from "../middleware/authmiddleware";
const router = express.Router();
router.post("/user", createUser);
router.get("/users", getUsers);
router.get("/me", authMiddleware, getMe);
router.patch("/user/:id", patchUser);
router.put("/user/:id", putUser);
router.delete("/user/:id", deleteUser);

export default router;
