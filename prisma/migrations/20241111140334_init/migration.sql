-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
