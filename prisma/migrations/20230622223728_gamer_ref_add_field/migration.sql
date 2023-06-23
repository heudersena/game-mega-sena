/*
  Warnings:

  - You are about to drop the column `ref_id` on the `awards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gamer_ref]` on the table `awards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gamer_ref` to the `awards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `awards` DROP COLUMN `ref_id`,
    ADD COLUMN `gamer_ref` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `awards_gamer_ref_key` ON `awards`(`gamer_ref`);
