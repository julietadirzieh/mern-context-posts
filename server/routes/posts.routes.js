import { Router } from "express";
import { getPosts, createPost, updatePost, deletePost, getPostById } from "../controllers/posts.controllers.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPostById);

export default router;
