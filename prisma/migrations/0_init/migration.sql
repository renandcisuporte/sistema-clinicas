-- CreateTable
CREATE TABLE `User` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(55) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `admin` ENUM('user', 'admin', 'root') NOT NULL DEFAULT 'user',
    `password` VARCHAR(105) NOT NULL,
    `coverImage` VARCHAR(255) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAdmin` (
    `id` VARCHAR(191) NOT NULL,
    `userId` CHAR(36) NULL,
    `clinicId` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roules` (
    `id` VARCHAR(191) NOT NULL,
    `userId` CHAR(36) NULL,
    `module` VARCHAR(30) NOT NULL,
    `permission` VARCHAR(10) NOT NULL,

    INDEX `Roules_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clinic` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` VARCHAR(11) NULL,
    `title` VARCHAR(55) NOT NULL,
    `fantasy` VARCHAR(55) NOT NULL,
    `cnpj` VARCHAR(18) NOT NULL,
    `ie` VARCHAR(15) NULL,
    `phone` VARCHAR(15) NULL,
    `mobilePhone` VARCHAR(15) NULL,
    `averageService` VARCHAR(5) NULL,
    `address` VARCHAR(50) NULL,
    `number` VARCHAR(5) NULL,
    `neighborhood` VARCHAR(40) NULL,
    `complement` VARCHAR(50) NULL,
    `reference` VARCHAR(65) NULL,
    `city` VARCHAR(30) NULL,
    `state` VARCHAR(2) NULL,
    `zipCode` VARCHAR(9) NULL,

    UNIQUE INDEX `Clinic_clinicId_key`(`clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `People` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` VARCHAR(36) NULL,
    `fullName` VARCHAR(55) NOT NULL,
    `document` VARCHAR(14) NULL,
    `dateOfBirth` DATE NULL,
    `phones` TEXT NULL,
    `email` VARCHAR(45) NULL,
    `type` ENUM('specialist', 'user') NOT NULL DEFAULT 'specialist',
    `address` VARCHAR(50) NULL,
    `number` VARCHAR(5) NULL,
    `neighborhood` VARCHAR(40) NULL,
    `complement` VARCHAR(50) NULL,
    `reference` VARCHAR(65) NULL,
    `city` VARCHAR(30) NULL,
    `state` VARCHAR(2) NULL,
    `zipCode` VARCHAR(9) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `code` VARCHAR(28) NOT NULL,
    `payload` JSON NULL,
    `checked` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Setting_clinicId_idx`(`clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkTime` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `week` VARCHAR(12) NOT NULL,
    `times` TEXT NULL,
    `open` BOOLEAN NOT NULL DEFAULT true,

    INDEX `WorkTime_clinicId_idx`(`clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkTimeRecommend` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `week` VARCHAR(12) NOT NULL,
    `times` TEXT NULL,
    `open` BOOLEAN NOT NULL DEFAULT true,

    INDEX `WorkTimeRecommend_clinicId_idx`(`clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkTimeService` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `week` VARCHAR(12) NOT NULL,
    `times` TEXT NULL,
    `open` BOOLEAN NOT NULL DEFAULT true,

    INDEX `WorkTimeService_clinicId_idx`(`clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `code` VARCHAR(20) NULL,
    `room` VARCHAR(55) NOT NULL,
    `description` TEXT NULL,
    `averageService` VARCHAR(5) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `Room_clinicId_idx`(`clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expense` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `description` VARCHAR(105) NULL,
    `type` ENUM('fixed', 'variable') NOT NULL DEFAULT 'fixed',
    `active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `Expense_clinicId_idx`(`clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Realese` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `expenseId` CHAR(36) NULL,
    `price` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `date` DATE NOT NULL,

    INDEX `Realese_clinicId_idx`(`clinicId`),
    INDEX `Realese_expenseId_idx`(`expenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `name` VARCHAR(105) NOT NULL,
    `quantity` VARCHAR(26) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `name` VARCHAR(105) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceInProduct` (
    `id` VARCHAR(191) NOT NULL,
    `clinicId` CHAR(36) NULL,
    `productId` CHAR(36) NULL,
    `serviceId` CHAR(36) NULL,
    `rental` INTEGER NOT NULL DEFAULT 0,
    `rentalPrice` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAdmin` ADD CONSTRAINT `UserAdmin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAdmin` ADD CONSTRAINT `UserAdmin_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roules` ADD CONSTRAINT `Roules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setting` ADD CONSTRAINT `Setting_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkTime` ADD CONSTRAINT `WorkTime_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkTimeRecommend` ADD CONSTRAINT `WorkTimeRecommend_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkTimeService` ADD CONSTRAINT `WorkTimeService_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Realese` ADD CONSTRAINT `Realese_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Realese` ADD CONSTRAINT `Realese_expenseId_fkey` FOREIGN KEY (`expenseId`) REFERENCES `Expense`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceInProduct` ADD CONSTRAINT `ServiceInProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceInProduct` ADD CONSTRAINT `ServiceInProduct_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

