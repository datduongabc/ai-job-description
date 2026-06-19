import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { jobRoutes } from "./features/jobs/job.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

app.use(express.json({ limit: "5mb" }));

app.use("/api/jobs", jobRoutes);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Backend listening on port ${process.env.BACKEND_PORT}`);
});
