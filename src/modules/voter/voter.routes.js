import express from "express";
import {
  createVoter,
  getVoters,
  getVoterCount,
  downloadCSV,
} from "./voter.controller.js";

const router = express.Router();

router.post("/", createVoter);
router.get("/", getVoters);
router.get("/count", getVoterCount);
router.get("/download", downloadCSV);

export default router;
