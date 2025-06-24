import { Router } from "express";
import { getAllTeams } from "../controllers/teamController";

const router = Router();

router.get("/", getAllTeams);

export default router;
