import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import postRouter from "./lib/api/posts/post.routes.ts";

const router = new Router();
router.get("/", (context) => {
  context.response.body = {
    message: "See below for available endpoints/actions",
    endpoints: {
      GET_ALL: "/posts",
      GET: "/posts/:id",
      POST: "/posts title body userID",
      PUT: "/posts id title body userId",
      PATCH: "/posts/:id title? body? userId?",
      DELETE: "/posts/:id",
    },
  };
});

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

app.use(router.routes());
app.use(postRouter.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
