/*
  Warnings:

  - Added the required column `namber_bet` to the `bets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bets` ADD COLUMN `namber_bet` INTEGER NOT NULL;
