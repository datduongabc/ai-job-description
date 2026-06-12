// --- 1. IMPORTS ---
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

// --- 2. CONSTANTS / CONFIG ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. MIDDLEWARES ---
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// --- 4. MAIN ROUTES ---
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// --- 5. GLOBAL ERROR HANDLING ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Server Error]: ${err.message}`);
  res.status(500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

// --- 6. EXPORTS / LISTEN ---
app.listen(PORT, () => {
  console.log(`🚀 Production-ready Server running on http://localhost:${PORT}`);
});
