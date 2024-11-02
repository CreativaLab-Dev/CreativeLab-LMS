import { db } from "@/lib/db"

export const updateVisitOfResource = async (resourceId: string) => {
  const resource = await db.resource.findUnique({
    where: {
      id: resourceId
    }
  });

  if (!resource) {
    return null;
  }

  const updatedResource = await db.resource.update({
    where: {
      id: resourceId
    },
    data: {
      visitedCount: resource.visitedCount + 1
    }
  });

  return updatedResource;
}