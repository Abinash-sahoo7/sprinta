/*
  Warnings:

  - You are about to drop the column `ProjectManagerUserId` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "ProjectManagerUserId",
ADD COLUMN     "projectManagerUserId" INTEGER;
