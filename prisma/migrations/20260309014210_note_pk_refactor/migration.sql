/*
  Warnings:

  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `note_id` on the `notes` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" DROP CONSTRAINT "notes_pkey",
DROP COLUMN "note_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "notes_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "notes_user_id_idx" ON "notes"("user_id");
