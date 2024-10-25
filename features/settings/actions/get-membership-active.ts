import { db } from "@/lib/db";

export const getMembershipActive = async (userId: string) => {
  const student = await db.student.findFirst({
    where: {
      userId,
    },
  });

  if (!student) {
    return null;
  }

  const membershipActive = await db.membership.findFirst({
    where: {
      userId,
      status: 'active',
      expiresAt: {
        gte: new Date(),
      }
    },
  });

  return membershipActive;
}
