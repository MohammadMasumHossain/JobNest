import { Request, Response } from "express";
import { db } from "../config/db";
import jwt from "jsonwebtoken";

const userCollection = db.collection("users");

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Basic Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Find User (Trim email to avoid trailing space issues)
    const user = await userCollection.findOne({ email: email.trim() });

    // 3. Validation Logic
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      console.log(
        "Password mismatch! DB has:",
        user.password,
        "Input was:",
        password,
      );
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "60s" },
    );
    // Set HTTP-only cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 1000,
    });

    return res.json({
      token,
      role: user.role,
      email: user.email,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    res.json(decoded);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
};
