import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";
import type { Job } from "../types/Job";

const jobCollection = db.collection<Job>("jobs");

// ---------------------- Create Job ----------------------

export const createJob = async (req: Request, res: Response) => {
  try {
    const job: Job = {
      ...req.body,
      status: "pending",
      postedDate: new Date().toISOString(),
    };

    const result = await jobCollection.insertOne(job);

    res.status(201).json({
      message: "Job created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
};

// ---------------------- Get All Jobs ----------------------

export const getJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await jobCollection.find().toArray();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// ---------------------- Update Job (Full Update) ----------------------

export const updateJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedJob = await jobCollection.findOne({
      _id: new ObjectId(id),
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

// ---------------------- Patch Job (Partial Update) ----------------------

export const patchJob = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedJob = await jobCollection.findOne({
      _id: new ObjectId(id),
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Patch update failed" });
  }
};

// ---------------------- Approve Job ----------------------

export const approveJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "approved" } },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job approved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Approve failed" });
  }
};

// ---------------------- Reject Job ----------------------

export const rejectJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "rejected" } },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job rejected successfully" });
  } catch (error) {
    res.status(500).json({ error: "Reject failed" });
  }
};

// ---------------------- Delete Job ----------------------

export const deleteJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const result = await jobCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};
