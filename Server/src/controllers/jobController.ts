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

export const updateJob = async (
  req: Request<{ id: string }, {}, Partial<Job>>,
  res: Response,
) => {
  try {
    const id = req.params.id;

    // Use req.body directly as update data
    await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }, // no destructuring needed
    );

    res.json({ message: "Job updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};
