-- CreateEnum
CREATE TYPE "Category" AS ENUM ('VEG', 'SPICE', 'SAUCE', 'MEAT', 'ETC');

-- CreateEnum
CREATE TYPE "Storage" AS ENUM ('R', 'F');

-- CreateTable
CREATE TABLE "inventories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "category" "Category" NOT NULL,
    "storage" "Storage" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
