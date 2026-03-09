import express from "express";
import { createJob, getJobs } from "../controllers/jobController";

const router = express.Router();
router.post("/job", createJob);
router.get("/jobs", getJobs);
export default router;
