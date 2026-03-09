import express from "express";
import {
  approveJob,
  createJob,
  getJobs,
  updateJob,
} from "../controllers/jobController";

const router = express.Router();
router.post("/job", createJob);
router.get("/jobs", getJobs);
router.put("/job/:id", updateJob);
router.patch("/job/:id/approve", approveJob);
export default router;
