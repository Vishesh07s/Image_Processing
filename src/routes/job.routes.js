import express from "express";
import { getJobStatus } from "../controllers/image.controller";

const router = express.Router();

router.get("/:id", getJobStatus);

export default router;
