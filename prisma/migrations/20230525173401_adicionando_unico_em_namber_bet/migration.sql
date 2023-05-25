/*
  Warnings:

  - A unique constraint covering the columns `[namber_bet]` on the table `bets` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `bets` ADD COLUMN `isPaymentClient` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `bets_namber_bet_key` ON `bets`(`namber_bet`);
