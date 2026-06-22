import { Router } from "express";
import { validateBody } from "../../middlewares/job.middleware.js";
import { handleGenerateJob } from "./job.controller.js";
import { JobRecruitmentSchema } from "./job.validator.js";

const router = Router();

router.post("/generate", validateBody(JobRecruitmentSchema), handleGenerateJob);

export { router as jobRoutes };
