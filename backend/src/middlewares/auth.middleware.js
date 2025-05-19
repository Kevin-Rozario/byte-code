import ApiError from "../utils/apiError.util.js";
import { verifyToken } from "../utils/generateTokens.util.js";

const authMiddleware = async (req, _res, next) => {
  // get tokens
  const { accessToken, refreshToken } = req.cookies;

  // check tokens
  if (!accessToken || !refreshToken) {
    throw new ApiError(400, "Access and refresh tokens required!");
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
