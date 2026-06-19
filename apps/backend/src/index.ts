import cors from "cors";
import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
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

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("[Global Error]:", err.message);
  res.status(500).json({
    status: "ERROR",
    message: err.message || "Internal Server Error",
  });
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Backend listening on port ${process.env.BACKEND_PORT}`);
});
