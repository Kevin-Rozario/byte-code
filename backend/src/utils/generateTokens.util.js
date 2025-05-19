import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
  return token;
};

const generateTemporaryToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 15 minutes
  return { token, tokenExpiry };
};

const verifyToken = async (token, key) => {
  const decodedToken = await jwt.verify(token, key);
  return decodedToken;
};

export {
  generateAccessToken,
  generateRefreshToken,
  generateTemporaryToken,
  verifyToken,
};
