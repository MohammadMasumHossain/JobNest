import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";
import { Job } from "../types/Job";

const jobCollection = db.collection("jobs");

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = {
      ...req.body,
      status: "pending",
      postedDate: new Date().toISOString(),
    };
    const result = await jobCollection.insertOne(job);
    res.status(201).json({
      message: "job created",
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to Create job" });
  }
};

export const getJobs = async (_req: Request, res: Response) => {
  const jobs = await jobCollection.find().toArray();
  res.json(jobs);
};

export const approveJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "approved" } },
    );

    res.json({ message: "Job approved" });
  } catch {
    res.status(500).json({ error: "Approve failed" });
  }
};

export const updateJob = async (
  req: Request<{ id: string }, {}, Partial<Job>>,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body },
    );

    res.json({ message: "Job updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

export const rejectJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "rejected" } },
    );

    res.json({ message: "Job rejected" });
  } catch {
    res.status(500).json({ error: "Reject failed" });
  }
};
export const deleteJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await jobCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};
