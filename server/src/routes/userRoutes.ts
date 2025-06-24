import { Router } from "express";

import { getAllUsers } from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);

export default router;
