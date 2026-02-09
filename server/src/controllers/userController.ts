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

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const User = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });
    if (!User) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(User);
  } catch (err: any) {
    console.log(`Error occurred while fetching User: ${err.message}`);
    res.status(500).json({
      message: `Error occurred while fetching User: ${err.message}`,
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
    res
      .status(201)
      .json({ message: "User Created Successfully", user: newUser });
  } catch (error: any) {
    console.log(`Error occurred while creating User: ${error.message}`);
    res.status(500).json({
      message: `Error occurred while creating User: ${error.message}`,
    });
  }
};
