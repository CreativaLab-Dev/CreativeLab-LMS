/*
  Warnings:

  - You are about to drop the column `categoryId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `module_id` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `payment_orders` table. All the data in the column will be lost.
  - You are about to drop the `modules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_module_id_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_course_id_fkey";

-- DropIndex
DROP INDEX "lessons_module_id_idx";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" TEXT;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "module_id",
ADD COLUMN     "course_id" TEXT;

-- AlterTable
ALTER TABLE "payment_orders" DROP COLUMN "isPaid",
ADD COLUMN     "is_paid" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "modules";

-- CreateIndex
CREATE INDEX "lessons_course_id_idx" ON "lessons"("course_id");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
