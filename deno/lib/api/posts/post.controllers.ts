import { BASE_URL } from "../../constants.ts";
import type { MyRouterContext, Post } from "../../types.ts";

export async function getAllPosts(context: MyRouterContext) {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts: Array<Post> = await response.json();
  context.response.body = posts;
}

export async function getOnePost(context: MyRouterContext) {
  const response = await fetch(`${BASE_URL}/posts/${context.params.id}`);
  const post: Post = await response.json();
  context.response.body = post;
}

export async function createPost(context: MyRouterContext) {
  const { title, body, userId }: Partial<Post> = await context.request.body().value;
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({ title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  context.response.body = post;
}

export async function replacePost(context: MyRouterContext) {
  const { id, title, body, userId }: Post = await context.request.body().value;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  context.response.body = post;
}

export async function modifyPost(context: MyRouterContext) {
  const { id } = context.params;
  const body: Partial<Post> = await context.request.body().value;
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const post: Post = await response.json();

  context.response.body = post;
}

export async function deletePost(context: MyRouterContext) {
  const { id } = context.params;
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE'
  });

  context.response.status = 200;
  context.response.body = 200;
}
