-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;
