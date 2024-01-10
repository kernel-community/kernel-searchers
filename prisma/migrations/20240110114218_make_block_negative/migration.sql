/*
  Warnings:

  - Made the column `block` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Features" ADD COLUMN     "stewarding" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "block" SET NOT NULL,
ALTER COLUMN "block" SET DEFAULT -1;
