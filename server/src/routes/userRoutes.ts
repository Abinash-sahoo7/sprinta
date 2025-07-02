import { Router } from "express";

import { getAllUsers, postUser } from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", postUser);

export default router;
