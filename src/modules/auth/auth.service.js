import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepository from "./auth.repository.js";

import { ApiError } from "../../utils/apiError.js";

export const register = async (data) => {
  const { firstName, middleName, lastName, username, email, mobile, password } =
    data;
  // check username
  const existingUsername = await authRepository.findByUsername(username);
  if (existingUsername) {
    throw new ApiError("Username already exists", 400);
  }
  // existing checks
  const existingEmail = await authRepository.findByEmail(email);
  if (existingEmail) {
    throw new ApiError("Email already exists", 400);
  }
  const existingMobile = await authRepository.findByMobile(mobile);
  if (existingMobile) {
    throw new ApiError("Mobile already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await authRepository.createUser({
    firstName,
    middleName,
    lastName,
    username,
    email,
    mobile,
    password: hashedPassword,
  });
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

export const login = async (data) => {
  const { username, password } = data;

  const user = await authRepository.findByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
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
