import express from "express";
import cors from "cors";
import jobRouter from "./routes/jobRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", jobRouter);
app.use("/", userRoutes);

export default app;
