/*
  Warnings:

  - You are about to drop the column `gameId` on the `awards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `awards` DROP FOREIGN KEY `awards_gameId_fkey`;

-- AlterTable
ALTER TABLE `awards` DROP COLUMN `gameId`;
