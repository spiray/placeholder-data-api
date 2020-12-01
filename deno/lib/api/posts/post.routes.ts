import { Router } from "https://deno.land/x/oak/mod.ts";
import { createPost, deletePost, getAllPosts, getOnePost, modifyPost, replacePost } from "./post.controllers.ts";

const router = new Router();
router
    .get("/posts", getAllPosts).get("/posts/:id", getOnePost)
    .post("/posts", createPost)
    .put('/posts', replacePost)
    .patch('/posts/:id', modifyPost)
    .delete('/posts/:id', deletePost)

export default router;
