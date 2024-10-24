import { auth } from "@/auth"
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
  params
}: {
  params: {
    courseId: string
    chapterId: string
  }
}) => {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }

  return (
    <div>

    </div>
  );
}

export default ChapterIdPage;