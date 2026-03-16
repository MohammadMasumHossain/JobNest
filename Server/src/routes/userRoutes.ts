import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  patchUser,
  putUser,
} from "../controllers/userController";

const router = express.Router();
router.post("/user", createUser);
router.get("/users", getUsers);

router.patch("/user/:id", patchUser);
router.put("/user/:id", putUser);
router.delete("/user/:id", deleteUser);

export default router;
