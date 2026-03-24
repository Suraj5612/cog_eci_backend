import * as voterService from "./voter.service.js";
import { successResponse } from "../../utils/apiResponse.js";
import { Parser } from "json2csv";
import prisma from "../../config/prisma.js";

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

export const downloadCSV = async (req, res, next) => {
  try {
    const voters = await prisma.voterData.findMany();

    const fields = [
      "voterName",
      "epicNumber",
      "address",
      "serialNumber",
      "partNumberAndName",
      "constituencyName",
      "stateName",
      "mobileNumber",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(voters);

    res.header("Content-Type", "text/csv");
    res.attachment("voters.csv");

    return res.send(csv);
  } catch (error) {
    next(error);
  }
};
