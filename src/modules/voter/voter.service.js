import * as voterRepo from "./voter.repository.js";
import { ApiError } from "../../utils/apiError.js";

export const createVoter = async (data) => {
  if (!data.voterName) {
    throw new ApiError("Voter name is required", 400);
  }

  return voterRepo.createVoter(data);
};

export const getVoterCount = async () => {
  const count = await voterRepo.getVoterCount();

  return { total: count };
};

export const getVoters = async () => {
  const voters = await voterRepo.getVoters();

  return voters;
};
