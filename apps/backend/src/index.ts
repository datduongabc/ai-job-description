import cors from "cors";
import express from "express";
import { jobRoutes } from "./features/jobs/jobs.routes.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Global Middlewares Interception
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "5mb" }));

app.use("/api/jobs", jobRoutes);

app.use(globalErrorHandler);

export default app;
