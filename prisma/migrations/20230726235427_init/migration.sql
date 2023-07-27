/*
  Warnings:

  - Added the required column `establishmentId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `establishmentId` INTEGER NOT NULL,
    ADD COLUMN `recognize` ENUM('yes', 'no') NULL DEFAULT 'no',
    MODIFY `m_id` BIGINT NULL,
    MODIFY `m_status_detail` ENUM('accredited', 'cancelled', 'pending_waiting_transfer', 'expired', 'dinheiro') NULL DEFAULT 'pending_waiting_transfer';

-- CreateTable
CREATE TABLE `financial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `establishmentId` INTEGER NOT NULL,
    `transactions_id` VARCHAR(191) NOT NULL,
    `between_dates` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `financial_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_establishmentId_fkey` FOREIGN KEY (`establishmentId`) REFERENCES `establishments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial` ADD CONSTRAINT `financial_establishmentId_fkey` FOREIGN KEY (`establishmentId`) REFERENCES `establishments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
