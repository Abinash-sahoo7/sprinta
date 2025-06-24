import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (err: any) {
    console.log(`Error occure while getAll Projects : ${err.message}`);
    res
      .status(500)
      .json({ message: `Error occure while getAll Projects : ${err.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, startDate, endDate } = req.body;
    if (!name || !description || !startDate || !endDate) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.status(201).json(newProject);
  } catch (err: any) {
    console.log(`Error occure while Create Projects : ${err.message}`);
    res
      .status(500)
      .json({ message: `Error occure while Create Projects : ${err.message}` });
  }
};
