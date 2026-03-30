import express from "express";
import {
  approveJob,
  createJob,
  getJobs,
  rejectJob,
  updateJob,
  deleteJob,
  patchJob,
} from "../controllers/jobController";

const router = express.Router();
router.post("/job", createJob);
router.get("/jobs", getJobs);
router.patch("/job/:id", patchJob);
router.put("/job/:id", updateJob);
router.patch("/job/:id/approve", approveJob);
router.patch("/job/:id/reject", rejectJob);
router.delete("/job/:id", deleteJob);
export default router;
