import { Router } from "express";
import {
  authMiddleware,
  authAdminCheck,
} from "../middlewares/auth.middleware.js";
import {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblemById,
  deleteProblemById,
  getSolvedProblems,
} from "../controllers/problem.controller.js";

const router = Router();

router
  .route("/create-problem")
  .post(authMiddleware, authAdminCheck, createProblem);
router.route("/get-all-problems").get(authMiddleware, getAllProblems);
router.route("/get-problem/:id").get(authMiddleware, getProblemById);
router
  .route("/update-problem/:id")
  .put(authMiddleware, authAdminCheck, updateProblemById);
router
  .route("/delete-problem/:id")
  .delete(authMiddleware, authAdminCheck, deleteProblemById);
router.route("/get-solved-problem").get(authMiddleware, getSolvedProblems);

export default router;
