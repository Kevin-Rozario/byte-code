import { Router } from "express";
import { executeCode } from "../controllers/codeExecute.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/execute").post(authMiddleware, executeCode);

export default router;
