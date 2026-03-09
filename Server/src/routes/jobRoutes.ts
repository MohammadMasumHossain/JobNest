import express from "express";
import { createJob } from "../controllers/jobController";

const router = express.Router();
router.post("/job", createJob);

export default router;
