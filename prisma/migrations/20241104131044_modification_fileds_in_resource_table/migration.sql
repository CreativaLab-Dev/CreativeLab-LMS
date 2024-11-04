/*
  Warnings:

  - You are about to drop the column `content` on the `resources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resources" DROP COLUMN "content",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "nivel" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION;
