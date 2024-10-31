/*
  Warnings:

  - A unique constraint covering the columns `[student_id]` on the table `student_courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[course_id]` on the table `student_courses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "student_courses_student_id_key" ON "student_courses"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_courses_course_id_key" ON "student_courses"("course_id");
