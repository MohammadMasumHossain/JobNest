import express from "express";
import cors from "cors";
import jobRouter from "./routes/jobRoutes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", jobRouter);

export default app;
