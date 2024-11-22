-- CreateTable
CREATE TABLE "Farmers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Farmers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FarmerProducts" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FarmerProducts_AB_unique" ON "_FarmerProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_FarmerProducts_B_index" ON "_FarmerProducts"("B");

-- AddForeignKey
ALTER TABLE "_FarmerProducts" ADD CONSTRAINT "_FarmerProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Farmers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FarmerProducts" ADD CONSTRAINT "_FarmerProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
