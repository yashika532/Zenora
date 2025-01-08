import { Router } from "express";
import { addComment , getCommentByVideoId } from "../Controllers/comment.js";
import { auth } from "../middleware/authentication.js";

const router = Router();
router.route("/comment").post(auth,addComment);
router.route("/comment/:videoId").get(getCommentByVideoId);
export default router;