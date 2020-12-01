import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  modifyPost,
  replacePost
} from './post.controllers.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getOnePost);

router.post('/', createPost);

router.put('/', replacePost);

router.patch('/:id', modifyPost);

router.delete('/:id', deletePost);

export default router;
