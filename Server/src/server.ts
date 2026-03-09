import app from "./app";
import { connectDB } from "./config/db";
import jobRouter from "./routes/jobRoutes";

const PORT = 5000;

const startServer = async () => {
  await connectDB();
  app.use("/", jobRouter);
  app.listen(PORT, () => {
    console.log(`Server is runnig on ${PORT}`);
  });
};

startServer();
