import { Router } from "express";

import { getAllUsers, getUser, postUser } from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", postUser);
router.get("/:cognitoId", getUser);

export default router;
