-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code_ref_user` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `recover_password` VARCHAR(191) NULL DEFAULT '',
    `access_role` ENUM('SUPERADMIN', 'SELLER', 'MEMBERS', 'OTHERS', 'ESTABLISHMENT') NOT NULL DEFAULT 'SELLER',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_code_ref_user_key`(`code_ref_user`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_id_email_access_role_idx`(`id`, `email`, `access_role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Code_Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `match_id` INTEGER NOT NULL,
    `numbers` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `games_id_match_id_idx`(`id`, `match_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `establishments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `seller_code` VARCHAR(191) NULL,
    `number_phone` VARCHAR(191) NOT NULL,
    `number_code` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `geographic_location` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `longitude` VARCHAR(191) NULL,
    `establishmentId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `establishmentId` INTEGER NOT NULL,
    `number_game_result` VARCHAR(191) NOT NULL,
    `numbers` VARCHAR(191) NOT NULL,
    `status` ENUM('IN_PROCESSING', 'FINISHED', 'CANCELED') NOT NULL DEFAULT 'IN_PROCESSING',
    `awarded` BOOLEAN NOT NULL DEFAULT false,
    `hits` INTEGER NOT NULL DEFAULT 0,
    `namber_bet` INTEGER NOT NULL,
    `hits_round` INTEGER NULL DEFAULT 0,
    `namber_round` VARCHAR(191) NULL DEFAULT '',
    `isPaymentClient` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `bets_namber_bet_key`(`namber_bet`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `awards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gamer_ref` INTEGER NOT NULL,
    `total_prizes` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `subtract_premiums` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `seine` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `corner` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `block` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `player_seine` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `player_corner` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `player_block` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `is_completed` ENUM('IN_PROCESSING', 'FINISHED') NOT NULL DEFAULT 'IN_PROCESSING',
    `home_deposit` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `awards_gamer_ref_key`(`gamer_ref`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accumulated` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `money` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Code_Users` ADD CONSTRAINT `Code_Users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `establishments` ADD CONSTRAINT `establishments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adresses` ADD CONSTRAINT `adresses_establishmentId_fkey` FOREIGN KEY (`establishmentId`) REFERENCES `establishments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bets` ADD CONSTRAINT `bets_establishmentId_fkey` FOREIGN KEY (`establishmentId`) REFERENCES `establishments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
