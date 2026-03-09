import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";

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
