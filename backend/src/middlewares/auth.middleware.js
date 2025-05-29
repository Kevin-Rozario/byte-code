import ApiError from "../utils/apiError.util.js";
import { verifyToken } from "../utils/generateTokens.util.js";

const authMiddleware = async (req, _res, next) => {
  // check params
  const { id } = req.params;

  // public routes
  const authorizedRoutes = [
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    "/api/v1/problems/get-all-problems",
    `/api/v1/problems/get-problem/${id}`,
  ];

  // check if the current route is public
  const currentRoute = `${req.baseUrl}${req.path}`;
  const isPublicRoute = authorizedRoutes.includes(currentRoute);

  // if public route, allow access
  if (isPublicRoute) {
    return next();
  }

  // get tokens
  const { accessToken, refreshToken } = req.cookies;

  // check access token
  if (!accessToken) {
    throw new ApiError(400, "Access token required!");
  }

  // check refresh token
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required!");
  }

  // verify access token
  try {
    const decoded = await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Access token expired!", error);
    throw new ApiError(401, "Access token expired!");
  }
};

const authAdminCheck = async (req, _res, next) => {
  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "You are not authorized to access this route!");
  }
  next();
};

export { authMiddleware, authAdminCheck };
