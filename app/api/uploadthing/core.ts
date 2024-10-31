import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
const f = createUploadthing();


const handleAuth = async () => {
  const session = await auth();
  if (!session || !session.user) throw new UploadThingError("Unauthorized");
  return { userId: session.user.id as string };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => handleAuth())
    .onUploadComplete(() => { }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => handleAuth())
    .onUploadComplete(() => { }),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(async () => handleAuth())
    .onUploadComplete(() => { }),
  eventImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => handleAuth())
    .onUploadComplete(() => { }),
  mentorImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => handleAuth())
    .onUploadComplete(() => { }),
  userAvatar: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => handleAuth())
    .onUploadComplete(() => { }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;