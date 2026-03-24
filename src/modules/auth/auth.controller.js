import * as authService from "./auth.service.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { successResponse } from "../../utils/apiResponse.js";

export const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await authService.register(validatedData);

    return successResponse(res, user, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await authService.login(validatedData);

    return successResponse(res, result, "Login successful", 200);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await authService.getMe(userId);

    return successResponse(res, user, "User fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};
