import prisma from "../../config/prisma.js";

export const createVoter = (data) => {
  return prisma.voterData.create({ data });
};

export const getAllVoters = () => {
  return prisma.voterData.findMany();
};

export const getVoterCount = () => {
  return prisma.voterData.count();
};

export const getVoters = () => {
  return prisma.voterData.findMany({
    orderBy: { createdAt: "desc" }, // latest first
  });
};
