import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = express.Router();
router.post("/user", createUser);
router.get("/users", getUsers);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
