import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";

const userCollection = db.collection("users");

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await userCollection.insertOne(user);

    res.status(201).json({
      message: "User created",
      id: result.insertedId,
    });
  } catch {
    res.status(500).json({ error: "Create user failed" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userCollection.find().toArray();
  res.json(users);
};
