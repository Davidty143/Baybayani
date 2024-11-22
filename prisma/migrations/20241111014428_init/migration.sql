/*
  Warnings:

  - You are about to drop the column `city` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `Addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "stripeId",
DROP COLUMN "zipcode";

-- DropTable
DROP TABLE "Addresses";
