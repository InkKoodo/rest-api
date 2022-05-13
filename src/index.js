/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import userRouter from './resources/user/user.router';
import postRouter from './resources/post/post.router';

const dbURI = process.env.DB_URI;
const app = express();
const port = 3000;

mongoose.connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`listen at port: http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/user', userRouter);
app.use('/post', postRouter);
