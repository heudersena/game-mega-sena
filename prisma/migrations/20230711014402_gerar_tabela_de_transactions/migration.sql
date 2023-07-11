-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `type` ENUM('pix', 'dinheiro') NOT NULL,
    `m_id` INTEGER NULL,
    `m_status` ENUM('pending', 'approved', 'cancelled') NULL DEFAULT 'pending',
    `m_status_detail` ENUM('accredited', 'cancelled', 'pending_waiting_transfer', 'expired', 'dinheiro') NOT NULL DEFAULT 'dinheiro',
    `m_email` VARCHAR(191) NULL,
    `m_qr_code` VARCHAR(191) NULL,
    `m_ticket_url` VARCHAR(191) NULL,
    `m_transaction_id` VARCHAR(191) NULL,
    `m_qr_code_base64` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `transactions_id_m_id_idx`(`id`, `m_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
