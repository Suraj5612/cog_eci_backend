import prisma from "../../config/prisma.js";

export const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findByMobile = async (mobile) => {
  return prisma.user.findUnique({
    where: { mobile },
  });
};

export const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export const findById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
