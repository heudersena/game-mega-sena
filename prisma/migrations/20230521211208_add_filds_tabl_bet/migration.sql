-- AlterTable
ALTER TABLE `bets` ADD COLUMN `hits_round` INTEGER NULL DEFAULT 0,
    ADD COLUMN `namber_round` VARCHAR(191) NULL DEFAULT '';
