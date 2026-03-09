/*
  Warnings:

  - You are about to alter the column `title` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "auth_status" CHAR(1) NOT NULL DEFAULT 'P';
