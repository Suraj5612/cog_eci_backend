import { ZodError } from "zod";
import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Zod validation error
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((e) => ({
      field: e.path[0],
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  // Custom API error
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // fallback
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
