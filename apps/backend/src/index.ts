import cors from "cors";
import "dotenv/config";
import express from "express";
import { jobRoutes } from "./features/jobs/job.routes.js";

const app = express();

// Global Middlewares Interception
app.use(
  cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    credentials: true,
  }),
);
app.use(express.json({ limit: "5mb" }));

app.use("/api/jobs", jobRoutes);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Backend listening on port ${process.env.BACKEND_PORT}`);
});
