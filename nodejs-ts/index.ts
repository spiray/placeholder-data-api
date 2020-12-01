import express from 'express';
import fetch from 'node-fetch';
import morgan from 'morgan';
import { Post } from './types';
import { BASE_URL } from './constants';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/posts', async (_, res) => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts: Array<Post> = await response.json();

  return res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const response = await fetch(`${BASE_URL}/posts/${req.params.id}`);
  const post: Post = await response.json();

  return res.json(post);
});

app.post('/posts', async (req, res) => {
  const { title, body, userId }: Partial<Post> = req.body;
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({ title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  return res.json(post);
});

app.put('/posts/', async (req, res) => {
  const { id, title, body, userId }: Post = req.body;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  return res.json(post);
});

app.patch('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { body }: Partial<Post> = req;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  return res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE'
  });

  return res.sendStatus(200)
});

app.listen(3000, () => console.log('Server Started @ http://localhost:3000'));
