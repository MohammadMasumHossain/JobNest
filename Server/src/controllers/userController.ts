import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

// PATCH - Partial update
export const patchUser = async (
  req: Request<
    { id: string },
    {},
    Partial<User & { confirmpassword?: string }>
  >,
  res: Response,
) => {
  try {
    const id = req.params.id;
    const { confirmpassword, ...rest } = req.body;
    const updateData: Partial<User> = { ...rest };

    const result = await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await userCollection.findOne({ _id: new ObjectId(id) });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PATCH update failed" });
  }
};

// PUT - Full replacement
export const putUser = async (
  req: Request<{ id: string }, {}, User & { confirmpassword?: string }>,
  res: Response,
) => {
  try {
    const id = req.params.id;
    const { confirmpassword, ...rest } = req.body;
    const newUserData: User = { ...rest } as User;

    const result = await userCollection.replaceOne(
      { _id: new ObjectId(id) },
      newUserData,
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await userCollection.findOne({ _id: new ObjectId(id) });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PUT update failed" });
  }
};

// Delete user by _id
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = req.params.id;
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};
