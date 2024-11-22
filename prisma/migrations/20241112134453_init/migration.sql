/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "contactNumber",
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "role" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "Profile";
