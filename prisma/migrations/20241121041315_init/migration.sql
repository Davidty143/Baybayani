-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
