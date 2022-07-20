/*
  Warnings:

  - You are about to drop the column `day` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EventOnUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assigned` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EventOnUser` DROP FOREIGN KEY `EventOnUser_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `EventOnUser` DROP FOREIGN KEY `EventOnUser_userId_fkey`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `day`,
    DROP COLUMN `description`,
    ADD COLUMN `assigned` VARCHAR(191) NOT NULL,
    ADD COLUMN `dayId` INTEGER NOT NULL,
    ADD COLUMN `employeeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `fullname`,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('USER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `EventOnUser`;

-- CreateTable
CREATE TABLE `Day` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
