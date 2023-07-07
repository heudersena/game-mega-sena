-- DropIndex
DROP INDEX `bets_namber_bet_key` ON `bets`;

-- AlterTable
ALTER TABLE `bets` MODIFY `namber_bet` INTEGER NULL DEFAULT 0;
