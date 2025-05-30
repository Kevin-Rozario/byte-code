import express from "express";
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import codeExecuteRoutes from "./routes/codeExecute.route.js";
import submissionRoutes from "./routes/submission.route.js";
import playListRoutes from "./routes/playList.route.js";
import healthCheckRoutes from "./routes/healthCheck.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import ApiResponse from "./utils/apiResponse.util.js";
import morgan from "morgan";

const app = express();
const whiteListUrls = process.env.FRONTEND_URLS?.split(",");

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  message: new ApiResponse(429, { message: "Too many requests" }, null),
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: whiteListUrls,
    credentials: true,
  }),
);
app.use(morgan("combined"));

// rate-limit
app.use(limiter);

// routes
app.use("/api/v1/health-check", healthCheckRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/code", codeExecuteRoutes);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/playlists", playListRoutes);

export default app;
