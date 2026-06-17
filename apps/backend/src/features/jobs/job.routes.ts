import { Router } from "express";
import { handleGenerateJob } from "./job.controller.js";

const router = Router();

// router.post("/generate", validateBody(JobRecruitmentSchema), handleGenerateJob);
router.post("/generate", handleGenerateJob);

export { router as jobRoutes };
