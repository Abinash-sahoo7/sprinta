import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTeams = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const Teams = await prisma.team.findMany();

    const TeamsWithUserNames = await Promise.all(
      Teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });

        const projectmanager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectmanager?.username,
        };
      })
    );

    res.status(200).json(TeamsWithUserNames);
  } catch (err: any) {
    console.log(`Error occure while getting all Teams : ${err.message}`);
    res.status(500).json({
      message: `Error occure while getting all Teams : ${err.message}`,
    });
  }
};
