import { Router } from "express";
import { handleGenerateJob } from "./jobs.controller.js";

const router = Router();

router.post("/generate", handleGenerateJob);

export { router as jobRoutes };
