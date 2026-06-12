import { PrismaClient } from "@prisma/client";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// --- 3. MIDDLEWARES ---
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// --- 4. MAIN ROUTES ---

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

app.listen(PORT, async () => {
  console.log(`The server is running at: http://localhost:${PORT}`);

  try {
    await prisma.$connect();
    console.log("Prisma has successfully connected to the Supabase Database!");
  } catch (e) {
    console.error("Prisma connection error:", e);
  }
});
