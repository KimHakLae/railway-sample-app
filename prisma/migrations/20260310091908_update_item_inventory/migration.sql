/*
  Warnings:

  - You are about to drop the column `storage` on the `items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "inventories" ADD COLUMN     "storage" "Storage" NOT NULL DEFAULT 'R';

-- AlterTable
ALTER TABLE "items" DROP COLUMN "storage",
ALTER COLUMN "category" SET DEFAULT 'ETC';
