-- CreateTable
CREATE TABLE "mentors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "specialty" TEXT[],
    "industry" TEXT[],
    "idioms" TEXT[],
    "email" TEXT,
    "image_url" TEXT,
    "linkedin_url" TEXT,
    "twitter_url" TEXT,
    "about_me" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentors_pkey" PRIMARY KEY ("id")
);
