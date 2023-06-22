-- AlterTable
ALTER TABLE `accumulated` MODIFY `money` DECIMAL(10, 2) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `awards` MODIFY `total_prizes` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `subtract_premiums` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `seine` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `corner` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `block` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `player_seine` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `player_corner` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `player_block` DECIMAL(10, 2) NULL DEFAULT 0;
