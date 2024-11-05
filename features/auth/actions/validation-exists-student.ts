import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const validationExistsStudent = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (!user) {
    return redirect('/')
  }

  if (!user.studentId && !user.teacherId) {
    await db.student.create({
      data: {
        userId,
      }
    })
  }
}