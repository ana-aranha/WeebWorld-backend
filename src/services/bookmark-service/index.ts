import { notFoundError } from "@/errors";
import bookmarkRepository from "@/repositories/bookmark-repository";
import statusRepository from "@/repositories/status-repository";

async function checkValidStatus(statusId: number) {
  const status = await statusRepository.findByStatusId(statusId);

  if (!status) {
    throw notFoundError();
  }
}

async function checkValidBookmark(userId: number, topicId: number, itemId: number) {
  const bookmark = await bookmarkRepository.findByUserIdAndTopicId(userId, topicId, itemId);

  if (!bookmark) {
    throw notFoundError();
  }

  return bookmark;
}

async function createBookmark(userId: number, topicId: number, itemId: number, statusId: number) {
  await checkValidStatus(statusId);

  return bookmarkRepository.create({
    userId,
    topicId,
    statusId,
    itemId,
  });
}

async function changeBookmark(userId: number, topicId: number, itemId: number, statusId: number) {
  await checkValidStatus(statusId);

  const bookmark = await checkValidBookmark(userId, topicId, itemId);

  return bookmarkRepository.updateTopicBookmark({
    id: bookmark.id,
    userId,
    topicId,
    statusId,
    itemId,
  });
}

async function deleteBookmarkById(userId: number, topicId: number, itemId: number) {
  const bookmark = await checkValidBookmark(userId, topicId, itemId);

  return bookmarkRepository.deleteBookmark(bookmark.id);
}

const bookmarkService = {
  changeBookmark,
  deleteBookmarkById,
  createBookmark,
};

export default bookmarkService;
