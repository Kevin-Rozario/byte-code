import ApiError from "../utils/apiError.util.js";

export const validateMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};
