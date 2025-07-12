/*
  Warnings:

  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
