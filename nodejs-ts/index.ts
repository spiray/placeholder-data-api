import express from 'express';
import morgan from 'morgan';
import postRouter from './api/posts/posts.routes';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (_, res) => {
  return res.json({
    message: 'See below for available endpoints/actions',
    endpoints: {
      GET_ALL: '/posts',
      GET: '/posts/:id',
      POST: '/posts title body userID',
      PUT: '/posts id title body userId',
      PATCH: '/posts/:id title? body? userId?',
      DELETE: '/posts/:id'
    }
  });
});

app.use('/posts', postRouter);

app.listen(3000, () => console.log('Server Started @ http://localhost:3000'));
