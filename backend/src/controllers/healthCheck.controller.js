import ApiResponse from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse({
      status: "success",
      message: "API is running smoothly",
      data: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        version: process.env.VERSION || "1.0.0",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        requestId: req.id || "N/A",
        ip: req.ip || req.connection.remoteAddress,
        headers: req.headers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
      },
    }),
  );
});
