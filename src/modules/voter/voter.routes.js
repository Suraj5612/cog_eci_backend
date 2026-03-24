import express from "express";
import { createVoter, getVoters, getVoterCount } from "./voter.controller.js";

const router = express.Router();

router.post("/", createVoter);
router.get("/", getVoters);
router.get("/count", getVoterCount);

export default router;
