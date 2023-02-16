import { prisma } from "@/config";
import { TopicBookmark } from "@prisma/client";

type CreateParams = Omit<TopicBookmark, "id" | "createdAt" | "updatedAt" | "deletedAt">;
export type UpdateParams = Omit<TopicBookmark, "createdAt" | "updatedAt" | "deletedAt">;

async function create({ userId, topicId, statusId, itemId }: CreateParams): Promise<TopicBookmark> {
  return prisma.topicBookmark.create({
    data: {
      statusId,
      topicId,
      itemId,
      userId,
    },
  });
}

async function updateTopicBookmark({ id, userId, topicId, statusId, itemId }: UpdateParams) {
  return prisma.topicBookmark.update({
    where: {
      id,
    },
    data: {
      statusId,
      topicId,
      itemId,
      userId,
    },
  });
}

async function findByUserIdAndTopicId(userId: number, topicId: number, itemId: number) {
  return prisma.topicBookmark.findFirst({
    where: {
      userId,
      topicId,
      itemId,
    },
  });
}

async function deleteBookmark(id: number) {
  return prisma.topicBookmark.delete({
    where: {
      id,
    },
  });
}

const bookmarkRepository = {
  create,
  findByUserIdAndTopicId,
  updateTopicBookmark,
  deleteBookmark,
};

export default bookmarkRepository;
