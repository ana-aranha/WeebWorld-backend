import { prisma } from "@/config";

async function findByStatusId(statusId: number) {
  return prisma.topicBookmark.findFirst({
    where: {
      statusId,
    },
  });
}

const statusRepository = {
  findByStatusId,
};

export default statusRepository;
