import { Router } from "express";
import {
  getAllSubmissions,
  getSubmissionByProblemId,
  getSubmissionCountByProblemId,
} from "../controllers/submission.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-all-submissions").get(authMiddleware, getAllSubmissions);
router
  .route("/get-submission/:problemId")
  .get(authMiddleware, getSubmissionByProblemId);
router
  .route("/get-submission-count/:problemId")
  .get(authMiddleware, getSubmissionCountByProblemId);

export default router;
