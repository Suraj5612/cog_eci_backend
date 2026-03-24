import * as voterService from "./voter.service.js";
import { successResponse } from "../../utils/apiResponse.js";

export const createVoter = async (req, res, next) => {
  try {
    const voter = await voterService.createVoter(req.body);

    return successResponse(res, voter, "Voter created");
  } catch (error) {
    next(error);
  }
};

export const getVoterCount = async (req, res, next) => {
  try {
    const data = await voterService.getVoterCount();

    return successResponse(res, data, "Voter count fetched");
  } catch (error) {
    next(error);
  }
};

export const getVoters = async (req, res, next) => {
  try {
    const voters = await voterService.getVoters();

    return successResponse(res, voters, "Voters fetched");
  } catch (error) {
    next(error);
  }
};
