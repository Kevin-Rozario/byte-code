import express from "express";
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import codeExecuteRoutes from "./routes/codeExecute.route.js";
import submissionRoutes from "./routes/submission.route.js";
import playListRoutes from "./routes/playList.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/code", codeExecuteRoutes);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/playlists", playListRoutes);

export default app;
