-- CreateTable
CREATE TABLE `awards` (
    `id` VARCHAR(191) NOT NULL,
    `ref_id` INTEGER NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `total_prizes` DECIMAL(10, 2) NOT NULL,
    `subtract_premiums` DECIMAL(10, 2) NOT NULL,
    `seine` DECIMAL(10, 2) NOT NULL,
    `corner` DECIMAL(10, 2) NOT NULL,
    `block` DECIMAL(10, 2) NOT NULL,
    `player_seine` DECIMAL(10, 2) NOT NULL,
    `player_corner` DECIMAL(10, 2) NOT NULL,
    `player_block` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accumulated` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `money` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `awards` ADD CONSTRAINT `awards_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
