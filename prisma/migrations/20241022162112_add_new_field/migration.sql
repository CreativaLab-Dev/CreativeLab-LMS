/*
  Warnings:

  - You are about to drop the column `seen` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `position` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "seen",
ADD COLUMN     "is_free" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mux_data" (
    "id" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,
    "playback_id" TEXT NOT NULL,

    CONSTRAINT "mux_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attachments_courseId_idx" ON "attachments"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "mux_data_chapter_id_key" ON "mux_data"("chapter_id");

-- CreateIndex
CREATE INDEX "user_progress_chapter_id_idx" ON "user_progress"("chapter_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_user_id_chapter_id_key" ON "user_progress"("user_id", "chapter_id");

-- CreateIndex
CREATE INDEX "lessons_module_id_idx" ON "lessons"("module_id");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mux_data" ADD CONSTRAINT "mux_data_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
