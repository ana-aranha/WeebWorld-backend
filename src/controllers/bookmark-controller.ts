import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookmarkService from "@/services/bookmark-service";

export async function getBookmark(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    return res.status(httpStatus.OK).send({});
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBookmark(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { topicId, itemId, statusId }: { topicId: number; itemId: number; statusId: number } = req.body;

    if (!topicId || !itemId || !statusId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    await bookmarkService.createBookmark(userId, topicId, itemId, statusId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateBookmark(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { topicId, itemId, statusId }: { topicId: number; itemId: number; statusId: number } = req.body;

    if (!topicId || !itemId || !statusId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    await bookmarkService.changeBookmark(userId, topicId, itemId, statusId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteBookmark(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const topic = req.params;
    const { item } = req.query;
    const { topicId, itemId }: { topicId: number; itemId: number; statusId: number } = req.body;

    if (!topicId || !itemId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    await bookmarkService.deleteBookmarkById(userId, topicId, itemId);
    return res.sendStatus(httpStatus.ACCEPTED);
  } catch (error) {
    if (error.name === "CannotSubscribeError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
