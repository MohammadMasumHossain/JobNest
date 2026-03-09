import express from "express";
import { createJob, getJobs, updateJob } from "../controllers/jobController";

const router = express.Router();
router.post("/job", createJob);
router.get("/jobs", getJobs);
router.put("/job/:id", updateJob);
export default router;
