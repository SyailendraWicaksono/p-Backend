/*
  Warnings:

  - Added the required column `difficulty` to the `ProjectIdea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectIdea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectIdea" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
