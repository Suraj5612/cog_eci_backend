import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepository from "./auth.repository.js";

import { ApiError } from "../../utils/apiError.js";

export const register = async (data) => {
  const { firstName, middleName, lastName, email, mobile, password } = data;

  // check email
  const existingEmail = await authRepository.findByEmail(email);
  if (existingEmail) {
    throw new ApiError("Email already exists", 400);
  }

  // check mobile
  const existingMobile = await authRepository.findByMobile(mobile);
  if (existingMobile) {
    throw new ApiError("Mobile already exists", 400);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await authRepository.createUser({
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    password: hashedPassword,
  });

  return {
    id: user.id,
    email: user.email,
  };
};

export const login = async (data) => {
  const { email, password } = data;

  const user = await authRepository.findByEmail(email);

  // combine both checks (more secure)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

export const getMe = async (userId) => {
  const user = await authRepository.findById(userId);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const { password, ...safeUser } = user;

  return safeUser;
};
