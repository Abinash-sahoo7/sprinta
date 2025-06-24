import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchQuery } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery as string } },
          { description: { contains: searchQuery as string } },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery as string } },
          { description: { contains: searchQuery as string } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: searchQuery as string } }],
      },
    });

    res.status(200).json({ tasks, projects, users });
  } catch (err: any) {
    console.log(`Error occure while searching : ${err.message}`);
    res
      .status(500)
      .json({ message: `Error occure while searching : ${err.message}` });
  }
};
