/*
  Warnings:

  - You are about to drop the `Farmers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FarmerProducts" DROP CONSTRAINT "_FarmerProducts_A_fkey";

-- DropTable
DROP TABLE "Farmers";

-- CreateTable
CREATE TABLE "Farmer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_FarmerProducts" ADD CONSTRAINT "_FarmerProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
