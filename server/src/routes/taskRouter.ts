import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/takController";

const router = Router();

router.get("/getAllTasks", getAllTasks);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:taskId/status", updateTaskStatus);
router.get("/user/:userId", getUserTasks);

export default router;
