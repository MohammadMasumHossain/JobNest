import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";
import { User } from "../types/User";

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

export const updateUser = async (
  req: Request<{ id: string }, {}, Partial<User>>,
  res: Response,
) => {
  try {
    // Ensure id is a string
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body },
    );

    res.json({ message: "User updated" });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await userCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};
