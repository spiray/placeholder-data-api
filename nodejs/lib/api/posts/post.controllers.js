import fetch from 'node-fetch';
import { BASE_URL } from '../../constants';

export async function getAllPosts(_, res) {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();

  return res.json(posts);
}

export async function getOnePost(req, res) {
  const response = await fetch(`${BASE_URL}/posts/${req.params.id}`);
  const post = await response.json();

  return res.json(post);
}

export async function createPost(req, res) {
  const { title, body, userId } = req.body;
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({ title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post = await response.json();

  return res.json(post);
}
export async function replacePost(req, res) {
  const { id, title, body, userId } = req.body;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post = await response.json();

  return res.json(post);
}

export async function modifyPost(req, res) {
  const { id } = req.params;
  const { body } = req;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post = await response.json();

  return res.json(post);
}

export async function deletePost(req, res) {
  const { id } = req.params;
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE'
  });

  return res.sendStatus(200);
}
