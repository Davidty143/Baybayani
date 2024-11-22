/*
  Warnings:

  - The primary key for the `UserTest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `UserTest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserTest" DROP CONSTRAINT "UserTest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserTest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserTest_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "UserTest_id_key" ON "UserTest"("id");
