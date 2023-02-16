import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookmark, createBookmark, deleteBookmark } from "@/controllers";

const bookmarkRouter = Router();

bookmarkRouter
  .all("/*", authenticateToken)
  .get("/:topicId?itemId", getBookmark)
  .post("", createBookmark)
  .put("")
  .delete("/:bookmarkId", deleteBookmark);

export { bookmarkRouter };
