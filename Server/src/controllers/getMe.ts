// import { Request, Response } from "express";
// import { db } from "../config/db";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();
// const SECRET = process.env.JWT_SECRET!;

// interface AuthRequest extends Request {
//   userId?: string;
// }

// const userCollection = db.collection("users");

// export const getMe = async (req: AuthRequest, res: Response) => {
//   try {
//     const token = req.cookies.token; // get JWT from cookie
//     if (!token) return res.status(401).json({ error: "Not authenticated" });

//     const decoded = jwt.verify(token, SECRET) as { id: string };
//     const userId = decoded.id;

//     const user = await userCollection.findOne(
//       { _id: new (require("mongodb").ObjectId)(userId) },
//       { projection: { password: 0 } }, // hide password
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user); // send user object without password
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };
// controllers/getMe.ts
import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";

const userCollection = db.collection("users");

export const getMe = async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await userCollection.findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ ALWAYS return consistent structure
    const safeUser = {
      _id: user._id,
      name: user.name || user.role || "User", // 🔥 KEY FIX
      email: user.email,
      role: user.role,
      location: user.location,
      phone: user.phone,
    };

    res.json(safeUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
