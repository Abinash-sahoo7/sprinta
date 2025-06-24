import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const Tasks = await prisma.task.findMany();
    res.status(200).json(Tasks);
  } catch (err: any) {
    console.log(`Error occure while getAll Tasks : ${err.message}`);
    res
      .status(500)
      .json({ message: `Error occure while getAll Tasks : ${err.message}` });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.status(200).json(tasks);
  } catch (err: any) {
    console.log(`Error retriving get User's Tasks : ${err.message}`);
    res
      .status(500)
      .json({ message: `Error retriving get User's Tasks : ${err.message}` });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.query;
    const Tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: {
          include: {
            user: {
              select: {
                username: true,
                profilePictureUrl: true,
                userId: true,
              },
            },
          },
        },
        attachments: true,
      },
    });
    res.status(200).json(Tasks);
  } catch (err: any) {
    console.log(`Error occure while Tasks by projectId : ${err.message}`);
    res.status(500).json({
      message: `Error occure while Tasks by projectId : ${err.message}`,
    });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      projectId,
      authorUserId,
      assignedUserId,
    } = req.body;

    // TODO: Add your task creation logic here
    // For example:
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });

    res.status(201).json(newTask);
  } catch (err: any) {
    console.log(`Error creating task : ${err.message}`);
    res.status(500).json({ message: `Error creating task : ${err.message}` });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status },
    });

    res.status(200).json(updatedTask);
  } catch (err: any) {
    console.log(`Error creating task : ${err.message}`);
    res.status(500).json({ message: `Error creating task : ${err.message}` });
  }
};
