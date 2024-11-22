/*
  Warnings:

  - The primary key for the `Farmer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Farmer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_FarmerProducts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_FarmerProducts" DROP CONSTRAINT "_FarmerProducts_A_fkey";

-- AlterTable
ALTER TABLE "Farmer" DROP CONSTRAINT "Farmer_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_FarmerProducts" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_FarmerProducts_AB_unique" ON "_FarmerProducts"("A", "B");

-- AddForeignKey
ALTER TABLE "_FarmerProducts" ADD CONSTRAINT "_FarmerProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
