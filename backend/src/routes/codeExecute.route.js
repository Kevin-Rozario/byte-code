import { Router } from "express";
import { executeCode } from "../controllers/codeExecute.controller.js";

const router = Router();

router.route("/execute").post(executeCode);

export default router;
