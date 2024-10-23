/*
  Warnings:

  - You are about to drop the `lesson_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lesson_comments" DROP CONSTRAINT "lesson_comments_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "lesson_comments" DROP CONSTRAINT "lesson_comments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_course_id_fkey";

-- DropForeignKey
ALTER TABLE "mux_data" DROP CONSTRAINT "mux_data_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "user_progress" DROP CONSTRAINT "user_progress_chapter_id_fkey";

-- DropTable
DROP TABLE "lesson_comments";

-- DropTable
DROP TABLE "lessons";

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "course_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "video_url" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter_comments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "lesson_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chapter_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chapters_course_id_idx" ON "chapters"("course_id");

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mux_data" ADD CONSTRAINT "mux_data_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_comments" ADD CONSTRAINT "chapter_comments_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_comments" ADD CONSTRAINT "chapter_comments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
