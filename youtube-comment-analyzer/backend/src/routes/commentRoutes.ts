import express from "express";
import { getCommentsAndAnalyze } from "../controllers/commentController";

const router = express.Router();

router.get("/:videoId", getCommentsAndAnalyze);

export default router;
