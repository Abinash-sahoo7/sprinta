import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const Usres = await prisma.user.findMany();
    res.status(200).json(Usres);
  } catch (err: any) {
    console.log(`Error occure while getting all Users : ${err.message}`);
    res
      .status(500)
      .json({
        message: `Error occure while getting all Users : ${err.message}`,
      });
  }
};
