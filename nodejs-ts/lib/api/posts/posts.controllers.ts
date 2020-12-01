import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { BASE_URL } from '../../constants';
import { Post } from '../../types';

export async function getAllPosts(_: Request, res: Response) {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts: Array<Post> = await response.json();

  return res.json(posts);
}

export async function getOnePost(req: Request, res: Response) {
  const response = await fetch(`${BASE_URL}/posts/${req.params.id}`);
  const post: Post = await response.json();

  return res.json(post);
}

export async function createPost(req: Request, res: Response) {
  const { title, body, userId }: Partial<Post> = req.body;
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({ title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  return res.json(post);
}
export async function replacePost(req: Request, res: Response) {
  const { id, title, body, userId }: Post = req.body;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  return res.json(post);
}

export async function modifyPost(req: Request, res: Response) {
  const { id } = req.params;
  const { body }: Partial<Post> = req;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  return res.json(post);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE'
  });

  return res.sendStatus(200);
}
