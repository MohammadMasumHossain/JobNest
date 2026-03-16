import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jobRouter from "./routes/jobRoutes";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/", loginRoutes);
app.use("/", userRoutes);
app.use("/", jobRouter);

export default app;
