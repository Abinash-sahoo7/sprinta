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
    res.status(500).json({
      message: `Error occure while getting all Users : ${err.message}`,
    });
  }
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, cognitoId, profilePictureUrl, teamId } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.status(201).json({ message: "User Created Successfully : ", newUser });
  } catch (error: any) {
    console.log(`Error occure while create Users : ${error.message}`);
    res.status(500).json({
      message: `Error occure while create Users : ${error.message}`,
    });
  }
};
