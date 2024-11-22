/*
  Warnings:

  - You are about to drop the column `address` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "address",
DROP COLUMN "name",
ADD COLUMN     "totalPrice" DECIMAL(65,30),
ADD COLUMN     "total_price" INTEGER NOT NULL;
